import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import { BarChart, DonutChart } from '../components/ui/Chart';

// ─── Mock / static data ───────────────────────────────────────────────────────
const mockIntegrations = [
  { name: 'Google Analytics', key: 'ga', connected: true,  lastSync: '2 min ago' },
  { name: 'Meta Pixel',        key: 'meta', connected: true,  lastSync: '5 min ago' },
  { name: 'Microsoft Clarity', key: 'clarity', connected: false, lastSync: 'Never' },
  { name: 'Google Search Console', key: 'gsc', connected: true, lastSync: '1 hr ago' },
];

const mockTrafficSources = [
  { label: 'Instagram',  pct: 35, color: '#e1306c' },
  { label: 'WhatsApp',   pct: 22, color: '#25d366' },
  { label: 'Google',     pct: 18, color: '#4285f4' },
  { label: 'YouTube',    pct: 12, color: '#ff0000' },
  { label: 'Direct',     pct: 8,  color: '#6366f1' },
  { label: 'Referral',   pct: 5,  color: '#f59e0b' },
];

const mockFunnel = [
  { stage: 'Instagram Reel',          visitors: 18400, pct: 100 },
  { stage: 'Landing Page',            visitors: 11040, pct: 60  },
  { stage: 'Webinar Registration',    visitors: 4416,  pct: 24  },
  { stage: 'WhatsApp Follow-up',      visitors: 2650,  pct: 14.4},
  { stage: 'Counseling Session',      visitors: 884,   pct: 4.8 },
  { stage: 'Conversion',              visitors: 589,   pct: 3.2 },
];

const mockInsights = [
  { icon: '⚠️', text: '68% of mobile users drop off before reaching the pricing section', type: 'warning' },
  { icon: '📊', text: 'Instagram is the top traffic source with 35% share — allocate more budget there', type: 'info' },
  { icon: '🔥', text: 'Webinar pages have the highest conversion rate at 8.2% — replicate this pattern', type: 'success' },
  { icon: '⚡', text: '3 broken form submissions detected on the Contact page', type: 'error' },
  { icon: '💡', text: 'Tuesday 7–9 PM sees peak engagement — schedule reels during this window', type: 'info' },
  { icon: '📉', text: 'Bounce rate increased by 4% compared to last week on pricing page', type: 'warning' },
];

const mockErrors = [
  { id: 1, type: 'Broken Form',  page: '/contact',         occurrences: 3,  status: 'Active',   severity: 'high'   },
  { id: 2, type: 'Slow Page',    page: '/webinar/live',    occurrences: 11, status: 'Active',   severity: 'medium' },
  { id: 3, type: '404 Error',    page: '/old-course-page', occurrences: 27, status: 'Resolved', severity: 'low'    },
  { id: 4, type: 'JS Error',     page: '/checkout',        occurrences: 2,  status: 'Active',   severity: 'high'   },
  { id: 5, type: 'Redirect Loop',page: '/register',        occurrences: 5,  status: 'Resolved', severity: 'medium' },
];

const revenueChartData = [
  { label: 'Dec', revenue: 142000, expenses: 38000 },
  { label: 'Jan', revenue: 168000, expenses: 41000 },
  { label: 'Feb', revenue: 155000, expenses: 39000 },
  { label: 'Mar', revenue: 193000, expenses: 52000 },
  { label: 'Apr', revenue: 211000, expenses: 58000 },
  { label: 'May', revenue: 247000, expenses: 63000 },
];

const donutData = [
  { label: 'Ad Spend',      value: 38, color: '#f59e0b' },
  { label: 'Subscriptions', value: 22, color: '#6366f1' },
  { label: 'Freelancer',    value: 25, color: '#3b82f6' },
  { label: 'Operational',   value: 15, color: '#10b981' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Analytics() {
  useData(); // keep context connected
  const [activeMetric, setActiveMetric] = useState(null);

  const metrics = [
    { label: 'Live Visitors',    value: '23',      sub: 'right now',        pulse: true,  color: '#10b981' },
    { label: 'Page Views',       value: '48,920',  sub: 'last 30 days',     pulse: false, color: '#6366f1' },
    { label: 'Unique Visitors',  value: '12,450',  sub: 'last 30 days',     pulse: false, color: '#3b82f6' },
    { label: 'Bounce Rate',      value: '62%',     sub: '↑4% vs last week', pulse: false, color: '#f59e0b' },
    { label: 'Avg Session',      value: '2m 34s',  sub: '+18s vs last week',pulse: false, color: '#8b5cf6' },
    { label: 'Conversion Rate',  value: '3.2%',    sub: '↑0.4% vs last wk', pulse: false, color: '#10b981' },
  ];

  const insightTypeClass = { warning: 'adm-insight-warn', info: 'adm-insight-info', success: 'adm-insight-success', error: 'adm-insight-error' };

  return (
    <AdminLayout title="Website Intelligence">
      {/* ── Page Header ── */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Website Intelligence</h1>
          <p className="adm-page-subtitle">Real-time analytics, traffic insights &amp; error monitoring</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="adm-btn adm-btn-ghost">Export Report</button>
          <button className="adm-btn adm-btn-primary">🔄 Refresh</button>
        </div>
      </div>

      {/* ── Integration Status ── */}
      <div className="adm-card" style={{ marginBottom: 20 }}>
        <div className="adm-card-header">
          <h3 className="adm-card-title">Integration Status</h3>
          <span className="adm-text-muted" style={{ fontSize: 13 }}>4 integrations configured</span>
        </div>
        <div className="adm-analytics-integrations">
          {mockIntegrations.map(ig => (
            <div key={ig.key} className="adm-integration-tile">
              <div className="adm-integration-header">
                <span
                  className="adm-status-dot"
                  style={{ background: ig.connected ? 'var(--adm-green)' : 'var(--adm-muted)', boxShadow: ig.connected ? '0 0 6px var(--adm-green)' : 'none' }}
                />
                <span className="adm-integration-name">{ig.name}</span>
              </div>
              <div className="adm-integration-meta">
                <Badge variant={ig.connected ? 'green' : 'gray'} size="sm">
                  {ig.connected ? 'Connected' : 'Disconnected'}
                </Badge>
                <span className="adm-text-muted" style={{ fontSize: 11 }}>Sync: {ig.lastSync}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="adm-analytics-metrics">
        {metrics.map(m => (
          <div
            key={m.label}
            className={`adm-card adm-analytics-metric-card${activeMetric === m.label ? ' adm-metric-active' : ''}`}
            onClick={() => setActiveMetric(activeMetric === m.label ? null : m.label)}
            style={{ cursor: 'pointer', borderColor: activeMetric === m.label ? m.color : undefined }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              {m.pulse && (
                <span className="adm-live-dot" style={{ background: m.color }} />
              )}
              <span className="adm-metric-label">{m.label}</span>
            </div>
            <div className="adm-metric-value" style={{ color: m.color }}>{m.value}</div>
            <div className="adm-metric-sub">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Traffic Sources + Funnel ── */}
      <div className="adm-analytics-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* Traffic Sources */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3 className="adm-card-title">Traffic Sources</h3>
            <span className="adm-text-muted" style={{ fontSize: 13 }}>Last 30 days</span>
          </div>
          <div className="adm-traffic-sources">
            {mockTrafficSources.map(src => (
              <div key={src.label} className="adm-traffic-row">
                <div className="adm-traffic-label-wrap">
                  <span
                    className="adm-traffic-dot"
                    style={{ background: src.color }}
                  />
                  <span className="adm-traffic-label">{src.label}</span>
                </div>
                <div className="adm-traffic-bar-wrap">
                  <div
                    className="adm-traffic-bar"
                    style={{ width: `${src.pct}%`, background: src.color + 'cc' }}
                  />
                </div>
                <span className="adm-traffic-pct">{src.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3 className="adm-card-title">Conversion Funnel</h3>
            <span className="adm-text-muted" style={{ fontSize: 13 }}>Monthly snapshot</span>
          </div>
          <div className="adm-funnel">
            {mockFunnel.map((step, i) => {
              const drop = i > 0 ? (mockFunnel[i - 1].pct - step.pct).toFixed(1) : null;
              return (
                <div key={step.stage} className="adm-funnel-step">
                  {i > 0 && (
                    <div className="adm-funnel-arrow">
                      <span className="adm-funnel-drop">↓ -{drop}%</span>
                    </div>
                  )}
                  <div className="adm-funnel-bar-row">
                    <div
                      className="adm-funnel-bar"
                      style={{
                        width: `${step.pct}%`,
                        background: `linear-gradient(90deg, #6366f1 0%, #818cf8 100%)`,
                        opacity: 0.3 + (step.pct / 100) * 0.7,
                      }}
                    />
                    <div className="adm-funnel-info">
                      <span className="adm-funnel-stage">{step.stage}</span>
                      <span className="adm-funnel-nums">
                        {step.visitors.toLocaleString()} <span className="adm-text-muted">({step.pct}%)</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="adm-card">
          <div className="adm-card-header">
            <h3 className="adm-card-title">Monthly Traffic Overview</h3>
          </div>
          <BarChart
            data={revenueChartData.map(d => ({ label: d.label, value: d.revenue / 1000, secondary: d.expenses / 1000 }))}
            color="#6366f1"
            secondaryColor="#ef4444"
            height={180}
            yLabel="Visitors (K)"
          />
        </div>
        <div className="adm-card">
          <div className="adm-card-header">
            <h3 className="adm-card-title">Ad Spend Breakdown</h3>
          </div>
          <DonutChart data={donutData} height={180} />
        </div>
      </div>

      {/* ── Smart Insights ── */}
      <div className="adm-card" style={{ marginBottom: 20 }}>
        <div className="adm-card-header">
          <h3 className="adm-card-title">🤖 Smart Insights</h3>
          <Badge variant="indigo" size="sm">AI-Generated</Badge>
        </div>
        <div className="adm-insights-grid">
          {mockInsights.map((ins, i) => (
            <div key={i} className={`adm-insight-card ${insightTypeClass[ins.type] || ''}`}>
              <span className="adm-insight-icon">{ins.icon}</span>
              <p className="adm-insight-text">{ins.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Error Log ── */}
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">⚠️ Error Log</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="adm-badge adm-badge-red">{mockErrors.filter(e => e.status === 'Active').length} Active</span>
            <span className="adm-badge adm-badge-green">{mockErrors.filter(e => e.status === 'Resolved').length} Resolved</span>
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Error Type</th>
                <th>Affected Page</th>
                <th>Occurrences</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockErrors.map(err => (
                <tr key={err.id}>
                  <td className="adm-td-name">{err.type}</td>
                  <td>
                    <code style={{ fontSize: 12, color: 'var(--adm-text-secondary)', background: 'var(--adm-bg)', padding: '2px 6px', borderRadius: 4 }}>
                      {err.page}
                    </code>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: err.occurrences > 10 ? 'var(--adm-red)' : 'var(--adm-text)' }}>
                      {err.occurrences}×
                    </span>
                  </td>
                  <td>
                    <Badge
                      variant={err.severity === 'high' ? 'red' : err.severity === 'medium' ? 'amber' : 'gray'}
                      size="sm"
                    >
                      {err.severity}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={err.status === 'Active' ? 'red' : 'green'} size="sm">
                      {err.status}
                    </Badge>
                  </td>
                  <td>
                    <button className="adm-btn adm-btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>
                      {err.status === 'Active' ? 'Resolve' : 'Re-open'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Inline styles ── */}
      <style>{`
        .adm-analytics-integrations {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .adm-integration-tile {
          background: var(--adm-bg);
          border: 1px solid var(--adm-border);
          border-radius: 10px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .adm-integration-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .adm-integration-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--adm-text);
        }
        .adm-integration-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .adm-analytics-metrics {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        .adm-analytics-metric-card {
          padding: 16px;
          border-radius: 10px;
          border: 1px solid var(--adm-border);
          transition: border-color 0.2s, transform 0.15s;
        }
        .adm-analytics-metric-card:hover { transform: translateY(-2px); }
        .adm-metric-label { font-size: 12px; color: var(--adm-text-secondary); }
        .adm-metric-value { font-size: 26px; font-weight: 700; margin: 4px 0; }
        .adm-metric-sub { font-size: 11px; color: var(--adm-muted); }
        .adm-live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          display: inline-block;
          animation: admPulse 1.5s infinite;
        }
        @keyframes admPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .adm-traffic-sources { display: flex; flex-direction: column; gap: 12px; }
        .adm-traffic-row { display: grid; grid-template-columns: 110px 1fr 42px; align-items: center; gap: 10px; }
        .adm-traffic-label-wrap { display: flex; align-items: center; gap: 8px; }
        .adm-traffic-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .adm-traffic-label { font-size: 13px; color: var(--adm-text); }
        .adm-traffic-bar-wrap { height: 8px; background: var(--adm-bg); border-radius: 4px; overflow: hidden; }
        .adm-traffic-bar { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
        .adm-traffic-pct { font-size: 13px; font-weight: 600; color: var(--adm-text-secondary); text-align: right; }
        .adm-funnel { display: flex; flex-direction: column; gap: 4px; }
        .adm-funnel-step { display: flex; flex-direction: column; gap: 2px; }
        .adm-funnel-arrow { display: flex; justify-content: center; padding: 2px 0; }
        .adm-funnel-drop { font-size: 11px; color: var(--adm-red); font-weight: 600; }
        .adm-funnel-bar-row { position: relative; height: 34px; display: flex; align-items: center; }
        .adm-funnel-bar { position: absolute; left: 0; top: 0; height: 100%; border-radius: 6px; min-width: 4%; }
        .adm-funnel-info { position: relative; z-index: 1; display: flex; justify-content: space-between; width: 100%; padding: 0 10px; }
        .adm-funnel-stage { font-size: 12px; font-weight: 600; color: var(--adm-text); }
        .adm-funnel-nums { font-size: 12px; color: var(--adm-text-secondary); }
        .adm-insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .adm-insight-card {
          display: flex; gap: 10px; align-items: flex-start;
          padding: 12px 14px; border-radius: 10px;
          border-left: 3px solid var(--adm-border);
          background: var(--adm-bg);
        }
        .adm-insight-warn  { border-left-color: var(--adm-amber); background: var(--adm-amber-dim); }
        .adm-insight-info  { border-left-color: var(--adm-blue);  background: var(--adm-blue-dim); }
        .adm-insight-success { border-left-color: var(--adm-green); background: var(--adm-green-dim); }
        .adm-insight-error { border-left-color: var(--adm-red);   background: var(--adm-red-dim); }
        .adm-insight-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
        .adm-insight-text { font-size: 13px; color: var(--adm-text); line-height: 1.5; margin: 0; }
        .adm-metric-active { box-shadow: 0 0 0 2px currentColor; }
        .adm-text-muted { color: var(--adm-text-secondary); }
        @media (max-width: 1200px) {
          .adm-analytics-metrics { grid-template-columns: repeat(3, 1fr); }
          .adm-analytics-integrations { grid-template-columns: repeat(2, 1fr); }
          .adm-insights-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 800px) {
          .adm-analytics-split { grid-template-columns: 1fr !important; }
          .adm-analytics-metrics { grid-template-columns: repeat(2, 1fr); }
          .adm-insights-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </AdminLayout>
  );
}
