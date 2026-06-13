import React from 'react';
import Badge from '../ui/Badge';

export default function ActionQueueList({ items, title, onSelect, selectedId }) {
  if (!items || items.length === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: 'var(--adm-text-secondary)', background: 'var(--adm-bg)', borderRadius: '12px', border: '1px dashed var(--adm-border)' }}>
        <p>No tasks in this queue. You're all caught up!</p>
      </div>
    );
  }

  return (
    <div className="adm-queue-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--adm-text-secondary)', margin: '0 0 8px 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title} ({items.length})
      </h3>
      {items.map(item => {
        const isSelected = selectedId === (item.person_id || item.id);
        const name = item.name || item.student_name || 'Unknown';
        
        // Sales Queue item
        const badgeColor = item.lifecycle_stage === 'New Lead' ? 'indigo' : 'amber';
        const displayLabel = item.lifecycle_stage || item.session_type || 'Unknown';

        return (
          <div 
            key={item.id} 
            onClick={() => onSelect(item)}
            style={{ 
              padding: '16px', 
              background: isSelected ? 'var(--adm-surface)' : 'var(--adm-bg)',
              border: `1px solid ${isSelected ? 'var(--adm-accent)' : 'var(--adm-border)'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? '0 0 0 1px var(--adm-accent)' : 'none'
            }}
            onMouseEnter={e => { if(!isSelected) e.currentTarget.style.borderColor = 'var(--adm-border-hover)' }}
            onMouseLeave={e => { if(!isSelected) e.currentTarget.style.borderColor = 'var(--adm-border)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>{name}</div>
              <Badge variant={badgeColor} size="sm">{displayLabel}</Badge>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--adm-text-secondary)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span>{item.phone || item.status}</span>
                {item.source && (
                  <span style={{ color: 'var(--adm-accent)', fontWeight: 500 }}>
                    1-on-1 Counseling ({item.source})
                  </span>
                )}
              </div>
              {item.next_action_due && (
                <span style={{ color: new Date(item.next_action_due) < new Date() ? 'var(--adm-red)' : 'inherit' }}>
                  Due: {new Date(item.next_action_due).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
