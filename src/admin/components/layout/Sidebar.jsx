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
      className={`adm-nav-item-wrap${item.isAI ? ' adm-nav-ai' : ''}`}
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `adm-nav-item${isActive ? ' adm-nav-item--active' : ''}${item.isAI ? ' adm-nav-item--ai' : ''}`
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
          <span className="adm-nav-badge adm-nav-badge--dot" />
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
    <aside className={`adm-sidebar${collapsed ? ' adm-sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="adm-sidebar-logo">
        <div className="adm-logo-icon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2L3 7.5V14c0 5.523 4.477 10 11 12 6.523-2 11-6.477 11-12V7.5L14 2z"
              fill="var(--adm-accent)"
              opacity="0.9"
            />
            <path
              d="M14 6L6 10v5.5c0 3.59 3.09 6.86 8 8.5 4.91-1.64 8-4.91 8-8.5V10L14 6z"
              fill="var(--adm-bg)"
            />
            <text x="10" y="19" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="var(--adm-accent)">E</text>
          </svg>
        </div>
        {!collapsed && (
          <div className="adm-logo-text">
            <span className="adm-logo-brand">E-Brave</span>
            <span className="adm-logo-sub">EOS Admin</span>
          </div>
        )}
        <button
          className="adm-collapse-btn"
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {collapsed ? (
              <path d="M4 5h10M4 9h10M4 13h10" stroke="var(--adm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M4 5h10M4 9h10M4 13h10" stroke="var(--adm-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
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
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6"
              stroke="var(--adm-text-secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
