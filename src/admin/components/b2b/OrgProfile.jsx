import React, { useState, useEffect } from 'react';
import Badge from '../ui/Badge';
import TimelineFeed from '../lifecycle/TimelineFeed';

export default function OrgProfile({ organization, onClose }) {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (organization) {
      // Mock loading timeline for the organization
      setLoading(true);
      setTimeout(() => {
        setActivities([
          { id: 1, action_type: 'Initial Outreach', payload: { note: 'Sent partnership proposal via email.' }, created_at: new Date(Date.now() - 86400000).toISOString() },
          { id: 2, action_type: 'Meeting Booked', payload: { note: 'Zoom call scheduled with Principal.' }, created_at: new Date(Date.now() - 3600000).toISOString() }
        ]);
        setLoading(false);
      }, 500);
    }
  }, [organization]);

  const handleQuickLog = (outcome) => {
    if (!note.trim() && outcome !== 'Emailed') {
      alert("Please enter a note before logging.");
      return;
    }
    
    const newActivity = {
      id: Date.now(),
      action_type: 'Log Added',
      payload: { outcome, note },
      created_at: new Date().toISOString()
    };

    setActivities([newActivity, ...activities]);
    setNote('');
  };

  if (!organization) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-text-secondary)' }}>
        Select a partner organization to view details.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--adm-surface)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--adm-border)' }}>
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--adm-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>{organization.name}</h2>
            {organization.tier === 'Enterprise' && <Badge variant="gold" size="sm">Enterprise</Badge>}
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--adm-text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              {organization.type}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
              {organization.city}
            </span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--adm-text-secondary)' }}>✕</button>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '24px', background: 'var(--adm-bg)', borderBottom: '1px solid var(--adm-border)' }}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--adm-text-secondary)', marginBottom: '12px' }}>B2B Action</h3>
        <textarea 
          placeholder="Enter meeting notes or updates..."
          value={note}
          onChange={e => setNote(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-surface)', color: 'var(--adm-text)', minHeight: '80px', marginBottom: '12px', resize: 'vertical' }}
        />
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => handleQuickLog('Meeting Logged')}
            className="adm-btn adm-btn-primary" 
            style={{ flex: 1 }}
          >🤝 Log Meeting</button>
          
          <button 
            onClick={() => handleQuickLog('Emailed')}
            className="adm-btn" 
            style={{ flex: 1, background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', color: 'var(--adm-text)' }}
          >✉️ Sent Email</button>
        </div>
      </div>

      {/* Key Contacts (Mocked for Demo) */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--adm-border)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Key Contacts</span>
          <button className="adm-btn adm-btn-sm" style={{ padding: '4px 8px', fontSize: '12px' }}>+ Add</button>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ padding: '12px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Dr. Sarah Jenkins</div>
              <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>Principal • sarah@example.edu</div>
            </div>
            <Badge variant="blue" size="sm">Decision Maker</Badge>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Institutional Timeline</h3>
        {loading ? (
          <div style={{ color: 'var(--adm-text-secondary)' }}>Loading history...</div>
        ) : (
          <TimelineFeed activities={activities} />
        )}
      </div>
    </div>
  );
}
