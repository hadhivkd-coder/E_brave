import React, { useEffect, useRef, useState } from 'react';
import '../../admin.css';

/* ─── Utility ─────────────────────────────────────────────────────────────── */
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function normalizeData(data) {
  if (!data || data.length === 0) return { items: [], max: 1, min: 0 };
  const values = data.map(d => (typeof d === 'number' ? d : d.value));
  const max = Math.max(...values);
  const min = Math.min(...values);
  return { items: data, values, max, min };
}

/* ─── BarChart ─────────────────────────────────────────────────────────────── */
export function BarChart({ data = [], height = 200, title }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 60); return () => clearTimeout(t); }, []);

  const { values, max } = normalizeData(data);
  if (!data.length) return null;

  return (
    <div className="adm-chart-wrap" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {title && <div className="adm-chart-title" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--adm-muted)', marginBottom: '12px' }}>{title}</div>}
      <div className="adm-chart-bar" style={{ height: height - 40, display: 'flex', width: '100%' }}>
        {data.map((item, i) => {
          const val = typeof item === 'number' ? item : item.value;
          const pct = max > 0 ? (val / max) * 100 : 0;
          const color = item.color || 'var(--adm-accent)';
          const label = item.label || '';
          return (
            <div key={i} className="adm-chart-bar-col">
              <div className="adm-chart-bar-value" style={{ marginBottom: 4 }}>
                {val >= 1000 ? `₹${(val / 1000).toFixed(0)}k` : `₹${val}`}
              </div>
              <div
                className="adm-chart-bar-fill"
                style={{
                  height: animated ? `${clamp(pct, 5, 80)}%` : '0%',
                  background: color,
                  transition: `height 0.6s cubic-bezier(.22,.61,.36,1) ${i * 40}ms`
                }}
                title={`${label}: ₹${val.toLocaleString()}`}
              />
              <span className="adm-chart-bar-label" style={{ marginTop: 4 }}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── LineChart ────────────────────────────────────────────────────────────── */
export function LineChart({ data = [], height = 200, title, color = 'var(--adm-accent)' }) {
  const [animated, setAnimated] = useState(false);
  const svgRef = useRef(null);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 60); return () => clearTimeout(t); }, []);

  if (!data.length) return null;
  const { values, max, min } = normalizeData(data);
  const W = 400;
  const H = height - 30;
  const pad = 10;
  const range = max - min || 1;

  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1 || 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return [x, y];
  });

  const polyline = pts.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `${pts[0][0]},${H - pad} ` + pts.map(([x, y]) => `${x},${y}`).join(' ') + ` ${pts[pts.length - 1][0]},${H - pad} Z`;

  return (
    <div className="adm-chart adm-line-chart">
      {title && <div className="adm-chart-title">{title}</div>}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: H, display: 'block' }}
      >
        <defs>
          <linearGradient id={`lg-${title}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          <clipPath id={`clip-${title}`}>
            <rect x="0" y="0" width={animated ? W : 0} height={H}>
              <animate attributeName="width" from="0" to={W} dur="0.8s" fill="freeze" begin="0.1s" />
            </rect>
          </clipPath>
        </defs>
        {/* Area fill */}
        <path d={area} fill={`url(#lg-${title})`} />
        {/* Line */}
        <polyline
          points={polyline}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          clipPath={`url(#clip-${title})`}
        />
        {/* Dots */}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill={color} stroke="var(--adm-card)" strokeWidth="2" />
        ))}
      </svg>
      {/* X labels */}
      <div className="adm-line-labels">
        {data.map((item, i) => (
          <span key={i} className="adm-line-label">{item.label || ''}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── DonutChart ───────────────────────────────────────────────────────────── */
export function DonutChart({ data = [], size = 160 }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 60); return () => clearTimeout(t); }, []);

  if (!data.length) return null;
  const total = data.reduce((s, d) => s + (d.value || 0), 0);
  const radius = (size - 20) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePct = 0;
  const segments = data.map(item => {
    const pct = total > 0 ? item.value / total : 0;
    const offset = cumulativePct * circumference;
    cumulativePct += pct;
    return { ...item, pct, offset };
  });

  return (
    <div className="adm-chart adm-donut-chart" style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--adm-border)" strokeWidth="16" />
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={seg.color || 'var(--adm-accent)'}
            strokeWidth="16"
            strokeDasharray={`${animated ? seg.pct * circumference : 0} ${circumference}`}
            strokeDashoffset={-seg.offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="round"
            style={{ transition: `stroke-dasharray 0.7s ease ${i * 100}ms` }}
          />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--adm-text)" fontSize="18" fontWeight="700">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--adm-text-secondary)" fontSize="10">Total</text>
      </svg>
      {/* Legend */}
      <div className="adm-donut-legend">
        {data.map((item, i) => (
          <div key={i} className="adm-donut-legend-item">
            <span className="adm-donut-legend-dot" style={{ background: item.color || 'var(--adm-accent)' }} />
            <span className="adm-donut-legend-label">{item.label}</span>
            <span className="adm-donut-legend-val">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SparkLine ────────────────────────────────────────────────────────────── */
export function SparkLine({ data = [], color = 'var(--adm-accent)', width = 80, height = 32 }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = width;
  const H = height;
  const pad = 2;

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1 || 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── MiniBarChart ─────────────────────────────────────────────────────────── */
export function MiniBarChart({ data = [], color = 'var(--adm-accent)', width = 80, height = 32 }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 60); return () => clearTimeout(t); }, []);

  if (!data.length) return null;
  const max = Math.max(...data);
  const barW = Math.floor((width - data.length) / data.length);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {data.map((v, i) => {
        const pct = max > 0 ? v / max : 0;
        const barH = animated ? Math.max(2, pct * height) : 2;
        const x = i * (barW + 1);
        const y = height - barH;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            fill={color}
            opacity="0.8"
            rx="1"
            style={{ transition: `y 0.5s ease ${i * 30}ms, height 0.5s ease ${i * 30}ms` }}
          />
        );
      })}
    </svg>
  );
}
