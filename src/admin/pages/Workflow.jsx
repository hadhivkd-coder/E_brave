import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Modal from '../components/ui/Modal';

const TRIGGER_TYPES = ['Lead Status Change', 'Time-based', 'Score Threshold', 'Webinar Event', 'Manual', 'Form Submission'];
const ACTION_TYPES  = ['Create Task', 'Send Notification', 'Update Lead Status', 'Assign Counselor', 'Send WhatsApp', 'Generate Report'];

const TRIGGER_ICONS = {
  'Lead Status Change': '🔄',
  'Time-based':         '⏰',
  'Score Threshold':    '📊',
  'Webinar Event':      '🎓',
  'Manual':             '👆',
  'Form Submission':    '📝',
};

const ACTION_ICONS = {
  'Create Task':          '✅',
  'Send Notification':    '🔔',
  'Update Lead Status':   '🔄',
  'Assign Counselor':     '👤',
  'Send WhatsApp':        '💬',
  'Generate Report':      '📈',
  // fallback for free-text actions
  'default':              '⚡',
};

const getActionIcon = (action) => {
  const found = Object.keys(ACTION_ICONS).find(k => action.toLowerCase().includes(k.toLowerCase().split(' ')[0]));
  return found ? ACTION_ICONS[found] : ACTION_ICONS['default'];
};

const SAMPLE_WORKFLOWS = [
  {
    id: 'wf1', name: 'New Lead Onboarding', isActive: true, triggerCount: 142,
    lastRun: '2025-05-19T10:30:00',
    description: 'Automatically processes new leads — assigns counselor, creates follow-up task, sends welcome notification.',
    trigger: { type: 'Lead Status Change', condition: 'Status becomes New Lead' },
    actions: ['Assign to available counselor', 'Create follow-up task (24h deadline)', 'Send internal notification'],
    category: 'Lead Management',
  },
  {
    id: 'wf2', name: 'Hot Lead Alert', isActive: true, triggerCount: 38,
    lastRun: '2025-05-18T14:20:00',
    description: 'When a lead score reaches 8+, immediately alert the operations team and escalate priority.',
    trigger: { type: 'Score Threshold', condition: 'Lead score ≥ 8' },
    actions: ['Mark as Hot Lead (tag)', 'Notify Ops Manager', 'Create urgent follow-up task'],
    category: 'Alerts',
  },
  {
    id: 'wf3', name: 'Webinar Registration Flow', isActive: true, triggerCount: 89,
    lastRun: '2025-05-17T09:00:00',
    description: 'Complete workflow for webinar registrations — confirmation, reminder sequence, post-webinar follow-up.',
    trigger: { type: 'Webinar Event', condition: 'New webinar registration' },
    actions: ['Update lead status to Webinar Registered', 'Schedule 24h reminder notification', 'Schedule 1h reminder'],
    category: 'Webinars',
  },
  {
    id: 'wf4', name: 'Missed Follow-up Recovery', isActive: true, triggerCount: 23,
    lastRun: '2025-05-19T08:00:00',
    description: 'Detects leads that missed their follow-up date and creates recovery tasks automatically.',
    trigger: { type: 'Time-based', condition: 'Follow-up date passed by 1+ days' },
    actions: ['Update status to Follow-up Required', 'Create urgent task for counselor', 'Send manager notification'],
    category: 'Recovery',
  },
  {
    id: 'wf5', name: 'Weekly Report Generation', isActive: true, triggerCount: 12,
    lastRun: '2025-05-18T23:59:00',
    description: 'Auto-generates weekly operational summary every Sunday night.',
    trigger: { type: 'Time-based', condition: 'Every Sunday at 11:59 PM' },
    actions: ['Generate EOS AI weekly report', 'Notify Super Admin', 'Store in report history'],
    category: 'Reporting',
  },
  {
    id: 'wf6', name: 'Post-Counseling Follow-up', isActive: false, triggerCount: 56,
    lastRun: '2025-05-10T16:30:00',
    description: 'After session completion, triggers student follow-up and progress tracking.',
    trigger: { type: 'Lead Status Change', condition: 'Session status becomes Completed' },
    actions: ['Update lead status', 'Schedule 3-day check-in', 'Update progress score'],
    category: 'Counseling',
  },
];

const CATEGORY_COLORS = {
  'Lead Management': { color: '#6366f1', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)'  },
  'Alerts':          { color: '#e11d48', bg: 'rgba(225,29,72,0.08)',   border: 'rgba(225,29,72,0.2)'   },
  'Webinars':        { color: '#2563eb', bg: 'rgba(37,99,235,0.08)',   border: 'rgba(37,99,235,0.2)'   },
  'Recovery':        { color: '#d97706', bg: 'rgba(217,119,6,0.08)',   border: 'rgba(217,119,6,0.2)'   },
  'Reporting':       { color: '#0f4c3a', bg: 'rgba(15,76,58,0.08)',    border: 'rgba(15,76,58,0.2)'    },
  'Counseling':      { color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ── Flow Step Component ─────────────────────────────── */
function FlowStep({ icon, label, sublabel, color, isLast }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ flex: 1, height: 2, background: isLast ? 'transparent' : `${color}33` }} />
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: `${color}15`, border: `2px solid ${color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem'
        }}>
          {icon}
        </div>
        <div style={{ flex: 1, height: 2, background: isLast ? 'transparent' : `${color}33` }} />
      </div>
      <div style={{ textAlign: 'center', marginTop: 6, maxWidth: 100 }}>
        <div style={{ fontSize: '0.67rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
        {sublabel && <div style={{ fontSize: '0.65rem', color: 'var(--adm-text-secondary)', marginTop: 2, lineHeight: 1.3 }}>{sublabel}</div>}
      </div>
    </div>
  );
}

/* ── Detail Slide Panel ─────────────────────────────── */
function WorkflowDetail({ workflow, onClose, onToggle }) {
  if (!workflow) return null;
  const cat = CATEGORY_COLORS[workflow.category] || CATEGORY_COLORS['Reporting'];

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 1000, backdropFilter: 'blur(2px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', right: 0, top: 0, bottom: 0, width: 460,
          background: 'var(--adm-card)', boxShadow: '-8px 0 40px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column', zIndex: 1001,
          borderLeft: '1px solid var(--adm-border)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--adm-border)',
          background: cat.bg, borderTop: `4px solid ${cat.color}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, marginRight: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: 20,
                  background: cat.color, color: '#fff', letterSpacing: '0.3px'
                }}>{workflow.category}</span>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: 20,
                  background: workflow.isActive ? 'rgba(16,185,129,0.15)' : 'rgba(107,114,128,0.1)',
                  color: workflow.isActive ? '#10b981' : '#6b7280',
                  border: `1px solid ${workflow.isActive ? 'rgba(16,185,129,0.3)' : 'rgba(107,114,128,0.2)'}`
                }}>
                  {workflow.isActive ? '● Active' : '● Paused'}
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--adm-text)' }}>{workflow.name}</h3>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 30, height: 30, border: '1px solid var(--adm-border)', borderRadius: '50%',
                background: 'var(--adm-card)', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: 'var(--adm-text-secondary)', flexShrink: 0
              }}
            >✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <p style={{ margin: '0 0 24px 0', fontSize: '0.85rem', color: 'var(--adm-text-secondary)', lineHeight: 1.6 }}>
            {workflow.description}
          </p>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[
              { label: 'Total Triggers', value: workflow.triggerCount, icon: '⚡', color: cat.color },
              { label: 'Last Run', value: formatDate(workflow.lastRun), icon: '🕐', color: '#10b981' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--adm-bg)', border: '1px solid var(--adm-border)',
                borderRadius: 10, padding: '12px 14px'
              }}>
                <div style={{ fontSize: '0.67rem', color: 'var(--adm-text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Trigger */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--adm-text-secondary)', marginBottom: 10 }}>
              ⚡ Trigger
            </div>
            <div style={{
              background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: 'rgba(99,102,241,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0
              }}>
                {TRIGGER_ICONS[workflow.trigger.type] || '⚡'}
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6366f1', marginBottom: 2 }}>{workflow.trigger.type}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--adm-text)', fontWeight: 600 }}>{workflow.trigger.condition}</div>
              </div>
            </div>
          </div>

          {/* Actions flow */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--adm-text-secondary)', marginBottom: 10 }}>
              🔧 Actions ({workflow.actions.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {workflow.actions.map((action, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
                  {/* Connector line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', background: `${cat.color}15`,
                      border: `2px solid ${cat.color}33`, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0
                    }}>
                      {getActionIcon(action)}
                    </div>
                    {i < workflow.actions.length - 1 && (
                      <div style={{ width: 2, flex: 1, minHeight: 16, background: `${cat.color}22`, margin: '4px 0' }} />
                    )}
                  </div>
                  {/* Action content */}
                  <div style={{
                    flex: 1, background: 'var(--adm-bg)', border: '1px solid var(--adm-border)',
                    borderRadius: 8, padding: '10px 12px', marginBottom: 8
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontSize: '0.6rem', fontWeight: 800, padding: '1px 6px', borderRadius: 20,
                        background: `${cat.color}15`, color: cat.color
                      }}>Step {i + 1}</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--adm-text)' }}>{action}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--adm-border)', display: 'flex', gap: 10 }}>
          <button
            style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: 8, cursor: 'pointer',
              fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s',
              background: workflow.isActive ? 'rgba(225,29,72,0.08)' : 'var(--adm-accent)',
              color: workflow.isActive ? '#e11d48' : '#fff',
              border: workflow.isActive ? '1px solid rgba(225,29,72,0.2)' : 'none'
            }}
            onClick={() => { onToggle(workflow.id); onClose(); }}
          >
            {workflow.isActive ? '⏸ Pause Workflow' : '▶ Activate Workflow'}
          </button>
          <button
            style={{
              padding: '10px 18px', border: '1px solid var(--adm-border)', borderRadius: 8,
              background: 'var(--adm-bg)', color: 'var(--adm-text-secondary)',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem'
            }}
            onClick={onClose}
          >Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────── */
export default function Workflow() {
  const [workflows, setWorkflows]         = useState(SAMPLE_WORKFLOWS);
  const [selectedWorkflow, setSelected]   = useState(null);
  const [showCreate, setShowCreate]       = useState(false);
  const [stageFilter, setStageFilter]     = useState('All');
  const [newWorkflow, setNewWorkflow]     = useState({
    name: '', description: '', triggerType: 'Lead Status Change',
    triggerCondition: '', actions: [''], category: 'Lead Management'
  });

  const filtered = workflows.filter(w =>
    stageFilter === 'All' ? true :
    stageFilter === 'Active' ? w.isActive : !w.isActive
  );

  const handleToggle = (id) => setWorkflows(ws => ws.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w));
  const handleAddAction = () => setNewWorkflow(nw => ({ ...nw, actions: [...nw.actions, ''] }));
  const handleUpdateAction = (i, val) => setNewWorkflow(nw => ({ ...nw, actions: nw.actions.map((a, j) => j === i ? val : a) }));
  const handleRemoveAction = (i) => setNewWorkflow(nw => ({ ...nw, actions: nw.actions.filter((_, j) => j !== i) }));

  const totalTriggers = workflows.reduce((s, w) => s + w.triggerCount, 0);
  const activeCount   = workflows.filter(w => w.isActive).length;

  return (
    <AdminLayout title="Workflow Engine">
      {/* ── Header ───────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 className="adm-page-title" style={{ margin: '0 0 4px 0' }}>Workflow Engine</h1>
          <p className="adm-page-subtitle" style={{ margin: 0 }}>
            {activeCount} active automations · {totalTriggers} total triggers executed
          </p>
        </div>
        <button
          className="adm-btn adm-btn-primary"
          onClick={() => setShowCreate(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontSize: '1.1rem' }}>+</span> New Workflow
        </button>
      </div>

      {/* ── Stats ────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Active',         value: activeCount,                  icon: '✅', color: '#10b981' },
          { label: 'Paused',         value: workflows.length - activeCount, icon: '⏸', color: '#d97706' },
          { label: 'Total Triggers', value: totalTriggers,                icon: '⚡', color: '#6366f1' },
          { label: 'Ran Today',      value: 8,                            icon: '🔄', color: '#2563eb' },
        ].map(s => (
          <div key={s.label} className="adm-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--adm-border)' }}>
            <div style={{ fontSize: '1.4rem', lineHeight: 1 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--adm-text-secondary)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Chips ─────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Show:</span>
        {['All', 'Active', 'Paused'].map(f => (
          <button
            key={f}
            onClick={() => setStageFilter(f)}
            style={{
              padding: '6px 16px', border: stageFilter === f ? 'none' : '1px solid var(--adm-border)',
              borderRadius: 20, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700,
              transition: 'all 0.18s',
              background: stageFilter === f ? 'var(--adm-accent)' : 'var(--adm-bg)',
              color: stageFilter === f ? '#fff' : 'var(--adm-text-secondary)'
            }}
          >{f} {f === 'All' ? `(${workflows.length})` : f === 'Active' ? `(${activeCount})` : `(${workflows.length - activeCount})`}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>
          Showing <strong style={{ color: 'var(--adm-text)' }}>{filtered.length}</strong> workflows
        </span>
      </div>

      {/* ── Workflow Cards Grid ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {filtered.map(wf => {
          const cat = CATEGORY_COLORS[wf.category] || CATEGORY_COLORS['Reporting'];
          return (
            <div
              key={wf.id}
              style={{
                background: 'var(--adm-card)', border: '1px solid var(--adm-border)',
                borderRadius: 14, overflow: 'hidden',
                boxShadow: 'var(--adm-shadow)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                opacity: wf.isActive ? 1 : 0.72,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--adm-shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--adm-shadow)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Card top accent bar */}
              <div style={{ height: 3, background: wf.isActive ? cat.color : '#d1d5db' }} />

              {/* Card Header */}
              <div style={{ padding: '16px 18px 12px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <span style={{
                        fontSize: '0.62rem', fontWeight: 800, padding: '2px 8px', borderRadius: 20,
                        background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                        whiteSpace: 'nowrap'
                      }}>
                        {wf.category}
                      </span>
                      {!wf.isActive && (
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 800, padding: '2px 8px', borderRadius: 20,
                          background: 'rgba(107,114,128,0.1)', color: '#6b7280'
                        }}>PAUSED</span>
                      )}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--adm-text)', lineHeight: 1.3, marginBottom: 4 }}>
                      {wf.name}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--adm-text-secondary)', lineHeight: 1.4 }}>
                      {wf.description.slice(0, 80)}{wf.description.length > 80 ? '…' : ''}
                    </p>
                  </div>
                  {/* Toggle switch */}
                  <label style={{ flexShrink: 0, cursor: 'pointer', userSelect: 'none' }} title={wf.isActive ? 'Click to pause' : 'Click to activate'}>
                    <div
                      onClick={() => handleToggle(wf.id)}
                      style={{
                        width: 40, height: 22, borderRadius: 11,
                        background: wf.isActive ? 'var(--adm-accent)' : '#d1d5db',
                        position: 'relative', transition: 'background 0.2s', cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: 2, left: wf.isActive ? 20 : 2,
                        width: 18, height: 18, borderRadius: '50%',
                        background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                        transition: 'left 0.2s'
                      }} />
                    </div>
                  </label>
                </div>
              </div>

              {/* Trigger → Action mini-flow */}
              <div style={{ padding: '0 18px 14px 18px' }}>
                <div style={{
                  background: 'var(--adm-bg)', border: '1px solid var(--adm-border)',
                  borderRadius: 10, padding: '12px 14px'
                }}>
                  {/* Trigger pill */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'rgba(99,102,241,0.12)', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem'
                    }}>
                      {TRIGGER_ICONS[wf.trigger.type] || '⚡'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        Trigger · {wf.trigger.type}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text)' }}>
                        {wf.trigger.condition}
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 28, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: 2, height: 14, background: `${cat.color}33` }} />
                    </div>
                    <div style={{
                      fontSize: '0.6rem', color: cat.color, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.3px'
                    }}>
                      {wf.actions.length} action{wf.actions.length > 1 ? 's' : ''} triggered
                    </div>
                  </div>

                  {/* Action pills (first 2) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {wf.actions.slice(0, 2).map((action, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 28, height: 22, borderRadius: 6, flexShrink: 0,
                          background: `${cat.color}12`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem'
                        }}>
                          {getActionIcon(action)}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--adm-text)', fontWeight: 500 }}>{action}</span>
                      </div>
                    ))}
                    {wf.actions.length > 2 && (
                      <div style={{ paddingLeft: 36, fontSize: '0.7rem', color: cat.color, fontWeight: 700 }}>
                        +{wf.actions.length - 2} more action{wf.actions.length - 2 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                padding: '10px 18px', borderTop: '1px solid var(--adm-border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'var(--adm-bg)'
              }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: cat.color }}>{wf.triggerCount}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Triggers</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--adm-text)' }}>
                      {formatDate(wf.lastRun).split(',')[0]}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Last Run</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(wf)}
                  style={{
                    padding: '6px 14px', border: `1px solid ${cat.border}`,
                    borderRadius: 8, background: cat.bg, color: cat.color,
                    fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s'
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{
            gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px',
            color: 'var(--adm-text-secondary)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🤖</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>No workflows found</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.7 }}>Try switching the filter or create a new workflow</div>
          </div>
        )}
      </div>

      {/* ── Create Workflow Modal ──────────────────────── */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Workflow" size="lg">
        <div className="adm-form-stack">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="adm-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Workflow Name <span style={{ color: 'var(--adm-red)' }}>*</span></label>
              <input
                className="adm-input"
                value={newWorkflow.name}
                onChange={e => setNewWorkflow(nw => ({ ...nw, name: e.target.value }))}
                placeholder="e.g. New Lead Onboarding"
              />
            </div>
            <div className="adm-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <textarea
                className="adm-textarea" rows={2}
                value={newWorkflow.description}
                onChange={e => setNewWorkflow(nw => ({ ...nw, description: e.target.value }))}
                placeholder="What does this workflow do?"
              />
            </div>
            <div className="adm-form-group">
              <label>Category</label>
              <select className="adm-select" value={newWorkflow.category} onChange={e => setNewWorkflow(nw => ({ ...nw, category: e.target.value }))}>
                {Object.keys(CATEGORY_COLORS).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="adm-form-group">
              <label>Trigger Type <span style={{ color: 'var(--adm-red)' }}>*</span></label>
              <select className="adm-select" value={newWorkflow.triggerType} onChange={e => setNewWorkflow(nw => ({ ...nw, triggerType: e.target.value }))}>
                {TRIGGER_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="adm-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Trigger Condition <span style={{ color: 'var(--adm-red)' }}>*</span></label>
              <input
                className="adm-input"
                value={newWorkflow.triggerCondition}
                onChange={e => setNewWorkflow(nw => ({ ...nw, triggerCondition: e.target.value }))}
                placeholder="e.g. Lead score ≥ 8"
              />
            </div>
          </div>

          {/* Actions builder */}
          <div className="adm-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <label style={{ margin: 0 }}>Actions <span style={{ color: 'var(--adm-text-secondary)', fontWeight: 400 }}>({newWorkflow.actions.length})</span></label>
              <button
                type="button"
                onClick={handleAddAction}
                style={{
                  fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px',
                  border: '1px solid var(--adm-border)', borderRadius: 6,
                  background: 'var(--adm-accent-dim)', color: 'var(--adm-accent)', cursor: 'pointer'
                }}
              >+ Add Action</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {newWorkflow.actions.map((action, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', background: 'var(--adm-accent-dim)',
                    color: 'var(--adm-accent)', fontSize: '0.72rem', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>{i + 1}</div>
                  <input
                    className="adm-input" style={{ flex: 1 }}
                    value={action}
                    onChange={e => handleUpdateAction(i, e.target.value)}
                    placeholder={`Describe action ${i + 1}...`}
                  />
                  {newWorkflow.actions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAction(i)}
                      style={{
                        width: 28, height: 28, border: '1px solid rgba(225,29,72,0.2)',
                        borderRadius: 6, background: 'rgba(225,29,72,0.06)',
                        color: '#e11d48', cursor: 'pointer', fontWeight: 700, flexShrink: 0
                      }}
                    >✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button className="adm-btn adm-btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
            <button
              className="adm-btn adm-btn-primary"
              onClick={() => {
                if (!newWorkflow.name || !newWorkflow.triggerCondition) return;
                setWorkflows(ws => [...ws, {
                  id: `wf${Date.now()}`, ...newWorkflow,
                  trigger: { type: newWorkflow.triggerType, condition: newWorkflow.triggerCondition },
                  triggerCount: 0, lastRun: null, isActive: true, createdBy: 'Admin', stage: 'Active'
                }]);
                setNewWorkflow({ name: '', description: '', triggerType: 'Lead Status Change', triggerCondition: '', actions: [''], category: 'Lead Management' });
                setShowCreate(false);
              }}
            >Create Workflow</button>
          </div>
        </div>
      </Modal>

      {/* Detail Panel */}
      {selectedWorkflow && (
        <WorkflowDetail
          workflow={selectedWorkflow}
          onClose={() => setSelected(null)}
          onToggle={handleToggle}
        />
      )}
    </AdminLayout>
  );
}
