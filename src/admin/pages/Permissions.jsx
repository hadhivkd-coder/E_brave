import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';

const ROLES = ['Super Admin', 'Operations Manager', 'Counselor', 'Content Manager'];

const PERMISSIONS_MATRIX = {
  'Dashboard': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': true, 'Content Manager': true },
  'Leads': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': true, 'Content Manager': false },
  'Students': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': true, 'Content Manager': false },
  'Counseling': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': true, 'Content Manager': false },
  'Webinars': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'Content': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': true },
  'Finance': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'Website Intelligence': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'Ads & Campaigns': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'Analytics': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': true },
  'Team': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'Tasks': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': true, 'Content Manager': true },
  'Workflow': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'Notifications': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': true, 'Content Manager': true },
  'EOS AI': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': true, 'Content Manager': true },
  'Automation Center': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'AI Insights': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'AI Reports': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': false, 'Content Manager': false },
  'Knowledge Base': { 'Super Admin': true, 'Operations Manager': true, 'Counselor': true, 'Content Manager': true },
  'Settings': { 'Super Admin': true, 'Operations Manager': false, 'Counselor': false, 'Content Manager': false },
  'Integrations': { 'Super Admin': true, 'Operations Manager': false, 'Counselor': false, 'Content Manager': false },
  'Permissions': { 'Super Admin': true, 'Operations Manager': false, 'Counselor': false, 'Content Manager': false },
  'API Configurations': { 'Super Admin': true, 'Operations Manager': false, 'Counselor': false, 'Content Manager': false },
};

const ROLE_DESCRIPTIONS = {
  'Super Admin': 'Full access to all system features including security, integrations, and permissions.',
  'Operations Manager': 'Access to all operational modules. Cannot change system settings or permissions.',
  'Counselor': 'Access to leads, students, counseling sessions, EOS AI, and knowledge base.',
  'Content Manager': 'Access to content pipeline, analytics, tasks, notifications, and EOS AI.',
};

const ROLE_COLORS = {
  'Super Admin': '#ef4444',
  'Operations Manager': '#6366f1',
  'Counselor': '#10b981',
  'Content Manager': '#3b82f6',
};

export default function Permissions() {
  const { role } = useAuth();
  const [matrix, setMatrix] = useState(PERMISSIONS_MATRIX);
  const [saved, setSaved] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleToggle = (permission, roleKey) => {
    if (role !== 'Super Admin') return;
    if (roleKey === 'Super Admin') return; // Can't restrict Super Admin
    setMatrix(m => ({
      ...m,
      [permission]: { ...m[permission], [roleKey]: !m[permission][roleKey] }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getRolePermCount = (roleKey) => Object.values(matrix).filter(p => p[roleKey]).length;

  return (
    <AdminLayout title="Permissions">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Permissions & Access Control</h1>
          <p className="adm-page-subtitle">Manage role-based access for all system modules</p>
        </div>
        {role === 'Super Admin' && (
          <button className={`adm-btn adm-btn-primary`} onClick={handleSave}>
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        )}
      </div>

      {role !== 'Super Admin' && (
        <div className="adm-alert adm-alert-warning">
          <span>🔒</span>
          <span>Only Super Admins can modify permissions. You are viewing in read-only mode.</span>
        </div>
      )}

      {/* Role Overview Cards */}
      <div className="adm-permissions-roles">
        {ROLES.map(r => (
          <div
            key={r}
            className={`adm-role-card ${selectedRole === r ? 'adm-role-card-selected' : ''}`}
            onClick={() => setSelectedRole(selectedRole === r ? null : r)}
            style={{ borderTop: `3px solid ${ROLE_COLORS[r]}` }}
          >
            <div className="adm-role-card-header">
              <span className="adm-role-badge" style={{ background: `${ROLE_COLORS[r]}20`, color: ROLE_COLORS[r] }}>{r}</span>
              <span className="adm-role-perm-count">{getRolePermCount(r)}/{Object.keys(matrix).length} modules</span>
            </div>
            <p className="adm-role-desc">{ROLE_DESCRIPTIONS[r]}</p>
            <div className="adm-role-progress-track">
              <div className="adm-role-progress-bar" style={{ width: `${(getRolePermCount(r) / Object.keys(matrix).length) * 100}%`, background: ROLE_COLORS[r] }} />
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix Table */}
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">Module Access Matrix</h3>
          <p className="adm-card-subtitle">Toggle permissions per role. Super Admin always has full access.</p>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table adm-permissions-table">
            <thead>
              <tr>
                <th>Module</th>
                {ROLES.map(r => (
                  <th key={r} style={{ textAlign: 'center' }}>
                    <span className="adm-role-th" style={{ color: ROLE_COLORS[r] }}>{r}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(matrix).map(([permission, rolePerms]) => (
                <tr key={permission} className={selectedRole && !rolePerms[selectedRole] ? 'adm-tr-restricted' : ''}>
                  <td className="adm-td-name">{permission}</td>
                  {ROLES.map(r => (
                    <td key={r} style={{ textAlign: 'center' }}>
                      {r === 'Super Admin' ? (
                        <span className="adm-perm-check adm-perm-check-locked">✓</span>
                      ) : (
                        <button
                          className={`adm-perm-toggle ${rolePerms[r] ? 'adm-perm-on' : 'adm-perm-off'}`}
                          onClick={() => handleToggle(permission, r)}
                          disabled={role !== 'Super Admin'}
                          title={rolePerms[r] ? 'Click to revoke' : 'Click to grant'}
                        >
                          {rolePerms[r] ? '✓' : '✕'}
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
