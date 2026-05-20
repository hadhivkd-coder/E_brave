import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

export default function Integrations() {
  const { showToast } = useNotifications();
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [apiKeyModal, setApiKeyModal] = useState(false);
  const [guideTab, setGuideTab] = useState('sheets');
  const [integrationsList, setIntegrationsList] = useState([
    { id: 'ga4', name: 'Google Analytics 4', category: 'Analytics', status: 'Connected', desc: 'Monitor visitor counts, landing page bounce levels, and session metrics.', icon: '📈' },
    { id: 'sheets', name: 'Google Sheets Lead Sync', category: 'Spreadsheets', status: 'Connected', desc: 'Export leads automatically to a target Google Sheet, or ingest leads from spreadsheet rows.', icon: '📊' },
    { id: 'meta', name: 'Meta Advertising Pixel', category: 'Ads', status: 'Connected', desc: 'Track retargeting audiences and track ad conversions from Instagram reels.', icon: '🎯' },
    { id: 'meta-leads', name: 'Meta Leads Sync', category: 'Ads', status: 'Connected', desc: 'Ingest leads from Facebook and Instagram Lead Forms directly into EOS in real-time.', icon: '⚡' },
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

      {/* Integration Guide Section */}
      <div className="adm-card" style={{ marginTop: 32, padding: 24 }}>
        <h3 className="adm-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.05rem', fontWeight: 700, color: 'var(--adm-accent)' }}>
          🔌 Active Connection Guides
        </h3>
        <p className="adm-card-subtitle" style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginBottom: 20 }}>
          Follow these technical instructions to connect external sources (Google Sheets and Meta Ads) to E-Brave EOS.
        </p>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid var(--adm-border)', paddingBottom: 12, marginBottom: 20 }}>
          <button
            onClick={() => setGuideTab('sheets')}
            style={{
              background: guideTab === 'sheets' ? 'rgba(15, 76, 58, 0.08)' : 'none',
              color: 'var(--adm-accent)',
              border: guideTab === 'sheets' ? '1px solid var(--adm-accent)' : '1px solid transparent',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            📊 Google Sheets Sync Guide
          </button>
          <button
            onClick={() => setGuideTab('meta')}
            style={{
              background: guideTab === 'meta' ? 'rgba(15, 76, 58, 0.08)' : 'none',
              color: 'var(--adm-accent)',
              border: guideTab === 'meta' ? '1px solid var(--adm-accent)' : '1px solid transparent',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            ⚡ Meta Ads Leads Guide
          </button>
        </div>

        {/* Tab Content */}
        {guideTab === 'sheets' ? (
          <div style={{ lineHeight: 1.6, fontSize: '13px' }}>
            <h4 style={{ color: 'var(--adm-accent)', marginBottom: 8, fontSize: '14px', fontWeight: 700 }}>Option A: Direct Google Sheets ➔ EOS (Via Webhook URL)</h4>
            <p style={{ color: 'var(--adm-text-secondary)', marginBottom: 12 }}>
              If you collect leads inside a Google Sheet, you can instantly sync them to EOS in real-time by adding a simple Google Apps Script.
            </p>
            <ol style={{ paddingLeft: 20, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Open your Google Sheet, click <strong>Extensions</strong>, and select <strong>Apps Script</strong>.</li>
              <li>Paste the code snippet below into the editor:</li>
            </ol>
            <pre 
              style={{
                background: 'var(--adm-bg)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--adm-border)',
                fontFamily: 'monospace',
                fontSize: '11px',
                overflowX: 'auto',
                marginBottom: 16,
                color: 'var(--adm-accent)'
              }}
            >
{`function syncLeadToEbrave(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = sheet.getLastRow();
  
  // Extract values (modify indices based on your sheet columns)
  var leadData = {
    name: sheet.getRange(row, 1).getValue(), // Column A: Name
    phone: sheet.getRange(row, 2).getValue().toString(), // Column B: Phone
    email: sheet.getRange(row, 3).getValue(), // Column C: Email
    education: sheet.getRange(row, 4).getValue(), // Column D: Course Interest
    source: "Google Sheet Import"
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer YOUR_CLIENT_API_KEY_HERE"
    },
    payload: JSON.stringify(leadData),
    muteHttpExceptions: true
  };

  // Ingest API Webhook endpoint
  UrlFetchApp.fetch("https://ebrave.in/api/leads/webhook", options);
}`}
            </pre>
            <ol style={{ paddingLeft: 20, start: 3, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Replace <code>YOUR_CLIENT_API_KEY_HERE</code> with one of your active Bearer Keys from the Stored Authorization Keys list above.</li>
              <li>Add an <strong>On Edit</strong> or <strong>On Form Submit</strong> installable trigger in Apps Script to run this function automatically whenever a row is appended.</li>
            </ol>
          </div>
        ) : (
          <div style={{ lineHeight: 1.6, fontSize: '13px' }}>
            <h4 style={{ color: 'var(--adm-accent)', marginBottom: 8, fontSize: '14px', fontWeight: 700 }}>Option A: Facebook Lead Ads ➔ EOS (Via Zapier Integration)</h4>
            <p style={{ color: 'var(--adm-text-secondary)', marginBottom: 12 }}>
              Connecting your Facebook/Instagram Lead Forms to the E-Brave system takes less than 3 minutes using Zapier:
            </p>
            <ul style={{ paddingLeft: 20, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8, listStyleType: 'disc' }}>
              <li><strong>Trigger:</strong> Choose <strong>Facebook Lead Ads</strong> (Event: <em>New Lead</em>).</li>
              <li><strong>Action:</strong> Choose <strong>Webhooks by Zapier</strong> (Event: <em>POST Request</em>).</li>
              <li><strong>URL Endpoint:</strong> <code>https://ebrave.in/api/leads/webhook</code></li>
              <li><strong>Payload Data Format:</strong> JSON</li>
              <li><strong>Parameters to Map:</strong>
                <ul style={{ paddingLeft: 20, marginTop: 4, listStyleType: 'circle' }}>
                  <li><code>name</code> ➔ Full Name value from form</li>
                  <li><code>phone</code> ➔ Phone Number value from form</li>
                  <li><code>email</code> ➔ Email value from form</li>
                  <li><code>source</code> ➔ <code>Meta Ads (Instagram Form)</code></li>
                </ul>
              </li>
              <li><strong>Headers:</strong> Set header key <code>Authorization</code> to <code>Bearer YOUR_CLIENT_API_KEY_HERE</code> (copy a token from the table above).</li>
            </ul>

            <h4 style={{ color: 'var(--adm-accent)', marginBottom: 8, fontSize: '14px', fontWeight: 700, marginTop: 24 }}>Option B: Meta Conversion Pixel Setup</h4>
            <p style={{ color: 'var(--adm-text-secondary)', marginBottom: 12 }}>
              Add our Meta Conversion pixel code on the landing page thank-you screens. Since the landing page communicates directly with the EOS API, conversion events are tracked automatically. Ensure the Meta pixel script has <code>fbq('track', 'Lead');</code> triggered inside the form submit handler.
            </p>
          </div>
        )}
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
