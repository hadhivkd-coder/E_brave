import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

export default function Integrations() {
  const { showToast } = useNotifications();
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [apiKeyModal, setApiKeyModal] = useState(false);
  const [integrationsList, setIntegrationsList] = useState([
    { id: 'ga4', name: 'Google Analytics 4', category: 'Analytics', status: 'Connected', desc: 'Monitor visitor counts, landing page bounce levels, and session metrics.', icon: '📈' },
    { id: 'meta', name: 'Meta Advertising Pixel', category: 'Ads', status: 'Connected', desc: 'Track retargeting audiences and track ad conversions from Instagram reels.', icon: '🎯' },
    { id: 'clarity', name: 'Microsoft Clarity', category: 'Analytics', status: 'Connected', desc: 'Heatmaps and playback recordings to audit UX dropoff forms.', icon: '🌐' },
    { id: 'whatsapp', name: 'WhatsApp Business API', category: 'Messaging', status: 'Disconnected', desc: 'Trigger automated registration notices and counselor alerts.', icon: '💬' },
    { id: 'zoom', name: 'Zoom Webinars Portal', category: 'Webinars', status: 'Disconnected', desc: 'Auto-schedule webinars and import live attendees list.', icon: '🎥' },
    { id: 'razorpay', name: 'Razorpay Gateway', category: 'Finance', status: 'Disconnected', desc: 'Receive student counseling program enrollment payments.', icon: '💳' },
  ]);

  const [apiKeys, setApiKeys] = useState([
    { id: 'k1', name: 'EOS AI Website Client', key: 'eb_live_88f921a9a83...4b9', created: '2026-03-01', lastUsed: 'Just now' },
    { id: 'k2', name: 'Meta Ad attribution sync', key: 'eb_live_55a29c1e0b1...811', created: '2026-04-12', lastUsed: '5 mins ago' }
  ]);

  const handleToggle = (id) => {
    setIntegrationsList(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Connected' ? 'Disconnected' : 'Connected';
        showToast(`${item.name} status updated to ${nextStatus}`, 'info');
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  return (
    <AdminLayout title="Integrations & API">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Integrations & API Portal</h1>
          <p className="adm-page-subtitle">Manage tracking scripts, notification gateways, payment gateways, and API tokens</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setApiKeyModal(true)}>+ Generate API Key</button>
      </div>

      <div className="adm-integrations-grid">
        {integrationsList.map(int => (
          <div key={int.id} className="adm-card adm-integration-card">
            <div className="adm-integration-header">
              <span style={{ fontSize: '2.5rem' }}>{int.icon}</span>
              <Badge variant={int.status === 'Connected' ? 'green' : 'gray'}>{int.status}</Badge>
            </div>
            <div className="adm-integration-body">
              <h3 className="adm-integration-name">{int.name}</h3>
              <span className="adm-badge adm-badge-sm" style={{ background: 'rgba(255,255,255,0.05)', color: '#a1a1aa', marginBottom: 8, display: 'inline-block' }}>
                {int.category}
              </span>
              <p className="adm-integration-desc">{int.desc}</p>
            </div>
            <div className="adm-integration-actions">
              <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setSelectedIntegration(int)}>Configure</button>
              <button
                className={`adm-btn adm-btn-sm ${int.status === 'Connected' ? 'adm-btn-danger' : 'adm-btn-primary'}`}
                onClick={() => handleToggle(int.id)}
              >
                {int.status === 'Connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* API Keys Table */}
      <div className="adm-card" style={{ marginTop: 32 }}>
        <div className="adm-card-header">
          <h3 className="adm-card-title">Stored Authorization Keys</h3>
          <p className="adm-card-subtitle">Bearer tokens utilized by external components (landing page scripts) to dispatch leads to EOS</p>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Key Identifier Name</th>
                <th>Token Value Prefix</th>
                <th>Created On</th>
                <th>Last Active Use</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map(key => (
                <tr key={key.id}>
                  <td className="adm-td-name">{key.name}</td>
                  <td className="adm-td-sub"><code>{key.key}</code></td>
                  <td>{key.created}</td>
                  <td>{key.lastUsed}</td>
                  <td>
                    <button
                      className="adm-btn adm-btn-ghost adm-btn-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(key.key);
                        showToast('Copied to clipboard', 'success');
                      }}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configure Modal */}
      <Modal isOpen={!!selectedIntegration} onClose={() => setSelectedIntegration(null)} title={selectedIntegration?.name || ''} size="md">
        <div className="adm-form-stack">
          <p className="adm-note-text">Enter authentication credentials for syncing {selectedIntegration?.name}.</p>
          <div className="adm-form-group">
            <label>API Key / Client Secret Token</label>
            <input type="password" placeholder="••••••••••••••••••••••••••••••••" className="adm-input" />
          </div>
          <div className="adm-form-group">
            <label>Workspace / Client Tracking ID</label>
            <input type="text" placeholder="e.g. WH-99120-1" className="adm-input" />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button className="adm-btn adm-btn-ghost" onClick={() => setSelectedIntegration(null)}>Cancel</button>
            <button
              className="adm-btn adm-btn-primary"
              onClick={() => {
                setSelectedIntegration(null);
                showToast('API credentials saved', 'success');
              }}
            >
              Save Credentials
            </button>
          </div>
        </div>
      </Modal>

      {/* Generate API Key Modal */}
      <Modal isOpen={apiKeyModal} onClose={() => setApiKeyModal(false)} title="Generate Client API Key" size="md">
        <div className="adm-form-stack">
          <div className="adm-form-group">
            <label>Client Integration Name *</label>
            <input type="text" placeholder="e.g. Custom WordPress Page Form" className="adm-input" id="key-name-input" />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button className="adm-btn adm-btn-ghost" onClick={() => setApiKeyModal(false)}>Cancel</button>
            <button
              className="adm-btn adm-btn-primary"
              onClick={() => {
                const el = document.getElementById('key-name-input');
                if (el && el.value.trim()) {
                  setApiKeys(prev => [
                    ...prev,
                    {
                      id: `k_${Date.now()}`,
                      name: el.value,
                      key: `eb_live_${Math.random().toString(16).slice(2, 14)}...${Math.random().toString(16).slice(2, 5)}`,
                      created: new Date().toISOString().split('T')[0],
                      lastUsed: 'Never'
                    }
                  ]);
                  setApiKeyModal(false);
                  showToast('Generated client authorization key', 'success');
                }
              }}
            >
              Generate Token
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
