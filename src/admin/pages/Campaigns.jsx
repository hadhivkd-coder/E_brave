import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

/* ─── Platform config ─────────────────────────────────────────────────────── */
const PLATFORM_CONFIG = {
  Instagram: {
    emoji: '📸',
    accent: 'linear-gradient(180deg, #e1306c 0%, #833ab4 100%)',
    badgeBg: 'rgba(225,48,108,0.10)',
    badgeColor: '#c2185b',
  },
  Facebook: {
    emoji: '👥',
    accent: 'linear-gradient(180deg, #1877f2 0%, #0d5cbf 100%)',
    badgeBg: 'rgba(24,119,242,0.10)',
    badgeColor: '#1877f2',
  },
  'Google Ads': {
    emoji: '🔍',
    accent: 'linear-gradient(180deg, #ea4335 0%, #fbbc04 100%)',
    badgeBg: 'rgba(234,67,53,0.10)',
    badgeColor: '#d32f2f',
  },
  'YouTube Ads': {
    emoji: '▶️',
    accent: 'linear-gradient(180deg, #ff0000 0%, #cc0000 100%)',
    badgeBg: 'rgba(255,0,0,0.10)',
    badgeColor: '#cc0000',
  },
};

const STATUS_CONFIG = {
  Active: { bg: 'var(--adm-green-dim)', color: 'var(--adm-green)', dot: '#10b981', label: 'Active' },
  Paused: { bg: 'var(--adm-amber-dim)', color: 'var(--adm-amber)', dot: '#d97706', label: 'Paused' },
  Completed: { bg: 'var(--adm-blue-dim)', color: 'var(--adm-blue)', dot: '#2563eb', label: 'Completed' },
};

const FILTERS = ['All', 'Instagram', 'Facebook', 'Google Ads', 'YouTube Ads'];

/* ─── iOS Toggle ──────────────────────────────────────────────────────────── */
function IOSToggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      aria-label="Toggle status"
      style={{
        position: 'relative',
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? 'var(--adm-green)' : 'rgba(0,0,0,0.15)',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.25s ease',
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
        padding: 0,
        outline: 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: checked ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.22)',
          transition: 'left 0.22s cubic-bezier(.4,0,.2,1)',
          display: 'block',
        }}
      />
    </button>
  );
}

/* ─── Stat Card ───────────────────────────────────────────────────────────── */
function StatCard({ icon, label, value, color, dimColor, trend }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="adm-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '22px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        transition: 'transform var(--adm-transition), box-shadow var(--adm-transition)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? 'var(--adm-shadow-lg)' : 'var(--adm-shadow)',
        cursor: 'default',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* decorative circle */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 90, height: 90, borderRadius: '50%',
        background: dimColor, opacity: 0.6, pointerEvents: 'none',
      }} />
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: dimColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: '1.6rem', fontWeight: 700, color,
          lineHeight: 1.1, letterSpacing: '-0.5px',
        }}>{value}</div>
        <div style={{
          fontSize: '0.78rem', color: 'var(--adm-text-secondary)',
          fontWeight: 500, marginTop: 3,
        }}>{label}</div>
        {trend && (
          <div style={{ fontSize: '0.72rem', color: 'var(--adm-green)', marginTop: 4, fontWeight: 600 }}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Campaign Card ───────────────────────────────────────────────────────── */
function CampaignCard({ c, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const pConf = PLATFORM_CONFIG[c.platform] || PLATFORM_CONFIG['Instagram'];
  const sConf = STATUS_CONFIG[c.status] || STATUS_CONFIG['Active'];
  const spendPct = Math.min(100, Math.round((c.spend / c.maxBudget) * 100));
  const isCompleted = c.status === 'Completed';

  const fmtDate = (d) => {
    if (!d) return '—';
    try {
      return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
    } catch { return d; }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--adm-card)',
        borderRadius: 'var(--adm-radius)',
        border: '1px solid var(--adm-border)',
        boxShadow: hovered ? 'var(--adm-shadow-lg)' : 'var(--adm-shadow)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--adm-transition), box-shadow var(--adm-transition)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Colored left accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 4, height: '100%',
        background: pConf.accent,
        borderRadius: '12px 0 0 12px',
      }} />

      {/* Card body */}
      <div style={{ padding: '20px 20px 0 24px', flex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontSize: '0.92rem', fontWeight: 700,
              color: 'var(--adm-text)', margin: 0,
              lineHeight: 1.35, marginBottom: 8,
            }}>{c.name}</h3>

            {/* Platform badge */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '3px 10px', borderRadius: 20,
              background: pConf.badgeBg, color: pConf.badgeColor,
              fontSize: '0.72rem', fontWeight: 600,
            }}>
              {pConf.emoji} {c.platform}
            </span>
          </div>

          {/* Status badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 10px', borderRadius: 20,
            background: sConf.bg, color: sConf.color,
            fontSize: '0.72rem', fontWeight: 600, flexShrink: 0,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: sConf.dot, display: 'inline-block',
              ...(c.status === 'Active' ? { animation: 'pulse-dot 1.6s infinite' } : {}),
            }} />
            {sConf.label}
          </span>
        </div>

        {/* Budget progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: '0.75rem', marginBottom: 5,
            color: 'var(--adm-text-secondary)', fontWeight: 500,
          }}>
            <span>💰 ₹{c.spend.toLocaleString()} spent</span>
            <span style={{ fontWeight: 600, color: 'var(--adm-text)' }}>
              {spendPct}% of ₹{c.maxBudget.toLocaleString()}
            </span>
          </div>
          <div style={{
            height: 7, borderRadius: 10, overflow: 'hidden',
            background: 'var(--adm-accent-dim)',
          }}>
            <div style={{
              height: '100%',
              width: `${spendPct}%`,
              borderRadius: 10,
              background: spendPct >= 90
                ? 'linear-gradient(90deg, var(--adm-red), #f43f5e)'
                : spendPct >= 70
                  ? 'linear-gradient(90deg, var(--adm-amber), #fbbf24)'
                  : 'linear-gradient(90deg, var(--adm-green), #34d399)',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {/* 4 Metric stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 2, marginBottom: 16,
          background: 'var(--adm-accent-dim)',
          borderRadius: 10, overflow: 'hidden',
          border: '1px solid var(--adm-border-light)',
        }}>
          {[
            { label: 'Impressions', value: c.impressions >= 1000 ? `${(c.impressions / 1000).toFixed(0)}K` : c.impressions, color: 'var(--adm-blue)' },
            { label: 'CTR', value: `${c.ctr}%`, color: '#8b5cf6' },
            { label: 'Leads', value: c.leads, color: 'var(--adm-green)' },
            { label: 'CPL ₹', value: `₹${c.costPerLead}`, color: 'var(--adm-amber)' },
          ].map((m, i) => (
            <div key={m.label} style={{
              padding: '10px 6px',
              textAlign: 'center',
              background: 'var(--adm-card)',
              borderRight: i < 3 ? '1px solid var(--adm-border-light)' : 'none',
            }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: m.color }}>{m.value}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--adm-text-secondary)', marginTop: 2, fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div style={{
        padding: '12px 20px 14px 24px',
        borderTop: '1px solid var(--adm-border-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--adm-accent-dim)',
        gap: 10,
      }}>
        {/* ROI badge */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '5px 12px', borderRadius: 20,
          background: 'rgba(16,185,129,0.12)',
          color: '#059669', fontSize: '0.8rem', fontWeight: 700,
        }}>
          📈 {c.roi}x ROI
        </span>

        {/* Date range */}
        <span style={{ fontSize: '0.71rem', color: 'var(--adm-text-secondary)', fontWeight: 500, flex: 1, textAlign: 'center' }}>
          📅 {fmtDate(c.start)} – {fmtDate(c.end)}
        </span>

        {/* iOS Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--adm-text-secondary)', fontWeight: 500 }}>
            {c.status === 'Active' ? 'Live' : c.status === 'Paused' ? 'Paused' : 'Done'}
          </span>
          <IOSToggle
            checked={c.status === 'Active'}
            onChange={() => onToggle(c.id)}
            disabled={isCompleted}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────────────── */
export default function Campaigns() {
  const { showToast } = useNotifications();
  const [showAdd, setShowAdd] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [campaigns, setCampaigns] = useState([
    { id: 'c1', name: 'Engineering Career 2026 Reel Ad', platform: 'Instagram', status: 'Active', spend: 15000, maxBudget: 20000, impressions: 48000, clicks: 2400, ctr: 5, leads: 28, costPerLead: 535, roi: 3.2, start: '2026-05-01', end: '2026-05-31' },
    { id: 'c2', name: 'Medical Counselling Lead Gen Form', platform: 'Facebook', status: 'Active', spend: 12000, maxBudget: 15000, impressions: 35000, clicks: 1750, ctr: 5, leads: 19, costPerLead: 631, roi: 2.5, start: '2026-05-05', end: '2026-05-25' },
    { id: 'c3', name: 'Stream Selection Webinar Promo', platform: 'Google Ads', status: 'Paused', spend: 8000, maxBudget: 10000, impressions: 22000, clicks: 880, ctr: 4, leads: 12, costPerLead: 666, roi: 1.8, start: '2026-05-10', end: '2026-05-20' },
    { id: 'c4', name: 'UX/UI Design Workshop Retargeting', platform: 'Instagram', status: 'Completed', spend: 5000, maxBudget: 5000, impressions: 18000, clicks: 720, ctr: 4, leads: 8, costPerLead: 625, roi: 4.1, start: '2026-04-20', end: '2026-04-30' },
    { id: 'c5', name: 'CA Foundation Guidance search ads', platform: 'Google Ads', status: 'Active', spend: 10000, maxBudget: 15000, impressions: 25000, clicks: 1100, ctr: 4.4, leads: 15, costPerLead: 666, roi: 2.1, start: '2026-05-01', end: '2026-05-28' },
  ]);

  const [form, setForm] = useState({
    name: '', platform: 'Instagram', status: 'Active',
    spend: 0, maxBudget: 10000, impressions: 0, clicks: 0,
    ctr: 0, leads: 0, costPerLead: 0, roi: 1.0, start: '', end: '',
  });

  /* ── Derived stats ── */
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const avgCpl = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 0;
  const bestRoi = Math.max(...campaigns.map(c => c.roi));

  /* ── Handlers ── */
  const handleToggleStatus = (id) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const next = c.status === 'Active' ? 'Paused' : 'Active';
        showToast(`Campaign ${next.toLowerCase()}`, 'info');
        return { ...c, status: next };
      }
      return c;
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.start) return;
    setCampaigns(prev => [...prev, { ...form, id: `c_${Date.now()}` }]);
    setShowAdd(false);
    setForm({ name: '', platform: 'Instagram', status: 'Active', spend: 0, maxBudget: 10000, impressions: 0, clicks: 0, ctr: 0, leads: 0, costPerLead: 0, roi: 1.0, start: '', end: '' });
    showToast('Ad campaign added successfully', 'success');
  };

  const filtered = activeFilter === 'All' ? campaigns : campaigns.filter(c => c.platform === activeFilter);

  return (
    <AdminLayout title="Ads & Campaigns">
      {/* ── Pulse animation keyframes ── */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>

      {/* ── Page header ── */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 16,
        flexWrap: 'wrap', marginBottom: 28,
      }}>
        <div>
          <h1 className="adm-page-title" style={{ marginBottom: 4 }}>
            📣 Ads & Campaigns
          </h1>
          <p className="adm-page-subtitle">
            Track lead generation costs, CTR performance, and enrollment ROI per platform
          </p>
        </div>
        <button
          className="adm-btn adm-btn-primary"
          onClick={() => setShowAdd(true)}
          style={{ whiteSpace: 'nowrap', alignSelf: 'center' }}
        >
          ＋ New Campaign
        </button>
      </div>

      {/* ── 4 Stat cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16, marginBottom: 28,
      }}>
        <StatCard
          icon="💸"
          label="Total Paid Spend"
          value={`₹${totalSpend.toLocaleString()}`}
          color="#6366f1"
          dimColor="rgba(99,102,241,0.10)"
          trend={`Across ${campaigns.length} campaigns`}
        />
        <StatCard
          icon="🎯"
          label="Total Leads Generated"
          value={totalLeads}
          color="var(--adm-green)"
          dimColor="var(--adm-green-dim)"
          trend="All platforms combined"
        />
        <StatCard
          icon="📊"
          label="Avg Cost Per Lead"
          value={`₹${avgCpl.toLocaleString()}`}
          color="var(--adm-amber)"
          dimColor="var(--adm-amber-dim)"
          trend="Blended CPL"
        />
        <StatCard
          icon="📈"
          label="Best Campaign ROI"
          value={`${bestRoi}x`}
          color="var(--adm-blue)"
          dimColor="var(--adm-blue-dim)"
          trend="Top performer"
        />
      </div>

      {/* ── Filter pills ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 8,
        marginBottom: 22,
      }}>
        {FILTERS.map(f => {
          const isActive = activeFilter === f;
          const pConf = PLATFORM_CONFIG[f];
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '7px 18px',
                borderRadius: 20,
                border: '1.5px solid',
                borderColor: isActive ? 'var(--adm-accent)' : 'var(--adm-border)',
                background: isActive ? 'var(--adm-accent)' : 'var(--adm-card)',
                color: isActive ? '#fff' : 'var(--adm-text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--adm-transition)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {pConf ? pConf.emoji : '📋'} {f}
              <span style={{
                background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--adm-accent-dim)',
                color: isActive ? '#fff' : 'var(--adm-accent)',
                borderRadius: 10, padding: '1px 7px',
                fontSize: '0.68rem', fontWeight: 700,
              }}>
                {f === 'All' ? campaigns.length : campaigns.filter(c => c.platform === f).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Campaign cards grid ── */}
      {filtered.length === 0 ? (
        <div className="adm-card" style={{
          padding: '60px 24px', textAlign: 'center',
          color: 'var(--adm-text-secondary)',
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={{ fontWeight: 600 }}>No campaigns found for this platform</div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 18,
        }}>
          {filtered.map(c => (
            <CampaignCard key={c.id} c={c} onToggle={handleToggleStatus} />
          ))}
        </div>
      )}

      {/* ── Create Campaign Modal ── */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="🚀 Create New Campaign" size="md">
        <form onSubmit={handleAdd} className="adm-form-stack">

          {/* Campaign name */}
          <div className="adm-form-group">
            <label style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--adm-text)', marginBottom: 6, display: 'block' }}>
              Campaign Name *
            </label>
            <input
              className="adm-input"
              required
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Google Search CA Guidance 2026"
            />
          </div>

          {/* Platform + Status */}
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--adm-text)', marginBottom: 6, display: 'block' }}>
                Ad Platform *
              </label>
              <select
                className="adm-select"
                value={form.platform}
                onChange={e => setForm(prev => ({ ...prev, platform: e.target.value }))}
              >
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Google Ads</option>
                <option>YouTube Ads</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--adm-text)', marginBottom: 6, display: 'block' }}>
                Initial Status
              </label>
              <select
                className="adm-select"
                value={form.status}
                onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
              >
                <option>Active</option>
                <option>Paused</option>
              </select>
            </div>
          </div>

          {/* Budgets */}
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--adm-text)', marginBottom: 6, display: 'block' }}>
                Current Spend (₹)
              </label>
              <input
                type="number"
                className="adm-input"
                value={form.spend}
                min={0}
                onChange={e => setForm(prev => ({ ...prev, spend: +e.target.value }))}
              />
            </div>
            <div className="adm-form-group">
              <label style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--adm-text)', marginBottom: 6, display: 'block' }}>
                Max Budget (₹)
              </label>
              <input
                type="number"
                className="adm-input"
                value={form.maxBudget}
                min={1}
                onChange={e => setForm(prev => ({ ...prev, maxBudget: +e.target.value }))}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--adm-text)', marginBottom: 6, display: 'block' }}>
                Start Date *
              </label>
              <input
                type="date"
                className="adm-input"
                value={form.start}
                onChange={e => setForm(prev => ({ ...prev, start: e.target.value }))}
                required
              />
            </div>
            <div className="adm-form-group">
              <label style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--adm-text)', marginBottom: 6, display: 'block' }}>
                End Date
              </label>
              <input
                type="date"
                className="adm-input"
                value={form.end}
                onChange={e => setForm(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>

          {/* Initial metrics (optional) */}
          <div style={{
            background: 'var(--adm-accent-dim)',
            border: '1px solid var(--adm-border)',
            borderRadius: 'var(--adm-radius-sm)',
            padding: '14px 16px',
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--adm-accent)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📊 Initial Metrics (optional)
            </div>
            <div className="adm-input-row">
              <div className="adm-form-group">
                <label style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginBottom: 4, display: 'block' }}>Impressions</label>
                <input type="number" className="adm-input" value={form.impressions} min={0}
                  onChange={e => setForm(prev => ({ ...prev, impressions: +e.target.value }))} />
              </div>
              <div className="adm-form-group">
                <label style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginBottom: 4, display: 'block' }}>CTR (%)</label>
                <input type="number" className="adm-input" value={form.ctr} min={0} step={0.1}
                  onChange={e => setForm(prev => ({ ...prev, ctr: +e.target.value }))} />
              </div>
              <div className="adm-form-group">
                <label style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginBottom: 4, display: 'block' }}>Leads</label>
                <input type="number" className="adm-input" value={form.leads} min={0}
                  onChange={e => setForm(prev => ({ ...prev, leads: +e.target.value }))} />
              </div>
              <div className="adm-form-group">
                <label style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginBottom: 4, display: 'block' }}>ROI (x)</label>
                <input type="number" className="adm-input" value={form.roi} min={0} step={0.1}
                  onChange={e => setForm(prev => ({ ...prev, roi: +e.target.value }))} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button
              type="button"
              className="adm-btn adm-btn-ghost"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </button>
            <button type="submit" className="adm-btn adm-btn-primary">
              🚀 Launch Campaign
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
