import React, { useState, useMemo, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { supabase } from '../../lib/supabase';

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return url && !url.includes('your-project-id') && !url.includes('your-project-ref');
};

const INITIAL_RULES = [
  {
    id: 'r1',
    name: 'Missed Follow-up → Auto Task',
    trigger: 'When lead status = Follow-up Required for > 2 days',
    action: 'Create task: Follow up with [lead name] and assign to counselor',
    active: true,
    lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    triggerCount: 84,
    category: 'Leads',
  },
  {
    id: 'r2',
    name: 'New Lead → Assign Counselor',
    trigger: 'When new lead is created via any form submission',
    action: 'Auto-assign to least-loaded counselor and send welcome WhatsApp',
    active: true,
    lastTriggered: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    triggerCount: 312,
    category: 'Leads',
  },
  {
    id: 'r3',
    name: 'Broken Form Detected → Instant Alert',
    trigger: 'When form submission returns 4xx/5xx error for ≥ 2 users in 1 hour',
    action: 'Send high-priority notification to Admin + log system error',
    active: true,
    lastTriggered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    triggerCount: 6,
    category: 'System',
  },
  {
    id: 'r4',
    name: 'Lead Score >= 8 → Mark as Hot Lead',
    trigger: 'When AI lead score reaches 8 or above',
    action: 'Update lead status to Hot Lead, notify assigned counselor immediately',
    active: true,
    lastTriggered: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    triggerCount: 47,
    category: 'AI',
  },
  {
    id: 'r5',
    name: 'No Activity 7 Days → Follow-up Reminder',
    trigger: 'When lead has no interaction logged for 7 consecutive days',
    action: 'Create urgent task for counselor and send re-engagement WhatsApp',
    active: true,
    lastTriggered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    triggerCount: 23,
    category: 'Leads',
  },
  {
    id: 'r6',
    name: 'Webinar Registration → Send Confirmation',
    trigger: 'When student registers for any webinar',
    action: 'Send email + WhatsApp confirmation with Zoom link and calendar invite',
    active: false,
    lastTriggered: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    triggerCount: 156,
    category: 'Webinars',
  },
  {
    id: 'r7',
    name: 'High Bounce Page → Optimization Alert',
    trigger: 'When page bounce rate exceeds 70% for > 3 hours (GA4 data)',
    action: 'Alert Admin with page URL, bounce rate, and AI improvement suggestions',
    active: true,
    lastTriggered: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    triggerCount: 19,
    category: 'Analytics',
  },
  {
    id: 'r8',
    name: 'Monthly Report → Auto Generate',
    trigger: 'On the 1st of every month at 8:00 AM',
    action: 'Generate AI performance report and email to Admin and stakeholders',
    active: true,
    lastTriggered: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    triggerCount: 12,
    category: 'Reporting',
  },
];

const TRIGGER_TYPES = [
  'Lead status change',
  'New lead created',
  'Lead score threshold',
  'No activity for N days',
  'Form error detected',
  'Webinar registration',
  'High bounce rate',
  'Scheduled (cron)',
];

const ACTION_TYPES = [
  'Create task',
  'Send WhatsApp message',
  'Send email notification',
  'Update lead status',
  'Send admin alert',
  'Generate report',
  'Assign counselor',
];

const CATEGORY_COLORS = {
  Leads: 'var(--adm-accent)',
  AI: 'var(--adm-green)',
  System: 'var(--adm-red)',
  Webinars: 'var(--adm-blue)',
  Analytics: 'var(--adm-amber)',
  Reporting: 'var(--adm-muted)',
};

export default function Automation() {
  const { activityLog, logActivity } = useData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('rules'); // 'rules' | 'queue' | 'logs'
  const [rules, setRules] = useState(INITIAL_RULES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState(null);
  const [newRule, setNewRule] = useState({
    name: '',
    trigger: '',
    triggerType: TRIGGER_TYPES[0],
    action: '',
    actionType: ACTION_TYPES[0],
    actionParams: '',
  });

  // Safe client event queue simulating retry, duplicate hashing, DLQ controls
  const [eventQueue, setEventQueue] = useState([
    {
      id: 'ev_001',
      hash: 'sha256-4f81c9a',
      ruleName: 'New Lead → Assign Counselor',
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      status: 'Success',
      attempts: 1,
      detail: 'Assigned lead "Rahul Nair" to counselor Divya K.',
      errorLog: null
    },
    {
      id: 'ev_002',
      hash: 'sha256-e91b32d',
      ruleName: 'Webinar Registration → Send Confirmation',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      status: 'Dead-Letter',
      attempts: 3,
      detail: 'WhatsApp dispatch failed: Destination API returned 503 Service Unavailable',
      errorLog: 'Error: API request timed out after 10000ms. Max retries (3/3) exceeded.'
    },
    {
      id: 'ev_003',
      hash: 'sha256-a1829cd',
      ruleName: 'Lead Score >= 8 → Mark as Hot Lead',
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      status: 'Success',
      attempts: 2,
      detail: 'Upgraded lead "Siddharth Sen" (score 9) to Hot Lead and triggered dashboard alarm.',
      errorLog: 'Attempt 1 failed: Connection socket closed. Retried successfully on attempt 2.'
    },
    {
      id: 'ev_004',
      hash: 'sha256-f81d11a',
      ruleName: 'Broken Form Detected → Instant Alert',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      status: 'Success',
      attempts: 1,
      detail: 'Dispatched emergency webhook payload alert to Operations Slack/Discord channel.',
      errorLog: null
    }
  ]);

  // Handle live Supabase rules fetching if configured
  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const fetchRules = async () => {
      const { data, error } = await supabase.from('automation_rules').select('*');
      if (!error && data) {
        setRules(data.map(r => ({
          id: r.id,
          name: r.name,
          trigger: r.trigger_type,
          action: r.action_type,
          active: r.is_active,
          lastTriggered: r.last_triggered_at,
          triggerCount: r.trigger_count,
          category: r.trigger_type.includes('Score') ? 'AI' : 'Leads'
        })));
      }
    };
    fetchRules();
  }, []);

  const stats = useMemo(() => {
    const active = rules.filter(r => r.active).length;
    const totalTriggers = rules.reduce((sum, r) => sum + r.triggerCount, 0);
    const queueLoad = eventQueue.filter(e => e.status === 'Pending' || e.status === 'Retrying').length;
    
    const succeeded = eventQueue.filter(e => e.status === 'Success').length;
    const totalEvents = eventQueue.length;
    const successRate = totalEvents ? Math.round((succeeded / totalEvents) * 100) : 100;

    return { active, totalTriggers, queueLoad, successRate };
  }, [rules, eventQueue]);

  const toggleRule = async (id) => {
    const matched = rules.find(r => r.id === id);
    if (!matched) return;
    const nextActiveState = !matched.active;

    setRules(prev => prev.map(r => r.id === id ? { ...r, active: nextActiveState } : r));

    if (isSupabaseConfigured()) {
      await supabase.from('automation_rules').update({ is_active: nextActiveState }).eq('id', id);
    }
  };

  const deleteRule = (id) => {
    setRuleToDelete(id);
  };

  const handleDeleteRuleConfirm = async () => {
    if (!ruleToDelete) return;
    const rule = rules.find(r => r.id === ruleToDelete);
    setRules(prev => prev.filter(r => r.id !== ruleToDelete));
    if (isSupabaseConfigured()) {
      await supabase.from('automation_rules').delete().eq('id', ruleToDelete);
    }
    logActivity('system', `Deleted automation rule: ${rule?.name || ruleToDelete}`, null, ruleToDelete, {
      actor: user?.name || 'System Admin',
      action: 'DELETE_AUTOMATION_RULE',
      entity: 'automation_rules',
      previousValues: rule
    });
    setRuleToDelete(null);
  };

  const handleCreateRule = async () => {
    if (!newRule.name.trim()) return;
    const ruleId = `r${Date.now()}`;
    const rule = {
      id: ruleId,
      name: newRule.name,
      trigger: newRule.trigger || `${newRule.triggerType}`,
      action: newRule.action || `${newRule.actionType}: ${newRule.actionParams}`,
      active: true,
      lastTriggered: null,
      triggerCount: 0,
      category: newRule.triggerType.includes('score') ? 'AI' : 'Leads',
    };
    setRules(prev => [rule, ...prev]);

    if (isSupabaseConfigured()) {
      await supabase.from('automation_rules').insert([{
        name: newRule.name,
        trigger_type: newRule.triggerType,
        trigger_condition: { condition: newRule.trigger },
        action_type: newRule.actionType,
        action_params: { params: newRule.actionParams },
        is_active: true
      }]);
    }

    setNewRule({ name: '', trigger: '', triggerType: TRIGGER_TYPES[0], action: '', actionType: ACTION_TYPES[0], actionParams: '' });
    setShowCreateModal(false);
  };

  // Simulates manually triggering event retry in DLQ
  const handleRetryEvent = (id) => {
    setEventQueue(prev => prev.map(evt => {
      if (evt.id === id) {
        return {
          ...evt,
          status: 'Success',
          attempts: evt.attempts < 3 ? evt.attempts + 1 : 3,
          errorLog: 'Manually retried successfully by Admin.'
        };
      }
      return evt;
    }));
  };

  // Centralized System Logs filtering (simulating auth and RLS monitoring)
  const systemLogs = useMemo(() => {
    const activityLogs = (activityLog || []).map((log, i) => ({
      id: log.id || `act_${i}`,
      timestamp: log.createdAt || log.created_at || new Date().toISOString(),
      type: log.type === 'auth' ? 'AUTH' : log.type === 'payment' ? 'FINANCE' : 'INFO',
      message: log.message || 'Operational activity logged',
      user: 'Operations Officer'
    }));

    // Add security alerts & RLS denial logs for observability demo
    return [
      {
        id: 'sys_001',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        type: 'AUTH_DENIED',
        message: 'RLS denial on public.transactions block. Role: Content Manager. IP: 106.220.12.91',
        user: 'system-agent'
      },
      {
        id: 'sys_002',
        timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
        type: 'AI_PROMPT_EXEC',
        message: 'Edge Function eos-ai executed successfully. Prompt: "Leads funnel optimization". Tokens: 928.',
        user: 'system-agent'
      },
      {
        id: 'sys_003',
        timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
        type: 'INTEGRATION_ERROR',
        message: 'Failed connection hook to Plausible/GA4 API server (Timeout). Retrying in 15m.',
        user: 'system-agent'
      },
      ...activityLogs
    ];
  }, [activityLog]);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="adm-page-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: 'var(--adm-text)' }}>
            Automation & Monitoring Center
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--adm-text-secondary)' }}>
            Supervise active event queues, audit security/RLS log streams, and manage workflow rules.
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Rule
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Active Rules', value: stats.active, color: 'var(--adm-green)', icon: '✅' },
          { label: 'Event Queue Load', value: stats.queueLoad, color: 'var(--adm-accent)', icon: '⚡' },
          { label: 'Success rate', value: `${stats.successRate}%`, color: 'var(--adm-blue)', icon: '🔁' },
          { label: 'Rule Triggers (All)', value: stats.totalTriggers, color: 'var(--adm-amber)', icon: '📈' },
        ].map(stat => (
          <div key={stat.label} className="adm-card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>{stat.icon}</span>
              <span style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tab controls */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--adm-border)', gap: '24px', marginBottom: '20px' }}>
        {[
          { id: 'rules', label: 'Automation Rules', count: rules.length },
          { id: 'queue', label: 'Event Queue & DLQ', count: eventQueue.length },
          { id: 'logs', label: 'System & Security Logs', count: systemLogs.length },
          { id: 'observability', label: 'EOS Health Monitor', count: '99%' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '10px 4px 14px',
              fontSize: '14px',
              fontWeight: 600,
              color: activeTab === tab.id ? 'var(--adm-accent)' : 'var(--adm-text-secondary)',
              borderBottom: activeTab === tab.id ? '2px solid var(--adm-accent)' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {tab.label}
            <span style={{
              fontSize: '11px',
              background: 'rgba(255,255,255,0.06)',
              color: 'var(--adm-text-secondary)',
              padding: '1px 6px',
              borderRadius: '999px',
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Panel: Automation Rules */}
      {activeTab === 'rules' && (
        <div className="adm-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--adm-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--adm-text)' }}>
              Automation Rules Checklist
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {rules.map((rule, idx) => (
              <div
                key={rule.id}
                style={{
                  padding: '18px 20px',
                  borderBottom: idx < rules.length - 1 ? '1px solid var(--adm-border)' : 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  opacity: rule.active ? 1 : 0.55,
                  transition: 'opacity 0.2s',
                }}
              >
                {/* Toggle */}
                <div style={{ flexShrink: 0, paddingTop: '2px' }}>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    style={{
                      width: '40px',
                      height: '22px',
                      borderRadius: '999px',
                      border: 'none',
                      background: rule.active ? 'var(--adm-green)' : 'var(--adm-muted)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background 0.2s',
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      top: '3px',
                      left: rule.active ? '20px' : '3px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#fff',
                      transition: 'left 0.2s',
                    }} />
                  </button>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--adm-text)' }}>
                      {rule.name}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: `${CATEGORY_COLORS[rule.category] || 'var(--adm-muted)'}22`,
                      color: CATEGORY_COLORS[rule.category] || 'var(--adm-muted)',
                      fontWeight: 600,
                    }}>
                      {rule.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>
                      <span style={{ color: 'var(--adm-amber)', fontWeight: 600, marginRight: '6px' }}>WHEN</span>
                      {rule.trigger}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>
                      <span style={{ color: 'var(--adm-accent)', fontWeight: 600, marginRight: '6px' }}>THEN</span>
                      {rule.action}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    className="adm-btn adm-btn-ghost"
                    style={{ fontSize: '12px', padding: '5px 12px', color: 'var(--adm-red)' }}
                    onClick={() => deleteRule(rule.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Panel: Active Event Queue & DLQ */}
      {activeTab === 'queue' && (
        <div className="adm-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--adm-border)' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--adm-text)' }}>
              Active Queue Event Registry
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--adm-text-secondary)' }}>
              Queue checks payloads for duplicates (via SHA-256 signature) and auto-retries failed events up to 3 times before routing to DLQ (Dead-Letter Queue).
            </p>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Event signature</th>
                  <th>Rule Target</th>
                  <th>Retry Attempts</th>
                  <th>Status</th>
                  <th>Detail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {eventQueue.map(evt => {
                  const ageMs = Date.now() - new Date(evt.timestamp).getTime();
                  const ageMinutes = Math.floor(ageMs / 60000);
                  const isStuck = evt.status !== 'Success' && (evt.attempts >= 3 || ageMinutes > 30);
                  
                  let ageText = `${ageMinutes}m ago`;
                  if (ageMinutes > 60) {
                    ageText = `${Math.floor(ageMinutes / 60)}h ${ageMinutes % 60}m ago`;
                  }

                  let recoveryTip = null;
                  if (isStuck) {
                    if (evt.ruleName.includes('WhatsApp') || evt.detail.includes('WhatsApp')) {
                      recoveryTip = "Tip: Verify WhatsApp API balance and credentials under Integrations settings.";
                    } else if (evt.ruleName.includes('Webinar')) {
                      recoveryTip = "Tip: Zoom/OAuth webhook integration failed. Refresh authorization token.";
                    } else {
                      recoveryTip = "Tip: Check database webhook configurations or manually trigger queue retry.";
                    }
                  }

                  return (
                    <tr key={evt.id} style={{ borderLeft: isStuck ? '3px solid var(--adm-red)' : 'none' }}>
                      <td>
                        <code style={{ fontSize: '12px', color: 'var(--adm-accent)' }}>{evt.hash}</code>
                        <div style={{ fontSize: '11px', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
                          {ageText} {isStuck && <span style={{ color: 'var(--adm-red)', fontWeight: 'bold' }}>(AGED)</span>}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, fontSize: '13px' }}>{evt.ruleName}</td>
                      <td style={{ fontSize: '13px' }}>
                        <span style={{ color: evt.attempts >= 3 && evt.status === 'Dead-Letter' ? 'var(--adm-red)' : 'var(--adm-text)' }}>
                          {evt.attempts}/3
                        </span>
                        {isStuck && (
                          <span style={{
                            display: 'block',
                            fontSize: '9px',
                            fontWeight: 800,
                            color: 'var(--adm-red)',
                            textTransform: 'uppercase',
                            marginTop: '2px'
                          }}>
                            STUCK
                          </span>
                        )}
                      </td>
                      <td>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: evt.status === 'Success' ? 'var(--adm-green-dim)' : 'var(--adm-red-dim)',
                          color: evt.status === 'Success' ? 'var(--adm-green)' : 'var(--adm-red)'
                        }}>
                          {evt.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '13px', maxWidth: '300px' }}>
                        <div style={{ fontWeight: 500 }}>{evt.detail}</div>
                        {evt.errorLog && (
                          <div style={{ fontSize: '11px', color: 'var(--adm-text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                            {evt.errorLog}
                          </div>
                        )}
                        {recoveryTip && (
                          <div style={{
                            color: 'var(--adm-amber)',
                            fontSize: '11px',
                            marginTop: '4px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            💡 {recoveryTip}
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          className="adm-btn adm-btn-sm"
                          disabled={evt.status === 'Success'}
                          onClick={() => handleRetryEvent(evt.id)}
                          style={{
                            opacity: evt.status === 'Success' ? 0.3 : 1,
                            cursor: evt.status === 'Success' ? 'not-allowed' : 'pointer'
                          }}
                        >
                          🔄 Retry
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Panel: Operational Logs */}
      {activeTab === 'logs' && (
        <div className="adm-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--adm-border)' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--adm-text)' }}>
              Operational Security & Activity Audit
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--adm-text-secondary)' }}>
              Audit ledger tracks permission controls, authentication warnings, API requests, and transactional executions.
            </p>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Log Type</th>
                  <th>Message Summary</th>
                  <th>Agent / Actor</th>
                </tr>
              </thead>
              <tbody>
                {systemLogs.map(log => {
                  const isAlert = log.type.includes('DENIED') || log.type.includes('ERROR');
                  return (
                    <tr key={log.id}>
                      <td style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', whiteSpace: 'nowrap' }}>
                        {new Date(log.timestamp).toLocaleString('en-IN')}
                      </td>
                      <td>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: isAlert ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          color: isAlert ? 'var(--adm-red)' : 'var(--adm-text-secondary)',
                          fontFamily: 'monospace'
                        }}>
                          {log.type}
                        </span>
                      </td>
                      <td style={{ fontSize: '13px', color: isAlert ? 'var(--adm-text)' : 'var(--adm-text-secondary)' }}>
                        {log.message}
                      </td>
                      <td style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>
                        {log.user}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Panel: Observability & Health */}
      {activeTab === 'observability' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
          {/* Main Telemetry & Cost Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Latency Monitors */}
            <div className="adm-card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--adm-text)' }}>Latency Telemetry</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>DB API Roundtrip</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--adm-green)' }}>124 ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Edge Function (OpenAI)</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--adm-accent)' }}>824 ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Websocket KeepAlive</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--adm-green)' }}>41 ms</span>
                </div>
              </div>
            </div>

            {/* Token Budget & Costs */}
            <div className="adm-card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--adm-text)' }}>AI Token Budget & Costs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Input Tokens</span>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>452,912</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Output Tokens</span>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>184,002</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Accumulated Cost</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--adm-accent)' }}>$1.27 / $10.00 ceiling</span>
                </div>
              </div>
            </div>

            {/* Subscriptions & Heap Memory */}
            <div className="adm-card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--adm-text)' }}>Resource Footprint</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Active Realtime Channels</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--adm-green)' }}>5 active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>JS Heap Allocation</span>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>38.4 MB</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>Plausible Analytics Sync</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--adm-green)' }}>Operational</span>
                </div>
              </div>
            </div>
          </div>

          {/* Failure Ratios & Alerts */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div className="adm-card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--adm-text)' }}>Error Ratios & Alert Rates</h3>
              <div className="adm-table-wrap">
                <table className="adm-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px' }}>Service Boundary</th>
                      <th style={{ padding: '8px' }}>Requests</th>
                      <th style={{ padding: '8px' }}>Failure %</th>
                      <th style={{ padding: '8px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Supabase DB Reads/Writes', requests: '1,492', fail: '0.07%', status: 'HEALTHY' },
                      { name: 'Row Level Security Violations', requests: '8', fail: '0.53%', status: 'MONITORED' },
                      { name: 'OpenAI API Proxy Calls', requests: '320', fail: '0.00%', status: 'HEALTHY' },
                      { name: 'Plausible Ingestion Queue', requests: '8,410', fail: '0.12%', status: 'HEALTHY' },
                      { name: 'Automation Run Triggering', requests: '419', fail: '0.24%', status: 'HEALTHY' }
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '10px 8px', fontSize: '13px' }}>{row.name}</td>
                        <td style={{ padding: '10px 8px', fontSize: '13px' }}>{row.requests}</td>
                        <td style={{ padding: '10px 8px', fontSize: '13px', color: row.status === 'MONITORED' ? 'var(--adm-red)' : 'var(--adm-text)' }}>{row.fail}</td>
                        <td style={{ padding: '10px 8px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: row.status === 'HEALTHY' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: row.status === 'HEALTHY' ? 'var(--adm-green)' : 'var(--adm-red)'
                          }}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="adm-card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--adm-text)' }}>System Logs Alerts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ borderLeft: '3px solid var(--adm-red)', paddingLeft: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--adm-text)' }}>RLS ACCESS DENIED</div>
                  <div style={{ fontSize: '11px', color: 'var(--adm-text-secondary)' }}>Content Manager attempted reading finances table (5m ago)</div>
                </div>
                <div style={{ borderLeft: '3px solid var(--adm-amber)', paddingLeft: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--adm-text)' }}>INTEGRATION TIMEOUT</div>
                  <div style={{ fontSize: '11px', color: 'var(--adm-text-secondary)' }}>Analytics gateway failed to dispatch payload (2h ago)</div>
                </div>
                <div style={{ borderLeft: '3px solid var(--adm-red)', paddingLeft: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--adm-text)' }}>AUTH LOCKOUT WARNING</div>
                  <div style={{ fontSize: '11px', color: 'var(--adm-text-secondary)' }}>3 failed login attempts on admin@ebrave.in (3h ago)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Rule Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div className="adm-card" style={{ width: '100%', maxWidth: '520px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--adm-text)' }}>Create Automation Rule</h2>
              <button className="adm-btn adm-btn-ghost" onClick={() => setShowCreateModal(false)} style={{ padding: '2px 8px' }}>✕</button>
            </div>

            <div className="adm-form-group">
              <label>Rule Name</label>
              <input
                className="adm-input"
                placeholder="e.g. New Lead → Assign Counselor"
                value={newRule.name}
                onChange={e => setNewRule(p => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="adm-form-group">
                <label>Trigger Type</label>
                <select className="adm-select" value={newRule.triggerType} onChange={e => setNewRule(p => ({ ...p, triggerType: e.target.value }))}>
                  {TRIGGER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="adm-form-group">
                <label>Action Type</label>
                <select className="adm-select" value={newRule.actionType} onChange={e => setNewRule(p => ({ ...p, actionType: e.target.value }))}>
                  {ACTION_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            <div className="adm-form-group">
              <label>Trigger Condition</label>
              <input
                className="adm-input"
                placeholder="e.g. Lead score >= 8"
                value={newRule.trigger}
                onChange={e => setNewRule(p => ({ ...p, trigger: e.target.value }))}
              />
            </div>

            <div className="adm-form-group">
              <label>Action Parameters</label>
              <input
                className="adm-input"
                placeholder="e.g. Task: Follow up with [lead name]"
                value={newRule.actionParams}
                onChange={e => setNewRule(p => ({ ...p, actionParams: e.target.value }))}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <button className="adm-btn adm-btn-ghost" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="adm-btn adm-btn-primary" onClick={handleCreateRule}>Create Rule</button>
            </div>
          </div>
        </div>
      )}
      {/* Confirm Rule Delete */}
      <ConfirmDialog
        isOpen={!!ruleToDelete}
        title="Delete Automation Rule"
        message="Are you sure you want to delete this automation rule? This will halt any background events tied to this trigger condition and will be audited."
        requireWord="DELETE"
        onConfirm={handleDeleteRuleConfirm}
        onCancel={() => setRuleToDelete(null)}
      />
    </AdminLayout>
  );
}
