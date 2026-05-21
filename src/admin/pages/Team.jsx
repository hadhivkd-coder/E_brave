import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';

export default function Team() {
  const { team, tasks, leads, addTeamMember, updateTeamMember, deleteTeamMember, resetTeamMemberPassword } = useData();
  const { user: currentUser } = useAuth();
  const { showToast } = useNotifications();

  const isSuperAdmin = currentUser?.role === 'Super Admin';

  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [showAdd, setShowAdd] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [resettingUser, setResettingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [viewingActivityUser, setViewingActivityUser] = useState(null);

  // Form states
  const [form, setForm] = useState({
    name: '',
    role: 'Counselor',
    email: '',
    phone: '',
    status: 'Active',
    specialty: '',
    department: 'Admissions',
    tempPassword: '',
    notes: ''
  });

  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    role: '',
    email: '',
    phone: '',
    status: '',
    specialty: '',
    department: '',
    notes: ''
  });

  const [generatedPassword, setGeneratedPassword] = useState('');

  // Handle auto-password generator
  const triggerPasswordGen = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let pass = 'EB-';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setForm(prev => ({ ...prev, tempPassword: pass }));
  };

  // Mock activity history generator
  const getLoginHistory = (userId, userName) => {
    return [
      { id: 'lh1', action: 'Login Success', device: 'Chrome / Windows 11', ip: '192.168.1.114', time: '2 hours ago' },
      { id: 'lh2', action: 'API Token Generated', device: 'Vite Client App', ip: '192.168.1.114', time: '1 day ago' },
      { id: 'lh3', action: 'Login Success', device: 'Safari / iPhone 15', ip: '103.88.22.41', time: '3 days ago' },
      { id: 'lh4', action: 'Password Changed', device: 'Chrome / macOS', ip: '103.88.22.41', time: '5 days ago' }
    ];
  };

  // Filtered members list
  const filteredTeam = useMemo(() => {
    return team.filter(member => {
      const matchesRole = roleFilter === 'All' || member.role === roleFilter;
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
    if (!form.name || !form.email) {
      showToast('Name and email are required', 'error');
      return;
    }

    addTeamMember({
      name: form.name,
      role: form.role,
      email: form.email,
      phone: form.phone,
      status: form.status,
      specialty: form.role === 'Counselor' ? form.specialty : '',
      department: form.department,
      notes: form.notes
    });

    showToast(`User ${form.name} created successfully. Temp Password: ${form.tempPassword || 'EB-Start123'}`, 'success');
    setShowAdd(false);
    // Reset form
    setForm({
      name: '',
      role: 'Counselor',
      email: '',
      phone: '',
      status: 'Active',
      specialty: '',
      department: 'Admissions',
      tempPassword: '',
      notes: ''
    });
  };

  const handleOpenEdit = (member) => {
    setEditForm({
      id: member.id,
      name: member.name || '',
      role: member.role || 'Counselor',
      email: member.email || '',
      phone: member.phone || '',
      status: member.status || 'Active',
      specialty: member.specialty || '',
      department: member.department || 'Admissions',
      notes: member.notes || ''
    });
    setEditingUser(member);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    updateTeamMember(editForm.id, {
      name: editForm.name,
      role: editForm.role,
      email: editForm.email,
      phone: editForm.phone,
      status: editForm.status,
      specialty: editForm.role === 'Counselor' ? editForm.specialty : '',
      department: editForm.department,
      notes: editForm.notes
    });
    showToast('User settings updated successfully', 'success');
    setEditingUser(null);
  };

  const handleTriggerPasswordReset = (member) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = 'EB-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(code);
    setResettingUser(member);
  };

  const handleConfirmReset = async () => {
    try {
      await resetTeamMemberPassword(resettingUser.id, generatedPassword);
      showToast(`Password successfully reset for ${resettingUser.name}. Temp Password: ${generatedPassword}`, 'success');
      setResettingUser(null);
    } catch (err) {
      showToast('Failed to reset password: ' + err.message, 'error');
    }
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
    showToast(`Status of ${member.name} changed to ${newStatus}`, 'success');
  };

  return (
    <AdminLayout title="Users & Permissions">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Users & Permissions</h1>
          <p className="adm-page-subtitle">Manage system users, assign roles, configure access boundaries, and audit logins</p>
        </div>
        {isSuperAdmin && (
          <button className="adm-btn adm-btn-primary" onClick={() => { triggerPasswordGen(); setShowAdd(true); }}>
            + Create New User
          </button>
        )}
      </div>

      {!isSuperAdmin && (
        <div className="adm-alert adm-alert-warning" style={{ marginBottom: 24 }}>
          <span>🔒</span>
          <span><strong>Access Notice:</strong> Only Super Admins can modify accounts, reset passwords, or invite users. Your view is read-only.</span>
        </div>
      )}

      {/* Stats Board */}
      <div className="adm-counseling-stats" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Accounts', value: team.length, color: '#0f4c3a', icon: '👥' },
          { label: 'Active Users', value: team.filter(t => t.status === 'Active').length, color: '#10b981', icon: '🟢' },
          { label: 'Offline / Suspended', value: team.filter(t => t.status === 'Offline' || t.status === 'Suspended').length, color: '#e11d48', icon: '🔴' },
          { label: 'Pending Invite', value: team.filter(t => t.status === 'Pending Invite').length, color: '#f59e0b', icon: '✉️' }
        ].map(s => (
          <div key={s.label} className="adm-quick-stat" style={{ borderLeft: `3px solid ${s.color}` }}>
            <span className="adm-quick-stat-icon">{s.icon}</span>
            <span className="adm-quick-stat-count" style={{ color: s.color }}>{s.value}</span>
            <span className="adm-quick-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="adm-filters-bar" style={{ marginBottom: 24 }}>
        <div className="adm-search-wrap">
          <svg className="adm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            className="adm-search-input" 
            placeholder="Search by name, email, or phone..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>
        <select className="adm-select adm-filter-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="Super Admin">Super Admins</option>
          <option value="Operations Manager">Operations Managers</option>
          <option value="Counselor">Counselors</option>
          <option value="Content Manager">Content Managers</option>
        </select>
        <select className="adm-select adm-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Offline">Offline</option>
          <option value="Suspended">Suspended</option>
          <option value="Pending Invite">Pending Invite</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="adm-students-grid">
        {filteredTeam.map(member => {
          const assignedLeadsCount = leads.filter(l => l.counselorId === member.id).length;
          const assignedTasksCount = tasks.filter(t => t.assignedTo === member.id && t.status !== 'Done').length;

          let roleBadgeVariant = 'gray';
          if (member.role === 'Super Admin') roleBadgeVariant = 'red';
          else if (member.role === 'Operations Manager') roleBadgeVariant = 'indigo';
          else if (member.role === 'Counselor') roleBadgeVariant = 'green';
          else if (member.role === 'Content Manager') roleBadgeVariant = 'purple';

          let statusBadgeVariant = 'gray';
          if (member.status === 'Active') statusBadgeVariant = 'green';
          else if (member.status === 'Suspended') statusBadgeVariant = 'red';
          else if (member.status === 'Pending Invite') statusBadgeVariant = 'amber';

          return (
            <div key={member.id} className="adm-student-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div
                      className="adm-avatar"
                      style={{
                        background: member.role === 'Super Admin' ? 'rgba(225, 29, 72, 0.1)' : 'rgba(15, 76, 58, 0.1)',
                        color: member.role === 'Super Admin' ? '#e11d48' : '#0f4c3a',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        width: 42,
                        height: 42
                      }}
                    >
                      {member.avatar || member.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="adm-student-name" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--adm-text)' }}>
                        {member.name}
                      </div>
                      <div className="adm-student-meta" style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                        {member.email}
                      </div>
                    </div>
                  </div>
                  <Badge variant={statusBadgeVariant} size="sm">{member.status}</Badge>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  <Badge variant={roleBadgeVariant} size="sm">{member.role}</Badge>
                  {member.department && (
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, background: '#f0f3f1', color: '#5c6b5e' }}>
                      {member.department}
                    </span>
                  )}
                  {member.role === 'Counselor' && member.specialty && (
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, background: '#f5efe0', color: '#b48a07' }}>
                      🎓 {member.specialty}
                    </span>
                  )}
                </div>

                <div className="adm-student-stats" style={{ margin: '12px 0 16px 0', paddingBottom: 0, borderBottom: 'none' }}>
                  <div className="adm-student-stat">
                    <span className="adm-student-stat-val">{assignedTasksCount}</span>
                    <span className="adm-student-stat-label">Open Tasks</span>
                  </div>
                  {member.role === 'Counselor' ? (
                    <div className="adm-student-stat">
                      <span className="adm-student-stat-val">{assignedLeadsCount}</span>
                      <span className="adm-student-stat-label">Assigned Leads</span>
                    </div>
                  ) : (
                    <div className="adm-student-stat">
                      <span className="adm-student-stat-val">—</span>
                      <span className="adm-student-stat-label">Operational Scope</span>
                    </div>
                  )}
                  <div className="adm-student-stat">
                    <span className="adm-student-stat-val" style={{ fontSize: '0.75rem' }}>
                      {member.joinedDate || '—'}
                    </span>
                    <span className="adm-student-stat-label">Created At</span>
                  </div>
                </div>

                {member.notes && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)', fontStyle: 'italic', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                    "{member.notes}"
                  </p>
                )}
              </div>

              {/* Action Toolbar */}
              <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--adm-border)', paddingTop: 16, marginTop: 'auto' }}>
                {isSuperAdmin ? (
                  <>
                    <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ flex: 1, fontSize: '0.75rem' }} onClick={() => handleOpenEdit(member)}>
                      Edit Account
                    </button>
                    <select
                      className="adm-select"
                      style={{ width: 'auto', fontSize: '0.75rem', padding: '4px 8px', height: 'auto' }}
                      value={member.status}
                      onChange={e => handleQuickStatusChange(member, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Offline">Offline</option>
                      <option value="Suspended">Suspend</option>
                      <option value="Pending Invite">Invite</option>
                    </select>
                    <button 
                      className="adm-btn adm-btn-ghost adm-btn-sm" 
                      style={{ padding: '4px 8px', color: '#e11d48' }}
                      title="Reset Password"
                      onClick={() => handleTriggerPasswordReset(member)}
                    >
                      🔑
                    </button>
                    <button 
                      className="adm-btn adm-btn-ghost adm-btn-sm" 
                      style={{ padding: '4px 8px', color: '#ef4444' }}
                      title="Delete User"
                      onClick={() => setDeletingUser(member)}
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <button 
                    className="adm-btn adm-btn-ghost adm-btn-sm" 
                    style={{ flex: 1, fontSize: '0.75rem' }}
                    onClick={() => setViewingActivityUser(member)}
                  >
                    View Login Activity
                  </button>
                )}
                {isSuperAdmin && (
                  <button 
                    className="adm-btn adm-btn-ghost adm-btn-sm" 
                    style={{ padding: '4px 8px', color: '#0f4c3a' }}
                    title="Audit Activity"
                    onClick={() => setViewingActivityUser(member)}
                  >
                    🔍
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filteredTeam.length === 0 && (
          <div className="adm-empty-state-full" style={{ gridColumn: '1 / -1' }}>
            No accounts found matching filters
          </div>
        )}
      </div>

      {/* Add User Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Create Operational User" size="md">
        <form onSubmit={handleAddMemberSubmit} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Full Name *</label>
            <input 
              className="adm-input" 
              required 
              value={form.name} 
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} 
              placeholder="e.g. Anand Sharma" 
            />
          </div>

          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Work Email Address *</label>
              <input 
                type="email" 
                className="adm-input" 
                required 
                value={form.email} 
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} 
                placeholder="email@ebrave.in" 
              />
            </div>
            <div className="adm-form-group">
              <label>Phone Number</label>
              <input 
                className="adm-input" 
                value={form.phone} 
                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} 
                placeholder="98XXXXXXXX" 
              />
            </div>
          </div>

          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>System Role *</label>
              <select 
                className="adm-select" 
                value={form.role} 
                onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
              >
                <option value="Counselor">Counselor</option>
                <option value="Operations Manager">Operations Manager</option>
                <option value="Content Manager">Content Manager</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Department / Team</label>
              <input 
                className="adm-input" 
                value={form.department} 
                onChange={e => setForm(prev => ({ ...prev, department: e.target.value }))} 
                placeholder="e.g. Counseling, Operations" 
              />
            </div>
          </div>

          {form.role === 'Counselor' && (
            <div className="adm-form-group">
              <label>Counselor Specialization</label>
              <select 
                className="adm-select" 
                value={form.specialty} 
                onChange={e => setForm(prev => ({ ...prev, specialty: e.target.value }))}
              >
                <option value="">No specific specialty</option>
                <option value="Engineering & Tech">Engineering & Tech</option>
                <option value="CA & Commerce">CA & Commerce</option>
                <option value="Design & Creative">Design & Creative</option>
                <option value="Medical & Health">Medical & Health</option>
                <option value="Law & Humanities">Law & Humanities</option>
              </select>
            </div>
          )}

          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Initial Account Status</label>
              <select 
                className="adm-select" 
                value={form.status} 
                onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="Active">Active</option>
                <option value="Offline">Offline</option>
                <option value="Suspended">Suspended</option>
                <option value="Pending Invite">Pending Invite</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Temporary Password *</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input 
                  className="adm-input" 
                  required 
                  value={form.tempPassword} 
                  onChange={e => setForm(prev => ({ ...prev, tempPassword: e.target.value }))} 
                  placeholder="Temp password" 
                />
                <button type="button" className="adm-btn adm-btn-ghost" style={{ fontSize: '0.8rem' }} onClick={triggerPasswordGen}>
                  Generate
                </button>
              </div>
            </div>
          </div>

          <div className="adm-form-group">
            <label>Operational Notes</label>
            <textarea 
              className="adm-textarea" 
              rows={2} 
              value={form.notes} 
              onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))} 
              placeholder="e.g. Lead counselor for Bangalore division..." 
            />
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', borderTop: '1px solid var(--adm-border)', paddingTop: 16, marginTop: 16 }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Create User Account</button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      {editingUser && (
        <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)} title={`Edit Account — ${editingUser.name}`} size="md">
          <form onSubmit={handleSaveEdit} className="adm-form-stack">
            <div className="adm-form-group">
              <label>Full Name *</label>
              <input 
                className="adm-input" 
                required 
                value={editForm.name} 
                onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))} 
              />
            </div>

            <div className="adm-input-row">
              <div className="adm-form-group">
                <label>Work Email Address *</label>
                <input 
                  type="email" 
                  className="adm-input" 
                  required 
                  value={editForm.email} 
                  onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))} 
                />
              </div>
              <div className="adm-form-group">
                <label>Phone Number</label>
                <input 
                  className="adm-input" 
                  value={editForm.phone} 
                  onChange={e => setEditForm(prev => ({ ...prev, phone: e.target.value }))} 
                />
              </div>
            </div>

            <div className="adm-input-row">
              <div className="adm-form-group">
                <label>System Role *</label>
                <select 
                  className="adm-select" 
                  value={editForm.role} 
                  onChange={e => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="Counselor">Counselor</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <div className="adm-form-group">
                <label>Department / Team</label>
                <input 
                  className="adm-input" 
                  value={editForm.department} 
                  onChange={e => setEditForm(prev => ({ ...prev, department: e.target.value }))} 
                />
              </div>
            </div>

            {editForm.role === 'Counselor' && (
              <div className="adm-form-group">
                <label>Counselor Specialization</label>
                <select 
                  className="adm-select" 
                  value={editForm.specialty} 
                  onChange={e => setEditForm(prev => ({ ...prev, specialty: e.target.value }))}
                >
                  <option value="">No specific specialty</option>
                  <option value="Engineering & Tech">Engineering & Tech</option>
                  <option value="CA & Commerce">CA & Commerce</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Medical & Health">Medical & Health</option>
                  <option value="Law & Humanities">Law & Humanities</option>
                </select>
              </div>
            )}

            <div className="adm-form-group">
              <label>Account Status</label>
              <select 
                className="adm-select" 
                value={editForm.status} 
                onChange={e => setEditForm(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="Active">Active</option>
                <option value="Offline">Offline</option>
                <option value="Suspended">Suspended</option>
                <option value="Pending Invite">Pending Invite</option>
              </select>
            </div>

            <div className="adm-form-group">
              <label>Operational Notes</label>
              <textarea 
                className="adm-textarea" 
                rows={2} 
                value={editForm.notes} 
                onChange={e => setEditForm(prev => ({ ...prev, notes: e.target.value }))} 
              />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', borderTop: '1px solid var(--adm-border)', paddingTop: 16, marginTop: 16 }}>
              <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setEditingUser(null)}>Cancel</button>
              <button type="submit" className="adm-btn adm-btn-primary">Save User Details</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Password Reset Modal */}
      {resettingUser && (
        <Modal isOpen={!!resettingUser} onClose={() => setResettingUser(null)} title="Reset Security Credentials" size="sm">
          <div style={{ padding: '8px 0' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
              Are you sure you want to reset the password for <strong>{resettingUser.name}</strong>? A new temporary password will be initialized.
            </p>
            <div style={{ background: '#f5efe0', border: '1px solid #d4af37', padding: 16, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: '0.75rem', color: '#b48a07', fontWeight: 600 }}>TEMPORARY PASSWORD</span>
              <strong style={{ fontSize: '1.4rem', color: '#0f4c3a', letterSpacing: 1.5 }}>{generatedPassword}</strong>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="adm-btn adm-btn-ghost" onClick={() => setResettingUser(null)}>Cancel</button>
              <button className="adm-btn adm-btn-primary" onClick={handleConfirmReset}>Apply Reset Password</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete User Confirmation */}
      {deletingUser && (
        <ConfirmDialog
          isOpen={!!deletingUser}
          title="Delete Operational User Account"
          message={`Are you sure you want to permanently delete the account for ${deletingUser.name}? This action cannot be undone and will revoke all API and interface access rights.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingUser(null)}
        />
      )}

      {/* Login Activity Logs Modal */}
      {viewingActivityUser && (
        <Modal isOpen={!!viewingActivityUser} onClose={() => setViewingActivityUser(null)} title={`Auth Audit Logs — ${viewingActivityUser.name}`} size="md">
          <div style={{ padding: '8px 0' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)', marginBottom: 16 }}>
              Reviewing the last login security details and API connections for <strong>{viewingActivityUser.name}</strong>.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {getLoginHistory(viewingActivityUser.id, viewingActivityUser.name).map(log => (
                <div 
                  key={log.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: 12, 
                    borderRadius: 8, 
                    border: '1px solid var(--adm-border)',
                    background: '#ffffff'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f4c3a' }}>{log.action}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)', marginTop: 4 }}>
                      {log.device} · IP: {log.ip}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--adm-muted)' }}>{log.time}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, borderTop: '1px solid var(--adm-border)', paddingTop: 16 }}>
              <button className="adm-btn adm-btn-primary" onClick={() => setViewingActivityUser(null)}>Close Audit Logs</button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
