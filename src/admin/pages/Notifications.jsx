import React, { useState, useMemo } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';

const TYPE_ICONS = {
  lead: '🎯',
  webinar: '🎬',
  'follow-up': '⏰',
  followup: '⏰',
  system: '⚙️',
  ai: '🤖',
  task: '✅',
  payment: '💰',
  error: '⚠️',
};

const CATEGORIES = ['All', 'Leads', 'Webinars', 'System', 'AI Alerts', 'Tasks'];

const CATEGORY_TYPE_MAP = {
  All: null,
  Leads: ['lead'],
  Webinars: ['webinar'],
  System: ['system', 'error'],
  'AI Alerts': ['ai'],
  Tasks: ['task', 'follow-up', 'followup'],
};

function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function priorityColor(priority) {
  if (priority === 'high') return 'red';
  if (priority === 'medium') return 'amber';
  return 'default';
}

const FALLBACK_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'lead',
    title: 'New Lead: Arjun Mehta',
    message: 'A new lead from Delhi has submitted the career counseling form. Follow up within 24 hours.',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    priority: 'high',
    read: false,
    category: 'Leads',
  },
  {
    id: 'n2',
    type: 'webinar',
    title: 'Webinar Registration Spike',
    message: '47 new registrations for "Career Discovery Webinar" in the last 2 hours.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    read: false,
    category: 'Webinars',
  },
  {
    id: 'n3',
    type: 'ai',
    title: 'EOS AI: Behavior Pattern Detected',
    message: 'AI detected an unusual drop in engagement on the /counseling page. Bounce rate up 18% today.',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    priority: 'high',
    read: false,
    category: 'AI Alerts',
  },
  {
    id: 'n4',
    type: 'task',
    title: 'Task Overdue: Follow up with Priya S.',
    message: 'Task assigned to Rahul was due yesterday. Lead has not been contacted.',
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    read: false,
    category: 'Tasks',
  },
  {
    id: 'n5',
    type: 'system',
    title: 'System: Backup Completed',
    message: 'Automated database backup completed successfully at 3:00 AM.',
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    read: true,
    category: 'System',
  },
  {
    id: 'n6',
    type: 'follow-up',
    title: 'Follow-up Reminder: Vikram T.',
    message: 'Lead Vikram Thakur has not been contacted in 3 days. Status: Warm.',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    read: false,
    category: 'Leads',
  },
  {
    id: 'n7',
    type: 'payment',
    title: 'Payment Received: ₹15,000',
    message: 'Student Neha Sharma made a payment for the 3-month counseling package.',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    read: true,
    category: 'System',
  },
  {
    id: 'n8',
    type: 'error',
    title: 'Form Submission Error Detected',
    message: 'The consultation form on /contact returned 500 errors for 3 users in the last hour.',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    read: false,
    category: 'System',
  },
  {
    id: 'n9',
    type: 'ai',
    title: 'AI Report Ready: Weekly Insights',
    message: 'Your weekly AI-generated performance report is ready. Click to view insights.',
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    read: true,
    category: 'AI Alerts',
  },
  {
    id: 'n10',
    type: 'task',
    title: 'Task Completed: Webinar Setup',
    message: 'Counselor Divya marked "Prepare Career Discovery slides" as complete.',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    priority: 'low',
    read: true,
    category: 'Tasks',
  },
];

export default function Notifications() {
  let ctxNotifications = null;
  let ctxMarkRead = null;
  let ctxMarkAllRead = null;

  try {
    const ctx = useNotifications();
    ctxNotifications = ctx.notifications;
    ctxMarkRead = ctx.markRead || ctx.markNotificationRead;
    ctxMarkAllRead = ctx.markAllRead;
  } catch (_) {}

  const [localNotifs, setLocalNotifs] = useState(FALLBACK_NOTIFICATIONS);
  const notifications = ctxNotifications && ctxNotifications.length > 0 ? ctxNotifications : localNotifs;

  const [activeCategory, setActiveCategory] = useState('All');
  const [filterRead, setFilterRead] = useState('all'); // 'all' | 'unread' | 'read'
  const [selectedId, setSelectedId] = useState(null);

  const markRead = (id) => {
    if (ctxMarkRead) {
      ctxMarkRead(id);
    } else {
      setLocalNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const markAllRead = () => {
    if (ctxMarkAllRead) {
      ctxMarkAllRead();
    } else {
      setLocalNotifs(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const clearAllRead = () => {
    setLocalNotifs(prev => prev.filter(n => !n.read));
  };

  const handleClickNotif = (notif) => {
    markRead(notif.id);
    setSelectedId(selectedId === notif.id ? null : notif.id);
  };

  const filtered = useMemo(() => {
    let list = notifications;
    const types = CATEGORY_TYPE_MAP[activeCategory];
    if (types) {
      list = list.filter(n => types.includes(n.type));
    }
    if (filterRead === 'unread') list = list.filter(n => !n.read);
    if (filterRead === 'read') list = list.filter(n => n.read);
    return list;
  }, [notifications, activeCategory, filterRead]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const selectedNotif = filtered.find(n => n.id === selectedId);

  return (
    <AdminLayout>
      <div className="adm-page-header" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: 'var(--adm-text)' }}>
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span style={{
              background: 'var(--adm-accent)',
              color: '#fff',
              borderRadius: '999px',
              padding: '2px 10px',
              fontSize: '12px',
              fontWeight: 700,
            }}>
              {unreadCount} unread
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="adm-btn adm-btn-ghost" onClick={clearAllRead}>Clear Read</button>
          <button className="adm-btn adm-btn-primary" onClick={markAllRead}>Mark All Read</button>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelectedId(null); }}
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--adm-accent)' : 'var(--adm-border)',
              background: activeCategory === cat ? 'var(--adm-accent-dim)' : 'transparent',
              color: activeCategory === cat ? 'var(--adm-accent)' : 'var(--adm-text-secondary)',
              fontSize: '13px',
              fontWeight: activeCategory === cat ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {cat}
          </button>
        ))}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
          {['all', 'unread', 'read'].map(f => (
            <button
              key={f}
              onClick={() => setFilterRead(f)}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: filterRead === f ? 'var(--adm-accent)' : 'var(--adm-border)',
                background: filterRead === f ? 'var(--adm-accent-dim)' : 'transparent',
                color: filterRead === f ? 'var(--adm-accent)' : 'var(--adm-text-secondary)',
                fontSize: '12px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {/* Notification List */}
        <div style={{ flex: selectedNotif ? '0 0 420px' : 1 }}>
          {filtered.length === 0 ? (
            <div className="adm-card" style={{
              padding: '60px 24px',
              textAlign: 'center',
              color: 'var(--adm-text-secondary)',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔔</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--adm-text)', marginBottom: '8px' }}>
                You're all caught up!
              </div>
              <div style={{ fontSize: '14px' }}>No notifications in this category.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filtered.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleClickNotif(notif)}
                  className="adm-card"
                  style={{
                    padding: '14px 16px',
                    cursor: 'pointer',
                    borderLeft: notif.read ? '3px solid transparent' : '3px solid var(--adm-accent)',
                    background: selectedId === notif.id
                      ? 'var(--adm-card-hover)'
                      : notif.read
                        ? 'var(--adm-card)'
                        : 'var(--adm-card)',
                    opacity: notif.read ? 0.75 : 1,
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '22px', lineHeight: 1, marginTop: '2px' }}>
                      {TYPE_ICONS[notif.type] || '🔔'}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontWeight: notif.read ? 500 : 700,
                          fontSize: '14px',
                          color: 'var(--adm-text)',
                        }}>
                          {notif.title}
                        </span>
                        {!notif.read && (
                          <span style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: 'var(--adm-accent)', display: 'inline-block', flexShrink: 0,
                          }} />
                        )}
                        <Badge
                          variant={priorityColor(notif.priority)}
                          size="sm"
                          style={{ marginLeft: 'auto' }}
                        >
                          {notif.priority}
                        </Badge>
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: '13px',
                        color: 'var(--adm-text-secondary)',
                        lineHeight: 1.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {notif.message}
                      </p>
                      <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--adm-muted)' }}>
                        {timeAgo(notif.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedNotif && (
          <div className="adm-card" style={{ flex: 1, padding: '24px', position: 'sticky', top: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <span style={{ fontSize: '36px' }}>{TYPE_ICONS[selectedNotif.type] || '🔔'}</span>
              <button
                className="adm-btn adm-btn-ghost"
                onClick={() => setSelectedId(null)}
                style={{ fontSize: '18px', padding: '4px 10px' }}
              >
                ✕
              </button>
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: 'var(--adm-text)' }}>
              {selectedNotif.title}
            </h2>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Badge variant={priorityColor(selectedNotif.priority)}>
                {selectedNotif.priority} priority
              </Badge>
              <span style={{ fontSize: '12px', color: 'var(--adm-muted)', alignSelf: 'center' }}>
                {timeAgo(selectedNotif.createdAt)}
              </span>
            </div>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'var(--adm-text-secondary)',
              margin: '0 0 20px',
            }}>
              {selectedNotif.message}
            </p>
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--adm-surface)',
              fontSize: '12px',
              color: 'var(--adm-muted)',
            }}>
              <div>Type: <strong style={{ color: 'var(--adm-text-secondary)' }}>{selectedNotif.type}</strong></div>
              <div style={{ marginTop: '4px' }}>Category: <strong style={{ color: 'var(--adm-text-secondary)' }}>{selectedNotif.category || 'General'}</strong></div>
              <div style={{ marginTop: '4px' }}>Status: <strong style={{ color: 'var(--adm-green)' }}>Read</strong></div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
