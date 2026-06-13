import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Calendar, CheckCircle, Clock, DollarSign, FileText, Video } from 'lucide-react';
import '../premium-dashboard.css';

export default function CounselorPanel() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pipelineData } = useData(); // Pipeline is already filtered to their paid students by DataContext
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [nextBooking, setNextBooking] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(true);

  useEffect(() => {
    async function fetchNextBooking() {
      if (!user) return;
      try {
        setLoadingBooking(true);
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            student:student_id (
              name,
              email
            )
          `)
          .eq('counselor_id', user.id)
          .gte('start_datetime', new Date().toISOString())
          .order('start_datetime', { ascending: true })
          .limit(1)
          .single();
        
        if (data) {
          setNextBooking(data);
        }
      } catch (err) {
        console.error('Error fetching next booking', err);
      } finally {
        setLoadingBooking(false);
      }
    }
    fetchNextBooking();
  }, [user]);

  // Mock calculations for freelancer dashboard
  const completedSessions = 42;
  const payoutPerSession = 50;
  const pendingPayout = completedSessions * payoutPerSession;

  return (
    <AdminLayout title="Counselor Workspace">
      <div className="adm-bento-grid">
        
        {/* Earnings Widget */}
        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--adm-green)' }}>
            <DollarSign size={24} />
            <span className="adm-metric-label">Pending Earnings</span>
          </div>
          <div className="adm-metric-value">${pendingPayout}</div>
          <p style={{ margin: 0, color: 'var(--adm-text-secondary)', fontSize: '0.9rem' }}>Based on {completedSessions} completed sessions.</p>
        </div>

        {/* KPI: Sessions Today */}
        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--adm-purple)' }}>
            <Calendar size={24} />
            <span className="adm-metric-label">Sessions Today</span>
          </div>
          <div className="adm-metric-value">4</div>
          <button onClick={() => navigate('/admin/pipeline')} style={{ background: 'var(--adm-purple)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Open My Students
          </button>
        </div>

        {/* KPI: Pending Notes */}
        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f59e0b' }}>
            <Clock size={24} />
            <span className="adm-metric-label">Pending Notes</span>
          </div>
          <div className="adm-metric-value" style={{ background: 'none', WebkitTextFillColor: '#f59e0b' }}>2</div>
          <button onClick={() => setShowNotesForm(true)} style={{ background: 'transparent', border: '1px solid #f59e0b', color: '#f59e0b', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Complete Notes
          </button>
        </div>

        {/* Next Session Widget - Advanced Tech UI */}
        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 12', display: 'flex', gap: '32px', minHeight: '300px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {loadingBooking ? (
              <p>Loading upcoming session...</p>
            ) : nextBooking ? (
              <>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--adm-green)', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, width: 'fit-content', marginBottom: '16px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}></span>
                  Starting at {new Date(nextBooking.start_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <h2 style={{ margin: '0 0 8px', fontSize: '2rem' }}>{nextBooking.student?.name || 'Unknown Student'}</h2>
                <p style={{ color: 'var(--adm-text-secondary)', fontSize: '1.1rem', margin: '0 0 24px' }}>Psychological Assessment Session</p>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button style={{ background: 'var(--adm-blue)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
                    <Video size={20} /> Join Meeting Room
                  </button>
                  <button onClick={() => navigate('/admin/pipeline')} style={{ background: 'var(--adm-surface)', color: 'var(--adm-text)', border: '1px solid var(--adm-border)', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
                    View Psych Profile
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 76, 58, 0.1)', color: 'var(--adm-text-secondary)', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, width: 'fit-content', marginBottom: '16px' }}>
                  No upcoming sessions
                </div>
                <h2 style={{ margin: '0 0 8px', fontSize: '2rem', color: 'var(--adm-text-secondary)' }}>You're all caught up!</h2>
                <p style={{ color: 'var(--adm-text-secondary)', fontSize: '1.1rem', margin: '0 0 24px' }}>Check your calendar or relax.</p>
              </>
            )}
          </div>
          
          {/* Quick Notes Snippet Area */}
          <div style={{ flex: 1, background: 'var(--adm-surface)', borderRadius: '16px', padding: '24px', border: '1px solid var(--adm-border)' }}>
            <h3 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} color="var(--adm-purple)" />
              Clinical Scratchpad
            </h3>
            <textarea 
              placeholder="Jot down quick session notes here... These will auto-save and can be formally submitted later."
              style={{ width: '100%', height: 'calc(100% - 40px)', padding: '16px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', resize: 'none', fontFamily: 'inherit', fontSize: '0.95rem' }}
              disabled={!nextBooking}
            />
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
