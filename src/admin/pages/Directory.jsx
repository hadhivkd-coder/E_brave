import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import OmniProfile from '../components/lifecycle/OmniProfile';
import Badge from '../components/ui/Badge';
import { useData } from '../context/DataContext';

export default function Directory() {
  const { pipelineData, loading, fetchQueues } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStage, setFilterStage] = useState('All');

  useEffect(() => {
    fetchQueues();
  }, [fetchQueues]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Combine standard pipeline data with mock extended roles to demonstrate the Universal Entity Directory
  const MOCK_EXTENDED_PEOPLE = [
    { id: 'ext-1', name: 'Dr. Sarah Jenkins', phone: '+971 50 123 4567', lifecycle_stage: 'Active', role: 'B2B Partner' },
    { id: 'ext-2', name: 'Marcus Johnson', phone: '+971 50 987 6543', lifecycle_stage: 'Completed', role: 'Guest Speaker' },
    { id: 'ext-3', name: 'Emily Chen', phone: '+971 50 555 1234', lifecycle_stage: 'Paid', role: 'Student' },
  ];

  // Merge the real DB pipeline (which defaults to Leads/Students) with the mock extended roles
  const directoryData = [
    ...pipelineData.map(p => ({ ...p, role: 'Student' })),
    ...MOCK_EXTENDED_PEOPLE
  ];

  const filteredData = directoryData.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || (person.phone && person.phone.includes(searchTerm));
    const matchesRole = filterRole === 'All' || person.role === filterRole;
    const matchesStage = filterStage === 'All' || person.lifecycle_stage === filterStage;
    return matchesSearch && matchesRole && matchesStage;
  });

  const uniqueStages = ['All', ...new Set(directoryData.map(p => p.lifecycle_stage))];
  const uniqueRoles = ['All', ...new Set(directoryData.map(p => p.role))];

  return (
    <AdminLayout title="Global Directory">
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        
        {/* Left Pane: Massive Data Grid */}
        <div style={{ flex: selectedPerson ? '0 0 600px' : 1, transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', background: 'var(--adm-bg)', borderRight: selectedPerson ? '1px solid var(--adm-border)' : 'none' }}>
          
          <div style={{ padding: '24px', borderBottom: '1px solid var(--adm-border)', background: 'var(--adm-surface)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 16px 0' }}>Global Directory</h1>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <input 
                  type="text" 
                  placeholder="Search globally by name or phone..." 
                  className="adm-input" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <select className="adm-input" style={{ width: '150px' }} value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                {uniqueRoles.map(r => <option key={r} value={r}>Role: {r}</option>)}
              </select>
              <select className="adm-input" style={{ width: '180px' }} value={filterStage} onChange={(e) => setFilterStage(e.target.value)}>
                {uniqueStages.map(s => <option key={s} value={s}>Stage: {s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--adm-text-secondary)' }}>
                <span className="adm-spinner" style={{ marginRight: '8px' }} />
                Querying universal persons table...
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: 'var(--adm-text-secondary)', fontSize: '12px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0 16px 8px', fontWeight: 600 }}>Person</th>
                    <th style={{ padding: '0 16px 8px', fontWeight: 600 }}>Role</th>
                    <th style={{ padding: '0 16px 8px', fontWeight: 600 }}>Lifecycle Stage</th>
                    <th style={{ padding: '0 16px 8px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(person => {
                    const isSelected = selectedPerson?.id === person.id;
                    return (
                      <tr 
                        key={person.id}
                        onClick={() => setSelectedPerson(person)}
                        style={{
                          background: isSelected ? 'var(--adm-surface)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          boxShadow: isSelected ? 'inset 0 0 0 1px var(--adm-accent)' : 'inset 0 0 0 1px var(--adm-border)',
                          borderRadius: '8px'
                        }}
                      >
                        <td style={{ padding: '16px', borderRadius: '8px 0 0 8px' }}>
                          <div style={{ fontWeight: 600, fontSize: '14px', color: isSelected ? 'var(--adm-accent)' : 'var(--adm-text)' }}>{person.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>{person.phone}</div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <Badge variant={person.role === 'Student' ? 'blue' : 'indigo'} size="sm">{person.role}</Badge>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <Badge variant={person.lifecycle_stage === 'Active' || person.lifecycle_stage === 'Paid' ? 'green' : 'gray'} size="sm">
                            {person.lifecycle_stage}
                          </Badge>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right', borderRadius: '0 8px 8px 0' }}>
                          <button className="adm-btn adm-btn-sm" style={{ padding: '6px 12px' }}>View Profile</button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--adm-text-secondary)' }}>No records found in the global directory.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Pane: Omni Profile Slide-in */}
        {selectedPerson && (
          <div style={{ flex: 1, background: 'var(--adm-bg)', overflow: 'hidden', padding: '16px' }}>
            {selectedPerson.id.startsWith('ext-') ? (
               <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--adm-surface)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--adm-border)', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-text-secondary)', textAlign: 'center', padding: '40px' }}>
                 <h2 style={{ color: 'var(--adm-text)', marginBottom: '8px' }}>{selectedPerson.name}</h2>
                 <p>This is a mock external record demonstrating the global directory filter architecture.<br/>Select a real pipeline user to load the interactive Omni Profile.</p>
                 <button className="adm-btn adm-btn-primary" style={{ marginTop: '16px' }} onClick={() => setSelectedPerson(null)}>Close</button>
               </div>
            ) : (
              <OmniProfile 
                personId={selectedPerson.id} 
                personName={selectedPerson.name}
                onClose={() => setSelectedPerson(null)} 
              />
            )}
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
