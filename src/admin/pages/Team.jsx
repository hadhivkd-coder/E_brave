import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const ROLE_META = {
  'Super Admin':        { color: '#e11d48', bg: 'rgba(225,29,72,0.08)',   border: 'rgba(225,29,72,0.2)',   icon: '🔴' },
  'Operations Manager': { color: '#7c3aed', bg: 'rgba(124,58,237,0.08)',  border: 'rgba(124,58,237,0.2)',  icon: '🟣' },
  'Counselor':          { color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  icon: '🟢' },
  'Content Manager':    { color: '#2563eb', bg: 'rgba(37,99,235,0.08)',   border: 'rgba(37,99,235,0.2)',   icon: '🔵' },
};

const STATUS_META = {
  'Active':         { color: '#10b981', dot: '#10b981' },
  'Offline':        { color: '#6b7280', dot: '#9ca3af' },
  'Suspended':      { color: '#e11d48', dot: '#e11d48' },
  'Pending Invite': { color: '#d97706', dot: '#f59e0b' },
};

export default function Team() {
  const { team, tasks, leads, addTeamMember, updateTeamMember, deleteTeamMember, resetTeamMemberPassword } = useData();
  const { user: currentUser } = useAuth();
  const { showToast } = useNotifications();

  const isSuperAdmin = currentUser?.role === 'Super Admin';

  const [roleFilter, setRoleFilter]     = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery]   = useState('');

  const [showAdd, setShowAdd]                         = useState(false);
  const [editingUser, setEditingUser]                 = useState(null);
  const [resettingUser, setResettingUser]             = useState(null);
  const [deletingUser, setDeletingUser]               = useState(null);
  const [viewingActivityUser, setViewingActivityUser] = useState(null);

  const [form, setForm] = useState({
    name: '', role: 'Counselor', email: '', phone: '',
    status: 'Active', specialty: '', department: 'Admissions', tempPassword: '', notes: ''
  });

  const [editForm, setEditForm] = useState({
    id: '', name: '', role: '', email: '', phone: '',
    status: '', specialty: '', department: '', notes: ''
  });

  const [generatedPassword, setGeneratedPassword] = useState('');

  const triggerPasswordGen = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let pass = 'EB-';
    for (let i = 0; i < 8; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
    setForm(prev => ({ ...prev, tempPassword: pass }));
  };

  const getLoginHistory = (userId, userName) => [
    { id: 'lh1', action: 'Login Success',        device: 'Chrome / Windows 11',  ip: '192.168.1.114', time: '2 hours ago' },
    { id: 'lh2', action: 'API Token Generated',  device: 'Vite Client App',       ip: '192.168.1.114', time: '1 day ago'   },
    { id: 'lh3', action: 'Login Success',        device: 'Safari / iPhone 15',   ip: '103.88.22.41',  time: '3 days ago'  },
    { id: 'lh4', action: 'Password Changed',     device: 'Chrome / macOS',        ip: '103.88.22.41',  time: '5 days ago'  },
  ];

  const filteredTeam = useMemo(() => {
    return team.filter(member => {
      const matchesRole   = roleFilter   === 'All' || member.role   === roleFilter;
      const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
      const matchesSearch = !searchQuery ||
        member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.phone?.includes(searchQuery);
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [team, roleFilter, statusFilter, searchQuery]);

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    if (!form.name || !form.email) { showToast('Name and email are required', 'error'); return; }
    addTeamMember({ name: form.name, role: form.role, email: form.email, phone: form.phone, status: form.status, specialty: form.role === 'Counselor' ? form.specialty : '', department: form.department, notes: form.notes });
    showToast(`User ${form.name} created. Temp Password: ${form.tempPassword || 'EB-Start123'}`, 'success');
    setShowAdd(false);
    setForm({ name: '', role: 'Counselor', email: '', phone: '', status: 'Active', specialty: '', department: 'Admissions', tempPassword: '', notes: '' });
  };

  const handleOpenEdit = (member) => {
    setEditForm({ id: member.id, name: member.name || '', role: member.role || 'Counselor', email: member.email || '', phone: member.phone || '', status: member.status || 'Active', specialty: member.specialty || '', department: member.department || 'Admissions', notes: member.notes || '' });
    setEditingUser(member);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    updateTeamMember(editForm.id, { name: editForm.name, role: editForm.role, email: editForm.email, phone: editForm.phone, status: editForm.status, specialty: editForm.role === 'Counselor' ? editForm.specialty : '', department: editForm.department, notes: editForm.notes });
    showToast('User settings updated', 'success');
    setEditingUser(null);
  };

  const handleTriggerPasswordReset = (member) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = 'EB-';
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setGeneratedPassword(code);
    setResettingUser(member);
  };

  const handleConfirmReset = async () => {
    try {
      await resetTeamMemberPassword(resettingUser.id, generatedPassword);
      showToast(`Password reset for ${resettingUser.name}. Temp: ${generatedPassword}`, 'success');
      setResettingUser(null);
    } catch (err) { showToast('Failed to reset password: ' + err.message, 'error'); }
  };

  const handleConfirmDelete = () => {
    if (!isSuperAdmin) return;
    deleteTeamMember(deletingUser.id);
    showToast(`User ${deletingUser.name} deleted`, 'warning');
    setDeletingUser(null);
  };

  const handleQuickStatusChange = (member, newStatus) => {
    if (!isSuperAdmin) return;
    updateTeamMember(member.id, { status: newStatus });
    showToast(`${member.name} → ${newStatus}`, 'success');
  };

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??';

  return (
    <AdminLayout title="Team Directory">
      {/* ── Header ─────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 className="adm-page-title" style={{ margin: '0 0 4px 0' }}>Team Directory</h1>
          <p className="adm-page-subtitle" style={{ margin: 0 }}>Manage users, roles, access levels and security credentials</p>
        </div>
        {isSuperAdmin && (
          <button className="adm-btn adm-btn-primary" onClick={() => { triggerPasswordGen(); setShowAdd(true); }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '1.1rem' }}>+</span> Add Member
          </button>
        )}
      </div>

      {/* ── Read-only banner ────────────────────────── */}
      {!isSuperAdmin && (
        <div style={{ background: 'rgba(217,119,6,0.07)', border: '1px solid rgba(217,119,6,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.1rem' }}>🔒</span>
          <span style={{ fontSize: '0.84rem', color: '#92400e', fontWeight: 600 }}>
            <strong>Read-only view.</strong> Only Super Admins can modify accounts, reset passwords, or invite users.
          </span>
        </div>
      )}

      {/* ── Stats ───────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Members',      value: team.length,                                                          icon: '👥', color: '#0f4c3a' },
          { label: 'Active',             value: team.filter(t => t.status === 'Active').length,                       icon: '🟢', color: '#10b981' },
          { label: 'Suspended/Offline',  value: team.filter(t => t.status === 'Offline' || t.status === 'Suspended').length, icon: '🔴', color: '#e11d48' },
          { label: 'Pending Invite',     value: team.filter(t => t.status === 'Pending Invite').length,               icon: '✉️', color: '#d97706' },
        ].map(s => (
          <div key={s.label} className="adm-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--adm-border)' }}>
            <div style={{ fontSize: '1.4rem', lineHeight: 1 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--adm-text-secondary)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ─────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--adm-text-secondary)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            style={{ width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: '1px solid var(--adm-border)', borderRadius: 8, background: 'var(--adm-card)', fontSize: '0.82rem', color: 'var(--adm-text)', outline: 'none', boxSizing: 'border-box' }}
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="adm-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ minWidth: 150, fontSize: '0.82rem' }}>
          <option value="All">All Roles</option>
          <option>Super Admin</option><option>Operations Manager</option><option>Counselor</option><option>Content Manager</option>
        </select>
        <select className="adm-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ minWidth: 140, fontSize: '0.82rem' }}>
          <option value="All">All Statuses</option>
          <option>Active</option><option>Offline</option><option>Suspended</option><option>Pending Invite</option>
        </select>
        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>
          {filteredTeam.length} member{filteredTeam.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Team Grid ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filteredTeam.map(member => {
          const assignedLeads = leads.filter(l => l.counselorId === member.id).length;
          const openTasks     = tasks.filter(t => t.assignedTo === member.id && t.status !== 'Done').length;
          const roleMeta      = ROLE_META[member.role]   || ROLE_META['Counselor'];
          const statusMeta    = STATUS_META[member.status] || STATUS_META['Offline'];
          const initials      = getInitials(member.name);
          const avatarBg      = member.role === 'Super Admin' ? '#e11d48' : '#0f4c3a';

          return (
            <div
              key={member.id}
              className="adm-card"
              style={{ padding: 0, border: '1px solid var(--adm-border)', borderRadius: 14, overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: 'var(--adm-shadow)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--adm-shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--adm-shadow)';    e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Top accent bar */}
              <div style={{ height: 3, background: roleMeta.color }} />

              {/* Card body */}
              <div style={{ padding: '18px 18px 14px 18px' }}>
                {/* Avatar + name + status */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: avatarBg, color: '#fff', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 3px ${roleMeta.bg}` }}>
                      {initials}
                    </div>
                    {/* Status dot */}
                    <div style={{ position: 'absolute', bottom: 1, right: 1, width: 12, height: 12, borderRadius: '50%', background: statusMeta.dot, border: '2px solid var(--adm-card)', boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--adm-text)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {member.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {member.email}
                    </div>
                    {/* Role + Status chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '2px 8px', borderRadius: 20, background: roleMeta.bg, color: roleMeta.color, border: `1px solid ${roleMeta.border}` }}>
                        {roleMeta.icon} {member.role}
                      </span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: 'var(--adm-bg)', color: statusMeta.color, border: '1px solid var(--adm-border)' }}>
                        ● {member.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Department + Specialty tags */}
                {(member.department || member.specialty) && (
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
                    {member.department && (
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '2px 8px', borderRadius: 5, background: 'var(--adm-accent-dim)', color: 'var(--adm-accent)', border: '1px solid var(--adm-border)' }}>
                        {member.department}
                      </span>
                    )}
                    {member.specialty && (
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '2px 8px', borderRadius: 5, background: 'rgba(212,175,55,0.08)', color: '#b48a07', border: '1px solid rgba(212,175,55,0.2)' }}>
                        🎓 {member.specialty}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14, padding: '10px 0', borderTop: '1px solid var(--adm-border)', borderBottom: '1px solid var(--adm-border)' }}>
                  {[
                    { label: 'Open Tasks',  value: openTasks },
                    { label: member.role === 'Counselor' ? 'Leads' : 'Scope', value: member.role === 'Counselor' ? assignedLeads : '—' },
                    { label: 'Joined',      value: member.joinedDate ? member.joinedDate.slice(0, 7) : '—' },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--adm-text)', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--adm-text-secondary)', fontWeight: 600, marginTop: 3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {member.notes && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)', fontStyle: 'italic', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                    "{member.notes}"
                  </p>
                )}

                {/* Phone */}
                {member.phone && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)', marginBottom: 12 }}>
                    📞 {member.phone}
                  </div>
                )}
              </div>

              {/* Action toolbar */}
              <div style={{ padding: '10px 14px', borderTop: '1px solid var(--adm-border)', background: 'var(--adm-bg)', display: 'flex', gap: 6, alignItems: 'center' }}>
                {isSuperAdmin ? (
                  <>
                    <button
                      onClick={() => handleOpenEdit(member)}
                      style={{ flex: 1, padding: '6px 10px', border: '1px solid var(--adm-border)', borderRadius: 7, background: 'var(--adm-card)', color: 'var(--adm-text)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}
                    >✏️ Edit</button>
                    <select
                      value={member.status}
                      onChange={e => handleQuickStatusChange(member, e.target.value)}
                      style={{ padding: '6px 8px', border: '1px solid var(--adm-border)', borderRadius: 7, background: 'var(--adm-card)', color: 'var(--adm-text)', fontSize: '0.72rem', cursor: 'pointer' }}
                    >
                      <option>Active</option><option>Offline</option><option>Suspended</option><option value="Pending Invite">Pending</option>
                    </select>
                    {[
                      { icon: '🔑', title: 'Reset Password', color: '#d97706', onClick: () => handleTriggerPasswordReset(member) },
                      { icon: '🔍', title: 'Audit Logs',     color: '#0f4c3a', onClick: () => setViewingActivityUser(member) },
                      { icon: '🗑', title: 'Delete User',    color: '#e11d48', onClick: () => setDeletingUser(member) },
                    ].map(btn => (
                      <button
                        key={btn.icon}
                        title={btn.title}
                        onClick={btn.onClick}
                        style={{ width: 30, height: 30, border: '1px solid var(--adm-border)', borderRadius: 7, background: 'var(--adm-card)', color: btn.color, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', transition: 'all 0.15s' }}
                      >{btn.icon}</button>
                    ))}
                  </>
                ) : (
                  <button
                    onClick={() => setViewingActivityUser(member)}
                    style={{ flex: 1, padding: '7px', border: '1px solid var(--adm-border)', borderRadius: 7, background: 'var(--adm-card)', color: 'var(--adm-text)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >🔍 View Activity</button>
                )}
              </div>
            </div>
          );
        })}

        {filteredTeam.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: 'var(--adm-text-secondary)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>👤</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>No members found</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: 4 }}>Try adjusting your search or filters</div>
          </div>
        )}
      </div>

      {/* ── Add User Modal ───────────────────────────── */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Create New Team Member" size="md">
        <form onSubmit={handleAddMemberSubmit} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Full Name <span style={{ color: 'var(--adm-red)' }}>*</span></label>
            <input className="adm-input" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Anand Sharma" />
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Work Email <span style={{ color: 'var(--adm-red)' }}>*</span></label>
              <input type="email" className="adm-input" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@ebrave.in" />
            </div>
            <div className="adm-form-group">
              <label>Phone</label>
              <input className="adm-input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="98XXXXXXXX" />
            </div>
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>System Role <span style={{ color: 'var(--adm-red)' }}>*</span></label>
              <select className="adm-select" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                <option>Counselor</option><option>Operations Manager</option><option>Content Manager</option><option>Super Admin</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Department</label>
              <input className="adm-input" value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="e.g. Counseling" />
            </div>
          </div>
          {form.role === 'Counselor' && (
            <div className="adm-form-group">
              <label>Specialization</label>
              <select className="adm-select" value={form.specialty} onChange={e => setForm(p => ({ ...p, specialty: e.target.value }))}>
                <option value="">No specific specialty</option>
                <option>Engineering &amp; Tech</option><option>CA &amp; Commerce</option><option>Design &amp; Creative</option><option>Medical &amp; Health</option><option>Law &amp; Humanities</option>
              </select>
            </div>
          )}
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Status</label>
              <select className="adm-select" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option>Active</option><option>Offline</option><option>Suspended</option><option value="Pending Invite">Pending Invite</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Temp Password <span style={{ color: 'var(--adm-red)' }}>*</span></label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="adm-input" style={{ flex: 1 }} required value={form.tempPassword} onChange={e => setForm(p => ({ ...p, tempPassword: e.target.value }))} placeholder="Temp password" />
                <button type="button" className="adm-btn adm-btn-ghost" onClick={triggerPasswordGen} style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>Generate</button>
              </div>
            </div>
          </div>
          <div className="adm-form-group">
            <label>Notes</label>
            <textarea className="adm-textarea" rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="e.g. Lead counselor for Bangalore division..." />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Create Account</button>
          </div>
        </form>
      </Modal>

      {/* ── Edit User Modal ──────────────────────────── */}
      {editingUser && (
        <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)} title={`Edit — ${editingUser.name}`} size="md">
          <form onSubmit={handleSaveEdit} className="adm-form-stack">
            <div className="adm-form-group">
              <label>Full Name *</label>
              <input className="adm-input" required value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="adm-input-row">
              <div className="adm-form-group">
                <label>Work Email *</label>
                <input type="email" className="adm-input" required value={editForm.email} onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="adm-form-group">
                <label>Phone</label>
                <input className="adm-input" value={editForm.phone} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>
            <div className="adm-input-row">
              <div className="adm-form-group">
                <label>System Role *</label>
                <select className="adm-select" value={editForm.role} onChange={e => setEditForm(p => ({ ...p, role: e.target.value }))}>
                  <option>Counselor</option><option>Operations Manager</option><option>Content Manager</option><option>Super Admin</option>
                </select>
              </div>
              <div className="adm-form-group">
                <label>Department</label>
                <input className="adm-input" value={editForm.department} onChange={e => setEditForm(p => ({ ...p, department: e.target.value }))} />
              </div>
            </div>
            {editForm.role === 'Counselor' && (
              <div className="adm-form-group">
                <label>Specialization</label>
                <select className="adm-select" value={editForm.specialty} onChange={e => setEditForm(p => ({ ...p, specialty: e.target.value }))}>
                  <option value="">No specific specialty</option>
                  <option>Engineering &amp; Tech</option><option>CA &amp; Commerce</option><option>Design &amp; Creative</option><option>Medical &amp; Health</option><option>Law &amp; Humanities</option>
                </select>
              </div>
            )}
            <div className="adm-form-group">
              <label>Account Status</label>
              <select className="adm-select" value={editForm.status} onChange={e => setEditForm(p => ({ ...p, status: e.target.value }))}>
                <option>Active</option><option>Offline</option><option>Suspended</option><option value="Pending Invite">Pending Invite</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Notes</label>
              <textarea className="adm-textarea" rows={2} value={editForm.notes} onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
              <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setEditingUser(null)}>Cancel</button>
              <button type="submit" className="adm-btn adm-btn-primary">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Password Reset Modal ─────────────────────── */}
      {resettingUser && (
        <Modal isOpen={!!resettingUser} onClose={() => setResettingUser(null)} title="Reset Password" size="sm">
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
              Reset the password for <strong style={{ color: 'var(--adm-text)' }}>{resettingUser.name}</strong>? A new temporary password will be initialized.
            </p>
            <div style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', padding: '16px 20px', borderRadius: 10, marginBottom: 20 }}>
              <div style={{ fontSize: '0.7rem', color: '#b48a07', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Temporary Password</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f4c3a', letterSpacing: 2 }}>{generatedPassword}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="adm-btn adm-btn-ghost" onClick={() => setResettingUser(null)}>Cancel</button>
              <button className="adm-btn adm-btn-primary" onClick={handleConfirmReset}>Apply Reset</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Delete Confirm ───────────────────────────── */}
      {deletingUser && (
        <ConfirmDialog
          isOpen={!!deletingUser}
          title="Delete Team Member"
          message={`Permanently delete ${deletingUser.name}? This cannot be undone and will revoke all access rights.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingUser(null)}
        />
      )}

      {/* ── Activity Logs Modal ──────────────────────── */}
      {viewingActivityUser && (
        <Modal isOpen={!!viewingActivityUser} onClose={() => setViewingActivityUser(null)} title={`Auth Logs — ${viewingActivityUser.name}`} size="md">
          <p style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)', marginBottom: 16 }}>
            Last login security events for <strong>{viewingActivityUser.name}</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {getLoginHistory(viewingActivityUser.id, viewingActivityUser.name).map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 9, border: '1px solid var(--adm-border)', background: 'var(--adm-bg)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f4c3a' }}>{log.action}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--adm-text-secondary)', marginTop: 2 }}>{log.device} · IP: {log.ip}</div>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--adm-text-secondary)', whiteSpace: 'nowrap', marginLeft: 10 }}>{log.time}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <button className="adm-btn adm-btn-primary" onClick={() => setViewingActivityUser(null)}>Close</button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
