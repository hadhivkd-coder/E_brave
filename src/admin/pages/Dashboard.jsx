import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import MetricCard from '../components/ui/MetricCard';
import Badge from '../components/ui/Badge';
import { SparkLine } from '../components/ui/Chart';
import '../../admin.css';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatCurrency(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    leads = [],
    sessions = [],
    webinars = [],
    tasks = [],
    finances = [],
    updateTask,
    activityLog = []
  } = useData();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Compute metrics
  const todayStr = new Date().toISOString().split('T')[0];
  const newLeadsCount = leads.filter(l => l.createdAt?.startsWith(todayStr)).length;
  const hotLeadsCount = leads.filter(l => l.leadScore >= 8).length;
  const pendingFollowUps = leads.filter(l => l.status === 'Follow-up Required').length;
  
  const sessionsToday = sessions.filter(s => s.scheduledAt?.startsWith(todayStr));
  const upcomingSessionsCount = sessionsToday.filter(s => s.status === 'Scheduled').length;
  const completedSessionsCount = sessionsToday.filter(s => s.status === 'Completed').length;

  const activeWebinar = webinars.find(w => w.status === 'Live' || w.status === 'Upcoming') || webinars[0];

  const monthlyRevenue = finances
    .filter(t => {
      const d = new Date(t.date);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && t.amount > 0;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = finances
    .filter(t => {
      const d = new Date(t.date);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && t.amount < 0;
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Lists for middle section
  const latestLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const todaysSessionsList = [...sessionsToday]
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
    .slice(0, 4);

  const activeTasksList = [...tasks]
    .filter(t => t.status !== 'Done')
    .sort((a, b) => {
      const pMap = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
      return (pMap[a.priority] ?? 2) - (pMap[b.priority] ?? 2);
    })
    .slice(0, 4);

  // Toggle task completion
  const handleToggleTask = (task) => {
    updateTask({
      ...task,
      status: task.status === 'Done' ? 'Todo' : 'Done'
    });
  };

  // Funnel calculations
  const funnelStages = [
    { label: 'New Lead', count: leads.filter(l => l.status === 'New Lead').length, color: 'var(--adm-accent-dim)' },
    { label: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: 'rgba(15, 76, 58, 0.4)' },
    { label: 'Interested', count: leads.filter(l => l.status === 'Interested').length, color: 'rgba(15, 76, 58, 0.6)' },
    { label: 'Webinar Reg', count: leads.filter(l => l.status === 'Webinar Registered' || l.status === 'Webinar Attended').length, color: 'rgba(15, 76, 58, 0.8)' },
    { label: 'Counseling', count: leads.filter(l => l.status === 'Counseling Booked' || l.status === 'Counseling Completed').length, color: 'var(--adm-accent)' },
    { label: 'Converted', count: leads.filter(l => l.status === 'Converted').length, color: 'var(--adm-gold)' }
  ];

  const totalFunnelLeads = leads.length || 1;

  // Sparkline data for week
  const weeklyTrend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().split('T')[0];
    return leads.filter(l => l.createdAt?.startsWith(ds)).length;
  });

  return (
    <AdminLayout title="Dashboard">
      {/* 1. TOP SECTION: GREETINGS & STATUS */}
      <div className="adm-dashboard-header-bar">
        <div className="adm-header-greeting-zone">
          <h1>
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Operational Leader'}
          </h1>
          <p className="adm-header-subtext">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            {' · '}
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>

        <div className="adm-header-health-zone">
          <div className="adm-health-indicator">
            <span className="adm-health-dot status-active" />
            <span className="adm-health-text">Systems Operational</span>
          </div>
          {pendingFollowUps > 0 && (
            <div className="adm-urgent-alert-pill" onClick={() => navigate('/admin/leads?status=Follow-up+Required')}>
              <span className="adm-alert-icon">⚠️</span>
              <span>{pendingFollowUps} leads need immediate follow-up</span>
            </div>
          )}
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="adm-metrics-grid">
        <MetricCard
          title="Total Active Leads"
          value={leads.length}
          change={+8.4}
          icon="🎯"
          color="green"
          subtitle={`${newLeadsCount} new registered today`}
          sparkData={weeklyTrend}
        />
        <MetricCard
          title="Counseling Booked"
          value={sessions.filter(s => s.status === 'Scheduled').length}
          change={+14.2}
          icon="💬"
          color="green"
          subtitle={`${sessionsToday.length} sessions scheduled today`}
        />
        <MetricCard
          title="Conversion Funnel Rate"
          value={`${((leads.filter(l => l.status === 'Converted').length / totalFunnelLeads) * 100).toFixed(1)}%`}
          change={+1.5}
          icon="📊"
          color="green"
          subtitle={`${leads.filter(l => l.status === 'Converted').length} converted students`}
        />
        <MetricCard
          title="Estimated Monthly Margin"
          value={formatCurrency(monthlyRevenue - monthlyExpenses)}
          change={+11.8}
          icon="💰"
          color="green"
          subtitle={`Rev: ${formatCurrency(monthlyRevenue)} · Exp: ${formatCurrency(monthlyExpenses)}`}
        />
      </div>

      {/* 2. MIDDLE SECTION: PRIMARY OPERATIONAL CARDS */}
      <div className="adm-ops-grid">
        {/* New Leads Card */}
        <div className="adm-dashboard-card">
          <div className="adm-card-header-bar">
            <div>
              <h3>Recent Leads</h3>
              <p>Verify details and assign immediately</p>
            </div>
            <button className="adm-card-header-action-btn" onClick={() => navigate('/admin/leads')}>
              View All
            </button>
          </div>
          <div className="adm-card-list-body">
            {latestLeads.length === 0 ? (
              <div className="adm-list-empty-state">No new leads today</div>
            ) : (
              latestLeads.map(lead => (
                <div key={lead.id} className="adm-dashboard-list-row" onClick={() => navigate(`/admin/leads/${lead.id}`)}>
                  <div className="adm-row-avatar-circle bg-green-dim text-green">
                    {(lead.name || 'L').charAt(0).toUpperCase()}
                  </div>
                  <div className="adm-row-main-details">
                    <span className="adm-row-title-text">{lead.name}</span>
                    <span className="adm-row-subtitle-text">
                      {lead.city} · {lead.education}
                    </span>
                  </div>
                  <div className="adm-row-badge-zone">
                    <span className="adm-source-pill">{lead.source}</span>
                    <span className={`adm-score-pill score-${lead.leadScore >= 8 ? 'high' : 'medium'}`}>
                      ★ {lead.leadScore}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Today's Counseling Sessions */}
        <div className="adm-dashboard-card">
          <div className="adm-card-header-bar">
            <div>
              <h3>Today's Sessions</h3>
              <p>Status of scheduled growth discussions</p>
            </div>
            <button className="adm-card-header-action-btn" onClick={() => navigate('/admin/counseling')}>
              Manage
            </button>
          </div>
          <div className="adm-card-list-body">
            {todaysSessionsList.length === 0 ? (
              <div className="adm-list-empty-state">No sessions scheduled for today</div>
            ) : (
              todaysSessionsList.map(session => {
                const leadData = leads.find(l => l.id === session.leadId) || {};
                return (
                  <div key={session.id} className="adm-dashboard-list-row" onClick={() => navigate(`/admin/counseling/${session.id}`)}>
                    <div className="adm-row-time-column">
                      <span className="adm-time-large">
                        {new Date(session.scheduledAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </span>
                      <span className="adm-time-label">{session.duration} mins</span>
                    </div>
                    <div className="adm-row-main-details">
                      <span className="adm-row-title-text">{leadData.name || 'Student Session'}</span>
                      <span className="adm-row-subtitle-text">
                        Counselor: {session.counselorName || 'Assigned'}
                      </span>
                    </div>
                    <div className="adm-row-badge-zone">
                      <Badge variant={session.status === 'Completed' ? 'green' : 'blue'} size="sm">
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Active Tasks Card */}
        <div className="adm-dashboard-card">
          <div className="adm-card-header-bar">
            <div>
              <h3>Active Tasks</h3>
              <p>Operational checklists requiring action</p>
            </div>
            <button className="adm-card-header-action-btn" onClick={() => navigate('/admin/tasks')}>
              All Tasks
            </button>
          </div>
          <div className="adm-card-list-body">
            {activeTasksList.length === 0 ? (
              <div className="adm-list-empty-state">All caught up with tasks!</div>
            ) : (
              activeTasksList.map(task => (
                <div key={task.id} className="adm-dashboard-list-row task-row">
                  <div className="adm-row-checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={task.status === 'Done'}
                      onChange={() => handleToggleTask(task)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="adm-row-main-details" onClick={() => navigate(`/admin/tasks`)}>
                    <span className={`adm-row-title-text ${task.status === 'Done' ? 'line-through text-muted' : ''}`}>
                      {task.title}
                    </span>
                    <span className="adm-row-subtitle-text">
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'No date'}
                    </span>
                  </div>
                  <div className="adm-row-badge-zone">
                    <span className={`adm-priority-pill priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Webinar Registration Performance */}
        <div className="adm-dashboard-card">
          <div className="adm-card-header-bar">
            <div>
              <h3>Webinar Metrics</h3>
              <p>Engagement funnel of E-Brave seminars</p>
            </div>
            <button className="adm-card-header-action-btn" onClick={() => navigate('/admin/webinars')}>
              View
            </button>
          </div>
          <div className="adm-card-list-body">
            {activeWebinar ? (
              <div className="adm-webinar-detail-card" onClick={() => navigate(`/admin/webinars/${activeWebinar.id}`)}>
                <div className="adm-webinar-top-info">
                  <span className="adm-webinar-title-text">{activeWebinar.title}</span>
                  <Badge variant={activeWebinar.status === 'Live' ? 'red' : 'amber'} size="sm">
                    {activeWebinar.status}
                  </Badge>
                </div>
                <div className="adm-webinar-stats-grid">
                  <div className="adm-webinar-stat-item">
                    <span className="stat-value">{activeWebinar.registrations?.length || 0}</span>
                    <span className="stat-label">Registered</span>
                  </div>
                  <div className="adm-webinar-stat-item">
                    <span className="stat-value">{activeWebinar.attendees?.length || 0}</span>
                    <span className="stat-label">Attended</span>
                  </div>
                  <div className="adm-webinar-stat-item">
                    <span className="stat-value">
                      {activeWebinar.registrations?.length > 0 
                        ? `${Math.round(((activeWebinar.attendees?.length || 0) / activeWebinar.registrations.length) * 100)}%` 
                        : '0%'}
                    </span>
                    <span className="stat-label">Show Rate</span>
                  </div>
                  <div className="adm-webinar-stat-item font-accent">
                    <span className="stat-value">{formatCurrency(activeWebinar.revenue || 0)}</span>
                    <span className="stat-label">Revenue</span>
                  </div>
                </div>
                <div className="adm-webinar-footer-details">
                  <span>Host: {activeWebinar.hostName || 'Dr. Shafeeq'}</span>
                  <span>Platform: <strong>{activeWebinar.platform || 'Zoom'}</strong></span>
                </div>
              </div>
            ) : (
              <div className="adm-list-empty-state">No webinar data available</div>
            )}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: ANALYTICS & INSIGHTS */}
      <div className="adm-analytics-grid">
        {/* EOS AI Operational Insights */}
        <div className="adm-dashboard-card eos-ai-insights-card">
          <div className="adm-card-header-bar">
            <div className="adm-ai-header-title">
              <span className="adm-ai-icon-sparkle">✦</span>
              <h3>EOS AI Insights</h3>
            </div>
            <Badge variant="purple" size="sm">Intelligence Active</Badge>
          </div>
          <div className="adm-ai-insights-list">
            <div className="adm-ai-insight-item warning">
              <div className="adm-ai-insight-bullet">!</div>
              <div className="adm-ai-insight-text">
                <strong>WhatsApp Funnel Alert:</strong> Leads coming via WhatsApp campaign have a 25% lower response rate than Instagram organic. Recommend adjusting initial WhatsApp script.
              </div>
            </div>
            <div className="adm-ai-insight-item hot">
              <div className="adm-ai-insight-bullet">★</div>
              <div className="adm-ai-insight-text">
                <strong>Conversion Opportunity:</strong> 5 high-scoring leads (score 9+) attended the webinar on NEET alternatives but haven't booked a counseling session. Assign to top counselor.
              </div>
            </div>
            <div className="adm-ai-insight-item balance">
              <div className="adm-ai-insight-bullet">⚡</div>
              <div className="adm-ai-insight-text">
                <strong>Capacity Warning:</strong> Counselor Aarav Gupta has 23 active student relationships (15% above target threshold). Consider allocating new leads to other team members.
              </div>
            </div>
          </div>
          <div className="adm-ai-insights-footer">
            <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => navigate('/admin/eos-ai')}>
              Consult EOS AI assistant for recommendations →
            </button>
          </div>
        </div>

        {/* Funnel Analytics & Stage Breakdown */}
        <div className="adm-dashboard-card">
          <div className="adm-card-header-bar">
            <div>
              <h3>Conversion Funnel Analytics</h3>
              <p>Lead conversion progression & stage details</p>
            </div>
            <button className="adm-card-header-action-btn" onClick={() => navigate('/admin/analytics')}>
              Full Reports
            </button>
          </div>
          <div className="adm-funnel-breakdown-body">
            <div className="adm-funnel-bar-chart">
              {funnelStages.map(stage => {
                const percentage = Math.round((stage.count / totalFunnelLeads) * 100);
                return (
                  <div key={stage.label} className="adm-funnel-bar-row">
                    <span className="adm-funnel-stage-name">{stage.label}</span>
                    <div className="adm-funnel-stage-bar-wrap">
                      <div
                        className="adm-funnel-stage-bar"
                        style={{ width: `${Math.max(percentage, 4)}%`, background: stage.color }}
                      />
                      <span className="adm-funnel-stage-percentage">{percentage}%</span>
                    </div>
                    <span className="adm-funnel-stage-count">{stage.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
