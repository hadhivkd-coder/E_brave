import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNotifications } from '../context/NotificationContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

function WebinarForm({ onSubmit, onClose, existing }) {
  const [form, setForm] = useState(existing || {
    title: '', topic: '', scheduledAt: '', duration: 90,
    price: 0, platform: 'Zoom', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="adm-form-stack">
      <div className="adm-form-group">
        <label>Webinar Title *</label>
        <input className="adm-input" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Career in Data Science 2025" />
      </div>
      <div className="adm-form-group">
        <label>Topic / Category</label>
        <input className="adm-input" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} placeholder="e.g. Tech Careers, Medical, Engineering" />
      </div>
      <div className="adm-input-row">
        <div className="adm-form-group">
          <label>Date & Time *</label>
          <input type="datetime-local" className="adm-input" required value={form.scheduledAt} onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))} />
        </div>
        <div className="adm-form-group">
          <label>Duration (minutes)</label>
          <select className="adm-select" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: +e.target.value }))}>
            <option value={60}>60 min</option>
            <option value={90}>90 min</option>
            <option value={120}>120 min</option>
            <option value={180}>3 hours</option>
          </select>
        </div>
      </div>
      <div className="adm-input-row">
        <div className="adm-form-group">
          <label>Price (₹)</label>
          <input type="number" className="adm-input" value={form.price} min={0} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} placeholder="0 for free" />
        </div>
        <div className="adm-form-group">
          <label>Platform</label>
          <select className="adm-select" value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
            <option>Zoom</option>
            <option>YouTube</option>
            <option>Google Meet</option>
            <option>Teams</option>
          </select>
        </div>
      </div>
      <div className="adm-form-group">
        <label>Description</label>
        <textarea className="adm-textarea" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What will attendees learn?" />
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button type="button" className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
        <button type="submit" className="adm-btn adm-btn-primary">{existing ? 'Update Webinar' : 'Create Webinar'}</button>
      </div>
    </form>
  );
}

function WebinarDetail({ webinar, onClose }) {
  const [tab, setTab] = useState('overview');
  if (!webinar) return null;

  const attendanceRate = webinar.registrations?.length > 0
    ? Math.round((webinar.attendees?.length / webinar.registrations?.length) * 100) : 0;
  const conversionRate = webinar.attendees?.length > 0
    ? Math.round((webinar.conversionCount / webinar.attendees?.length) * 100) : 0;

  return (
    <div className="adm-slide-panel-overlay" onClick={onClose}>
      <div className="adm-slide-panel adm-slide-panel-wide" onClick={e => e.stopPropagation()}>
        <div className="adm-slide-panel-header">
          <div>
            <h3>{webinar.title}</h3>
            <p>{webinar.topic} · {webinar.platform} · {new Date(webinar.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Badge variant={webinar.status === 'Completed' ? 'green' : webinar.status === 'Upcoming' ? 'blue' : webinar.status === 'Live' ? 'red' : 'gray'}>{webinar.status}</Badge>
            <button className="adm-icon-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="adm-webinar-stats-grid">
          {[
            { label: 'Registrations', value: webinar.registrations?.length || 0, icon: '📝', color: '#6366f1' },
            { label: 'Attendees', value: webinar.attendees?.length || 0, icon: '👥', color: '#3b82f6' },
            { label: 'Attendance Rate', value: `${attendanceRate}%`, icon: '📊', color: '#10b981' },
            { label: 'Conversions', value: webinar.conversionCount || 0, icon: '🎯', color: '#10b981' },
            { label: 'Conversion Rate', value: `${conversionRate}%`, icon: '📈', color: '#f59e0b' },
            { label: 'Revenue', value: `₹${(webinar.revenue || 0).toLocaleString()}`, icon: '💰', color: '#10b981' },
          ].map(s => (
            <div key={s.label} className="adm-quick-stat" style={{ borderLeft: `3px solid ${s.color}` }}>
              <span className="adm-quick-stat-icon">{s.icon}</span>
              <span className="adm-quick-stat-count" style={{ color: s.color }}>{s.value}</span>
              <span className="adm-quick-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="adm-panel-tabs">
          {['overview', 'registrations'].map(t => (
            <button key={t} className={`adm-panel-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="adm-panel-content">
            <div className="adm-detail-grid">
              <div className="adm-detail-item"><span className="adm-detail-label">Date</span><span>{new Date(webinar.scheduledAt).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Time</span><span>{new Date(webinar.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Duration</span><span>{webinar.duration} minutes</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Price</span><span>{webinar.price === 0 ? 'Free' : `₹${webinar.price}`}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Platform</span><span>{webinar.platform}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Replay Views</span><span>{webinar.replayViews || 0}</span></div>
            </div>
            {webinar.description && (
              <div className="adm-detail-section">
                <label className="adm-detail-label">Description</label>
                <p className="adm-note-text">{webinar.description}</p>
              </div>
            )}
          </div>
        )}

        {tab === 'registrations' && (
          <div className="adm-panel-content">
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr><th>Name</th><th>Phone</th><th>Registered</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {(webinar.registrations || []).map((reg, i) => (
                    <tr key={i}>
                      <td>{reg.name}</td>
                      <td>{reg.phone}</td>
                      <td className="adm-td-sub">{new Date(reg.registeredAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        <Badge variant={webinar.attendees?.includes(reg.id) ? 'green' : 'gray'} size="sm">
                          {webinar.attendees?.includes(reg.id) ? 'Attended' : 'Registered'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Webinars() {
  const { webinars, addWebinar, updateWebinar } = useData();
  const { showToast } = useNotifications();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = statusFilter === 'All' ? webinars : webinars.filter(w => w.status === statusFilter);

  const totalRevenue = webinars.reduce((sum, w) => sum + (w.revenue || 0), 0);
  const totalRegistrations = webinars.reduce((sum, w) => sum + (w.registrations?.length || 0), 0);
  const totalAttendees = webinars.reduce((sum, w) => sum + (w.attendees?.length || 0), 0);

  return (
    <AdminLayout title="Webinars">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Webinar Management</h1>
          <p className="adm-page-subtitle">{webinars.length} webinars total</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setShowCreate(true)}>+ Create Webinar</button>
      </div>

      {/* Stats */}
      <div className="adm-metrics-grid adm-metrics-grid-4">
        {[
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: '💰', color: '#10b981' },
          { label: 'Registrations', value: totalRegistrations, icon: '📝', color: '#6366f1' },
          { label: 'Attendees', value: totalAttendees, icon: '👥', color: '#3b82f6' },
          { label: 'Avg Attendance Rate', value: totalRegistrations > 0 ? `${Math.round((totalAttendees/totalRegistrations)*100)}%` : '—', icon: '📊', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="adm-card adm-stat-mini">
            <div className="adm-stat-mini-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="adm-stat-mini-value" style={{ color: s.color }}>{s.value}</div>
            <div className="adm-stat-mini-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="adm-filters-bar">
        {['All', 'Upcoming', 'Live', 'Completed', 'Cancelled'].map(s => (
          <button key={s} className={`adm-filter-chip ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
        ))}
      </div>

      {/* Webinar Cards */}
      <div className="adm-webinar-grid">
        {filtered.map(webinar => {
          const attendanceRate = webinar.registrations?.length > 0
            ? Math.round((webinar.attendees?.length / webinar.registrations?.length) * 100) : 0;
          return (
            <div key={webinar.id} className="adm-webinar-card" onClick={() => setSelectedWebinar(webinar)}>
              <div className="adm-webinar-card-header">
                <div>
                  <h3 className="adm-webinar-title">{webinar.title}</h3>
                  <div className="adm-webinar-meta">{webinar.topic} · {webinar.platform}</div>
                </div>
                <Badge variant={webinar.status === 'Completed' ? 'green' : webinar.status === 'Upcoming' ? 'blue' : webinar.status === 'Live' ? 'red' : 'gray'}>
                  {webinar.status}
                </Badge>
              </div>

              <div className="adm-webinar-datetime">
                📅 {new Date(webinar.scheduledAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                {' · '}
                {new Date(webinar.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                {' · '}{webinar.duration} min
              </div>

              <div className="adm-webinar-stats-row">
                <div className="adm-webinar-stat">
                  <span className="adm-webinar-stat-val">{webinar.registrations?.length || 0}</span>
                  <span className="adm-webinar-stat-label">Registered</span>
                </div>
                <div className="adm-webinar-stat">
                  <span className="adm-webinar-stat-val">{webinar.attendees?.length || 0}</span>
                  <span className="adm-webinar-stat-label">Attended</span>
                </div>
                <div className="adm-webinar-stat">
                  <span className="adm-webinar-stat-val">{attendanceRate}%</span>
                  <span className="adm-webinar-stat-label">Attendance</span>
                </div>
                <div className="adm-webinar-stat">
                  <span className="adm-webinar-stat-val adm-text-green">₹{(webinar.revenue || 0).toLocaleString()}</span>
                  <span className="adm-webinar-stat-label">Revenue</span>
                </div>
              </div>

              {webinar.status === 'Completed' && (
                <div className="adm-webinar-conversion">
                  <div className="adm-progress-track">
                    <div className="adm-progress-bar adm-progress-bar-green" style={{ width: `${attendanceRate}%` }} />
                  </div>
                  <span className="adm-td-sub">{webinar.conversionCount || 0} converted · {webinar.replayViews || 0} replay views</span>
                </div>
              )}

              <div className="adm-webinar-footer">
                <span>{webinar.price === 0 ? '🆓 Free' : `💰 ₹${webinar.price}`}</span>
                <button
                  className="adm-btn adm-btn-ghost adm-btn-sm"
                  onClick={e => { e.stopPropagation(); setSelectedWebinar(webinar); }}
                >
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="adm-empty-state-full">No webinars found</div>
        )}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Webinar" size="lg">
        <WebinarForm
          onSubmit={(data) => { addWebinar(data); showToast('Webinar created', 'success'); }}
          onClose={() => setShowCreate(false)}
        />
      </Modal>

      {selectedWebinar && (
        <WebinarDetail webinar={selectedWebinar} onClose={() => setSelectedWebinar(null)} />
      )}
    </AdminLayout>
  );
}
