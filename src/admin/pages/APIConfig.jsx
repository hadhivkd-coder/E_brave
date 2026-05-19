import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';

export default function APIConfig() {
  const { showToast } = useNotifications();
  const [webhookUrl, setWebhookUrl] = useState('https://ebrave.in/api/v1/leads-webhook');
  const [webhookSecret, setWebhookSecret] = useState('eb_wh_sec_f982a1...440');
  const [showSecret, setShowSecret] = useState(false);
  const [rateLimit, setRateLimit] = useState(60);

  const handleSave = () => {
    showToast('API Configurations updated', 'success');
  };

  return (
    <AdminLayout title="API Configurations">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">API & Webhook Configurations</h1>
          <p className="adm-page-subtitle">Configure operational API endpoints, request rate limits, and webhook secrets</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={handleSave}>Save Changes</button>
      </div>

      <div className="adm-settings-container" style={{ gridTemplateColumns: '1fr' }}>
        <div className="adm-card adm-form-stack">
          <h3 className="adm-settings-section-title">Webhooks Outgoing Sync</h3>
          <p className="adm-td-sub">Set up webhooks to automatically forward lead status conversions and webinar registration events to external CRM platforms (like Zapier, HubSpot).</p>

          <div className="adm-form-group">
            <label>Payload Destination Webhook URL</label>
            <input
              className="adm-input"
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
              placeholder="https://your-crm-endpoint.com/webhook"
            />
          </div>

          <div className="adm-form-group">
            <label>Webhook Signing Secret (HMAC-SHA256)</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <input
                type={showSecret ? 'text' : 'password'}
                className="adm-input"
                value={webhookSecret}
                onChange={e => setWebhookSecret(e.target.value)}
                style={{ fontFamily: 'monospace' }}
                disabled
              />
              <button
                type="button"
                className="adm-btn adm-btn-ghost"
                onClick={() => setShowSecret(!showSecret)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {showSecret ? 'Hide' : 'Reveal'}
              </button>
            </div>
            <p className="adm-td-sub" style={{ fontSize: '0.75rem', marginTop: 4 }}>Verify the payload authenticity headers using this secret hashing token.</p>
          </div>

          <div className="adm-input-row" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20, marginTop: 12 }}>
            <div className="adm-form-group">
              <label>API Rate Limit (Requests per minute)</label>
              <select className="adm-select" value={rateLimit} onChange={e => setRateLimit(+e.target.value)}>
                <option value={30}>30 requests/min</option>
                <option value={60}>60 requests/min (Standard)</option>
                <option value={120}>120 requests/min (High-Throughput)</option>
                <option value={300}>300 requests/min</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Webhook Status</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 42 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                <span className="adm-td-name" style={{ color: '#10b981' }}>Operational & Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="adm-card" style={{ marginTop: 24 }}>
          <h3 className="adm-card-title">Webhook Payload Event Logs</h3>
          <p className="adm-card-subtitle" style={{ marginBottom: 16 }}>Last 3 dispatch transactions sent to destination URL.</p>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Event Type</th>
                  <th>Payload Preview</th>
                  <th>Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2026-05-19 16:05:12</td>
                  <td><code>lead.converted</code></td>
                  <td><code>{'{ "leadId": "l1", "name": "Aarav Patel"... }'}</code></td>
                  <td><Badge variant="green" size="sm">200 OK</Badge></td>
                </tr>
                <tr>
                  <td>2026-05-19 10:22:45</td>
                  <td><code>webinar.registration</code></td>
                  <td><code>{'{ "webinarId": "w1", "leadId": "l4"... }'}</code></td>
                  <td><Badge variant="green" size="sm">200 OK</Badge></td>
                </tr>
                <tr>
                  <td>2026-05-18 14:20:00</td>
                  <td><code>lead.score_threshold</code></td>
                  <td><code>{'{ "leadId": "l3", "score": 9... }'}</code></td>
                  <td><Badge variant="green" size="sm">200 OK</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
