import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

const TASK_COLUMNS = ['Todo', 'In Progress', 'Review', 'Done'];

export default function Tasks() {
  const { tasks, team, addTask, updateTask } = useData();
  const { showToast } = useNotifications();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'

  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', assignedTo: 't3', dueDate: '', tags: '' });

  const filteredTasks = tasks.filter(t => {
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchAssignee = assigneeFilter === 'All' || t.assignedTo === assigneeFilter;
    return matchPriority && matchAssignee;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) return;
    const tagsArr = form.tags ? form.tags.split(',').map(tag => tag.trim()) : [];
    addTask({
      title: form.title,
      description: form.description,
      priority: form.priority,
      assignedTo: form.assignedTo,
      dueDate: form.dueDate,
      tags: tagsArr
    });
    setForm({ title: '', description: '', priority: 'Medium', assignedTo: 't3', dueDate: '', tags: '' });
    setShowCreate(false);
    showToast('Task added successfully', 'success');
  };

  const handleShiftTask = (id, direction) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const currentIdx = TASK_COLUMNS.indexOf(task.status);
    let nextIdx = currentIdx + direction;
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= TASK_COLUMNS.length) nextIdx = TASK_COLUMNS.length - 1;
    const nextStatus = TASK_COLUMNS[nextIdx];
    updateTask(id, { status: nextStatus });
    showToast(`Task moved to ${nextStatus}`, 'success');
  };

  const getPriorityBadgeColor = (prio) => {
    switch (prio) {
      case 'Urgent': return 'red';
      case 'High': return 'amber';
      case 'Medium': return 'blue';
      default: return 'gray';
    }
  };

  const getAssigneeInitials = (id) => {
    const member = team.find(t => t.id === id);
    return member ? member.avatar : '??';
  };

  return (
    <AdminLayout title="Operational Tasks">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Tasks & Work items</h1>
          <p className="adm-page-subtitle">{tasks.filter(t => t.status !== 'Done').length} open operational items</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="adm-view-toggle">
            <button className={`adm-view-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}>☰ Kanban</button>
            <button className={`adm-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>📝 List</button>
          </div>
          <button className="adm-btn adm-btn-primary" onClick={() => setShowCreate(true)}>+ Create Task</button>
        </div>
      </div>

      {/* Kanban Filters */}
      <div className="adm-filters-bar">
        <div style={{ display: 'flex', gap: 12 }}>
          <select className="adm-select" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="All">All Priorities</option>
            <option>Urgent</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="adm-select" value={assigneeFilter} onChange={e => setAssigneeFilter(e.target.value)}>
            <option value="All">All Assignees</option>
            {team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="adm-kanban-board">
          {TASK_COLUMNS.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col);
            return (
              <div key={col} className="adm-kanban-column">
                <div className="adm-kanban-column-header">
                  <span>{col}</span>
                  <Badge variant="gray" size="sm">{colTasks.length}</Badge>
                </div>

                <div className="adm-kanban-cards-list">
                  {colTasks.map(task => {
                    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done';
                    return (
                      <div
                        key={task.id}
                        className={`adm-kanban-card ${isOverdue ? 'adm-task-overdue' : ''}`}
                        onClick={() => setSelectedTask(task)}
                      >
                        <div className="adm-kanban-card-title" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{task.title}</div>
                        <p className="adm-td-sub" style={{ fontSize: '0.8rem', margin: '4px 0 12px 0' }}>
                          {task.description?.slice(0, 50)}{task.description?.length > 50 ? '...' : ''}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                          {(task.tags || []).map(t => (
                            <span key={t} className="adm-tag" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>{t}</span>
                          ))}
                        </div>

                        <div className="adm-kanban-card-footer" onClick={e => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <Badge variant={getPriorityBadgeColor(task.priority)} size="sm">{task.priority}</Badge>
                            <div className="adm-avatar adm-avatar-xs" style={{ background: '#6366f120', color: '#6366f1', fontWeight: 'bold' }}>
                              {getAssigneeInitials(task.assignedTo)}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ padding: '2px 6px' }} onClick={() => handleShiftTask(task.id, -1)}>←</button>
                            <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ padding: '2px 6px' }} onClick={() => handleShiftTask(task.id, 1)}>→</button>
                          </div>
                        </div>
                        {isOverdue && (
                          <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 8, fontWeight: 500 }}>
                            ⚠️ Overdue (Due {task.dueDate})
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {colTasks.length === 0 && <div className="adm-kanban-column-empty">No tasks</div>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Priority</th>
                <th>Assignee</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id} onClick={() => setSelectedTask(task)}>
                  <td className="adm-td-name">
                    <div>{task.title}</div>
                    <div className="adm-td-sub">{task.description?.slice(0, 80)}...</div>
                  </td>
                  <td><Badge variant={getPriorityBadgeColor(task.priority)} size="sm">{task.priority}</Badge></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="adm-avatar adm-avatar-xs" style={{ background: '#6366f120', color: '#6366f1', fontWeight: 'bold' }}>
                        {getAssigneeInitials(task.assignedTo)}
                      </div>
                      <span className="adm-td-sub">{team.find(m => m.id === task.assignedTo)?.name}</span>
                    </div>
                  </td>
                  <td>{task.dueDate}</td>
                  <td>
                    <select
                      className="adm-select adm-select-inline"
                      value={task.status}
                      onChange={e => {
                        updateTask(task.id, { status: e.target.value });
                        showToast(`Status updated to ${e.target.value}`, 'success');
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      {TASK_COLUMNS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </td>
                  <td>
                    <button
                      className="adm-btn adm-btn-ghost adm-btn-sm"
                      onClick={e => { e.stopPropagation(); setSelectedTask(task); }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Task detail slide panel */}
      {selectedTask && (
        <div className="adm-slide-panel-overlay" onClick={() => setSelectedTask(null)}>
          <div className="adm-slide-panel" onClick={e => e.stopPropagation()}>
            <div className="adm-slide-panel-header">
              <h3>Task Details</h3>
              <button className="adm-icon-btn" onClick={() => setSelectedTask(null)}>✕</button>
            </div>
            <div className="adm-panel-content">
              <h2>{selectedTask.title}</h2>
              <div style={{ display: 'flex', gap: 8, margin: '12px 0 24px 0' }}>
                <Badge variant={getPriorityBadgeColor(selectedTask.priority)}>{selectedTask.priority}</Badge>
                <Badge variant="indigo">{selectedTask.status}</Badge>
              </div>

              <div className="adm-detail-grid">
                <div className="adm-detail-item"><span className="adm-detail-label">Assignee</span>
                  <span>{team.find(m => m.id === selectedTask.assignedTo)?.name}</span>
                </div>
                <div className="adm-detail-item"><span className="adm-detail-label">Due Date</span><span>{selectedTask.dueDate}</span></div>
              </div>

              <div className="adm-detail-section">
                <label className="adm-detail-label">Task Description</label>
                <p className="adm-note-text" style={{ whiteSpace: 'pre-wrap' }}>{selectedTask.description || 'No description provided'}</p>
              </div>

              <div className="adm-detail-section">
                <label className="adm-detail-label">Tags</label>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  {(selectedTask.tags || []).map(t => <span key={t} className="adm-tag">{t}</span>)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <button
                  className="adm-btn adm-btn-primary"
                  onClick={() => {
                    updateTask(selectedTask.id, { status: 'Done' });
                    setSelectedTask(null);
                    showToast('Task marked as Done', 'success');
                  }}
                >
                  Mark Done
                </button>
                <button className="adm-btn adm-btn-ghost" onClick={() => setSelectedTask(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Task" size="md">
        <form onSubmit={handleCreate} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Task Title *</label>
            <input className="adm-input" required value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g. Schedule parent follow-up meeting" />
          </div>
          <div className="adm-form-group">
            <label>Description</label>
            <textarea className="adm-textarea" rows={3} value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} />
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Priority</label>
              <select className="adm-select" value={form.priority} onChange={e => setForm(prev => ({ ...prev, priority: e.target.value }))}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Assign To</label>
              <select className="adm-select" value={form.assignedTo} onChange={e => setForm(prev => ({ ...prev, assignedTo: e.target.value }))}>
                {team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Due Date *</label>
              <input type="date" className="adm-input" required value={form.dueDate} onChange={e => setForm(prev => ({ ...prev, dueDate: e.target.value }))} />
            </div>
            <div className="adm-form-group">
              <label>Tags (Comma-separated)</label>
              <input className="adm-input" value={form.tags} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))} placeholder="e.g. Follow-up, Counseling" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Create Task</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
