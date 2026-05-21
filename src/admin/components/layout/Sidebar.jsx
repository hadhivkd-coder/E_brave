import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNotifications } from '../../context/NotificationContext';
import EbraveLogo from '../../../components/icons/EbraveLogo';
import '../../admin.css';

const NAV_GROUPS = [
  {
    label: 'OPERATIONS',
    items: [
      { path: '/admin/dashboard',     label: 'Dashboard',         icon: '⊞',  key: 'dashboard' },
      { path: '/admin/leads',         label: 'Leads',             icon: '🎯', key: 'leads',    badge: 'newLeads',    permission: 'leads' },
      { path: '/admin/students',      label: 'Students',          icon: '🎓', key: 'students', permission: 'students' },
      { path: '/admin/counseling',    label: 'Counseling',        icon: '💬', key: 'counseling', permission: 'counseling' },
      { path: '/admin/tasks',         label: 'Tasks',             icon: '✅', key: 'tasks',     permission: 'tasks' },
    ],
  },
  {
    label: 'MARKETING',
    items: [
      { path: '/admin/webinars',      label: 'Webinars',          icon: '📡', key: 'webinars', permission: 'webinars' },
      { path: '/admin/campaigns',     label: 'Ads & Campaigns',   icon: '📣', key: 'campaigns', permission: 'campaigns' },
      { path: '/admin/content',       label: 'Content',           icon: '📄', key: 'content',  permission: 'content' },
    ],
  },
  {
    label: 'TEAM',
    items: [
      { path: '/admin/team',          label: 'Team',              icon: '👥', key: 'team',          permission: 'team' },
      { path: '/admin/finance',       label: 'Finance',           icon: '💰', key: 'finance',       permission: 'finance' },
      { path: '/admin/notifications', label: 'Notifications',     icon: '🔔', key: 'notifications', badge: 'notifications', permission: 'notifications' },
    ],
  },
  {
    label: 'AI ASSISTANT',
    items: [
      { path: '/admin/eos-ai',        label: 'EOS AI',            icon: '🤖', key: 'eos-ai',    isAI: true, permission: 'eos_ai' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { path: '/admin/knowledge-base',    label: 'Knowledge Base',    icon: '📚', key: 'knowledge-base', permission: 'knowledge_base' },
      { path: '/admin/integrations',      label: 'Integrations',      icon: '🔗', key: 'integrations',   permission: 'integrations' },
      { path: '/admin/permissions',       label: 'Permissions',       icon: '🛡️', key: 'permissions',    permission: 'permissions' },
      { path: '/admin/settings',          label: 'Settings',          icon: '🔧', key: 'settings',       permission: 'settings' },
    ],
  },
];

function NavItemEl({ item, collapsed, newLeadsCount, unreadCount }) {
  const [hovered, setHovered] = useState(false);

  let badgeValue = null;
  if (item.badge === 'newLeads' && newLeadsCount > 0) badgeValue = newLeadsCount;
  if (item.badge === 'notifications' && unreadCount > 0) badgeValue = unreadCount;

  return (
    <div
      className={`adm-nav-item-wrap${item.isAI ? ' is-ai-wrap' : ''}`}
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `adm-nav-item${isActive ? ' active' : ''}${item.isAI ? ' is-ai' : ''}`
        }
      >
        <span className="adm-nav-icon">{item.icon}</span>
        {!collapsed && (
          <span className="adm-nav-label">{item.label}</span>
        )}
        {!collapsed && badgeValue != null && (
          <span className="adm-nav-badge">{badgeValue > 99 ? '99+' : badgeValue}</span>
        )}
        {collapsed && badgeValue != null && (
          <span className="adm-nav-badge-dot" />
        )}
      </NavLink>
      {collapsed && hovered && (
        <div className="adm-nav-tooltip">{item.label}</div>
      )}
    </div>
  );
}

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user, role, logout, hasPermission } = useAuth();
  const { leads } = useData();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const newLeadsCount = Array.isArray(leads)
    ? leads.filter(l => l.status === 'New Lead' || l.status === 'new').length
    : 0;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const initials = user
    ? (user.name || user.email || 'A').slice(0, 2).toUpperCase()
    : 'A';

  // Filter groups and items based on permissions dynamically
  const filteredNavGroups = NAV_GROUPS.map(group => {
    const visibleItems = group.items.filter(item => {
      if (item.permission) {
        return hasPermission(item.permission);
      }
      return true; // Always allow dashboard
    });
    return { ...group, items: visibleItems };
  }).filter(group => group.items.length > 0);

  return (
    <aside className={`adm-sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo */}
      <div className="adm-sidebar-logo" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Link 
          to="/admin/dashboard" 
          className="adm-sidebar-logo-link"
          style={{ display: 'flex', gap: 10, alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
          title="Go to Dashboard"
        >
          <div 
            className="adm-sidebar-logo-icon"
            style={{
              background: 'var(--adm-accent)',
              borderRadius: '8px',
              padding: '5px',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <EbraveLogo width={18} height={18} />
          </div>
          {!collapsed && (
            <div className="adm-sidebar-logo-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="adm-sidebar-logo-brand" style={{ color: 'var(--adm-accent)', fontSize: '15px', fontWeight: 800 }}>
                E-<em style={{ fontStyle: 'italic', fontWeight: 800 }}>Brave</em>
              </span>
              <span 
                className="adm-badge adm-badge-green" 
                style={{ 
                  fontSize: '8px', 
                  padding: '1px 4px', 
                  background: 'rgba(15, 76, 58, 0.08)', 
                  color: 'var(--adm-accent)', 
                  border: 'none', 
                  letterSpacing: '0.05em', 
                  fontWeight: 800 
                }}
              >
                EOS
              </span>
            </div>
          )}
        </Link>
        <button
          className="adm-sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? (
              <path d="M9 18l6-6-6-6" />
            ) : (
              <path d="M15 19l-7-7 7-7" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav - changed to div to prevent index.css nav selector bleed */}
      <div className="adm-sidebar-nav" role="navigation">
        {filteredNavGroups.map(group => (
          <div key={group.label} className="adm-nav-group">
            {!collapsed && (
              <span className="adm-nav-group-label">{group.label}</span>
            )}
            {group.items.map(item => (
              <NavItemEl
                key={item.key}
                item={item}
                collapsed={collapsed}
                newLeadsCount={newLeadsCount}
                unreadCount={unreadCount}
              />
            ))}
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="adm-sidebar-footer">
        <div className="adm-user-avatar" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Click to Switch Account">{initials}</div>
        {!collapsed && (
          <div className="adm-user-info">
            <span className="adm-user-name">{user?.name || user?.email || 'Admin'}</span>
            <span className="adm-user-role" style={{ color: 'var(--adm-text-secondary)', fontSize: '10px' }}>{role || 'Admin'}</span>
            <button 
              className="adm-switch-account-btn"
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--adm-red)',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                textDecoration: 'underline',
                marginTop: '4px',
                display: 'block'
              }}
            >
              Switch Account
            </button>
          </div>
        )}
        <button
          className="adm-logout-btn"
          onClick={handleLogout}
          title="Logout / Switch Account"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
