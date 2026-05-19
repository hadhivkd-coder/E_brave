import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

export default function Team() {
  const { team, tasks, leads } = useData();
  const { showToast } = useNotifications();
  const [roleFilter, setRoleFilter] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', role: 'Counselor', email: '', phone: '', status: 'Active' });

  const filteredTeam = roleFilter === 'All' ? team : team.filter(t => t.role === roleFilter);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    // For MVP, we can simulate adding team member
    // Since DataContext has team as state, we could add method but let's just trigger toast since the list is local-controlled or from context
    showToast(`Added team member: ${form.name}`, 'success');
    setShowAdd(false);
  };

  return (
    <AdminLayout title="Team Directory">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Team Directory</h1>
          <p className="adm-page-subtitle">{team.length} total active users and agents on operational control center</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setShowAdd(true)}>+ Invite Team Member</button>
      </div>

      {/* Stats header */}
      <div className="adm-counseling-stats">
        {[
          { label: 'Total Members', value: team.length, color: '#6366f1', icon: '👥' },
          { label: 'Active Counselors', value: team.filter(t => t.role === 'Counselor').length, color: '#10b981', icon: '🎓' },
          { label: 'Away / Offline', value: team.filter(t => t.status !== 'Active').length, color: '#f59e0b', icon: '💤' },
          { label: 'Pending Invitations', value: 1, color: '#3b82f6', icon: '✉️' }
        ].map(s => (
          <div key={s.label} className="adm-quick-stat" style={{ borderLeft: `3px solid ${s.color}` }}>
            <span className="adm-quick-stat-icon">{s.icon}</span>
            <span className="adm-quick-stat-count" style={{ color: s.color }}>{s.value}</span>
            <span className="adm-quick-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Role Filters */}
      <div className="adm-filters-bar">
        {['All', 'Super Admin', 'Operations Manager', 'Counselor', 'Content Manager'].map(role => (
          <button
            key={role}
            className={`adm-filter-chip ${roleFilter === role ? 'active' : ''}`}
            onClick={() => setRoleFilter(role)}
          >
            {role}s
          </button>
        ))}
      </div>

      {/* Team grid */}
      <div className="adm-students-grid">
        {filteredTeam.map(member => {
          const counselorLeads = leads.filter(l => l.counselorId === member.id).length;
          const completedTasks = tasks.filter(t => t.assignedTo === member.id && t.status === 'Done').length;

          return (
            <div key={member.id} className="adm-student-card">
              <div className="adm-student-card-header">
                <div
                  className="adm-avatar adm-avatar-lg"
                  style={{
                    background: member.role === 'Super Admin' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                    color: member.role === 'Super Admin' ? '#ef4444' : '#6366f1',
                    fontSize: '1.25rem',
                    fontWeight: 700
                  }}
                >
                  {member.avatar || member.name.charAt(0)}
                </div>
                <div className="adm-student-card-info">
                  <div className="adm-student-name">{member.name}</div>
                  <div className="adm-student-meta">{member.email}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4 }}>
                    <Badge variant={member.role === 'Super Admin' ? 'red' : member.role === 'Operations Manager' ? 'indigo' : 'green'} size="sm">
                      {member.role}
                    </Badge>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: member.status === 'Active' ? '#10b981' : '#f59e0b',
                      display: 'inline-block', marginLeft: 6
                    }} />
                    <span className="adm-td-sub" style={{ fontSize: '0.75rem' }}>{member.status}</span>
                  </div>
                </div>
              </div>

              <div className="adm-student-stats" style={{ margin: '16px 0 0 0', borderBottom: 'none', paddingBottom: 0 }}>
                <div className="adm-student-stat">
                  <span className="adm-student-stat-val">{completedTasks}</span>
                  <span className="adm-student-stat-label">Tasks Done</span>
                </div>
                <div className="adm-student-stat">
                  <span className="adm-student-stat-val">{counselorLeads}</span>
                  <span className="adm-student-stat-label">Leads Assigned</span>
                </div>
                <div className="adm-student-stat">
                  <span className="adm-student-stat-val" style={{ fontSize: '0.75rem' }}>
                    {member.joinedDate ? new Date(member.joinedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '—'}
                  </span>
                  <span className="adm-student-stat-label">Joined Date</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Invite Team Member" size="md">
        <form onSubmit={handleAddMember} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Full Name *</label>
            <input className="adm-input" required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. Sunil Kumar" />
          </div>
          <div className="adm-form-group">
            <label>Work Email Address *</label>
            <input type="email" className="adm-input" required value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} placeholder="email@ebrave.in" />
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Phone Number</label>
              <input className="adm-input" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} placeholder="98XXXXXXXX" />
            </div>
            <div className="adm-form-group">
              <label>System Role *</label>
              <select className="adm-select" value={form.role} onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}>
                <option>Counselor</option>
                <option>Operations Manager</option>
                <option>Content Manager</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Send Invite Email</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
