import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import MetricCard from '../components/ui/MetricCard';
import ActivityFeed from '../components/shared/ActivityFeed';
import Badge from '../components/ui/Badge';
import { MiniBarChart, SparkLine } from '../components/ui/Chart';

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
  const { leads, students, sessions, webinars, content, finances, tasks, notifications, activityLog, metrics } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Compute real-time metrics
  const today = new Date().toISOString().split('T')[0];
  const newLeadsToday = leads.filter(l => l.createdAt?.startsWith(today)).length;
  const hotLeads = leads.filter(l => l.leadScore >= 8).length;
  const pendingFollowUps = leads.filter(l => l.status === 'Follow-up Required').length;
  const conversionRate = leads.length > 0
    ? ((leads.filter(l => l.status === 'Converted').length / leads.length) * 100).toFixed(1)
    : 0;

  const sessionsToday = sessions.filter(s => s.scheduledAt?.startsWith(today)).length;
  const completedSessions = sessions.filter(s => s.status === 'Completed').length;
  const upcomingSessions = sessions.filter(s => s.status === 'Scheduled').length;

  const activeWebinars = webinars.filter(w => w.status === 'Upcoming' || w.status === 'Live');
  const totalWebinarRev = webinars.reduce((sum, w) => sum + (w.revenue || 0), 0);
  const totalWebinarAttendees = webinars.reduce((sum, w) => sum + (w.attendees?.length || 0), 0);

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

  const publishedContent = content.filter(c => c.status === 'Published').length;
  const contentLeads = content.reduce((sum, c) => sum + (c.leadsGenerated || 0), 0);

  const openTasks = tasks.filter(t => t.status !== 'Done').length;
  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  // Weekly lead trend (last 7 days)
  const weeklyLeads = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().split('T')[0];
    return leads.filter(l => l.createdAt?.startsWith(ds)).length;
  });

  // Hot leads
  const hotLeadsList = leads
    .filter(l => l.leadScore >= 8 && l.status !== 'Converted' && l.status !== 'Closed')
    .sort((a, b) => b.leadScore - a.leadScore)
    .slice(0, 5);

  // Upcoming sessions
  const upcomingSessionsList = sessions
    .filter(s => s.status === 'Scheduled')
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
    .slice(0, 4);

  return (
    <AdminLayout title="Dashboard">
      {/* Page Header */}
      <div className="adm-dashboard-header">
        <div className="adm-dashboard-greeting">
          <h1>
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Admin'} 👋
          </h1>
          <p className="adm-dashboard-date">
            {currentTime.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}
            {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="adm-dashboard-status">
          <span className="adm-status-dot adm-status-live" />
          <span>System Operational</span>
        </div>
      </div>

      {/* Attention Required Banner */}
      {pendingFollowUps > 0 && (
        <div className="adm-alert-banner adm-card">
          <div className="adm-alert-banner-header">
            <span className="adm-alert-icon">⚠️</span>
            <h4>Attention Required</h4>
          </div>
          <div className="adm-alert-banner-body">
            <p>
              You have <strong>{pendingFollowUps}</strong> leads requiring immediate follow-up. 
              Prompt follow-up increases lead-to-counseling conversion by up to 40%.
            </p>
            <div className="adm-alert-banner-actions">
              <a href="/admin/leads" className="adm-btn adm-btn-sm adm-btn-primary">View Pending Leads</a>
            </div>
          </div>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="adm-metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <MetricCard
          title="Total Leads"
          value={leads.length}
          change={+12.5}
          icon="🎯"
          color="green"
          subtitle={`${newLeadsToday} new today · ${hotLeads} hot`}
          sparkData={weeklyLeads}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          change={+2.1}
          icon="📈"
          color="green"
          subtitle={`${leads.filter(l => l.status === 'Converted').length} converted`}
        />
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(monthlyRevenue)}
          change={+18.3}
          icon="💰"
          color="green"
          subtitle={`Expenses: ${formatCurrency(monthlyExpenses)}`}
        />
        <MetricCard
          title="Sessions Today"
          value={sessionsToday}
          change={0}
          icon="📅"
          color="green"
          subtitle={`${upcomingSessions} upcoming · ${completedSessions} done`}
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="adm-dashboard-grid">
        {/* Left Column */}
        <div className="adm-dashboard-col-main">

          {/* Weekly Lead Trend */}
          <div className="adm-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Lead Acquisition</h3>
                <p className="adm-card-subtitle">Last 7 days performance</p>
              </div>
              <div className="adm-card-header-actions">
                <span className="adm-badge adm-badge-green">+12.5% vs last week</span>
              </div>
            </div>
            <div className="adm-chart-container">
              <MiniBarChart
                data={weeklyLeads.map((v, i) => ({
                  label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
                  value: v
                }))}
                color="#0f4c3a"
                height={140}
              />
            </div>
          </div>

          {/* Lead Pipeline */}
          <div className="adm-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Lead Pipeline</h3>
                <p className="adm-card-subtitle">Current funnel status</p>
              </div>
              <a href="/admin/leads" className="adm-card-link">View all →</a>
            </div>
            <div className="adm-pipeline">
              {[
                { status: 'New Lead', color: '#0f4c3a' },
                { status: 'Contacted', color: '#1c634c' },
                { status: 'Interested', color: '#d4af37' },
                { status: 'Webinar Registered', color: '#7c3aed' },
                { status: 'Counseling Booked', color: '#10b981' },
                { status: 'Converted', color: '#0284c7' },
              ].map(({ status, color }) => {
                const count = leads.filter(l => l.status === status).length;
                const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                return (
                  <div key={status} className="adm-pipeline-row">
                    <div className="adm-pipeline-label">
                      <span className="adm-pipeline-dot" style={{ background: color }} />
                      <span>{status}</span>
                    </div>
                    <div className="adm-pipeline-bar-wrap">
                      <div
                        className="adm-pipeline-bar"
                        style={{ width: `${Math.max(pct, 2)}%`, background: color }}
                      />
                    </div>
                    <span className="adm-pipeline-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="adm-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Revenue Breakdown</h3>
                <p className="adm-card-subtitle">This month</p>
              </div>
              <a href="/admin/finance" className="adm-card-link">Finance →</a>
            </div>
            <div className="adm-revenue-breakdown">
              {[
                { label: 'Counseling Revenue', amount: finances.filter(t => t.type === 'Counseling Revenue' && t.amount > 0).reduce((s, t) => s + t.amount, 0), color: '#0f4c3a', icon: '🎯' },
                { label: 'Webinar Revenue', amount: finances.filter(t => t.type === 'Webinar Revenue' && t.amount > 0).reduce((s, t) => s + t.amount, 0), color: '#10b981', icon: '🎬' },
                { label: 'Ad Spend', amount: finances.filter(t => t.type === 'Ad Spend').reduce((s, t) => s + Math.abs(t.amount), 0), color: '#d97706', icon: '📢', expense: true },
                { label: 'Operational', amount: finances.filter(t => t.type === 'Operational').reduce((s, t) => s + Math.abs(t.amount), 0), color: '#e11d48', icon: '⚙️', expense: true },
              ].map(item => (
                <div key={item.label} className="adm-revenue-row">
                  <span className="adm-revenue-icon">{item.icon}</span>
                  <span className="adm-revenue-label">{item.label}</span>
                  <span className={`adm-revenue-amount ${item.expense ? 'adm-text-red' : 'adm-text-green'}`}>
                    {item.expense ? '-' : '+'}{formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
              <div className="adm-revenue-divider" />
              <div className="adm-revenue-row adm-revenue-total">
                <span className="adm-revenue-icon">💎</span>
                <span className="adm-revenue-label">Estimated Profit</span>
                <span className="adm-text-green adm-font-bold">
                  {formatCurrency(monthlyRevenue - monthlyExpenses)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="adm-dashboard-col-side">

          {/* EOS AI Quick Panel */}
          <div className="adm-card adm-eos-panel" style={{ borderLeft: '3px solid #d4af37' }}>
            <div className="adm-eos-panel-header">
              <div className="adm-eos-icon" style={{ background: 'rgba(212,175,55,0.1)' }}>
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path d="M16 2L28 8V16C28 22.627 22.627 28 16 29.6C9.373 28 4 22.627 4 16V8L16 2Z" fill="#d4af37" fillOpacity="0.2" stroke="#d4af37" strokeWidth="1.5"/>
                  <path d="M11 16L14 19L21 12" stroke="#0f4c3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="adm-eos-panel-title">EOS AI</div>
                <div className="adm-eos-panel-status">
                  <span className="adm-status-dot adm-status-live" style={{ width: 6, height: 6 }} />
                  <span>Active · Ready to assist</span>
                </div>
              </div>
              <a href="/admin/eos-ai" className="adm-eos-open-btn">Open →</a>
            </div>
            <div className="adm-eos-insights">
              {[
                { icon: '⚠️', text: `${pendingFollowUps} leads need follow-up`, type: 'warning' },
                { icon: '🔥', text: `${hotLeads} hot leads ready to convert`, type: 'success' },
                { icon: '📊', text: `${conversionRate}% conversion rate this month`, type: 'info' },
                { icon: '📅', text: `${upcomingSessions} sessions scheduled today`, type: 'info' },
              ].map((insight, i) => (
                <div key={i} className={`adm-eos-insight adm-eos-insight-${insight.type}`}>
                  <span>{insight.icon}</span>
                  <span>{insight.text}</span>
                </div>
              ))}
            </div>
            <a href="/admin/eos-ai" className="adm-btn adm-btn-ghost adm-btn-full adm-btn-sm" style={{ borderColor: 'rgba(15,76,58,0.2)', color: '#0f4c3a' }}>
              Ask EOS AI anything →
            </a>
          </div>

          {/* Hot Leads */}
          <div className="adm-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">🔥 Hot Leads</h3>
                <p className="adm-card-subtitle">Score 8+ · Ready to convert</p>
              </div>
              <a href="/admin/leads" className="adm-card-link">All leads →</a>
            </div>
            <div className="adm-hot-leads">
              {hotLeadsList.length === 0 ? (
                <p className="adm-empty-state">No hot leads right now</p>
              ) : hotLeadsList.map(lead => (
                <div key={lead.id} className="adm-hot-lead-item">
                  <div className="adm-avatar adm-avatar-sm" style={{ background: 'rgba(15,76,58,0.08)', color: '#0f4c3a' }}>
                    {lead.name?.charAt(0)}
                  </div>
                  <div className="adm-hot-lead-info">
                    <div className="adm-hot-lead-name">{lead.name}</div>
                    <div className="adm-hot-lead-meta">{lead.source} · {lead.city}</div>
                  </div>
                  <div className="adm-lead-score" style={{
                    background: lead.leadScore >= 9 ? 'rgba(16,185,129,0.1)' : 'rgba(217,119,6,0.1)',
                    color: lead.leadScore >= 9 ? '#10b981' : '#d97706'
                  }}>
                    {lead.leadScore}/10
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Sessions */}
          <div className="adm-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">📅 Today's Sessions</h3>
                <p className="adm-card-subtitle">{sessionsToday} scheduled</p>
              </div>
              <a href="/admin/counseling" className="adm-card-link">View →</a>
            </div>
            <div className="adm-sessions-list">
              {upcomingSessionsList.length === 0 ? (
                <p className="adm-empty-state">No sessions scheduled today</p>
              ) : upcomingSessionsList.map(s => (
                <div key={s.id} className="adm-session-item">
                  <div className="adm-session-time">
                    {new Date(s.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="adm-session-info">
                    <div className="adm-session-student">{s.studentName || 'Student'}</div>
                    <div className="adm-session-counselor">{s.counselorName || 'Counselor'}</div>
                  </div>
                  <Badge variant="blue" size="sm">{s.sessionType || 'Session'}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="adm-card">
            <div className="adm-card-header">
              <h3 className="adm-card-title">⚡ System Health</h3>
            </div>
            <div className="adm-system-health">
              {[
                { label: 'Active Automations', value: '6/8', status: 'green' },
                { label: 'Open Tasks', value: openTasks, status: openTasks > 10 ? 'amber' : 'green' },
                { label: 'Unread Notifications', value: unreadNotifs, status: unreadNotifs > 5 ? 'amber' : 'green' },
                { label: 'Failed Workflows', value: 0, status: 'green' },
                { label: 'Website Errors', value: 2, status: 'amber' },
              ].map(item => (
                <div key={item.label} className="adm-health-row">
                  <span className="adm-health-label">{item.label}</span>
                  <div className="adm-health-right">
                    <span className={`adm-health-dot adm-status-${item.status}`} />
                    <span className="adm-health-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="adm-card">
        <div className="adm-card-header">
          <div>
            <h3 className="adm-card-title">📋 Recent Activity</h3>
            <p className="adm-card-subtitle">Latest system events</p>
          </div>
        </div>
        <ActivityFeed activities={activityLog} maxItems={10} />
      </div>
    </AdminLayout>
  );
}
