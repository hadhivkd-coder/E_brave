import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

export default function Campaigns() {
  const { showToast } = useNotifications();
  const [showAdd, setShowAdd] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { id: 'c1', name: 'Engineering Career 2026 Reel Ad', platform: 'Instagram', status: 'Active', spend: 15000, maxBudget: 20000, impressions: 48000, clicks: 2400, ctr: 5, leads: 28, costPerLead: 535, roi: 3.2, start: '2026-05-01', end: '2026-05-31' },
    { id: 'c2', name: 'Medical Counselling Lead Gen Form', platform: 'Facebook', status: 'Active', spend: 12000, maxBudget: 15000, impressions: 35000, clicks: 1750, ctr: 5, leads: 19, costPerLead: 631, roi: 2.5, start: '2026-05-05', end: '2026-05-25' },
    { id: 'c3', name: 'Stream Selection Webinar Promo', platform: 'Google Ads', status: 'Paused', spend: 8000, maxBudget: 10000, impressions: 22000, clicks: 880, ctr: 4, leads: 12, costPerLead: 666, roi: 1.8, start: '2026-05-10', end: '2026-05-20' },
    { id: 'c4', name: 'UX/UI Design Workshop Retargeting', platform: 'Instagram', status: 'Completed', spend: 5000, maxBudget: 5000, impressions: 18000, clicks: 720, ctr: 4, leads: 8, costPerLead: 625, roi: 4.1, start: '2026-04-20', end: '2026-04-30' },
    { id: 'c5', name: 'CA Foundation Guidance search ads', platform: 'Google Ads', status: 'Active', spend: 10000, maxBudget: 15000, impressions: 25000, clicks: 1100, ctr: 4.4, leads: 15, costPerLead: 666, roi: 2.1, start: '2026-05-01', end: '2026-05-28' }
  ]);

  const [form, setForm] = useState({ name: '', platform: 'Instagram', status: 'Active', spend: 0, maxBudget: 10000, impressions: 0, clicks: 0, ctr: 0, leads: 0, costPerLead: 0, roi: 1.0, start: '', end: '' });

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const avgCpl = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 0;
  const bestRoi = Math.max(...campaigns.map(c => c.roi));

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
    showToast('Ad campaign added successfully', 'success');
  };

  return (
    <AdminLayout title="Ads & Campaigns">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Ads & Campaigns Dashboard</h1>
          <p className="adm-page-subtitle">Track lead generation costs, ad CTR performance, and enrollment ROI per platform</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setShowAdd(true)}>+ Add Ad Campaign</button>
      </div>

      {/* Analytics Summary */}
      <div className="adm-metrics-grid adm-metrics-grid-4">
        {[
          { label: 'Total Paid Spend', value: `₹${totalSpend.toLocaleString()}`, icon: '💸', color: '#6366f1' },
          { label: 'Leads generated', value: totalLeads, icon: '🎯', color: '#10b981' },
          { label: 'Cost Per Lead (CPL)', value: `₹${avgCpl}`, icon: '📊', color: '#f59e0b' },
          { label: 'Best Campaign ROI', value: `${bestRoi}x`, icon: '📈', color: '#3b82f6' }
        ].map(s => (
          <div key={s.label} className="adm-card adm-stat-mini">
            <div className="adm-stat-mini-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="adm-stat-mini-value" style={{ color: s.color }}>{s.value}</div>
            <div className="adm-stat-mini-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div className="adm-webinar-grid">
        {campaigns.map(c => {
          const spendProgress = Math.round((c.spend / c.maxBudget) * 100);
          return (
            <div key={c.id} className="adm-webinar-card">
              <div className="adm-webinar-card-header">
                <div>
                  <h3 className="adm-webinar-title">{c.name}</h3>
                  <span className="adm-badge adm-badge-sm" style={{ background: 'rgba(255,255,255,0.05)', color: '#a1a1aa' }}>
                    {c.platform}
                  </span>
                </div>
                <Badge variant={c.status === 'Active' ? 'green' : c.status === 'Completed' ? 'blue' : 'gray'}>
                  {c.status}
                </Badge>
              </div>

              <div style={{ margin: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.85rem' }}>
                  <span className="adm-td-sub">Ad Spend (₹{c.spend.toLocaleString()} / ₹{c.maxBudget.toLocaleString()})</span>
                  <span className="adm-td-sub">{spendProgress}%</span>
                </div>
                <div className="adm-progress-track">
                  <div className="adm-progress-bar" style={{ width: `${spendProgress}%` }} />
                </div>
              </div>

              <div className="adm-webinar-stats-row">
                <div className="adm-webinar-stat">
                  <span className="adm-webinar-stat-val">{c.impressions?.toLocaleString()}</span>
                  <span className="adm-webinar-stat-label">Impressions</span>
                </div>
                <div className="adm-webinar-stat">
                  <span className="adm-webinar-stat-val">{c.ctr}%</span>
                  <span className="adm-webinar-stat-label">CTR</span>
                </div>
                <div className="adm-webinar-stat">
                  <span className="adm-webinar-stat-val">{c.leads}</span>
                  <span className="adm-webinar-stat-label">Leads</span>
                </div>
                <div className="adm-webinar-stat">
                  <span className="adm-webinar-stat-val adm-text-green">₹{c.costPerLead}</span>
                  <span className="adm-webinar-stat-label">CPL</span>
                </div>
              </div>

              <div className="adm-webinar-footer">
                <span>📈 ROI: <strong>{c.roi}x</strong></span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => handleToggleStatus(c.id)}>
                    {c.status === 'Active' ? 'Pause' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Create Paid Campaign Profile" size="md">
        <form onSubmit={handleAdd} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Campaign Name *</label>
            <input className="adm-input" required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. Google Search CA Guidance 2026" />
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Ad Platform *</label>
              <select className="adm-select" value={form.platform} onChange={e => setForm(prev => ({ ...prev, platform: e.target.value }))}>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Google Ads</option>
                <option>YouTube Ads</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Allocated Budget (₹)</label>
              <input type="number" className="adm-input" value={form.maxBudget} onChange={e => setForm(prev => ({ ...prev, maxBudget: +e.target.value }))} />
            </div>
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Start Date</label>
              <input type="date" className="adm-input" value={form.start} onChange={e => setForm(prev => ({ ...prev, start: e.target.value }))} required />
            </div>
            <div className="adm-form-group">
              <label>End Date</label>
              <input type="date" className="adm-input" value={form.end} onChange={e => setForm(prev => ({ ...prev, end: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Add Campaign Profile</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
