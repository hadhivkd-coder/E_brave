import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const WORKFLOW_STAGES = ['Idea', 'In Review', 'Approved', 'Active', 'Paused', 'Completed'];
const TRIGGER_TYPES = ['Lead Status Change', 'Time-based', 'Score Threshold', 'Webinar Event', 'Manual', 'Form Submission'];
const ACTION_TYPES = ['Create Task', 'Send Notification', 'Update Lead Status', 'Assign Counselor', 'Send WhatsApp', 'Generate Report'];

const SAMPLE_WORKFLOWS = [
  {
    id: 'wf1', name: 'New Lead Onboarding', stage: 'Active', triggerCount: 142, lastRun: '2025-05-19T10:30:00',
    description: 'Automatically processes new leads — assigns counselor, creates follow-up task, sends welcome notification',
    trigger: { type: 'Lead Status Change', condition: 'Status becomes New Lead' },
    actions: ['Assign to available counselor', 'Create follow-up task (24h deadline)', 'Send internal notification'],
    createdBy: 'Admin', isActive: true
  },
  {
    id: 'wf2', name: 'Hot Lead Alert', stage: 'Active', triggerCount: 38, lastRun: '2025-05-18T14:20:00',
    description: 'When a lead score reaches 8+, immediately alert the operations team and escalate priority',
    trigger: { type: 'Score Threshold', condition: 'Lead score >= 8' },
    actions: ['Mark as Hot Lead (tag)', 'Notify Ops Manager', 'Create urgent follow-up task'],
    createdBy: 'Admin', isActive: true
  },
  {
    id: 'wf3', name: 'Webinar Registration Flow', stage: 'Active', triggerCount: 89, lastRun: '2025-05-17T09:00:00',
    description: 'Complete workflow for webinar registrations — confirmation, reminder sequence, post-webinar follow-up',
    trigger: { type: 'Webinar Event', condition: 'New webinar registration' },
    actions: ['Update lead status to Webinar Registered', 'Schedule 24h reminder notification', 'Schedule 1h reminder'],
    createdBy: 'Admin', isActive: true
  },
  {
    id: 'wf4', name: 'Missed Follow-up Recovery', stage: 'Active', triggerCount: 23, lastRun: '2025-05-19T08:00:00',
    description: 'Detects leads that missed their follow-up date and creates recovery tasks',
    trigger: { type: 'Time-based', condition: 'Follow-up date passed by 1+ days' },
    actions: ['Update status to Follow-up Required', 'Create urgent task for counselor', 'Send manager notification'],
    createdBy: 'Admin', isActive: true
  },
  {
    id: 'wf5', name: 'Weekly Report Generation', stage: 'Active', triggerCount: 12, lastRun: '2025-05-18T23:59:00',
    description: 'Auto-generates weekly operational summary every Sunday night',
    trigger: { type: 'Time-based', condition: 'Every Sunday at 11:59 PM' },
    actions: ['Generate EOS AI weekly report', 'Notify Super Admin', 'Store in report history'],
    createdBy: 'Admin', isActive: true
  },
  {
    id: 'wf6', name: 'Post-Counseling Follow-up', stage: 'Paused', triggerCount: 56, lastRun: '2025-05-10T16:30:00',
    description: 'After session completion, triggers student follow-up and progress tracking',
    trigger: { type: 'Lead Status Change', condition: 'Session status becomes Completed' },
    actions: ['Update lead status', 'Schedule 3-day check-in', 'Update progress score'],
    createdBy: 'Admin', isActive: false
  },
];

function WorkflowDetail({ workflow, onClose, onToggle }) {
  if (!workflow) return null;
  return (
    <div className="adm-slide-panel-overlay" onClick={onClose}>
      <div className="adm-slide-panel adm-slide-panel-wide" onClick={e => e.stopPropagation()}>
        <div className="adm-slide-panel-header">
          <div>
            <h3>{workflow.name}</h3>
            <p>Created by {workflow.createdBy} · {workflow.triggerCount} triggers total</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Badge variant={workflow.isActive ? 'green' : 'gray'}>{workflow.isActive ? 'Active' : 'Paused'}</Badge>
            <button className="adm-icon-btn" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="adm-panel-content">
          <p className="adm-note-text" style={{ marginBottom: 24 }}>{workflow.description}</p>

          <div className="adm-workflow-detail-section">
            <label className="adm-detail-label">⚡ Trigger</label>
            <div className="adm-workflow-trigger-box">
              <Badge variant="indigo" size="sm">{workflow.trigger.type}</Badge>
              <span>{workflow.trigger.condition}</span>
            </div>
          </div>

          <div className="adm-workflow-detail-section">
            <label className="adm-detail-label">🔧 Actions ({workflow.actions.length})</label>
            <div className="adm-workflow-actions-list">
              {workflow.actions.map((action, i) => (
                <div key={i} className="adm-workflow-action-item">
                  <span className="adm-workflow-action-num">{i + 1}</span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="adm-workflow-stats-row">
            <div className="adm-quick-stat" style={{ borderLeft: '3px solid #6366f1' }}>
              <span className="adm-quick-stat-count" style={{ color: '#6366f1' }}>{workflow.triggerCount}</span>
              <span className="adm-quick-stat-label">Total Triggers</span>
            </div>
            <div className="adm-quick-stat" style={{ borderLeft: '3px solid #10b981' }}>
              <span className="adm-quick-stat-count" style={{ color: '#10b981' }}>
                {workflow.lastRun ? new Date(workflow.lastRun).toLocaleDateString('en-IN') : '—'}
              </span>
              <span className="adm-quick-stat-label">Last Run</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className={`adm-btn ${workflow.isActive ? 'adm-btn-danger' : 'adm-btn-primary'}`} onClick={() => { onToggle(workflow.id); onClose(); }}>
              {workflow.isActive ? 'Pause Workflow' : 'Activate Workflow'}
            </button>
            <button className="adm-btn adm-btn-ghost" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Workflow() {
  const [workflows, setWorkflows] = useState(SAMPLE_WORKFLOWS);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [stageFilter, setStageFilter] = useState('All');
  const [newWorkflow, setNewWorkflow] = useState({ name: '', description: '', triggerType: 'Lead Status Change', triggerCondition: '', actions: [''] });

  const filtered = stageFilter === 'All' ? workflows : stageFilter === 'Active' ? workflows.filter(w => w.isActive) : workflows.filter(w => !w.isActive);

  const handleToggle = (id) => {
    setWorkflows(ws => ws.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w));
  };

  const handleAddAction = () => setNewWorkflow(nw => ({ ...nw, actions: [...nw.actions, ''] }));
  const handleUpdateAction = (i, val) => setNewWorkflow(nw => ({ ...nw, actions: nw.actions.map((a, j) => j === i ? val : a) }));

  return (
    <AdminLayout title="Workflow">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Workflow Engine</h1>
          <p className="adm-page-subtitle">{workflows.filter(w => w.isActive).length} active workflows · {workflows.reduce((s, w) => s + w.triggerCount, 0)} total triggers</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setShowCreate(true)}>+ Create Workflow</button>
      </div>

      {/* Stats */}
      <div className="adm-counseling-stats">
        {[
          { label: 'Active Workflows', value: workflows.filter(w => w.isActive).length, color: '#10b981', icon: '✅' },
          { label: 'Paused', value: workflows.filter(w => !w.isActive).length, color: '#f59e0b', icon: '⏸️' },
          { label: 'Total Triggers', value: workflows.reduce((s, w) => s + w.triggerCount, 0), color: '#6366f1', icon: '⚡' },
          { label: 'Ran Today', value: 8, color: '#3b82f6', icon: '🔄' },
        ].map(stat => (
          <div key={stat.label} className="adm-quick-stat" style={{ borderLeft: `3px solid ${stat.color}` }}>
            <span className="adm-quick-stat-icon">{stat.icon}</span>
            <span className="adm-quick-stat-count" style={{ color: stat.color }}>{stat.value}</span>
            <span className="adm-quick-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="adm-filters-bar">
        {['All', 'Active', 'Paused'].map(f => (
          <button key={f} className={`adm-filter-chip ${stageFilter === f ? 'active' : ''}`} onClick={() => setStageFilter(f)}>{f}</button>
        ))}
      </div>

      {/* Workflow Cards */}
      <div className="adm-workflow-grid">
        {filtered.map(wf => (
          <div key={wf.id} className={`adm-workflow-card ${!wf.isActive ? 'adm-workflow-card-paused' : ''}`}>
            <div className="adm-workflow-card-header">
              <div className="adm-workflow-card-info">
                <div className="adm-workflow-name">{wf.name}</div>
                <div className="adm-workflow-desc">{wf.description}</div>
              </div>
              <label className="adm-toggle">
                <input type="checkbox" checked={wf.isActive} onChange={() => handleToggle(wf.id)} />
                <span className="adm-toggle-slider" />
              </label>
            </div>

            <div className="adm-workflow-trigger">
              <span className="adm-workflow-trigger-label">⚡ Trigger:</span>
              <Badge variant="indigo" size="sm">{wf.trigger.type}</Badge>
              <span className="adm-td-sub">{wf.trigger.condition}</span>
            </div>

            <div className="adm-workflow-actions-preview">
              {wf.actions.slice(0, 2).map((a, i) => (
                <div key={i} className="adm-workflow-action-chip">
                  <span className="adm-workflow-action-num">{i + 1}</span>
                  <span>{a}</span>
                </div>
              ))}
              {wf.actions.length > 2 && <span className="adm-td-sub">+{wf.actions.length - 2} more actions</span>}
            </div>

            <div className="adm-workflow-footer">
              <div className="adm-workflow-meta">
                <span>🔄 {wf.triggerCount} triggers</span>
                <span>Last: {wf.lastRun ? new Date(wf.lastRun).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</span>
              </div>
              <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setSelectedWorkflow(wf)}>
                View →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Workflow" size="lg">
        <div className="adm-form-stack">
          <div className="adm-form-group">
            <label>Workflow Name</label>
            <input className="adm-input" value={newWorkflow.name} onChange={e => setNewWorkflow(nw => ({ ...nw, name: e.target.value }))} placeholder="e.g. New Lead Onboarding" />
          </div>
          <div className="adm-form-group">
            <label>Description</label>
            <textarea className="adm-textarea" rows={2} value={newWorkflow.description} onChange={e => setNewWorkflow(nw => ({ ...nw, description: e.target.value }))} />
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Trigger Type</label>
              <select className="adm-select" value={newWorkflow.triggerType} onChange={e => setNewWorkflow(nw => ({ ...nw, triggerType: e.target.value }))}>
                {TRIGGER_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="adm-form-group">
              <label>Trigger Condition</label>
              <input className="adm-input" value={newWorkflow.triggerCondition} onChange={e => setNewWorkflow(nw => ({ ...nw, triggerCondition: e.target.value }))} placeholder="e.g. Lead score >= 8" />
            </div>
          </div>
          <div className="adm-form-group">
            <label>Actions</label>
            {newWorkflow.actions.map((action, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span className="adm-workflow-action-num">{i + 1}</span>
                <input className="adm-input" value={action} onChange={e => handleUpdateAction(i, e.target.value)} placeholder="Describe this action..." />
              </div>
            ))}
            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={handleAddAction}>+ Add Action</button>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button className="adm-btn adm-btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
            <button
              className="adm-btn adm-btn-primary"
              onClick={() => {
                setWorkflows(ws => [...ws, { id: `wf${Date.now()}`, ...newWorkflow, trigger: { type: newWorkflow.triggerType, condition: newWorkflow.triggerCondition }, triggerCount: 0, lastRun: null, isActive: true, createdBy: 'Admin', stage: 'Active' }]);
                setShowCreate(false);
              }}
            >
              Create Workflow
            </button>
          </div>
        </div>
      </Modal>

      {/* Detail Panel */}
      {selectedWorkflow && (
        <WorkflowDetail workflow={selectedWorkflow} onClose={() => setSelectedWorkflow(null)} onToggle={handleToggle} />
      )}
    </AdminLayout>
  );
}
