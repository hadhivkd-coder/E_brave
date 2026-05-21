import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';

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

const MODULE_GROUPS = {
  'Core Modules': ['Dashboard', 'Leads', 'Students', 'Counseling', 'Webinars'],
  'Operational': ['Content', 'Finance', 'Website Intelligence', 'Ads & Campaigns', 'Analytics', 'Team', 'Tasks', 'Workflow', 'Notifications', 'Knowledge Base'],
  'AI & Automation': ['EOS AI', 'Automation Center', 'AI Insights', 'AI Reports'],
  'System & Admin': ['Settings', 'Integrations', 'Permissions', 'API Configurations'],
};

const MODULE_ICONS = {
  'Dashboard': '🏠', 'Leads': '🎯', 'Students': '🎓', 'Counseling': '🧭',
  'Webinars': '🎙️', 'Content': '✍️', 'Finance': '💰', 'Website Intelligence': '🌐',
  'Ads & Campaigns': '📢', 'Analytics': '📊', 'Team': '👥', 'Tasks': '✅',
  'Workflow': '⚡', 'Notifications': '🔔', 'EOS AI': '🤖', 'Automation Center': '🔄',
  'AI Insights': '💡', 'AI Reports': '📈', 'Knowledge Base': '📚', 'Settings': '⚙️',
  'Integrations': '🔌', 'Permissions': '🛡️', 'API Configurations': '🔑',
};

const GROUP_ICONS = {
  'Core Modules': '🗂️',
  'Operational': '⚙️',
  'AI & Automation': '🤖',
  'System & Admin': '🔐',
};

const ROLE_META = {
  'Super Admin': {
    icon: '🔴',
    color: '#ef4444',
    colorDim: 'rgba(239,68,68,0.10)',
    colorBorder: 'rgba(239,68,68,0.35)',
    description: 'Full access to all system features including security, integrations, and permissions.',
  },
  'Operations Manager': {
    icon: '🟣',
    color: '#6366f1',
    colorDim: 'rgba(99,102,241,0.10)',
    colorBorder: 'rgba(99,102,241,0.35)',
    description: 'Access to all operational modules. Cannot change system settings or permissions.',
  },
  'Counselor': {
    icon: '🟢',
    color: '#10b981',
    colorDim: 'rgba(16,185,129,0.10)',
    colorBorder: 'rgba(16,185,129,0.35)',
    description: 'Access to leads, students, counseling sessions, EOS AI, and knowledge base.',
  },
  'Content Manager': {
    icon: '🔵',
    color: '#3b82f6',
    colorDim: 'rgba(59,130,246,0.10)',
    colorBorder: 'rgba(59,130,246,0.35)',
    description: 'Access to content pipeline, analytics, tasks, notifications, and EOS AI.',
  },
};

const TOTAL_MODULES = Object.keys(PERMISSIONS_MATRIX).length;

/* ── iOS-style Toggle Switch ── */
function ToggleSwitch({ checked, onChange, disabled, locked }) {
  const [hovered, setHovered] = useState(false);

  if (locked) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          fontSize: '20px',
          filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))',
          title: 'Always enabled for Super Admin',
        }}>🔒</span>
      </div>
    );
  }

  return (
    <div
      onClick={disabled ? undefined : onChange}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div style={{
        position: 'relative',
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        background: checked ? 'var(--adm-green)' : 'rgba(0,0,0,0.15)',
        transition: 'background 0.22s ease',
        boxShadow: checked
          ? '0 0 0 3px rgba(16,185,129,0.18), inset 0 1px 3px rgba(0,0,0,0.1)'
          : 'inset 0 1px 3px rgba(0,0,0,0.12)',
        transform: hovered && !disabled ? 'scale(1.06)' : 'scale(1)',
      }}>
        <div style={{
          position: 'absolute',
          top: '3px',
          left: checked ? '23px' : '3px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.22)',
          transition: 'left 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        }} />
      </div>
    </div>
  );
}

/* ── Role Summary Card ── */
function RoleCard({ roleKey, count, selected, onClick }) {
  const meta = ROLE_META[roleKey];
  const pct = Math.round((count / TOTAL_MODULES) * 100);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 200px',
        background: 'var(--adm-card)',
        borderRadius: 'var(--adm-radius)',
        border: selected ? `2px solid ${meta.colorBorder}` : '2px solid var(--adm-border)',
        boxShadow: selected
          ? `0 4px 24px ${meta.colorDim}, var(--adm-shadow)`
          : hovered
            ? 'var(--adm-shadow-lg)'
            : 'var(--adm-shadow)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all var(--adm-transition)',
        transform: hovered || selected ? 'translateY(-2px)' : 'none',
        position: 'relative',
      }}
    >
      {/* Colored top accent bar */}
      <div style={{
        height: '4px',
        background: `linear-gradient(90deg, ${meta.color}, ${meta.color}99)`,
        width: '100%',
      }} />

      <div style={{ padding: '18px 20px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: '22px', lineHeight: 1 }}>{meta.icon}</span>
          <div>
            <div style={{
              fontWeight: 700,
              fontSize: '14px',
              color: 'var(--adm-text)',
              lineHeight: 1.2,
            }}>{roleKey}</div>
            <div style={{
              fontSize: '12px',
              color: meta.color,
              fontWeight: 600,
              marginTop: '2px',
            }}>{count}/{TOTAL_MODULES} modules</div>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '12px',
          color: 'var(--adm-text-secondary)',
          lineHeight: 1.5,
          margin: '0 0 14px',
        }}>{meta.description}</p>

        {/* Progress bar */}
        <div style={{
          height: '6px',
          background: 'var(--adm-border)',
          borderRadius: '99px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: '99px',
            background: `linear-gradient(90deg, ${meta.color}, ${meta.color}bb)`,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{
          fontSize: '11px',
          color: 'var(--adm-text-secondary)',
          marginTop: '5px',
          textAlign: 'right',
        }}>{pct}% access</div>
      </div>

      {/* Selected indicator dot */}
      {selected && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '14px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: meta.color,
          boxShadow: `0 0 0 3px ${meta.colorDim}`,
        }} />
      )}
    </div>
  );
}

/* ── Group Section Header ── */
function GroupHeader({ label }) {
  return (
    <tr>
      <td colSpan={ROLES.length + 1} style={{ padding: '0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 20px 8px',
          background: 'var(--adm-accent-dim)',
          borderTop: '1px solid var(--adm-border)',
          borderBottom: '1px solid var(--adm-border-light)',
        }}>
          <span style={{ fontSize: '15px' }}>{GROUP_ICONS[label]}</span>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--adm-accent)',
          }}>{label}</span>
        </div>
      </td>
    </tr>
  );
}

/* ── Main Component ── */
export default function Permissions() {
  const { role } = useAuth();
  const [matrix, setMatrix] = useState(PERMISSIONS_MATRIX);
  const [saved, setSaved] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const isSuperAdmin = role === 'Super Admin';

  const handleToggle = (permission, roleKey) => {
    if (!isSuperAdmin) return;
    if (roleKey === 'Super Admin') return;
    setMatrix(m => ({
      ...m,
      [permission]: { ...m[permission], [roleKey]: !m[permission][roleKey] },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getRolePermCount = (roleKey) =>
    Object.values(matrix).filter(p => p[roleKey]).length;

  const handleRoleCardClick = (roleKey) => {
    setSelectedRole(prev => prev === roleKey ? null : roleKey);
  };

  /* Row highlight logic */
  const getRowBg = (moduleName) => {
    if (!selectedRole) return 'transparent';
    const hasAccess = matrix[moduleName][selectedRole];
    if (hasAccess) return 'rgba(16,185,129,0.04)';
    return 'rgba(225,29,72,0.04)';
  };

  const getRowBorderLeft = (moduleName) => {
    if (!selectedRole) return 'none';
    const hasAccess = matrix[moduleName][selectedRole];
    return hasAccess
      ? '3px solid rgba(16,185,129,0.3)'
      : '3px solid rgba(225,29,72,0.2)';
  };

  return (
    <AdminLayout>
      <div style={{
        minHeight: '100vh',
        background: 'var(--adm-bg)',
        padding: '32px',
      }}>

        {/* ── Page Header ── */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--adm-accent-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                border: '1px solid var(--adm-border)',
              }}>🛡️</div>
              <div>
                <h1 className="adm-page-title" style={{ margin: 0 }}>Permissions</h1>
                <p className="adm-page-subtitle" style={{ margin: 0 }}>
                  Manage role-based access control across all modules
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isSuperAdmin && (
            <button
              onClick={handleSave}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: 'var(--adm-radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px',
                background: saved
                  ? 'var(--adm-green)'
                  : 'var(--adm-accent)',
                color: '#ffffff',
                transition: 'all var(--adm-transition)',
                boxShadow: saved
                  ? '0 4px 16px rgba(16,185,129,0.35)'
                  : '0 4px 16px rgba(15,76,58,0.25)',
                transform: 'translateY(0)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = saved
                  ? '0 6px 20px rgba(16,185,129,0.45)'
                  : '0 6px 20px rgba(15,76,58,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = saved
                  ? '0 4px 16px rgba(16,185,129,0.35)'
                  : '0 4px 16px rgba(15,76,58,0.25)';
              }}
            >
              <span>{saved ? '✅' : '💾'}</span>
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>
          )}
        </div>

        {/* ── Read-Only Banner ── */}
        {!isSuperAdmin && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderRadius: 'var(--adm-radius)',
            background: 'var(--adm-amber-dim)',
            border: '1px solid rgba(217,119,6,0.2)',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '20px' }}>👁️</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--adm-amber)' }}>
                Read-Only View
              </div>
              <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
                Only Super Admins can modify role permissions. You are viewing the current configuration.
              </div>
            </div>
          </div>
        )}

        {/* ── Role Cards ── */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}>
          {ROLES.map(roleKey => (
            <RoleCard
              key={roleKey}
              roleKey={roleKey}
              count={getRolePermCount(roleKey)}
              selected={selectedRole === roleKey}
              onClick={() => handleRoleCardClick(roleKey)}
            />
          ))}
        </div>

        {/* ── Filter Hint ── */}
        {selectedRole && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            borderRadius: 'var(--adm-radius-sm)',
            background: ROLE_META[selectedRole].colorDim,
            border: `1px solid ${ROLE_META[selectedRole].colorBorder}`,
            marginBottom: '16px',
            fontSize: '13px',
            color: ROLE_META[selectedRole].color,
            fontWeight: 600,
          }}>
            <span>{ROLE_META[selectedRole].icon}</span>
            <span>Filtering view for <strong>{selectedRole}</strong> — </span>
            <span style={{ color: 'var(--adm-green)', background: 'var(--adm-green-dim)', padding: '2px 8px', borderRadius: '99px', fontSize: '12px' }}>
              🟢 Green rows = Access Granted
            </span>
            <span style={{ color: 'var(--adm-red)', background: 'var(--adm-red-dim)', padding: '2px 8px', borderRadius: '99px', fontSize: '12px' }}>
              🔴 Red rows = No Access
            </span>
            <button
              onClick={() => setSelectedRole(null)}
              style={{
                marginLeft: 'auto',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--adm-text-secondary)',
                fontSize: '13px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '6px',
              }}
            >✕ Clear</button>
          </div>
        )}

        {/* ── Permissions Matrix Table ── */}
        <div style={{
          background: 'var(--adm-card)',
          borderRadius: 'var(--adm-radius)',
          border: '1px solid var(--adm-border)',
          boxShadow: 'var(--adm-shadow)',
          overflow: 'hidden',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
          }}>
            {/* Table Head */}
            <thead>
              <tr style={{ background: 'var(--adm-accent-dim)', borderBottom: '2px solid var(--adm-border)' }}>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--adm-text-secondary)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  width: '28%',
                }}>
                  Module
                </th>
                {ROLES.map(roleKey => {
                  const meta = ROLE_META[roleKey];
                  return (
                    <th key={roleKey} style={{
                      padding: '14px 12px',
                      textAlign: 'center',
                      width: `${72 / ROLES.length}%`,
                    }}>
                      <div style={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}>
                          <span style={{ fontSize: '14px' }}>{meta.icon}</span>
                          <span style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: selectedRole === roleKey ? meta.color : 'var(--adm-text)',
                          }}>{roleKey}</span>
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: meta.color,
                          fontWeight: 600,
                          background: meta.colorDim,
                          padding: '2px 8px',
                          borderRadius: '99px',
                        }}>
                          {getRolePermCount(roleKey)}/{TOTAL_MODULES}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {Object.entries(MODULE_GROUPS).map(([groupName, modules]) => (
                <React.Fragment key={groupName}>
                  <GroupHeader label={groupName} />
                  {modules.map((moduleName, idx) => {
                    const rowBg = getRowBg(moduleName);
                    const borderLeft = getRowBorderLeft(moduleName);
                    const isEven = idx % 2 === 0;

                    return (
                      <tr
                        key={moduleName}
                        style={{
                          background: rowBg !== 'transparent'
                            ? rowBg
                            : isEven ? 'transparent' : 'var(--adm-bg)',
                          borderBottom: '1px solid var(--adm-border-light)',
                          borderLeft: borderLeft,
                          transition: 'background var(--adm-transition)',
                        }}
                      >
                        {/* Module name cell */}
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              fontSize: '18px',
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'var(--adm-accent-dim)',
                              borderRadius: '8px',
                              flexShrink: 0,
                            }}>
                              {MODULE_ICONS[moduleName]}
                            </span>
                            <span style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: 'var(--adm-text)',
                            }}>{moduleName}</span>
                          </div>
                        </td>

                        {/* Role toggle cells */}
                        {ROLES.map(roleKey => {
                          const isLocked = roleKey === 'Super Admin';
                          const hasAccess = matrix[moduleName][roleKey];
                          const isDisabled = !isSuperAdmin || isLocked;

                          return (
                            <td
                              key={roleKey}
                              style={{
                                textAlign: 'center',
                                padding: '14px 12px',
                                verticalAlign: 'middle',
                              }}
                            >
                              <ToggleSwitch
                                checked={hasAccess}
                                onChange={() => handleToggle(moduleName, roleKey)}
                                disabled={isDisabled}
                                locked={isLocked}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Table footer */}
          <div style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--adm-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--adm-accent-dim)',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '12px',
              color: 'var(--adm-text-secondary)',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '9px', borderRadius: '99px', background: 'var(--adm-green)', display: 'inline-block' }} />
                Access granted
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '9px', borderRadius: '99px', background: 'rgba(0,0,0,0.15)', display: 'inline-block' }} />
                No access
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px' }}>🔒</span>
                Always enabled (Super Admin)
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>
              {TOTAL_MODULES} total modules across {Object.keys(MODULE_GROUPS).length} groups
            </span>
          </div>
        </div>

        {/* Bottom save button for convenience */}
        {isSuperAdmin && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button
              onClick={handleSave}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: 'var(--adm-radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px',
                background: saved ? 'var(--adm-green)' : 'var(--adm-accent)',
                color: '#ffffff',
                transition: 'all var(--adm-transition)',
                boxShadow: saved
                  ? '0 4px 16px rgba(16,185,129,0.35)'
                  : '0 4px 16px rgba(15,76,58,0.25)',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; }}
            >
              <span>{saved ? '✅' : '💾'}</span>
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
