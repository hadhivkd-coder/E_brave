import React from 'react';

export default function TimelineFeed({ activities }) {
  if (!activities || activities.length === 0) {
    return <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)', padding: '16px' }}>No activity history found.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px' }}>
      {activities.map((act, index) => (
        <div key={act.id} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
          {index !== activities.length - 1 && (
            <div style={{ position: 'absolute', left: '15px', top: '24px', bottom: '-16px', width: '2px', background: 'var(--adm-border)' }} />
          )}
          
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '50%', background: 'var(--adm-surface)', 
            border: '2px solid var(--adm-border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', zIndex: 1
          }}>
            {act.action === 'Created' ? '✨' : act.action === 'Call Logged' ? '📞' : '📝'}
          </div>
          
          <div style={{ flex: 1, paddingBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>{act.action}</span>
              <span style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>
                {new Date(act.created_at).toLocaleString()}
              </span>
            </div>
            {act.details && act.details.note && (
              <div style={{ background: 'var(--adm-bg)', padding: '12px', borderRadius: '8px', fontSize: '13px', border: '1px solid var(--adm-border)' }}>
                {act.details.note}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
