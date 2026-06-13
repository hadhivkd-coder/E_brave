import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import OrgProfile from '../components/b2b/OrgProfile';
import Badge from '../components/ui/Badge';
import { useData } from '../context/DataContext';

// Temporary mock data until Supabase migration is executed locally
const MOCK_ORGS = [
  { id: '1', name: 'GEMS Wellington Academy', type: 'School', tier: 'Enterprise', city: 'Dubai', partnership_status: 'Active', next_action_due: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', name: 'TechCorp Solutions', type: 'Corporate', tier: 'Standard', city: 'Abu Dhabi', partnership_status: 'Prospect', next_action_due: new Date(Date.now() + 86400000).toISOString() },
  { id: '3', name: 'American School of Dubai', type: 'School', tier: 'Standard', city: 'Dubai', partnership_status: 'Prospect', next_action_due: new Date(Date.now() - 3600000).toISOString() },
];

export default function B2BInstitutions() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // In production, this calls a Supabase view `view_queue_b2b`.
    // For now, we load mock data to demonstrate the Universal Entity flow.
    setLoading(true);
    setTimeout(() => {
      setOrganizations(MOCK_ORGS);
      setLoading(false);
    }, 400);
  }, []);

  const filteredOrgs = organizations.filter(org => {
    if (filter === 'All') return true;
    return org.partnership_status === filter;
  });

  return (
    <AdminLayout title="B2B Institutions">
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        
        {/* Left Pane: Organization Queue */}
        <div style={{ width: '400px', flexShrink: 0, borderRight: '1px solid var(--adm-border)', display: 'flex', flexDirection: 'column', background: 'var(--adm-bg)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--adm-border)' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 16px 0' }}>B2B Pipeline</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Prospect', 'Active'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: filter === f ? 'var(--adm-accent)' : 'var(--adm-border)',
                    background: filter === f ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                    color: filter === f ? 'var(--adm-accent)' : 'var(--adm-text-secondary)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {loading ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--adm-text-secondary)' }}>Loading partners...</div>
            ) : filteredOrgs.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--adm-text-secondary)' }}>No organizations found.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredOrgs.map(org => {
                  const isOverdue = new Date(org.next_action_due) < new Date();
                  const isSelected = selectedOrg?.id === org.id;
                  
                  return (
                    <div 
                      key={org.id}
                      onClick={() => setSelectedOrg(org)}
                      style={{
                        padding: '16px',
                        background: isSelected ? 'var(--adm-surface)' : 'transparent',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--adm-accent)' : 'var(--adm-border)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 600, fontSize: '15px' }}>{org.name}</div>
                        {isOverdue && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--adm-red)' }} title="Follow-up Overdue" />}
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)', display: 'flex', gap: '8px' }}>
                          <span>{org.type}</span>
                          <span>•</span>
                          <span>{org.city}</span>
                        </div>
                        <Badge variant={org.partnership_status === 'Active' ? 'green' : 'blue'} size="sm">
                          {org.partnership_status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Organization Master Profile */}
        <div style={{ flex: 1, background: 'var(--adm-bg)', overflow: 'hidden', padding: '16px' }}>
          {selectedOrg ? (
            <OrgProfile 
              organization={selectedOrg} 
              onClose={() => setSelectedOrg(null)} 
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-text-secondary)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--adm-text)' }}>No Partner Selected</div>
              <p style={{ marginTop: '8px' }}>Select an organization from the pipeline to view their profile.</p>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
