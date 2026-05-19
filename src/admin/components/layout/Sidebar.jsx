import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNotifications } from '../../context/NotificationContext';
import '../../admin.css';

const NAV_GROUPS = [
  {
    label: 'CORE',
    items: [
      { path: '/admin/dashboard',     label: 'Dashboard',         icon: '⊞',  key: 'dashboard' },
      { path: '/admin/leads',         label: 'Leads',             icon: '🎯', key: 'leads',    badge: 'newLeads' },
      { path: '/admin/students',      label: 'Students',          icon: '🎓', key: 'students' },
      { path: '/admin/counseling',    label: 'Counseling',        icon: '💬', key: 'counseling' },
      { path: '/admin/webinars',      label: 'Webinars',          icon: '📡', key: 'webinars' },
      { path: '/admin/content',       label: 'Content',           icon: '📄', key: 'content' },
      { path: '/admin/finance',       label: 'Finance',           icon: '💰', key: 'finance' },
    ],
  },
  {
    label: 'GROWTH',
    items: [
      { path: '/admin/website-intel', label: 'Website Intelligence', icon: '🌐', key: 'website-intel' },
      { path: '/admin/ads',           label: 'Ads & Campaigns',      icon: '📣', key: 'ads' },
      { path: '/admin/funnels',       label: 'Funnels',              icon: '🔻', key: 'funnels' },
      { path: '/admin/analytics',     label: 'Analytics',            icon: '📊', key: 'analytics' },
      { path: '/admin/testimonials',  label: 'Testimonials',         icon: '⭐', key: 'testimonials' },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { path: '/admin/team',          label: 'Team',          icon: '👥', key: 'team' },
      { path: '/admin/tasks',         label: 'Tasks',         icon: '✅', key: 'tasks' },
      { path: '/admin/workflow',      label: 'Workflow',      icon: '⚙️', key: 'workflow' },
      { path: '/admin/notifications', label: 'Notifications', icon: '🔔', key: 'notifications', badge: 'notifications' },
    ],
  },
  {
    label: 'AI SYSTEMS',
    items: [
      { path: '/admin/eos-ai',        label: 'EOS AI',            icon: '🤖', key: 'eos-ai',    isAI: true },
      { path: '/admin/automation',    label: 'Automation Center', icon: '⚡', key: 'automation' },
      { path: '/admin/ai-insights',   label: 'AI Insights',       icon: '🧠', key: 'ai-insights' },
      { path: '/admin/ai-reports',    label: 'AI Reports',        icon: '📈', key: 'ai-reports' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { path: '/admin/knowledge-base',    label: 'Knowledge Base',    icon: '📚', key: 'knowledge-base' },
      { path: '/admin/settings',          label: 'Settings',          icon: '🔧', key: 'settings' },
      { path: '/admin/integrations',      label: 'Integrations',      icon: '🔗', key: 'integrations' },
      { path: '/admin/permissions',       label: 'Permissions',       icon: '🛡️', key: 'permissions' },
      { path: '/admin/api-config',        label: 'API Configurations',icon: '🔑', key: 'api-config' },
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
  const { user, role, logout } = useAuth();
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

  return (
    <aside className={`adm-sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo */}
      <div className="adm-sidebar-logo">
        <div className="adm-sidebar-logo-icon">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2L3 7.5V14c0 5.523 4.477 10 11 12 6.523-2 11-6.477 11-12V7.5L14 2z"
              fill="#0f4c3a"
              opacity="0.9"
            />
            <path
              d="M14 6L6 10v5.5c0 3.59 3.09 6.86 8 8.5 4.91-1.64 8-4.91 8-8.5V10L14 6z"
              fill="#d4af37"
            />
          </svg>
        </div>
        {!collapsed && (
          <div className="adm-sidebar-logo-text">
            <span className="adm-sidebar-logo-brand">E-Brave</span>
            <span className="adm-sidebar-logo-sub">EOS</span>
          </div>
        )}
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

      {/* Nav */}
      <nav className="adm-sidebar-nav">
        {NAV_GROUPS.map(group => (
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
      </nav>

      {/* User Footer */}
      <div className="adm-sidebar-footer">
        <div className="adm-user-avatar">{initials}</div>
        {!collapsed && (
          <div className="adm-user-info">
            <span className="adm-user-name">{user?.name || user?.email || 'Admin'}</span>
            <span className="adm-user-role">{role || 'Admin'}</span>
          </div>
        )}
        <button
          className="adm-logout-btn"
          onClick={handleLogout}
          title="Logout"
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
