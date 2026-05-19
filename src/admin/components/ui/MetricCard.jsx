import React from 'react';
import '../../admin.css';

const COLOR_MAP = {
  green:  { bg: 'var(--adm-green-dim)',  fg: 'var(--adm-green)',  badge: '#10b981' },
  red:    { bg: 'var(--adm-red-dim)',    fg: 'var(--adm-red)',    badge: '#ef4444' },
  amber:  { bg: 'var(--adm-amber-dim)', fg: 'var(--adm-amber)',  badge: '#f59e0b' },
  blue:   { bg: 'var(--adm-blue-dim)',   fg: 'var(--adm-blue)',   badge: '#3b82f6' },
  indigo: { bg: 'var(--adm-accent-dim)', fg: 'var(--adm-accent)', badge: '#6366f1' },
};

export default function MetricCard({
  title,
  value,
  change,
  icon,
  color = 'indigo',
  subtitle,
}) {
  const palette = COLOR_MAP[color] || COLOR_MAP.indigo;
  const isPositive = change >= 0;
  const changeAbs = Math.abs(change);

  return (
    <div className="adm-metric-card">
      <div className="adm-metric-top">
        <div
          className="adm-metric-icon-wrap"
          style={{ background: palette.bg, color: palette.fg }}
        >
          {icon && <span className="adm-metric-icon">{icon}</span>}
        </div>
        {change !== undefined && change !== null && (
          <div
            className={`adm-metric-change${isPositive ? ' adm-metric-change--up' : ' adm-metric-change--down'}`}
          >
            {isPositive ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 9V3M3 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 3v6M9 6l-3 3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span>{changeAbs}%</span>
          </div>
        )}
      </div>
      <div className="adm-metric-value" style={{ color: palette.fg }}>{value}</div>
      <div className="adm-metric-title">{title}</div>
      {subtitle && <div className="adm-metric-subtitle">{subtitle}</div>}
    </div>
  );
}
