import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';

export default function Settings() {
  const { showToast } = useNotifications();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    orgName: 'E-Brave Education',
    email: 'contact@ebrave.in',
    whatsapp: '+91 98765 43210',
    timezone: 'IST (UTC+5:30)',
    primaryColor: '#6366f1',
    accentColor: '#10b981',
    notifications: {
      newLead: { inApp: true, email: true, whatsapp: false },
      missedFollowup: { inApp: true, email: true, whatsapp: true },
      webinarReg: { inApp: true, email: false, whatsapp: false },
      systemErrors: { inApp: true, email: true, whatsapp: true },
      aiAlerts: { inApp: true, email: false, whatsapp: false }
    },
    ai: {
      enabled: true,
      style: 'Detailed',
      frequency: 'Daily',
      autoReports: true
    },
    security: {
      timeout: 30,
      twoFactor: false
    }
  });

  const handleSave = () => {
    showToast('Settings saved successfully', 'success');
  };

  const handleToggleNotif = (key, type) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: {
          ...prev.notifications[key],
          [type]: !prev.notifications[key][type]
        }
      }
    }));
  };

  return (
    <AdminLayout title="Settings">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">System Settings</h1>
          <p className="adm-page-subtitle">Configure system options, branding, alerts, and security profiles</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={handleSave}>Save Changes</button>
      </div>

      <div className="adm-settings-container">
        <div className="adm-settings-sidebar">
          {[
            { id: 'general', label: 'General Info', icon: '⚙️' },
            { id: 'branding', label: 'Branding & Themes', icon: '🎨' },
            { id: 'notifications', label: 'Alert Preferences', icon: '🔔' },
            { id: 'ai', label: 'AI Settings', icon: '🤖' },
            { id: 'security', label: 'Security & Access', icon: '🔒' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`adm-settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="adm-settings-content adm-card">
          {activeTab === 'general' && (
            <div className="adm-form-stack">
              <h3 className="adm-settings-section-title">General Information</h3>
              <div className="adm-form-group">
                <label>Organization Name</label>
                <input
                  className="adm-input"
                  value={settings.orgName}
                  onChange={e => setSettings(prev => ({ ...prev, orgName: e.target.value }))}
                />
              </div>
              <div className="adm-input-row">
                <div className="adm-form-group">
                  <label>Operational Email</label>
                  <input
                    type="email"
                    className="adm-input"
                    value={settings.email}
                    onChange={e => setSettings(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="adm-form-group">
                  <label>Official WhatsApp Business No.</label>
                  <input
                    className="adm-input"
                    value={settings.whatsapp}
                    onChange={e => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                </div>
              </div>
              <div className="adm-form-group">
                <label>Default Timezone</label>
                <select
                  className="adm-select"
                  value={settings.timezone}
                  onChange={e => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                >
                  <option>IST (UTC+5:30)</option>
                  <option>GMT (UTC+0:00)</option>
                  <option>EST (UTC-5:00)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="adm-form-stack">
              <h3 className="adm-settings-section-title">Branding Configurations</h3>
              <div className="adm-input-row">
                <div className="adm-form-group">
                  <label>Primary Theme Color</label>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input
                      type="color"
                      className="adm-color-input"
                      value={settings.primaryColor}
                      onChange={e => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                    />
                    <input
                      className="adm-input"
                      value={settings.primaryColor}
                      onChange={e => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      style={{ width: 120 }}
                    />
                  </div>
                </div>
                <div className="adm-form-group">
                  <label>Accent Success Color</label>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input
                      type="color"
                      className="adm-color-input"
                      value={settings.accentColor}
                      onChange={e => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                    />
                    <input
                      className="adm-input"
                      value={settings.accentColor}
                      onChange={e => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      style={{ width: 120 }}
                    />
                  </div>
                </div>
              </div>
              <div className="adm-form-group">
                <label>Dashboard Layout Theme</label>
                <select className="adm-select" defaultValue="dark">
                  <option value="dark">Linear Dark Mode (Recommended)</option>
                  <option value="light">Classic Light Mode</option>
                  <option value="amoled">Amoled Pitch Black</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="adm-form-stack">
              <h3 className="adm-settings-section-title">Notification Settings</h3>
              <p className="adm-td-sub" style={{ marginBottom: 16 }}>Configure which alerts are triggered on which communication channels.</p>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Alert Category</th>
                      <th style={{ textAlign: 'center' }}>In-App Toast</th>
                      <th style={{ textAlign: 'center' }}>Email Report</th>
                      <th style={{ textAlign: 'center' }}>WhatsApp Alert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(settings.notifications).map(([key, config]) => (
                      <tr key={key}>
                        <td className="adm-td-name">
                          {key === 'newLead' ? '🆕 New Lead Registered' :
                           key === 'missedFollowup' ? '⏰ Overdue Counselor Follow-up' :
                           key === 'webinarReg' ? '🎬 New Webinar Enrollment' :
                           key === 'systemErrors' ? '⚠️ System Web Hook Errors' :
                           '🤖 EOS AI Analysis Insight Tips'}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={config.inApp}
                            onChange={() => handleToggleNotif(key, 'inApp')}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={config.email}
                            onChange={() => handleToggleNotif(key, 'email')}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={config.whatsapp}
                            onChange={() => handleToggleNotif(key, 'whatsapp')}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="adm-form-stack">
              <h3 className="adm-settings-section-title">EOS AI System Configurations</h3>
              <div className="adm-form-group">
                <label className="adm-toggle" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={settings.ai.enabled}
                    onChange={e => setSettings(prev => ({ ...prev, ai: { ...prev.ai, enabled: e.target.checked } }))}
                  />
                  <span className="adm-toggle-slider" />
                  <span>Enable EOS AI engine assistance</span>
                </label>
              </div>
              <div className="adm-input-row">
                <div className="adm-form-group">
                  <label>Response Style Preference</label>
                  <select
                    className="adm-select"
                    value={settings.ai.style}
                    onChange={e => setSettings(prev => ({ ...prev, ai: { ...prev.ai, style: e.target.value } }))}
                  >
                    <option>Detailed & Actionable</option>
                    <option>Concise Summary</option>
                    <option>Technical Metric Breakdown</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Automated Insight Auditing</label>
                  <select
                    className="adm-select"
                    value={settings.ai.frequency}
                    onChange={e => setSettings(prev => ({ ...prev, ai: { ...prev.ai, frequency: e.target.value } }))}
                  >
                    <option>Real-Time</option>
                    <option>Hourly</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>
              <div className="adm-form-group">
                <label className="adm-toggle" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={settings.ai.autoReports}
                    onChange={e => setSettings(prev => ({ ...prev, ai: { ...prev.ai, autoReports: e.target.checked } }))}
                  />
                  <span className="adm-toggle-slider" />
                  <span>Auto-generate weekly insights report summaries</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="adm-form-stack">
              <h3 className="adm-settings-section-title">Access & Security Settings</h3>
              <div className="adm-form-group">
                <label>Automatic Session Timeout (minutes)</label>
                <input
                  type="number"
                  className="adm-input"
                  value={settings.security.timeout}
                  onChange={e => setSettings(prev => ({ ...prev, security: { ...prev.security, timeout: +e.target.value } }))}
                />
              </div>
              <div className="adm-form-group">
                <label className="adm-toggle" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactor}
                    onChange={e => setSettings(prev => ({ ...prev, security: { ...prev.security, twoFactor: e.target.checked } }))}
                  />
                  <span className="adm-toggle-slider" />
                  <span>Enforce Multi-Factor (MFA) on manager login</span>
                </label>
              </div>
              <div className="adm-detail-section">
                <label className="adm-detail-label">Active Login Sessions</label>
                <div className="adm-table-wrap" style={{ marginTop: 8 }}>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Access Date</th>
                        <th>IP Address</th>
                        <th>Device/Agent</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Today, 10:20 AM</td>
                        <td>192.168.1.1</td>
                        <td>Chrome on Windows 11</td>
                        <td><Badge variant="green" size="sm">Current Session</Badge></td>
                      </tr>
                      <tr>
                        <td>Yesterday, 04:30 PM</td>
                        <td>103.88.22.41</td>
                        <td>Safari on iPhone 15</td>
                        <td><Badge variant="gray" size="sm">Expired</Badge></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
