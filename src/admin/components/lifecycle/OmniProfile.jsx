import React, { useState, useEffect } from 'react';
import Badge from '../ui/Badge';
import TimelineFeed from './TimelineFeed';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { Calendar as CalendarIcon, CheckCircle, DollarSign, IndianRupee, Send } from 'lucide-react';

export default function OmniProfile({ personId, personName, onClose }) {
  const { getTimeline, updatePerson, logActivity, sendMessage } = useData();
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Chat');
  
  // Chat State
  const [chatMessage, setChatMessage] = useState('');
  const [sendingChat, setSendingChat] = useState(false);
  
  // Scheduling State
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Payments State
  const [payments, setPayments] = useState([]);
  const [paymentForm, setPaymentForm] = useState({ amount: '', description: 'Counseling Session Fee' });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (personId) {
      loadTimeline();
      loadCounselors();
      loadPayments();
    }
  }, [personId]);


  const loadCounselors = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('role', 'Counselor');
    setCounselors(data || []);
  };

  const loadTimeline = async () => {
    setLoading(true);
    const data = await getTimeline(personId);
    setActivities(data);
    setLoading(false);
  };

  const handleBookSession = async () => {
    if (!selectedCounselor || !bookingDate || !bookingTime) {
      alert('Please fill out all scheduling fields.');
      return;
    }
    
    const startDatetime = new Date(`${bookingDate}T${bookingTime}`);
    const endDatetime = new Date(startDatetime.getTime() + 60 * 60 * 1000); // 1 hour session

    try {
      await supabase.from('bookings').insert([{
        student_id: personId,
        counselor_id: selectedCounselor,
        start_datetime: startDatetime.toISOString(),
        end_datetime: endDatetime.toISOString(),
        status: 'Scheduled',
        meeting_link: meetLink || 'https://meet.google.com/mock-link'
      }]);

      await updatePerson(personId, {
        assigned_counselor_id: selectedCounselor
      });

      await logActivity('Session Scheduled', personId, {
        counselor_id: selectedCounselor,
        start: startDatetime.toISOString()
      });

      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000);
      loadTimeline();
    } catch (err) {
      console.error(err);
      alert('Failed to book session.');
    }
  };

  const handleQuickLog = async (outcome) => {
    if (!note.trim() && outcome !== 'Sent WhatsApp') {
      alert("Please enter a note before logging.");
      return;
    }
    
    // Calculate next action due (e.g., +1 day for follow up)
    const nextDue = new Date();
    nextDue.setDate(nextDue.getDate() + 1);

    await logActivity('Call Logged', personId, { outcome, note });
    await updatePerson(personId, { 
      last_contacted_at: new Date().toISOString(),
      next_action_due: nextDue.toISOString(),
      lifecycle_stage: 'Follow-up Required'
    });
    
    setNote('');
    loadTimeline();
  };

  const loadPayments = async () => {
    const { data } = await supabase.from('payments').select('*').eq('student_id', personId).order('created_at', { ascending: false });
    setPayments(data || []);
  };

  const handleLogPayment = async (e) => {
    e.preventDefault();
    if (!paymentForm.amount || isNaN(parseFloat(paymentForm.amount))) {
      alert('Please enter a valid amount.');
      return;
    }
    setPaymentLoading(true);
    try {
      await supabase.from('payments').insert([{
        student_id: personId,
        sales_rep_id: user?.id,
        amount: parseFloat(paymentForm.amount),
        description: paymentForm.description,
        status: 'Completed'
      }]);
      await updatePerson(personId, { lifecycle_stage: 'Paid' });
      await logActivity('Payment Logged', personId, { amount: paymentForm.amount, description: paymentForm.description });
      setPaymentSuccess(true);
      setPaymentForm({ amount: '', description: 'Counseling Session Fee' });
      loadPayments();
      loadTimeline();
      setTimeout(() => setPaymentSuccess(false), 3000);
    } catch (err) {
      alert('Failed to log payment.');
    }
    setPaymentLoading(false);
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setSendingChat(true);
    try {
      await sendMessage(personId, chatMessage, 'WhatsApp');
      setChatMessage('');
      loadTimeline();
    } catch (err) {
      alert('Failed to send message.');
    }
    setSendingChat(false);
  };


  if (!personId) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-text-secondary)' }}>
        Select a task from the queue to view details.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--adm-surface)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--adm-border)' }}>
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--adm-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>{personName}</h2>
          <Badge variant="indigo" size="sm">Active Pipeline</Badge>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--adm-text-secondary)' }}>✕</button>
        )}
      </div>

      {/* Quick Actions (The Operational Heart) */}
      <div style={{ padding: '24px', background: 'var(--adm-bg)', borderBottom: '1px solid var(--adm-border)' }}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--adm-text-secondary)', marginBottom: '12px' }}>Quick Action</h3>
        <textarea 
          placeholder="Enter notes from call or WhatsApp..."
          value={note}
          onChange={e => setNote(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-surface)', color: 'var(--adm-text)', minHeight: '80px', marginBottom: '12px', resize: 'vertical' }}
        />
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => handleQuickLog('Connected')}
            className="adm-btn adm-btn-primary" 
            style={{ flex: 1 }}
          >📞 Log Call (Connected)</button>
          
          <button 
            onClick={() => handleQuickLog('Left Message')}
            className="adm-btn" 
            style={{ flex: 1, background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', color: 'var(--adm-text)' }}
          >Voicemail</button>
          
          <button 
            onClick={() => {
              window.open(`https://wa.me/?text=Hi ${personName}!`, '_blank');
              handleQuickLog('Sent WhatsApp');
            }}
            className="adm-btn" 
            style={{ flex: 1, background: '#25D366', color: '#fff', border: 'none' }}
          >💬 WhatsApp</button>
        </div>
      </div>

      {/* Universal Data Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--adm-border)', background: 'var(--adm-bg)', overflowX: 'auto' }}>
        {['Chat', 'Timeline', 'Payments', 'Schedule', 'Engagements'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: activeTab === tab ? '2px solid var(--adm-accent)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--adm-accent)' : 'var(--adm-text-secondary)',
              fontWeight: activeTab === tab ? 700 : 500, cursor: 'pointer', transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        
        {activeTab === 'Payments' && (
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IndianRupee size={18} color="var(--adm-green)" /> Log Payment
            </h3>

            {paymentSuccess && (
              <div style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--adm-green)', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} /> Payment logged! Lead marked as Paid.
              </div>
            )}

            <form onSubmit={handleLogPayment} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Amount (INR ₹)</label>
                <input
                  type="number" step="0.01" min="0" required
                  value={paymentForm.amount}
                  onChange={e => setPaymentForm(f => ({ ...f, amount: e.target.value }))}
                  placeholder="e.g. 2500"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Description</label>
                <select
                  value={paymentForm.description}
                  onChange={e => setPaymentForm(f => ({ ...f, description: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '15px' }}
                >
                  {['Counseling Session Fee', 'Course Enrollment Fee', 'Registration Fee', 'Assessment Fee', 'Other'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <button type="submit" disabled={paymentLoading}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
                {paymentLoading ? 'Logging...' : '💰 Confirm Payment Received'}
              </button>
            </form>

            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--adm-text-secondary)', marginBottom: '12px', letterSpacing: '0.05em' }}>Payment History</h4>
            {payments.length === 0 ? (
              <div style={{ color: 'var(--adm-text-secondary)', textAlign: 'center', padding: '24px', border: '1px dashed var(--adm-border)', borderRadius: '10px' }}>No payments recorded yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {payments.map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--adm-bg)', borderRadius: '10px', border: '1px solid var(--adm-border)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.description}</div>
                      <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>{new Date(p.created_at).toLocaleDateString()}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--adm-green)' }}>+₹{parseFloat(p.amount).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Schedule' && (

          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={18} /> Book Counseling Session
            </h3>
            
            {bookingSuccess ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--adm-green)', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <CheckCircle size={20} /> Session Successfully Booked!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Select Counselor</label>
                  <select 
                    value={selectedCounselor}
                    onChange={e => setSelectedCounselor(e.target.value)}
                    className="adm-input" 
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-surface)', color: 'var(--adm-text)' }}
                  >
                    <option value="">-- Choose a Counselor --</option>
                    {counselors.map(c => (
                      <option key={c.id} value={c.id}>{c.name || c.email}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Date</label>
                    <input 
                      type="date" 
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      className="adm-input" 
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-surface)', color: 'var(--adm-text)' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Time</label>
                    <input 
                      type="time" 
                      value={bookingTime}
                      onChange={e => setBookingTime(e.target.value)}
                      className="adm-input" 
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-surface)', color: 'var(--adm-text)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Google Meet Link (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://meet.google.com/..."
                    value={meetLink}
                    onChange={e => setMeetLink(e.target.value)}
                    className="adm-input" 
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-surface)', color: 'var(--adm-text)' }}
                  />
                </div>

                <button 
                  onClick={handleBookSession}
                  className="adm-btn adm-btn-primary" 
                  style={{ width: '100%', padding: '12px', marginTop: '8px' }}
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Engagements' && (
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Active Engagements</span>
              <button className="adm-btn adm-btn-sm" style={{ padding: '4px 8px', fontSize: '12px' }}>+ Link</button>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '12px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Tech Workshop 2026</div>
                  <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>Event • Role: Attendee</div>
                </div>
                <Badge variant="green" size="sm">Registered</Badge>
              </div>
              <div style={{ padding: '12px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Advanced Career Counseling</div>
                  <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>Program • Counselor: Assigned</div>
                </div>
                <Badge variant="indigo" size="sm">In Progress</Badge>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '16px', background: 'var(--adm-bg)', borderBottom: '1px solid var(--adm-border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={16} color="#25D366" /> WhatsApp Cloud Interface
              </h3>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {loading ? (
                <div style={{ color: 'var(--adm-text-secondary)' }}>Loading chat...</div>
              ) : (
                <TimelineFeed activities={activities.filter(a => a.action_type.includes('WhatsApp'))} />
              )}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid var(--adm-border)', background: 'var(--adm-surface)' }}>
              <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '12px' }}>
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  placeholder="Type a WhatsApp message..."
                  className="adm-input"
                  style={{ flex: 1, padding: '12px', borderRadius: '24px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)' }}
                />
                <button 
                  type="submit" 
                  disabled={sendingChat || !chatMessage.trim()}
                  className="adm-btn adm-btn-primary" 
                  style={{ borderRadius: '24px', padding: '0 24px', background: '#25D366', color: '#fff', border: 'none' }}
                >
                  {sendingChat ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'Timeline' && (
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Activity Timeline</h3>
            {loading ? (
              <div style={{ color: 'var(--adm-text-secondary)' }}>Loading history...</div>
            ) : (
              <TimelineFeed activities={activities} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
