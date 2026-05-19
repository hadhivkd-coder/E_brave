import React, { useMemo } from 'react';
import '../../admin.css';

const TYPE_CONFIG = {
  lead: {
    icon: '🎯',
    color: 'var(--adm-accent)',
    bg: 'var(--adm-accent-dim)',
  },
  session: {
    icon: '💬',
    color: 'var(--adm-blue)',
    bg: 'var(--adm-blue-dim)',
  },
  webinar: {
    icon: '📡',
    color: 'var(--adm-purple, #a855f7)',
    bg: 'rgba(168,85,247,0.15)',
  },
  payment: {
    icon: '💰',
    color: 'var(--adm-green)',
    bg: 'var(--adm-green-dim)',
  },
  system: {
    icon: '⚙️',
    color: 'var(--adm-muted)',
    bg: 'rgba(82,82,91,0.2)',
  },
  ai: {
    icon: '🤖',
    color: 'var(--adm-amber)',
    bg: 'var(--adm-amber-dim)',
  },
  task: {
    icon: '✅',
    color: 'var(--adm-green)',
    bg: 'var(--adm-green-dim)',
  },
  student: {
    icon: '🎓',
    color: 'var(--adm-blue)',
    bg: 'var(--adm-blue-dim)',
  },
};

function formatRelativeTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 5)  return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function ActivityFeed({ activities = [], maxItems = 10, showViewAll = false, onViewAll }) {
  const displayItems = useMemo(
    () => activities.slice(0, maxItems),
    [activities, maxItems]
  );

  if (!displayItems.length) {
    return (
      <div className="adm-activity-empty">
        <span>No recent activity</span>
      </div>
    );
  }

  return (
    <div className="adm-activity-feed">
      <div className="adm-activity-list">
        {displayItems.map((activity, i) => {
          const typeKey = (activity.type || 'system').toLowerCase();
          const cfg = TYPE_CONFIG[typeKey] || TYPE_CONFIG.system;
          const timeStr = formatRelativeTime(activity.timestamp || activity.createdAt || activity.time);

          return (
            <div key={activity.id || i} className="adm-activity-item">
              <div
                className="adm-activity-icon"
                style={{ background: cfg.bg, color: cfg.color }}
              >
                {cfg.icon}
              </div>
              <div className="adm-activity-body">
                <span className="adm-activity-msg">
                  {activity.message || activity.description || activity.title || 'Activity recorded'}
                </span>
                {activity.meta && (
                  <span className="adm-activity-meta">{activity.meta}</span>
                )}
              </div>
              <span className="adm-activity-time">{timeStr}</span>
            </div>
          );
        })}
      </div>
      {showViewAll && activities.length > maxItems && (
        <button className="adm-activity-view-all" onClick={onViewAll}>
          View all {activities.length} activities →
        </button>
      )}
    </div>
  );
}
