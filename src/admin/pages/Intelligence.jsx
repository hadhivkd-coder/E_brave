import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';

// Mock Predictive Insights (Derived from activity_logs and engagements)
const MOCK_INSIGHTS = [
  { id: 1, type: 'Risk', title: 'At-Risk Enrollments Detected', description: '3 students in "Ivy League Application Masterclass" have missed 2 consecutive sessions.', severity: 'High', action: 'Ping Counselor' },
  { id: 2, type: 'Opportunity', title: 'B2B Upsell Potential', description: '"GEMS Wellington Academy" has 150+ unregistered attendees from the last career fair.', severity: 'Medium', action: 'Create Pipeline Task' },
  { id: 3, type: 'Operational', title: 'Counselor Load Imbalance', description: 'Sarah Jenkins is assigned 45 active students (150% over capacity). Reallocation recommended.', severity: 'Medium', action: 'Auto-Reassign' },
];

export default function Intelligence() {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', text: 'Hello. I am the EOS Co-Pilot. I am connected to the E-Brave vector database. You can ask me about university requirements, internal SOPs, or student data.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', text: chatInput };
    setChatHistory([...chatHistory, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        text: 'Based on the Knowledge Base (Document ID: NYU-ADM-2026), New York University requires a minimum SAT score of 1450 and 3 letters of recommendation for international applicants. Would you like me to flag students in the pipeline who meet this criteria?'
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AdminLayout title="EOS Intelligence">
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        
        {/* Left Pane: Predictive Operations Dashboard */}
        <div style={{ width: '500px', flexShrink: 0, borderRight: '1px solid var(--adm-border)', display: 'flex', flexDirection: 'column', background: 'var(--adm-bg)', overflowY: 'auto', padding: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0' }}>Predictive Operations</h1>
            <p style={{ color: 'var(--adm-text-secondary)', fontSize: '14px', margin: 0 }}>Automated insights generated from ecosystem activity logs.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MOCK_INSIGHTS.map(insight => (
              <div key={insight.id} style={{ padding: '16px', background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {insight.type === 'Risk' && <span style={{ color: 'var(--adm-red)' }}>⚠️</span>}
                    {insight.type === 'Opportunity' && <span style={{ color: 'var(--adm-green)' }}>💡</span>}
                    {insight.type === 'Operational' && <span style={{ color: 'var(--adm-accent)' }}>⚙️</span>}
                    <span style={{ fontWeight: 600, fontSize: '15px' }}>{insight.title}</span>
                  </div>
                  <Badge variant={insight.severity === 'High' ? 'red' : 'blue'} size="sm">{insight.severity}</Badge>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                  {insight.description}
                </div>
                <button className="adm-btn adm-btn-sm" style={{ width: '100%', padding: '8px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', color: 'var(--adm-text)' }}>
                  {insight.action}
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', padding: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.05))', borderRadius: '12px', border: '1px solid var(--adm-border)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>System Health</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--adm-text-secondary)', marginBottom: '4px' }}>
              <span>Data Ingestion (Kafka)</span>
              <span style={{ color: 'var(--adm-green)', fontWeight: 600 }}>Optimal</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--adm-text-secondary)' }}>
              <span>Vector Sync (pgvector)</span>
              <span>Updated 2m ago</span>
            </div>
          </div>
        </div>

        {/* Right Pane: EOS Co-Pilot (Knowledge Chat) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--adm-surface)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--adm-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--adm-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                EOS Co-Pilot
              </h2>
              <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Semantic Search connected to Institutional Knowledge Base</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {chatHistory.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ 
                  maxWidth: '70%', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  background: msg.role === 'user' ? 'var(--adm-accent)' : 'var(--adm-bg)',
                  color: msg.role === 'user' ? '#fff' : 'var(--adm-text)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--adm-border)',
                  fontSize: '14px',
                  lineHeight: 1.5
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', fontSize: '14px', color: 'var(--adm-text-secondary)' }}>
                  <span className="adm-spinner" style={{ width: '14px', height: '14px', marginRight: '8px', verticalAlign: 'middle' }} />
                  Searching Vector DB...
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '24px', borderTop: '1px solid var(--adm-border)', background: 'var(--adm-bg)' }}>
            <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask about SOPs, universities, or student data..." 
                className="adm-input" 
                style={{ flex: 1, background: 'var(--adm-surface)' }}
                disabled={isTyping}
              />
              <button type="submit" className="adm-btn adm-btn-primary" disabled={isTyping || !chatInput.trim()}>
                Send
              </button>
            </form>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
