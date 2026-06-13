import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNotifications } from '../../context/NotificationContext';
import QuickAddModal from '../ui/QuickAddModal';
import '../../admin.css';

function formatTimeAgo(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function TopBar({ title, onToggleSidebar }) {
  const { user, role, logout } = useAuth();
  const { leads = [], addLead, addTask } = useData();
  const { notifications = [], unreadCount, markAllRead, markRead } = useNotifications();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddType, setQuickAddType] = useState(null); // 'lead' | 'task' | 'session'
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef(null);
  const quickAddRef = useRef(null);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        setSearchResults([]);
      }
      if (quickAddRef.current && !quickAddRef.current.contains(e.target)) {
        setShowQuickAdd(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }
    const lower = q.toLowerCase();
    const results = leads
      .filter(
        l =>
          (l.name && l.name.toLowerCase().includes(lower)) ||
          (l.phone && l.phone.includes(q)) ||
          (l.email && l.email.toLowerCase().includes(lower))
      )
      .slice(0, 6);
    setSearchResults(results);
    setShowSearch(true);
  }, [leads]);

  const handleSearchSelect = (lead) => {
    setShowSearch(false);
    setSearchQuery('');
    navigate(`/admin/leads/${lead.id}`);
  };

  const recentNotifications = notifications.slice(0, 5);

  const initials = user
    ? (user.name || user.email || 'A').slice(0, 2).toUpperCase()
    : 'A';

  return (<>
    <header className="adm-topbar">
      {/* Left: hamburger + title */}
      <div className="adm-topbar-left">
        <button
          className="adm-topbar-toggle"
          onClick={onToggleSidebar}
          title="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="adm-topbar-title">{title || 'Dashboard'}</h1>
      </div>

      {/* Center: search */}
      <div className="adm-topbar-search-wrap" ref={searchRef}>
        <div className="adm-search-box">
          <svg className="adm-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="var(--adm-muted)" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="var(--adm-muted)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            className="adm-search-input"
            type="text"
            placeholder="Search leads, students, sessions…"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            onFocus={() => searchQuery && setShowSearch(true)}
          />
          {searchQuery && (
            <button
              className="adm-search-clear"
              onClick={() => { setSearchQuery(''); setSearchResults([]); setShowSearch(false); }}
            >✕</button>
          )}
        </div>
        {showSearch && (
          <div className="adm-search-dropdown">
            {searchResults.length === 0 ? (
              <div className="adm-search-empty">No results for "{searchQuery}"</div>
            ) : (
              searchResults.map(lead => (
                <div
                  key={lead.id}
                  className="adm-search-result"
                  onClick={() => handleSearchSelect(lead)}
                >
                  <div className="adm-search-result-avatar">
                    {(lead.name || 'L').slice(0, 1).toUpperCase()}
                  </div>
                  <div className="adm-search-result-info">
                    <span className="adm-search-result-name">{lead.name}</span>
                    <span className="adm-search-result-meta">{lead.phone} · {lead.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right: actions */}
      <div className="adm-topbar-right">

        {/* Quick Add */}
        <div className="adm-topbar-action-wrap" ref={quickAddRef}>
          <button
            className="adm-topbar-btn adm-topbar-btn--accent"
            onClick={() => { setShowQuickAdd(v => !v); setShowNotifications(false); setShowUserMenu(false); }}
            title="Quick Add"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {showQuickAdd && (
            <div className="adm-dropdown adm-dropdown--quick-add">
              <div className="adm-dropdown-header">Quick Add</div>
              <button className="adm-dropdown-item" onClick={() => { setQuickAddType('lead'); setShowQuickAdd(false); }}>
                <span className="adm-dropdown-item-icon">🎯</span> Add Lead
              </button>
              <button className="adm-dropdown-item" onClick={() => { setQuickAddType('task'); setShowQuickAdd(false); }}>
                <span className="adm-dropdown-item-icon">✅</span> Add Task
              </button>
              <button className="adm-dropdown-item" onClick={() => { setQuickAddType('session'); setShowQuickAdd(false); }}>
                <span className="adm-dropdown-item-icon">💬</span> Book Session
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="adm-topbar-action-wrap" ref={notifRef}>
          <button
            className="adm-topbar-btn adm-topbar-btn--notif"
            onClick={() => { setShowNotifications(v => !v); setShowQuickAdd(false); setShowUserMenu(false); }}
            title="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2a1 1 0 00-1 1v.5A5 5 0 004 8.5v3.25L3 13h12l-1-1.25V8.5A5 5 0 0010 3.5V3a1 1 0 00-1-1z"
                stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
              />
              <path d="M7 13a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {unreadCount > 0 && (
              <span className="adm-notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <div className="adm-dropdown adm-dropdown--notif">
              <div className="adm-dropdown-header">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <button className="adm-dropdown-header-action" onClick={markAllRead}>
                    Mark all read
                  </button>
                )}
              </div>
              {recentNotifications.length === 0 ? (
                <div className="adm-dropdown-empty">No notifications</div>
              ) : (
                recentNotifications.map(n => (
                  <div
                    key={n.id}
                    className={`adm-notif-item${!n.read ? ' adm-notif-item--unread' : ''}`}
                    onClick={() => markRead(n.id)}
                  >
                    <div className="adm-notif-dot" />
                    <div className="adm-notif-body">
                      <span className="adm-notif-msg">{n.message || n.title}</span>
                      <span className="adm-notif-time">{formatTimeAgo(n.createdAt || n.timestamp)}</span>
                    </div>
                  </div>
                ))
              )}
              <div className="adm-dropdown-footer">
                <button
                  className="adm-dropdown-footer-link"
                  onClick={() => { navigate('/admin/notifications'); setShowNotifications(false); }}
                >
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="adm-topbar-action-wrap" ref={userMenuRef}>
          <button
            className="adm-topbar-user-btn"
            onClick={() => { setShowUserMenu(v => !v); setShowQuickAdd(false); setShowNotifications(false); }}
          >
            <div className="adm-topbar-avatar">{initials}</div>
            <div className="adm-topbar-user-info">
              <span className="adm-topbar-user-name">{user?.name || user?.email || 'Admin'}</span>
              <span className="adm-topbar-user-role">{role || 'Admin'}</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
              <path d="M3 4.5l3 3 3-3" stroke="var(--adm-text-secondary)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          {showUserMenu && (
            <div className="adm-dropdown adm-dropdown--user">
              <div className="adm-dropdown-header">
                <span>{user?.name || user?.email}</span>
                <span className="adm-dropdown-header-sub">{role}</span>
              </div>
              <button className="adm-dropdown-item" onClick={() => { navigate('/admin/settings/profile'); setShowUserMenu(false); }}>
                <span className="adm-dropdown-item-icon">👤</span> Profile
              </button>
              <button className="adm-dropdown-item" onClick={() => { navigate('/admin/settings'); setShowUserMenu(false); }}>
                <span className="adm-dropdown-item-icon">⚙️</span> Settings
              </button>
              <div className="adm-dropdown-divider" />
              <button
                className="adm-dropdown-item adm-dropdown-item--danger"
                onClick={() => { logout(); navigate('/admin/login'); }}
              >
                <span className="adm-dropdown-item-icon">🚪</span> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>

    {/* Global Quick Add Modal */}
    {quickAddType && (
      <QuickAddModal
        type={quickAddType}
        onClose={() => setQuickAddType(null)}
        onSuccess={() => setQuickAddType(null)}
      />
    )}
  </>);
}
