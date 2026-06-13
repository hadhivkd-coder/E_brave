import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import EventProfile from '../components/events/EventProfile';
import Badge from '../components/ui/Badge';

// Mocking the Universal Engagements Data
const MOCK_EVENTS = [
  { 
    id: '1', 
    title: 'GEMS Future Careers Fair 2026', 
    type: 'Career Fair', 
    status: 'Upcoming', 
    start_date: new Date(Date.now() + 864000000).toISOString(),
    config_json: {
      location: 'GEMS Wellington Academy, Dubai',
      capacity: 500,
      registered: 342,
      speakers: ['Dr. Sarah Jenkins', 'Alex Mercer']
    }
  },
  { 
    id: '2', 
    title: 'Parenting in the AI Age', 
    type: 'Webinar', 
    status: 'Upcoming', 
    start_date: new Date(Date.now() + 172800000).toISOString(),
    config_json: {
      location: 'Zoom (Online)',
      capacity: 1000,
      registered: 890,
      speakers: ['Marcus Johnson']
    }
  },
  { 
    id: '3', 
    title: 'Ivy League Essay Workshop', 
    type: 'Workshop', 
    status: 'Active', 
    start_date: new Date(Date.now() - 3600000).toISOString(),
    config_json: {
      location: 'E-Brave HQ, Abu Dhabi',
      capacity: 50,
      registered: 48,
      speakers: ['Dr. Emily Chen']
    }
  },
];

import { useAuth } from '../context/AuthContext';

export default function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this queries the `engagements` table where `type IN ('Event', 'Workshop', 'Webinar', etc)`
    setLoading(true);
    setTimeout(() => {
      setEvents(MOCK_EVENTS);
      setLoading(false);
    }, 400);
  }, []);

  return (
    <AdminLayout title="Event Management">
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        
        {/* Left Pane: Events Calendar/List */}
        <div style={{ width: '420px', flexShrink: 0, borderRight: '1px solid var(--adm-border)', display: 'flex', flexDirection: 'column', background: 'var(--adm-bg)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--adm-border)' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 16px 0' }}>Event Schedule</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="adm-btn adm-btn-sm" style={{ flex: 1, padding: '8px', background: 'var(--adm-surface)', borderColor: 'var(--adm-border)', color: 'var(--adm-text)' }}>Upcoming</button>
              <button className="adm-btn adm-btn-sm" style={{ flex: 1, padding: '8px', background: 'var(--adm-surface)', borderColor: 'var(--adm-border)', color: 'var(--adm-text)' }}>Past</button>
              {user?.role !== 'Counselor' && (
                <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: 'auto', padding: '8px 12px' }}>+ New</button>
              )}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {loading ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--adm-text-secondary)' }}>Loading schedule...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {events.map(evt => {
                  const isSelected = selectedEvent?.id === evt.id;
                  const dateObj = new Date(evt.start_date);
                  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                  const day = dateObj.getDate();

                  return (
                    <div 
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      style={{
                        padding: '12px',
                        background: isSelected ? 'var(--adm-surface)' : 'transparent',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--adm-accent)' : 'var(--adm-border)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        gap: '16px'
                      }}
                    >
                      {/* Calendar Date Block */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '8px', minWidth: '60px', height: '60px', flexShrink: 0 }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--adm-red)', textTransform: 'uppercase' }}>{month}</div>
                        <div style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>{day}</div>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <div style={{ fontWeight: 600, fontSize: '15px', lineHeight: 1.3 }}>{evt.title}</div>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', marginBottom: '8px' }}>
                          {evt.config_json.location}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Badge variant={evt.status === 'Active' ? 'green' : 'blue'} size="sm">
                            {evt.status}
                          </Badge>
                          <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>
                            {evt.config_json.registered} Registered
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Event Master Profile */}
        <div style={{ flex: 1, background: 'var(--adm-bg)', overflow: 'hidden', padding: '16px' }}>
          {selectedEvent ? (
            <EventProfile 
              event={selectedEvent} 
              onClose={() => setSelectedEvent(null)} 
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-text-secondary)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--adm-text)' }}>No Event Selected</div>
              <p style={{ marginTop: '8px' }}>Select an event from the schedule to manage logistics and attendees.</p>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
