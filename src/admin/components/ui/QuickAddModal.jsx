import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { X, UserPlus, CheckSquare, Calendar } from 'lucide-react';

export default function QuickAddModal({ type, onClose, onSuccess }) {
  const { addLead } = useData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Lead form state
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', source: 'Manual Entry' });

  // Task form state
  const [taskForm, setTaskForm] = useState({ title: '', due_date: '', priority: 'Medium', notes: '' });

  // Session form state
  const [sessionForm, setSessionForm] = useState({ student_search: '', counselor_id: '', date: '', time: '' });

  const handleAddLead = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addLead({ ...leadForm, lifecycle_stage: 'New Lead', assigned_to: user?.id });
      setSuccess(true);
      setTimeout(() => { onClose(); onSuccess?.(); }, 1200);
    } catch (err) {
      alert('Failed to add lead: ' + err.message);
    }
    setLoading(false);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from('tasks').insert([{
        title: taskForm.title,
        due_date: taskForm.due_date || null,
        priority: taskForm.priority,
        notes: taskForm.notes,
        status: 'Pending',
        assigned_to: user?.id,
        created_by: user?.id
      }]);
      setSuccess(true);
      setTimeout(() => { onClose(); onSuccess?.(); }, 1200);
    } catch (err) {
      alert('Failed to add task.');
    }
    setLoading(false);
  };

  const modalTitles = { lead: '🎯 Add New Lead', task: '✅ Add Task', session: '📅 Book Session' };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        background: 'var(--adm-surface)', borderRadius: '20px',
        padding: '32px', width: '480px', maxWidth: '95vw',
        border: '1px solid var(--adm-border)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>{modalTitles[type]}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--adm-text-secondary)', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
            <h3 style={{ color: 'var(--adm-green)', margin: 0 }}>
              {type === 'lead' ? 'Lead Added!' : type === 'task' ? 'Task Created!' : 'Session Booked!'}
            </h3>
          </div>
        ) : (
          <>
            {/* Lead Form */}
            {type === 'lead' && (
              <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Full Name *</label>
                  <input required value={leadForm.name} onChange={e => setLeadForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Ahmed Al Farsi"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Phone *</label>
                    <input required value={leadForm.phone} onChange={e => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+971 50 000 0000"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Email</label>
                    <input type="email" value={leadForm.email} onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@example.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Lead Source</label>
                  <select value={leadForm.source} onChange={e => setLeadForm(f => ({ ...f, source: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px' }}>
                    {['Manual Entry', 'Meta Ads', 'WhatsApp', 'Referral', 'Walk-In', 'Website', 'Other'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}>
                  {loading ? 'Adding...' : '+ Add Lead'}
                </button>
              </form>
            )}

            {/* Task Form */}
            {type === 'task' && (
              <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Task Title *</label>
                  <input required value={taskForm.title} onChange={e => setTaskForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Follow up with Ahmed"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Due Date</label>
                    <input type="date" value={taskForm.due_date} onChange={e => setTaskForm(f => ({ ...f, due_date: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Priority</label>
                    <select value={taskForm.priority} onChange={e => setTaskForm(f => ({ ...f, priority: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px' }}>
                      {['High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Notes</label>
                  <textarea value={taskForm.notes} onChange={e => setTaskForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Any relevant notes..."
                    rows={3}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px', resize: 'none', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}>
                  {loading ? 'Creating...' : '✅ Create Task'}
                </button>
              </form>
            )}

            {/* Session - redirect to Counseling with note */}
            {type === 'session' && (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <Calendar size={48} color="var(--adm-purple)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ margin: '0 0 8px' }}>Book a Session via Lead Profile</h3>
                <p style={{ color: 'var(--adm-text-secondary)', margin: '0 0 24px', lineHeight: 1.6 }}>
                  To book a counseling session, click on any lead in your queue, open their <strong>Profile</strong>, then navigate to the <strong>"Schedule" tab</strong> to pick a counselor and time slot.
                </p>
                <button onClick={onClose} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
                  Got It
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
