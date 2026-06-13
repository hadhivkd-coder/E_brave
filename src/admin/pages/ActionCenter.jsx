import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import ActionQueueList from '../components/lifecycle/ActionQueueList';
import OmniProfile from '../components/lifecycle/OmniProfile';

export default function ActionCenter() {
  const { salesQueue, counselorQueue, loading, fetchQueues } = useData();
  const { role } = useAuth();
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchQueues();
  }, [fetchQueues]);

  return (
    <AdminLayout title="Action Center">
      <div style={{ padding: '24px', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 className="adm-page-title" style={{ margin: '0 0 4px 0' }}>Action Center</h1>
          <p className="adm-page-subtitle" style={{ margin: 0 }}>Your prioritized execution queue.</p>
        </div>

        <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
          {/* Left Column: Queues */}
          <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
            {loading ? (
              <div style={{ color: 'var(--adm-text-secondary)', padding: '24px' }}>Loading queues...</div>
            ) : (
              <>
                <ActionQueueList 
                  title="Sales Queue (Pre-Payment)" 
                  items={salesQueue} 
                  onSelect={item => setSelectedPerson({ id: item.id, name: item.name })}
                  selectedId={selectedPerson?.id}
                />
                
                <ActionQueueList 
                  title="Counselor Queue (Today's Sessions)" 
                  items={counselorQueue} 
                  onSelect={item => setSelectedPerson({ id: item.person_id, name: item.student_name })}
                  selectedId={selectedPerson?.id}
                />
              </>
            )}
          </div>

          {/* Right Column: Omni Profile */}
          <div style={{ flex: 1, minWidth: '400px' }}>
            <OmniProfile 
              personId={selectedPerson?.id} 
              personName={selectedPerson?.name}
              onClose={() => setSelectedPerson(null)}
            />
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
