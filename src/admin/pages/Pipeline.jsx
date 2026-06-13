import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { useData } from '../context/DataContext';
import Badge from '../components/ui/Badge';
import OmniProfile from '../components/lifecycle/OmniProfile';

export default function Pipeline() {
  const { pipelineData, loading, fetchQueues } = useData();
  const [activeStage, setActiveStage] = useState('New Lead');
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchQueues();
  }, [fetchQueues]);

  const STAGES = ['New Lead', 'Follow-up Required', 'Payment Pending', 'Paid', 'Completed', 'Dropped'];

  return (
    <AdminLayout title="Pipeline">
      <div style={{ padding: '24px', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 className="adm-page-title" style={{ margin: '0 0 4px 0' }}>Pipeline Overview</h1>
          <p className="adm-page-subtitle" style={{ margin: 0 }}>Macro view of the entire student lifecycle.</p>
        </div>

        {loading ? (
          <div style={{ color: 'var(--adm-text-secondary)' }}>Loading pipeline...</div>
        ) : (
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', flex: 1, minHeight: 0, paddingBottom: '16px' }}>
            {STAGES.map(stage => {
              const items = pipelineData.filter(p => p.lifecycle_stage === stage);
              return (
                <div key={stage} style={{ width: '300px', flexShrink: 0, background: 'var(--adm-surface)', borderRadius: '12px', border: '1px solid var(--adm-border)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--adm-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{stage}</h3>
                    <Badge variant="gray" size="sm">{items.length}</Badge>
                  </div>
                  <div style={{ padding: '12px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {items.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedPerson(item)}
                        style={{ 
                          background: 'var(--adm-bg)', padding: '12px', borderRadius: '8px', 
                          border: '1px solid var(--adm-border)', fontSize: '13px', cursor: 'pointer',
                          transition: 'border-color 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--adm-color-primary)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--adm-border)'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          <Badge variant="blue" size="sm">{item.source || 'Direct'}</Badge>
                        </div>
                        <div style={{ color: 'var(--adm-text-secondary)' }}>{item.phone}</div>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <div style={{ color: 'var(--adm-text-secondary)', textAlign: 'center', padding: '24px 0', fontSize: '13px' }}>Empty</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {selectedPerson && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', background: 'var(--adm-surface)', borderLeft: '1px solid var(--adm-border)', zIndex: 100, boxShadow: '-4px 0 24px rgba(0,0,0,0.5)' }}>
          <OmniProfile personId={selectedPerson.id} personName={selectedPerson.name} onClose={() => setSelectedPerson(null)} />
        </div>
      )}
    </AdminLayout>
  );
}
