import React from 'react';
import Badge from '../ui/Badge';

export default function EventProfile({ event, onClose }) {
  if (!event) return null;

  // Extract mock config data
  const location = event.config_json?.location || 'TBA';
  const capacity = event.config_json?.capacity || 'Unlimited';
  const registered = event.config_json?.registered || 0;
  const speakers = event.config_json?.speakers || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--adm-surface)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--adm-border)' }}>
      {/* Header */}
      <div style={{ padding: '32px 24px 24px', borderBottom: '1px solid var(--adm-border)', background: 'linear-gradient(to bottom, rgba(16, 185, 129, 0.05), transparent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <Badge variant="green" size="sm">{event.type}</Badge>
              <Badge variant={event.status === 'Upcoming' ? 'blue' : 'gray'} size="sm">{event.status}</Badge>
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700 }}>{event.title}</h2>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--adm-text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
                {location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {new Date(event.start_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--adm-text-secondary)', transition: 'color 0.2s' }}>✕</button>
          )}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Logistics Snippet */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ padding: '16px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Registrations</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{registered} <span style={{ fontSize: '14px', color: 'var(--adm-text-secondary)', fontWeight: 500 }}>/ {capacity}</span></div>
          </div>
          <div style={{ padding: '16px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Confirmed</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{Math.floor(registered * 0.85)}</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Expected Show Rate</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--adm-green)' }}>85%</div>
          </div>
        </div>

        {/* Resource Management: Speakers */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Speakers & Staff</span>
            <button className="adm-btn adm-btn-sm" style={{ padding: '4px 8px', fontSize: '12px' }}>Manage Roster</button>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {speakers.map((speaker, index) => (
              <div key={index} style={{ padding: '12px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ background: 'var(--adm-surface)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '13px', color: 'var(--adm-text)', border: '1px solid var(--adm-border)' }}>
                    {speaker.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{speaker}</div>
                    <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>Guest Speaker</div>
                  </div>
                </div>
                <Badge variant="indigo" size="sm">Confirmed</Badge>
              </div>
            ))}
            {speakers.length === 0 && (
              <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)', fontStyle: 'italic' }}>No speakers assigned yet.</div>
            )}
          </div>
        </div>

        {/* Attendee Roster */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Attendee Roster</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="adm-btn adm-btn-sm" style={{ padding: '4px 8px', fontSize: '12px' }}>Export List</button>
              <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ padding: '4px 8px', fontSize: '12px' }}>Open Check-in</button>
            </div>
          </h3>
          <div style={{ background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '8px', padding: '24px', textAlign: 'center', color: 'var(--adm-text-secondary)', fontSize: '13px' }}>
            Querying `person_engagements` table to load {registered} attendees...
            <div style={{ marginTop: '12px' }}>
               <span className="adm-spinner" style={{ width: '16px', height: '16px' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
