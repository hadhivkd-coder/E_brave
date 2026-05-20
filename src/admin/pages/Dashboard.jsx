import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import '../../admin.css';

function getGreeting() {
  const hr = new Date().getHours();
  if (hr < 12) return 'Good morning';
  if (hr < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useNotifications();
  const {
    leads = [],
    students = [],
    sessions = [],
    webinars = [],
    tasks = [],
    team = [],
    addLead,
    addSession,
    addTask,
    updateTask
  } = useData();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Quick Action Modal States
  const [showAddLead, setShowAddLead] = useState(false);
  const [showBookSession, setShowBookSession] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  // Quick Form States
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', education: '', source: 'Instagram', counselorId: '' });
  const [sessionForm, setSessionForm] = useState({ leadId: '', counselorId: '', scheduledAt: '', duration: '30', sessionType: 'Initial' });
  const [taskForm, setTaskForm] = useState({ title: '', priority: 'Medium', assignedTo: '', dueDate: '' });

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Filter scoped records if user is Counselor
  const isCounselor = user?.role === 'Counselor';
  const scopeLeads = useMemo(() => {
    return isCounselor ? leads.filter(l => l.counselorId === user.id) : leads;
  }, [leads, isCounselor, user]);

  const scopeSessions = useMemo(() => {
    return isCounselor ? sessions.filter(s => s.counselorId === user.id) : sessions;
  }, [sessions, isCounselor, user]);

  const scopeTasks = useMemo(() => {
    return isCounselor ? tasks.filter(t => t.assignedTo === user.id) : tasks;
  }, [tasks, isCounselor, user]);

  // Operational calculations
  const todayStr = new Date().toISOString().split('T')[0];
  
  // 1. Today's sessions
  const todaysSessions = useMemo(() => {
    return scopeSessions
      .filter(s => s.scheduledAt?.startsWith(todayStr))
      .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
  }, [scopeSessions, todayStr]);

  // 2. Pending follow-ups
  const pendingFollowUps = useMemo(() => {
    return scopeLeads
      .filter(l => l.status === 'Follow-up Required' || (l.followUpDate && l.followUpDate <= todayStr && l.status !== 'Converted' && l.status !== 'Closed'))
      .sort((a, b) => new Date(a.followUpDate || '') - new Date(b.followUpDate || ''))
      .slice(0, 5);
  }, [scopeLeads, todayStr]);

  // 3. Today's new leads
  const newLeadsToday = useMemo(() => {
    return scopeLeads
      .filter(l => l.createdAt?.startsWith(todayStr))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [scopeLeads, todayStr]);

  // 4. Tasks needing action
  const urgentTasks = useMemo(() => {
    return scopeTasks
      .filter(t => t.status !== 'Done')
      .sort((a, b) => {
        const priorityWeight = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
        return (priorityWeight[a.priority] ?? 2) - (priorityWeight[b.priority] ?? 2);
      })
      .slice(0, 5);
  }, [scopeTasks]);

  // 5. Webinar Schedule
  const upcomingWebinars = useMemo(() => {
    return webinars
      .filter(w => w.status === 'Upcoming' || w.status === 'Live')
      .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
  }, [webinars]);

  // 6. Important Alerts
  const importantAlerts = useMemo(() => {
    const alerts = [];
    // Missed follow ups alert
    const missedFollowUps = scopeLeads.filter(l => l.followUpDate && l.followUpDate < todayStr && l.status === 'Follow-up Required');
    if (missedFollowUps.length > 0) {
      alerts.push({
        id: 'a1',
        type: 'warning',
        message: `⚠️ Action Required: ${missedFollowUps.length} follow-up calls are overdue.`
      });
    }
    // High score lead unassigned (only for Admins/Ops Managers)
    if (!isCounselor) {
      const hotUnassigned = leads.filter(l => l.leadScore >= 8 && !l.counselorId);
      if (hotUnassigned.length > 0) {
        alerts.push({
          id: 'a2',
          type: 'danger',
          message: `🔥 Assignment: ${hotUnassigned.length} hot leads (Score 8+) have no assigned counselor.`
        });
      }
    }
    // Tasks overdue
    const overdueTasks = scopeTasks.filter(t => t.dueDate && t.dueDate < todayStr && t.status !== 'Done');
    if (overdueTasks.length > 0) {
      alerts.push({
        id: 'a3',
        type: 'warning',
        message: `📅 Overdue Checklist: ${overdueTasks.length} tasks have passed their due date.`
      });
    }
    // Default system alert
    if (alerts.length === 0) {
      alerts.push({
        id: 'a0',
        type: 'success',
        message: '🟢 Pipeline Clear: All counselors are active, and client follow-ups are fully up to date.'
      });
    }
    return alerts;
  }, [scopeLeads, scopeTasks, todayStr, leads, isCounselor]);

  // Quick Action form submissions
  const handleQuickAddLead = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) {
      showToast('Lead name and phone number are required', 'error');
      return;
    }
    addLead({
      name: leadForm.name,
      phone: leadForm.phone,
      email: leadForm.email,
      education: leadForm.education || 'Undergraduate',
      source: leadForm.source,
      counselorId: leadForm.counselorId || (isCounselor ? user.id : ''),
      status: 'New Lead',
      leadScore: Math.floor(Math.random() * 5) + 5 // Generate neutral score
    });
    showToast(`Lead ${leadForm.name} added to operations`, 'success');
    setShowAddLead(false);
    setLeadForm({ name: '', phone: '', email: '', education: '', source: 'Instagram', counselorId: '' });
  };

  const handleQuickBookSession = (e) => {
    e.preventDefault();
    if (!sessionForm.leadId || !sessionForm.scheduledAt) {
      showToast('Student and scheduled date are required', 'error');
      return;
    }
    const leadObj = leads.find(l => l.id === sessionForm.leadId) || {};
    addSession({
      leadId: sessionForm.leadId,
      studentName: leadObj.name || 'Anonymous',
      counselorId: sessionForm.counselorId || user.id,
      scheduledAt: sessionForm.scheduledAt,
      duration: parseInt(sessionForm.duration),
      status: 'Scheduled',
      sessionType: sessionForm.sessionType,
      notes: { careerPaths: [], actionPlan: '', followUpTasks: [] }
    });
    showToast(`Counseling session scheduled successfully`, 'success');
    setShowBookSession(false);
    setSessionForm({ leadId: '', counselorId: '', scheduledAt: '', duration: '30', sessionType: 'Initial' });
  };

  const handleQuickAddTask = (e) => {
    e.preventDefault();
    if (!taskForm.title) {
      showToast('Task title is required', 'error');
      return;
    }
    addTask({
      title: taskForm.title,
      priority: taskForm.priority,
      assignedTo: taskForm.assignedTo || user.id,
      dueDate: taskForm.dueDate || todayStr,
      status: 'Todo',
      tags: ['Operational']
    });
    showToast(`Task "${taskForm.title}" added to checklist`, 'success');
    setShowAddTask(false);
    setTaskForm({ title: '', priority: 'Medium', assignedTo: '', dueDate: '' });
  };

  const handleToggleTaskStatus = (task) => {
    updateTask({
      ...task,
      status: task.status === 'Done' ? 'Todo' : 'Done'
    });
    showToast(`Task status updated`, 'success');
  };

  return (
    <AdminLayout title="Operational Center">
      {/* WELCOMING HERO BANNER */}
      <div 
        className="adm-welcome-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 76, 58, 0.05) 0%, rgba(244, 248, 245, 0.6) 100%)',
          border: '1px solid rgba(15, 76, 58, 0.08)',
          borderRadius: '16px',
          padding: '24px 32px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 4px 20px rgba(15, 76, 58, 0.02)'
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>👋</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--adm-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Welcome back
            </span>
            <div style={{ background: '#ffffff', border: '1px solid var(--adm-border)', borderRadius: 24, padding: '2px 10px', display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}>
              <span style={{ width: 6, height: 6, background: 'var(--adm-green)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px var(--adm-green)' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--adm-accent)' }}>Live System</span>
            </div>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.85rem', fontWeight: 800, color: 'var(--adm-accent)', letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1.2 }}>
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Operational Leader'}
          </h1>
          <p style={{ color: 'var(--adm-text-secondary)', fontSize: '0.9rem', maxWidth: '500px', lineHeight: 1.5 }}>
            Ready to guide our students today? Here is your daily operational status. Everything looks clean and structured.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Calendar Time widget */}
          <div 
            style={{
              background: '#ffffff',
              border: '1px solid var(--adm-border)',
              borderRadius: '12px',
              padding: '12px 18px',
              minWidth: '180px',
              boxShadow: 'var(--adm-shadow)'
            }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
              Local Time
            </span>
            <strong style={{ fontSize: '1.15rem', color: 'var(--adm-accent)', display: 'block', fontWeight: 800 }}>
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--adm-muted)' }}>
              {currentTime.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>

          {/* Quick Metrics Pillar */}
          <div 
            style={{
              background: '#ffffff',
              border: '1px solid var(--adm-border)',
              borderRadius: '12px',
              padding: '12px 18px',
              minWidth: '160px',
              boxShadow: 'var(--adm-shadow)'
            }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
              Counseling Today
            </span>
            <strong style={{ fontSize: '1.4rem', color: 'var(--adm-accent)', display: 'block', fontWeight: 800, lineHeight: 1.1 }}>
              {todaysSessions.length}
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--adm-muted)' }}>
              sessions scheduled
            </span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS TOOLBAR */}
      <div style={{ background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', padding: 16, borderRadius: 12, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 32 }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--adm-text-secondary)', marginRight: 8 }}>Quick Operations:</span>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setShowAddLead(true)}>
          ⚡ Add New Lead
        </button>
        <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setShowBookSession(true)} style={{ borderColor: 'var(--adm-accent)' }}>
          🗓️ Book Counseling Session
        </button>
        <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setShowAddTask(true)} style={{ borderColor: 'var(--adm-accent)' }}>
          ✍️ Create Task Checklist
        </button>
        {isCounselor && (
          <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => navigate('/admin/counseling')} style={{ marginLeft: 'auto' }}>
            My Board →
          </button>
        )}
      </div>

      {/* PRIMARY WORKSPACE: TODAY'S OPERATIONS */}
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--adm-accent)', marginBottom: 16, borderBottom: '1px solid var(--adm-border-light)', paddingBottom: 8 }}>
        Today's Operations
      </h2>
      
      <div className="adm-ops-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginBottom: 36 }}>
        
        {/* Today's Counseling Card */}
        <div className="adm-dashboard-card" style={{ background: '#ffffff', borderRadius: 12, border: '1px solid var(--adm-border)', padding: 20, boxShadow: 'var(--adm-shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-accent)' }}>Today's Counseling</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>Status of scheduled student sessions</p>
            </div>
            <Badge variant="green" size="sm">{todaysSessions.length} Scheduled</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {todaysSessions.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', color: 'var(--adm-muted)', fontSize: '0.85rem', flex: 1 }}>
                <span>☕</span>
                <span style={{ marginTop: 8 }}>No sessions scheduled for today.</span>
              </div>
            ) : (
              todaysSessions.map(session => (
                <div 
                  key={session.id} 
                  className="adm-dashboard-list-row"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', border: '1px solid var(--adm-border-light)', borderRadius: 8, cursor: 'pointer' }}
                  onClick={() => navigate('/admin/counseling')}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', minWidth: 50 }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--adm-accent)', display: 'block' }}>
                        {new Date(session.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--adm-muted)' }}>{session.duration} min</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', color: 'var(--adm-text)' }}>{session.studentName}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>{session.sessionType || 'Career Session'}</span>
                    </div>
                  </div>
                  <Badge variant={session.status === 'Completed' ? 'green' : 'blue'} size="sm">{session.status}</Badge>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Follow-ups Card */}
        <div className="adm-dashboard-card" style={{ background: '#ffffff', borderRadius: 12, border: '1px solid var(--adm-border)', padding: 20, boxShadow: 'var(--adm-shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-accent)' }}>Pending Follow-ups</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>Action required on lead conversions</p>
            </div>
            <button className="adm-card-header-action-btn" style={{ fontSize: '0.75rem', color: 'var(--adm-accent)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/admin/leads?status=Follow-up+Required')}>
              View All
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {pendingFollowUps.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', color: 'var(--adm-muted)', fontSize: '0.85rem', flex: 1 }}>
                <span>✅</span>
                <span style={{ marginTop: 8 }}>All follow-up queues are clear.</span>
              </div>
            ) : (
              pendingFollowUps.map(lead => (
                <div 
                  key={lead.id} 
                  className="adm-dashboard-list-row"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', border: '1px solid var(--adm-border-light)', borderRadius: 8, cursor: 'pointer' }}
                  onClick={() => navigate('/admin/leads')}
                >
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', color: 'var(--adm-text)' }}>{lead.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>
                      Contact: {lead.phone} {lead.parentContact ? `(P: ${lead.parentContact})` : ''}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--adm-muted)' }}>Follow up:</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#b48a07' }}>
                      {lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Today'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* New Leads Card */}
        <div className="adm-dashboard-card" style={{ background: '#ffffff', borderRadius: 12, border: '1px solid var(--adm-border)', padding: 20, boxShadow: 'var(--adm-shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-accent)' }}>New Leads Today</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>Signups from Instagram & Organic Channels</p>
            </div>
            <Badge variant="indigo" size="sm">{newLeadsToday.length} Registered</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {newLeadsToday.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', color: 'var(--adm-muted)', fontSize: '0.85rem', flex: 1 }}>
                <span>🎯</span>
                <span style={{ marginTop: 8 }}>Waiting for new campaigns registrations.</span>
              </div>
            ) : (
              newLeadsToday.slice(0, 5).map(lead => (
                <div 
                  key={lead.id} 
                  className="adm-dashboard-list-row"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', border: '1px solid var(--adm-border-light)', borderRadius: 8, cursor: 'pointer' }}
                  onClick={() => navigate('/admin/leads')}
                >
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', color: 'var(--adm-text)' }}>{lead.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>{lead.education} · {lead.city}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'rgba(15, 76, 58, 0.05)', color: 'var(--adm-accent)', borderRadius: 4 }}>
                      {lead.source}
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 6px', background: 'rgba(212, 175, 55, 0.1)', color: '#b48a07', borderRadius: 4 }}>
                      ★ {lead.leadScore}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tasks Needing Action Card */}
        <div className="adm-dashboard-card" style={{ background: '#ffffff', borderRadius: 12, border: '1px solid var(--adm-border)', padding: 20, boxShadow: 'var(--adm-shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-accent)' }}>Tasks Checklist</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>Immediate operational checklists</p>
            </div>
            <button className="adm-card-header-action-btn" style={{ fontSize: '0.75rem', color: 'var(--adm-accent)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/admin/tasks')}>
              Manage
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {urgentTasks.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', color: 'var(--adm-muted)', fontSize: '0.85rem', flex: 1 }}>
                <span>✨</span>
                <span style={{ marginTop: 8 }}>All clear. No tasks pending!</span>
              </div>
            ) : (
              urgentTasks.map(task => (
                <div 
                  key={task.id} 
                  className="adm-dashboard-list-row"
                  style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 12px', border: '1px solid var(--adm-border-light)', borderRadius: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={task.status === 'Done'}
                    onChange={() => handleToggleTaskStatus(task)}
                    style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--adm-accent)' }}
                  />
                  <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => navigate('/admin/tasks')}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', color: 'var(--adm-text)', textDecoration: task.status === 'Done' ? 'line-through' : 'none' }}>
                      {task.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Today'}
                    </span>
                  </div>
                  <Badge variant={task.priority === 'Urgent' || task.priority === 'High' ? 'red' : 'gray'} size="sm">
                    {task.priority}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Webinar Schedule Card */}
        <div className="adm-dashboard-card" style={{ background: '#ffffff', borderRadius: 12, border: '1px solid var(--adm-border)', padding: 20, boxShadow: 'var(--adm-shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-accent)' }}>Webinar Pipeline</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>Upcoming E-Brave seminars</p>
            </div>
            <button className="adm-card-header-action-btn" style={{ fontSize: '0.75rem', color: 'var(--adm-accent)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/admin/webinars')}>
              View
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            {upcomingWebinars.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', color: 'var(--adm-muted)', fontSize: '0.85rem', flex: 1 }}>
                <span>📡</span>
                <span style={{ marginTop: 8 }}>No live or upcoming webinars.</span>
              </div>
            ) : (
              upcomingWebinars.slice(0, 2).map(webinar => (
                <div 
                  key={webinar.id} 
                  style={{ padding: 12, border: '1px solid var(--adm-border-light)', borderRadius: 8, background: 'rgba(124, 58, 237, 0.01)' }}
                  onClick={() => navigate('/admin/webinars')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--adm-accent)', display: 'block', maxWidth: '75%' }}>
                      {webinar.title}
                    </span>
                    <Badge variant={webinar.status === 'Live' ? 'red' : 'purple'} size="sm">{webinar.status}</Badge>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--adm-muted)', display: 'block' }}>Date & Time</span>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--adm-text)' }}>
                        {new Date(webinar.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} @ {new Date(webinar.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--adm-muted)', display: 'block' }}>Registrations</span>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--adm-text)' }}>{webinar.registrations?.length || 0} students</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--adm-text-secondary)', borderTop: '1px dashed var(--adm-border-light)', paddingTop: 6 }}>
                    <span>Host: {webinar.hostName || 'Dr. Shafeeq'}</span>
                    <span>Platform: <strong>{webinar.platform}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Important System Alerts Card */}
        <div className="adm-dashboard-card" style={{ background: '#ffffff', borderRadius: 12, border: '1px solid var(--adm-border)', padding: 20, boxShadow: 'var(--adm-shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-accent)' }}>Critical Notifications</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>System status and operations warnings</p>
            </div>
            <span style={{ width: 8, height: 8, background: importantAlerts.some(a => a.id !== 'a0') ? 'var(--adm-red)' : 'var(--adm-green)', borderRadius: '50%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {importantAlerts.map(alert => (
              <div 
                key={alert.id} 
                style={{ 
                  padding: 12, 
                  borderRadius: 8, 
                  fontSize: '0.8rem', 
                  lineHeight: 1.45,
                  background: alert.type === 'danger' ? 'rgba(225, 29, 72, 0.05)' : alert.type === 'warning' ? 'rgba(217, 119, 6, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                  color: alert.type === 'danger' ? 'var(--adm-red)' : alert.type === 'warning' ? '#d97706' : 'var(--adm-green)',
                  border: `1px solid ${alert.type === 'danger' ? 'rgba(225, 29, 72, 0.1)' : alert.type === 'warning' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`
                }}
              >
                {alert.message}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECONDARY SECTION: INTENTIONAL SUMMARY REPORTS */}
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--adm-accent)', marginBottom: 16, borderBottom: '1px solid var(--adm-border-light)', paddingBottom: 8 }}>
        AI Analysis & Pipeline Performance
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginBottom: 24 }}>
        
        {/* EOS AI Glow Recommendations */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid var(--adm-border)', padding: 20, boxShadow: '0 4px 24px rgba(15, 76, 58, 0.03)', borderLeft: '4px solid var(--adm-purple)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '1.1rem' }}>✦</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-accent)' }}>EOS AI Insights</h3>
            </div>
            <Badge variant="purple" size="sm">Active</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--adm-text)', borderLeft: '2px solid rgba(15, 76, 58, 0.1)', paddingLeft: 10 }}>
              <strong>Campaign Allocation:</strong> Instagram leads are converting at 23.5% vs WhatsApp organic at 12%. Recommending shifting 15% Counselor focus to Instagram leads.
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--adm-text)', borderLeft: '2px solid rgba(15, 76, 58, 0.1)', paddingLeft: 10 }}>
              <strong>Capacity Balance:</strong> Aarav Gupta has completed 12 tasks this week and has counselor capacity. Assign Bangalore incoming leads to Aarav.
            </div>
          </div>
          <div style={{ marginTop: 16, borderTop: '1px solid var(--adm-border-light)', paddingTop: 12 }}>
            <button 
              className="adm-btn adm-btn-ghost adm-btn-sm" 
              style={{ width: '100%', color: 'var(--adm-purple)', borderColor: 'rgba(124, 58, 237, 0.2)', fontSize: '0.75rem' }}
              onClick={() => navigate('/admin/eos-ai')}
            >
              Consult EOS AI Companion →
            </button>
          </div>
        </div>

        {/* Funnel Ratios summary */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid var(--adm-border)', padding: 20, boxShadow: 'var(--adm-shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-accent)' }}>Conversion Funnel Ratio</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--adm-muted)' }}>Conversion status map</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'New Signups', count: leads.filter(l => l.status === 'New Lead').length, pct: 100, color: 'var(--adm-accent)' },
              { label: 'Webinar Reg', count: leads.filter(l => l.status === 'Webinar Registered' || l.status === 'Webinar Attended').length, pct: Math.round((leads.filter(l => l.status === 'Webinar Registered' || l.status === 'Webinar Attended').length / (leads.length || 1)) * 100), color: '#7c3aed' },
              { label: 'Booked Sessions', count: leads.filter(l => l.status === 'Counseling Booked' || l.status === 'Counseling Completed').length, pct: Math.round((leads.filter(l => l.status === 'Counseling Booked' || l.status === 'Counseling Completed').length / (leads.length || 1)) * 100), color: '#10b981' },
              { label: 'Converted Students', count: leads.filter(l => l.status === 'Converted').length, pct: Math.round((leads.filter(l => l.status === 'Converted').length / (leads.length || 1)) * 100), color: '#d4af37' }
            ].map(stage => (
              <div key={stage.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-secondary)', marginBottom: 4 }}>
                  <span>{stage.label}</span>
                  <span>{stage.count} leads ({stage.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: 6, background: '#f0f3f1', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${stage.pct}%`, height: '100%', background: stage.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* QUICK ADD LEAD MODAL */}
      <Modal isOpen={showAddLead} onClose={() => setShowAddLead(false)} title="Add New Lead Manually" size="sm">
        <form onSubmit={handleQuickAddLead} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Student Full Name *</label>
            <input 
              className="adm-input" 
              required 
              value={leadForm.name} 
              onChange={e => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Shreya Iyer" 
            />
          </div>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Phone Number *</label>
            <input 
              className="adm-input" 
              required 
              value={leadForm.phone} 
              onChange={e => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="e.g. +91 99XXXXXX" 
            />
          </div>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Email Address</label>
            <input 
              type="email" 
              className="adm-input" 
              value={leadForm.email} 
              onChange={e => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="e.g. shreya@gmail.com" 
            />
          </div>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Education Target</label>
            <input 
              className="adm-input" 
              value={leadForm.education} 
              onChange={e => setLeadForm(prev => ({ ...prev, education: e.target.value }))}
              placeholder="e.g. Engineering, CA, NEET" 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="adm-form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Source</label>
              <select 
                className="adm-select" 
                value={leadForm.source} 
                onChange={e => setLeadForm(prev => ({ ...prev, source: e.target.value }))}
              >
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="YouTube">YouTube</option>
                <option value="Google Search">Google Search</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Counselor</label>
              <select 
                className="adm-select" 
                value={leadForm.counselorId} 
                onChange={e => setLeadForm(prev => ({ ...prev, counselorId: e.target.value }))}
              >
                <option value="">Auto-Assign</option>
                {team.filter(t => t.role === 'Counselor').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAddLead(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Register Lead</button>
          </div>
        </form>
      </Modal>

      {/* QUICK BOOK SESSION MODAL */}
      <Modal isOpen={showBookSession} onClose={() => setShowBookSession(false)} title="Quick Book Counseling Session" size="sm">
        <form onSubmit={handleQuickBookSession} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Select Student / Lead *</label>
            <select 
              className="adm-select" 
              required
              value={sessionForm.leadId} 
              onChange={e => setSessionForm(prev => ({ ...prev, leadId: e.target.value }))}
            >
              <option value="">Select Student...</option>
              {leads.map(l => (
                <option key={l.id} value={l.id}>{l.name} ({l.education})</option>
              ))}
            </select>
          </div>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Counselor *</label>
            <select 
              className="adm-select" 
              required
              value={sessionForm.counselorId} 
              onChange={e => setSessionForm(prev => ({ ...prev, counselorId: e.target.value }))}
            >
              <option value="">Assign Counselor...</option>
              {team.filter(t => t.role === 'Counselor').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Scheduled Time *</label>
            <input 
              type="datetime-local" 
              className="adm-input" 
              required 
              value={sessionForm.scheduledAt} 
              onChange={e => setSessionForm(prev => ({ ...prev, scheduledAt: e.target.value }))}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="adm-form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Duration</label>
              <select 
                className="adm-select" 
                value={sessionForm.duration} 
                onChange={e => setSessionForm(prev => ({ ...prev, duration: e.target.value }))}
              >
                <option value="20">20 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Session Type</label>
              <select 
                className="adm-select" 
                value={sessionForm.sessionType} 
                onChange={e => setSessionForm(prev => ({ ...prev, sessionType: e.target.value }))}
              >
                <option value="Initial">Initial Interview</option>
                <option value="Follow-up">Regular Follow-up</option>
                <option value="Parent Meeting">Parent Counseling</option>
                <option value="Career Planning">Career Planning Map</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowBookSession(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Schedule Session</button>
          </div>
        </form>
      </Modal>

      {/* QUICK CREATE TASK MODAL */}
      <Modal isOpen={showAddTask} onClose={() => setShowAddTask(false)} title="Create Checklist Task" size="sm">
        <form onSubmit={handleQuickAddTask} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Task Description *</label>
            <input 
              className="adm-input" 
              required 
              value={taskForm.title} 
              onChange={e => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Call Shreya Iyer parents regarding CA fee map" 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="adm-form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Priority</label>
              <select 
                className="adm-select" 
                value={taskForm.priority} 
                onChange={e => setTaskForm(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value="Urgent">⚠️ Urgent</option>
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Due Date</label>
              <input 
                type="date" 
                className="adm-input" 
                value={taskForm.dueDate} 
                onChange={e => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>
          <div className="adm-form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: 6 }}>Assign To</label>
            <select 
              className="adm-select" 
              value={taskForm.assignedTo} 
              onChange={e => setTaskForm(prev => ({ ...prev, assignedTo: e.target.value }))}
            >
              <option value="">Assign to Me</option>
              {team.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAddTask(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Add Task</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
