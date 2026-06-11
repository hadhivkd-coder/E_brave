import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNotifications } from '../context/NotificationContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const SESSION_STATUSES = ['Scheduled', 'In Progress', 'Completed', 'Cancelled', 'No Show'];
const SESSION_TYPES = ['Initial', 'Follow-up', 'Parent Meeting', 'Career Planning'];

function SessionNotesForm({ session, onSave, onClose }) {
  const [notes, setNotes] = useState(session?.notes || { summary: '', actionPlan: '' });
  const [status, setStatus] = useState('Completed');

  const handleSave = () => {
    onSave({ ...session, notes, status });
    onClose();
  };

  return (
    <div className="adm-notes-form">
      <div className="adm-form-group">
        <label>Session Summary</label>
        <textarea className="adm-textarea" rows={5} value={notes.summary || ''}
          onChange={e => setNotes(n => ({ ...n, summary: e.target.value }))}
          placeholder="Quick summary of the session, student interests, and concerns..." autoFocus />
      </div>
      <div className="adm-form-group">
        <label>Action Plan / Next Steps</label>
        <textarea className="adm-textarea" rows={2} value={notes.actionPlan || ''}
          onChange={e => setNotes(n => ({ ...n, actionPlan: e.target.value }))}
          placeholder="What should the student do next?" />
      </div>
      <div className="adm-form-group">
        <label>Update Status</label>
        <select className="adm-select" value={status} onChange={e => setStatus(e.target.value)}>
          {SESSION_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
        <button className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
        <button className="adm-btn adm-btn-primary" onClick={handleSave}>Save Session</button>
      </div>
    </div>
  );
}

function BookingModal({ onSubmit, onClose, team, students }) {
  const [form, setForm] = useState({
    studentId: '', counselorId: '', scheduledAt: '', duration: 60,
    sessionType: 'Initial', notes: {}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.studentId || !form.counselorId || !form.scheduledAt) return;
    onSubmit(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="adm-form-stack">
      <div className="adm-input-row">
        <div className="adm-form-group">
          <label>Student / Lead</label>
          <select className="adm-select" value={form.studentId} onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))} required>
            <option value="">Select student...</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="adm-form-group">
          <label>Counselor</label>
          <select className="adm-select" value={form.counselorId} onChange={e => setForm(f => ({ ...f, counselorId: e.target.value }))} required>
            <option value="">Select counselor...</option>
            {team.filter(t => t.role === 'Counselor' || t.role === 'Operations Manager' || t.role === 'Super Admin').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </div>
      <div className="adm-input-row">
        <div className="adm-form-group">
          <label>Date & Time</label>
          <input type="datetime-local" className="adm-input" value={form.scheduledAt} onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))} required />
        </div>
        <div className="adm-form-group">
          <label>Duration (minutes)</label>
          <select className="adm-select" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: +e.target.value }))}>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
            <option value={90}>90 min</option>
            <option value={120}>120 min</option>
          </select>
        </div>
      </div>
      <div className="adm-form-group">
        <label>Session Type</label>
        <select className="adm-select" value={form.sessionType} onChange={e => setForm(f => ({ ...f, sessionType: e.target.value }))}>
          {SESSION_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button type="button" className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
        <button type="submit" className="adm-btn adm-btn-primary">Book Session</button>
      </div>
    </form>
  );
}

import { useAuth } from '../context/AuthContext';

export default function Counseling() {
  const { sessions, students, team, updateSession, addSession } = useData();
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list');
  const [showBooking, setShowBooking] = useState(false);
  const [notesSession, setNotesSession] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const scopeSessions = user?.role === 'Counselor' ? sessions.filter(s => s.counselorId === user.id) : sessions;

  const filtered = scopeSessions.filter(s => {
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchType = typeFilter === 'All' || s.sessionType === typeFilter;
    const q = search.toLowerCase();
    const matchSearch = !search || s.studentName?.toLowerCase().includes(q) || s.counselorName?.toLowerCase().includes(q);
    return matchStatus && matchType && matchSearch;
  });

  const today = new Date().toISOString().split('T')[0];
  const todaySessions = scopeSessions.filter(s => s.scheduledAt?.startsWith(today));
  const completedTotal = scopeSessions.filter(s => s.status === 'Completed').length;
  const scheduledTotal = scopeSessions.filter(s => s.status === 'Scheduled').length;
  const cancelledTotal = scopeSessions.filter(s => s.status === 'Cancelled').length;
  const noShowTotal = scopeSessions.filter(s => s.status === 'No Show').length;

  // Weekly calendar view
  const getWeekDays = () => {
    const days = [];
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <AdminLayout title="Counseling">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Counseling Management</h1>
          <p className="adm-page-subtitle">{scopeSessions.length} total sessions · {scheduledTotal} upcoming</p>
        </div>
        <div className="adm-page-actions">
          <div className="adm-view-toggle">
            <button className={`adm-view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>☰ List</button>
            <button className={`adm-view-btn ${view === 'calendar' ? 'active' : ''}`} onClick={() => setView('calendar')}>📅 Calendar</button>
          </div>
          <button className="adm-btn adm-btn-primary" onClick={() => setShowBooking(true)}>+ Book Session</button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="adm-counseling-stats">
        {[
          { label: 'Today\'s Sessions', value: todaySessions.length, icon: '📅', color: '#6366f1' },
          { label: 'Completed', value: completedTotal, icon: '✅', color: '#10b981' },
          { label: 'Scheduled', value: scheduledTotal, icon: '🗓️', color: '#3b82f6' },
          { label: 'Cancelled', value: cancelledTotal, icon: '❌', color: '#ef4444' },
          { label: 'No Show', value: noShowTotal, icon: '⚠️', color: '#f59e0b' },
        ].map(stat => (
          <div key={stat.label} className="adm-quick-stat" style={{ borderLeft: `3px solid ${stat.color}` }}>
            <span className="adm-quick-stat-icon">{stat.icon}</span>
            <span className="adm-quick-stat-count" style={{ color: stat.color }}>{stat.value}</span>
            <span className="adm-quick-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="adm-filters-bar">
        <div className="adm-search-wrap">
          <svg className="adm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="adm-search-input" placeholder="Search by student or counselor..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="adm-select adm-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {SESSION_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="adm-select adm-filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          {SESSION_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {view === 'calendar' ? (
        <div className="adm-card">
          <div className="adm-calendar-header">
            <h3>This Week</h3>
            <p>{weekDays[0].toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} — {weekDays[6].toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          <div className="adm-calendar-grid">
            {weekDays.map(day => {
              const ds = day.toISOString().split('T')[0];
              const daySessions = scopeSessions.filter(s => s.scheduledAt?.startsWith(ds));
              const isToday = ds === today;
              return (
                <div key={ds} className={`adm-calendar-day ${isToday ? 'adm-calendar-day-today' : ''}`}>
                  <div className="adm-calendar-day-header">
                    <span className="adm-calendar-day-name">{day.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                    <span className="adm-calendar-day-num">{day.getDate()}</span>
                  </div>
                  <div className="adm-calendar-day-sessions">
                    {daySessions.length === 0 ? (
                      <div className="adm-calendar-empty">Free</div>
                    ) : daySessions.map(s => (
                      <div key={s.id} className={`adm-calendar-session adm-calendar-session-${s.status.toLowerCase().replace(' ', '-')}`}
                        onClick={() => setSelectedSession(s)}>
                        <div className="adm-calendar-session-time">
                          {new Date(s.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="adm-calendar-session-name">{s.studentName}</div>
                        <div className="adm-calendar-session-type">{s.sessionType}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Counselor</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(session => (
                <tr key={session.id}>
                  <td>
                    <div className="adm-td-lead-name">
                      <div className="adm-avatar adm-avatar-xs" style={{ background: '#6366f120', color: '#6366f1' }}>
                        {session.studentName?.charAt(0)}
                      </div>
                      <span>{session.studentName || 'Unknown Student'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="adm-td-lead-name">
                      <div className="adm-avatar adm-avatar-xs" style={{ background: '#10b98120', color: '#10b981' }}>
                        {session.counselorName?.charAt(0)}
                      </div>
                      <span>{session.counselorName || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="adm-td-name">{new Date(session.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div className="adm-td-sub">{new Date(session.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td><Badge variant="purple" size="sm">{session.sessionType}</Badge></td>
                  <td className="adm-td-sub">{session.duration} min</td>
                  <td>
                    <select
                      className="adm-select adm-select-inline"
                      value={session.status}
                      onChange={e => {
                        updateSession(session.id, { status: e.target.value });
                        showToast('Session updated', 'success');
                      }}
                      onClick={e => e.stopPropagation()}
                      style={{
                        color: session.status === 'Completed' ? '#10b981' : session.status === 'Scheduled' ? '#3b82f6' : session.status === 'Cancelled' ? '#ef4444' : '#f59e0b'
                      }}
                    >
                      {SESSION_STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="adm-td-actions">
                      <button
                        className="adm-icon-action"
                        title="Add session notes"
                        onClick={() => setNotesSession(session)}
                      >📝</button>
                      {session.status === 'Scheduled' && (
                        <button
                          className="adm-icon-action adm-icon-action-green"
                          title="Mark complete"
                          onClick={() => { updateSession(session.id, { status: 'Completed' }); showToast('Session completed', 'success'); }}
                        >✓</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="adm-table-empty">No sessions found</div>}
        </div>
      )}

      {/* Book Session Modal */}
      <Modal isOpen={showBooking} onClose={() => setShowBooking(false)} title="Book Counseling Session" size="lg">
        <BookingModal
          onSubmit={(data) => { addSession(data); setShowBooking(false); showToast('Session booked', 'success'); }}
          onClose={() => setShowBooking(false)}
          team={team}
          students={students}
        />
      </Modal>

      {/* Session Notes Modal */}
      <Modal isOpen={!!notesSession} onClose={() => setNotesSession(null)} title={`Session Notes — ${notesSession?.studentName}`} size="lg">
        {notesSession && (
          <SessionNotesForm
            session={notesSession}
            onSave={(updated) => { updateSession(updated.id, updated); showToast('Notes saved', 'success'); }}
            onClose={() => setNotesSession(null)}
          />
        )}
      </Modal>
    </AdminLayout>
  );
}
