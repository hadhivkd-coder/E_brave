import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

const CATEGORY_META = {
  'Analytics':    { color: '#6366f1', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)'  },
  'Ads':          { color: '#e11d48', bg: 'rgba(225,29,72,0.08)',   border: 'rgba(225,29,72,0.2)'   },
  'Messaging':    { color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
  'Webinars':     { color: '#2563eb', bg: 'rgba(37,99,235,0.08)',   border: 'rgba(37,99,235,0.2)'   },
  'Finance':      { color: '#d97706', bg: 'rgba(217,119,6,0.08)',   border: 'rgba(217,119,6,0.2)'   },
  'Spreadsheets': { color: '#0f4c3a', bg: 'rgba(15,76,58,0.08)',    border: 'rgba(15,76,58,0.2)'    },
};

export default function Integrations() {
  const { showToast } = useNotifications();
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [apiKeyModal, setApiKeyModal]   = useState(false);
  const [guideTab, setGuideTab]         = useState('sheets');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [newKeyName, setNewKeyName]     = useState('');

  const [integrationsList, setIntegrationsList] = useState([
    { id: 'ga4',        name: 'Google Analytics 4',       category: 'Analytics',    status: 'Connected',    desc: 'Monitor visitor counts, landing page bounce levels, and session metrics.',                         icon: '📈', lastSync: '2 min ago'  },
    { id: 'sheets',     name: 'Google Sheets Lead Sync',  category: 'Spreadsheets', status: 'Connected',    desc: 'Export leads automatically to a target Google Sheet, or ingest leads from spreadsheet rows.',      icon: '📊', lastSync: '5 min ago'  },
    { id: 'meta',       name: 'Meta Advertising Pixel',   category: 'Ads',          status: 'Connected',    desc: 'Track retargeting audiences and ad conversions from Instagram reels.',                            icon: '🎯', lastSync: '1 min ago'  },
    { id: 'meta-leads', name: 'Meta Leads Sync',          category: 'Ads',          status: 'Connected',    desc: 'Ingest leads from Facebook and Instagram Lead Forms directly into EOS in real-time.',             icon: '⚡', lastSync: '10 min ago' },
    { id: 'clarity',    name: 'Microsoft Clarity',        category: 'Analytics',    status: 'Connected',    desc: 'Heatmaps and session recordings to audit UX drop-off on forms.',                                  icon: '🌐', lastSync: '1 hr ago'   },
    { id: 'whatsapp',   name: 'WhatsApp Business API',    category: 'Messaging',    status: 'Disconnected', desc: 'Trigger automated registration notices and counselor alerts via WhatsApp.',                       icon: '💬', lastSync: null         },
    { id: 'zoom',       name: 'Zoom Webinars Portal',     category: 'Webinars',     status: 'Disconnected', desc: 'Auto-schedule webinars and import live attendees list into EOS.',                                 icon: '🎥', lastSync: null         },
    { id: 'razorpay',   name: 'Razorpay Gateway',         category: 'Finance',      status: 'Disconnected', desc: 'Receive student counseling program enrollment payments securely.',                                icon: '💳', lastSync: null         },
  ]);

  const [apiKeys, setApiKeys] = useState([
    { id: 'k1', name: 'EOS AI Website Client',    key: 'eb_live_88f921a9a83...4b9', created: '2026-03-01', lastUsed: 'Just now'   },
    { id: 'k2', name: 'Meta Ad attribution sync', key: 'eb_live_55a29c1e0b1...811', created: '2026-04-12', lastUsed: '5 mins ago' },
  ]);

  const handleToggle = (id) => {
    setIntegrationsList(prev => prev.map(item => {
      if (item.id === id) {
        const next = item.status === 'Connected' ? 'Disconnected' : 'Connected';
        showToast(`${item.name} → ${next}`, 'info');
        return { ...item, status: next, lastSync: next === 'Connected' ? 'Just now' : null };
      }
      return item;
    }));
  };

  const handleDeleteKey = (id) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    showToast('API key revoked', 'warning');
  };

  const filtered = categoryFilter === 'All'
    ? integrationsList
    : integrationsList.filter(i => i.category === categoryFilter);

  const connectedCount    = integrationsList.filter(i => i.status === 'Connected').length;
  const disconnectedCount = integrationsList.filter(i => i.status === 'Disconnected').length;
  const categories        = [...new Set(integrationsList.map(i => i.category))];

  return (
    <AdminLayout title="Integrations">
      {/* ── Header ─────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 className="adm-page-title" style={{ margin: '0 0 4px 0' }}>Integrations & API Portal</h1>
          <p className="adm-page-subtitle" style={{ margin: 0 }}>Manage tracking scripts, messaging gateways, payment providers, and API tokens</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setApiKeyModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '1.1rem' }}>+</span> Generate API Key
        </button>
      </div>

      {/* ── Stats ───────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Connected',     value: connectedCount,    icon: '✅', color: '#10b981' },
          { label: 'Disconnected',  value: disconnectedCount, icon: '⭕', color: '#6b7280' },
          { label: 'API Keys',      value: apiKeys.length,   icon: '🔑', color: '#d97706' },
        ].map(s => (
          <div key={s.label} className="adm-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--adm-border)' }}>
            <div style={{ fontSize: '1.4rem', lineHeight: 1 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--adm-text-secondary)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Category Filter ──────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Category:</span>
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{
              padding: '5px 14px', border: categoryFilter === cat ? 'none' : '1px solid var(--adm-border)',
              borderRadius: 20, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, transition: 'all 0.18s',
              background: categoryFilter === cat ? 'var(--adm-accent)' : 'var(--adm-bg)',
              color: categoryFilter === cat ? '#fff' : 'var(--adm-text-secondary)'
            }}
          >{cat}</button>
        ))}
      </div>

      {/* ── Integration Cards Grid ───────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
        {filtered.map(int => {
          const cat       = CATEGORY_META[int.category] || CATEGORY_META['Analytics'];
          const connected = int.status === 'Connected';
          return (
            <div
              key={int.id}
              className="adm-card"
              style={{
                padding: 0, border: '1px solid var(--adm-border)', borderRadius: 14, overflow: 'hidden',
                boxShadow: 'var(--adm-shadow)', transition: 'box-shadow 0.2s, transform 0.2s',
                opacity: connected ? 1 : 0.8,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--adm-shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--adm-shadow)';    e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Top bar */}
              <div style={{ height: 3, background: connected ? cat.color : '#d1d5db' }} />

              <div style={{ padding: '18px 18px 14px 18px' }}>
                {/* Icon + Toggle row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: cat.bg, border: `1px solid ${cat.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                    {int.icon}
                  </div>
                  {/* iOS Toggle */}
                  <div
                    onClick={() => handleToggle(int.id)}
                    style={{
                      width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                      background: connected ? 'var(--adm-accent)' : '#d1d5db',
                      position: 'relative', transition: 'background 0.25s', flexShrink: 0
                    }}
                    title={connected ? 'Click to disconnect' : 'Click to connect'}
                  >
                    <div style={{
                      position: 'absolute', top: 3, left: connected ? 23 : 3,
                      width: 18, height: 18, borderRadius: '50%', background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s'
                    }} />
                  </div>
                </div>

                {/* Name + Category */}
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--adm-text)', marginBottom: 4 }}>{int.name}</div>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '2px 8px', borderRadius: 20, background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
                    {int.category}
                  </span>
                </div>

                {/* Description */}
                <p style={{ margin: '8px 0 12px 0', fontSize: '0.77rem', color: 'var(--adm-text-secondary)', lineHeight: 1.5 }}>
                  {int.desc}
                </p>

                {/* Status + Last sync */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 800, padding: '3px 9px', borderRadius: 20,
                    background: connected ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)',
                    color: connected ? '#10b981' : '#6b7280',
                    border: `1px solid ${connected ? 'rgba(16,185,129,0.25)' : 'rgba(107,114,128,0.2)'}`
                  }}>
                    {connected ? '● Connected' : '○ Disconnected'}
                  </span>
                  {int.lastSync && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--adm-text-secondary)' }}>🕐 {int.lastSync}</span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '10px 14px', borderTop: '1px solid var(--adm-border)', background: 'var(--adm-bg)', display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setSelectedIntegration(int)}
                  style={{ flex: 1, padding: '6px', border: `1px solid ${cat.border}`, borderRadius: 7, background: cat.bg, color: cat.color, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  ⚙️ Configure
                </button>
                {!connected && (
                  <button
                    onClick={() => handleToggle(int.id)}
                    style={{ flex: 1, padding: '6px', border: 'none', borderRadius: 7, background: 'var(--adm-accent)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    🔌 Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── API Keys Section ─────────────────────────── */}
      <div className="adm-card" style={{ border: '1px solid var(--adm-border)', marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--adm-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--adm-text)' }}>🔑 Authorization API Keys</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>Bearer tokens used by external components to dispatch leads to EOS</p>
          </div>
          <button className="adm-btn adm-btn-ghost" onClick={() => setApiKeyModal(true)} style={{ fontSize: '0.8rem' }}>+ New Key</button>
        </div>

        <div style={{ padding: '8px 0' }}>
          {apiKeys.map(key => (
            <div
              key={key.id}
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: '1px solid var(--adm-border-light)' }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                🔑
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--adm-text)', marginBottom: 3 }}>{key.name}</div>
                <code style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)', background: 'var(--adm-bg)', padding: '2px 8px', borderRadius: 5, border: '1px solid var(--adm-border)', fontFamily: 'monospace' }}>
                  {key.key}
                </code>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Created {key.created}</div>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600, marginTop: 2 }}>● Last used: {key.lastUsed}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => { navigator.clipboard.writeText(key.key); showToast('Copied to clipboard', 'success'); }}
                  style={{ padding: '5px 10px', border: '1px solid var(--adm-border)', borderRadius: 6, background: 'var(--adm-bg)', color: 'var(--adm-accent)', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  📋 Copy
                </button>
                <button
                  onClick={() => handleDeleteKey(key.id)}
                  style={{ padding: '5px 10px', border: '1px solid rgba(225,29,72,0.2)', borderRadius: 6, background: 'rgba(225,29,72,0.06)', color: '#e11d48', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Connection Guides ────────────────────────── */}
      <div className="adm-card" style={{ border: '1px solid var(--adm-border)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--adm-border)' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: 'var(--adm-text)' }}>🔌 Integration Guides</h3>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>Step-by-step instructions to connect external sources to EOS</p>
        </div>

        {/* Tab Bar */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--adm-border)', background: 'var(--adm-bg)' }}>
          {[
            { id: 'sheets', label: '📊 Google Sheets Sync' },
            { id: 'meta',   label: '⚡ Meta Ads Leads'    },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setGuideTab(tab.id)}
              style={{
                padding: '12px 20px', border: 'none', background: 'transparent', cursor: 'pointer',
                fontSize: '0.82rem', fontWeight: 700, transition: 'all 0.15s',
                color: guideTab === tab.id ? 'var(--adm-accent)' : 'var(--adm-text-secondary)',
                borderBottom: guideTab === tab.id ? '2px solid var(--adm-accent)' : '2px solid transparent',
                marginBottom: -1
              }}
            >{tab.label}</button>
          ))}
        </div>

        <div style={{ padding: '24px 24px', lineHeight: 1.7, fontSize: '0.84rem', color: 'var(--adm-text)' }}>
          {guideTab === 'sheets' ? (
            <>
              <h4 style={{ color: 'var(--adm-accent)', marginBottom: 8, fontSize: '0.92rem', fontWeight: 800 }}>
                Google Sheets → EOS (Via Webhook)
              </h4>
              <p style={{ color: 'var(--adm-text-secondary)', marginBottom: 16 }}>
                Sync leads from a Google Sheet to EOS in real-time using a simple Google Apps Script.
              </p>
              <ol style={{ paddingLeft: 20, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Open your Google Sheet → click <strong>Extensions</strong> → <strong>Apps Script</strong></li>
                <li>Paste the code below into the editor:</li>
              </ol>
              <pre style={{ background: 'var(--adm-bg)', padding: 16, borderRadius: 10, border: '1px solid var(--adm-border)', fontFamily: 'monospace', fontSize: '0.78rem', overflowX: 'auto', marginBottom: 16, color: '#0f4c3a', lineHeight: 1.6 }}>
{`function syncLeadToEbrave(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = sheet.getLastRow();
  var leadData = {
    name:      sheet.getRange(row, 1).getValue(),
    phone:     sheet.getRange(row, 2).getValue().toString(),
    email:     sheet.getRange(row, 3).getValue(),
    education: sheet.getRange(row, 4).getValue(),
    source:    "Google Sheet Import"
  };
  var options = {
    method: "post",
    contentType: "application/json",
    headers: { "Authorization": "Bearer YOUR_API_KEY_HERE" },
    payload: JSON.stringify(leadData),
    muteHttpExceptions: true
  };
  UrlFetchApp.fetch("https://ebrave.in/api/leads/webhook", options);
}`}
              </pre>
              <ol start={3} style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Replace <code style={{ background: 'var(--adm-bg)', padding: '1px 6px', borderRadius: 4, border: '1px solid var(--adm-border)' }}>YOUR_API_KEY_HERE</code> with a Bearer Key from the table above.</li>
                <li>Add an <strong>On Form Submit</strong> trigger to run this function automatically.</li>
              </ol>
            </>
          ) : (
            <>
              <h4 style={{ color: 'var(--adm-accent)', marginBottom: 8, fontSize: '0.92rem', fontWeight: 800 }}>
                Facebook Lead Ads → EOS (Via Zapier)
              </h4>
              <p style={{ color: 'var(--adm-text-secondary)', marginBottom: 16 }}>
                Connect your Facebook/Instagram Lead Forms to EOS in under 3 minutes using Zapier:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {[
                  { step: '1', label: 'Trigger', value: 'Facebook Lead Ads → New Lead' },
                  { step: '2', label: 'Action',  value: 'Webhooks by Zapier → POST Request' },
                  { step: '3', label: 'URL',     value: 'https://ebrave.in/api/leads/webhook' },
                  { step: '4', label: 'Format',  value: 'JSON payload' },
                  { step: '5', label: 'Auth',    value: 'Header: Authorization: Bearer YOUR_API_KEY' },
                ].map(s => (
                  <div key={s.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--adm-accent)', color: '#fff', fontSize: '0.68rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{s.step}</div>
                    <div>
                      <span style={{ fontWeight: 700, color: 'var(--adm-accent)', fontSize: '0.8rem' }}>{s.label}:</span>{' '}
                      <span style={{ color: 'var(--adm-text)', fontSize: '0.8rem' }}>{s.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <h4 style={{ color: 'var(--adm-accent)', marginBottom: 8, fontSize: '0.92rem', fontWeight: 800 }}>
                Fields to Map
              </h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['name', 'phone', 'email', 'source'].map(field => (
                  <code key={field} style={{ background: 'var(--adm-bg)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--adm-border)', fontSize: '0.78rem', color: '#0f4c3a', fontFamily: 'monospace' }}>
                    {field}
                  </code>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Configure Modal ──────────────────────────── */}
      <Modal isOpen={!!selectedIntegration} onClose={() => setSelectedIntegration(null)} title={`Configure — ${selectedIntegration?.name || ''}`} size="md">
        <div className="adm-form-stack">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--adm-bg)', borderRadius: 10, border: '1px solid var(--adm-border)', marginBottom: 16 }}>
            <span style={{ fontSize: '1.8rem' }}>{selectedIntegration?.icon}</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--adm-text)' }}>{selectedIntegration?.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>{selectedIntegration?.category}</div>
            </div>
          </div>
          <div className="adm-form-group">
            <label>API Key / Client Secret Token</label>
            <input type="password" placeholder="••••••••••••••••••••••••••••••••" className="adm-input" />
          </div>
          <div className="adm-form-group">
            <label>Workspace / Tracking ID</label>
            <input type="text" placeholder="e.g. WH-99120-1" className="adm-input" />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="adm-btn adm-btn-ghost" onClick={() => setSelectedIntegration(null)}>Cancel</button>
            <button className="adm-btn adm-btn-primary" onClick={() => { setSelectedIntegration(null); showToast('API credentials saved', 'success'); }}>
              Save Credentials
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Generate API Key Modal ───────────────────── */}
      <Modal isOpen={apiKeyModal} onClose={() => setApiKeyModal(false)} title="Generate API Key" size="sm">
        <div className="adm-form-stack">
          <div className="adm-form-group">
            <label>Key Name / Purpose <span style={{ color: 'var(--adm-red)' }}>*</span></label>
            <input
              type="text"
              className="adm-input"
              placeholder="e.g. WordPress Landing Page Form"
              value={newKeyName}
              onChange={e => setNewKeyName(e.target.value)}
            />
            <p style={{ fontSize: '0.72rem', color: 'var(--adm-text-secondary)', marginTop: 6 }}>
              Give this key a descriptive name so you can identify it later.
            </p>
          </div>
          <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 9, padding: '12px 14px', fontSize: '0.78rem', color: '#92400e' }}>
            ⚠️ <strong>Keep this key secure.</strong> It grants write access to your EOS lead database.
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="adm-btn adm-btn-ghost" onClick={() => setApiKeyModal(false)}>Cancel</button>
            <button
              className="adm-btn adm-btn-primary"
              onClick={() => {
                if (!newKeyName.trim()) return;
                setApiKeys(prev => [...prev, {
                  id: `k_${Date.now()}`,
                  name: newKeyName.trim(),
                  key: `eb_live_${Math.random().toString(16).slice(2, 14)}...${Math.random().toString(16).slice(2, 5)}`,
                  created: new Date().toISOString().split('T')[0],
                  lastUsed: 'Never'
                }]);
                setNewKeyName('');
                setApiKeyModal(false);
                showToast('New API key generated ✅', 'success');
              }}
            >
              🔑 Generate Token
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
