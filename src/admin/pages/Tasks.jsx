import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

const TASK_COLUMNS = ['Todo', 'In Progress', 'Review', 'Done'];

const COLUMN_META = {
  'Todo':        { icon: '📋', color: '#6366f1', bg: 'rgba(99,102,241,0.07)',  border: 'rgba(99,102,241,0.18)',  label: 'To Do'       },
  'In Progress': { icon: '⚡', color: '#d97706', bg: 'rgba(217,119,6,0.07)',   border: 'rgba(217,119,6,0.18)',   label: 'In Progress' },
  'Review':      { icon: '🔍', color: '#2563eb', bg: 'rgba(37,99,235,0.07)',   border: 'rgba(37,99,235,0.18)',   label: 'Review'      },
  'Done':        { icon: '✅', color: '#10b981', bg: 'rgba(16,185,129,0.07)',  border: 'rgba(16,185,129,0.18)', label: 'Done'        },
};

const PRIORITY_META = {
  'Urgent': { color: '#e11d48', bg: 'rgba(225,29,72,0.08)',   dot: '#e11d48' },
  'High':   { color: '#d97706', bg: 'rgba(217,119,6,0.08)',   dot: '#d97706' },
  'Medium': { color: '#2563eb', bg: 'rgba(37,99,235,0.08)',   dot: '#2563eb' },
  'Low':    { color: '#6b7280', bg: 'rgba(107,114,128,0.08)', dot: '#9ca3af' },
};

export default function Tasks() {
  const { tasks, team, addTask, updateTask } = useData();
  const { showToast } = useNotifications();
  const [showCreate, setShowCreate]     = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [viewMode, setViewMode] = useState('kanban');

  const [form, setForm] = useState({
    title: '', description: '', priority: 'Medium',
    assignedTo: team[0]?.id || '', dueDate: '', tags: ''
  });

  const filteredTasks = tasks.filter(t => {
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchAssignee = assigneeFilter === 'All' || t.assignedTo === assigneeFilter;
    return matchPriority && matchAssignee;
  });

  const openCount   = tasks.filter(t => t.status !== 'Done').length;
  const doneCount   = tasks.filter(t => t.status === 'Done').length;
  const urgentCount = tasks.filter(t => t.priority === 'Urgent' && t.status !== 'Done').length;
  const overdueCount = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done').length;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) return;
    const tagsArr = form.tags ? form.tags.split(',').map(tag => tag.trim()) : [];
    addTask({ title: form.title, description: form.description, priority: form.priority, assignedTo: form.assignedTo, dueDate: form.dueDate, tags: tagsArr });
    setForm({ title: '', description: '', priority: 'Medium', assignedTo: team[0]?.id || '', dueDate: '', tags: '' });
    setShowCreate(false);
    showToast('Task created successfully', 'success');
  };

  const handleShiftTask = (id, direction) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const currentIdx = TASK_COLUMNS.indexOf(task.status);
    let nextIdx = Math.max(0, Math.min(TASK_COLUMNS.length - 1, currentIdx + direction));
    updateTask(id, { status: TASK_COLUMNS[nextIdx] });
    showToast(`Task moved to ${TASK_COLUMNS[nextIdx]}`, 'success');
  };

  const getAssigneeName = (id) => team.find(t => t.id === id)?.name || '??';
  const getAssigneeInitials = (id) => {
    const name = getAssigneeName(id);
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const getPriorityBadgeColor = (prio) => {
    switch (prio) {
      case 'Urgent': return 'red';
      case 'High':   return 'amber';
      case 'Medium': return 'blue';
      default:       return 'gray';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = (task) => new Date(task.dueDate) < new Date() && task.status !== 'Done';

  return (
    <AdminLayout title="Tasks">
      {/* ── Page Header ─────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 className="adm-page-title" style={{ margin: '0 0 4px 0' }}>Tasks & Work Items</h1>
          <p className="adm-page-subtitle" style={{ margin: 0 }}>
            {openCount} open · {doneCount} completed · {urgentCount > 0 ? `${urgentCount} urgent` : 'no urgent tasks'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* View toggle */}
          <div style={{ display: 'flex', background: 'var(--adm-accent-dim)', border: '1px solid var(--adm-border)', borderRadius: 8, padding: 3, gap: 3 }}>
            {[{ id: 'kanban', label: '⊞ Kanban' }, { id: 'list', label: '☰ List' }].map(v => (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id)}
                style={{
                  padding: '6px 14px', border: 'none', borderRadius: 6, cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s',
                  background: viewMode === v.id ? 'var(--adm-accent)' : 'transparent',
                  color: viewMode === v.id ? '#fff' : 'var(--adm-accent)'
                }}
              >{v.label}</button>
            ))}
          </div>
          <button
            className="adm-btn adm-btn-primary"
            onClick={() => setShowCreate(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>+</span> New Task
          </button>
        </div>
      </div>

      {/* ── Summary Stats ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Tasks',    value: tasks.length,    icon: '📦', color: '#6366f1' },
          { label: 'Open Tasks',     value: openCount,       icon: '⏳', color: '#d97706' },
          { label: 'Completed',      value: doneCount,       icon: '✅', color: '#10b981' },
          { label: 'Overdue',        value: overdueCount,    icon: '🚨', color: '#e11d48' },
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

      {/* ── Filters Bar ─────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>Filter by:</span>
        <select
          className="adm-select"
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          style={{ minWidth: 140, fontSize: '0.82rem' }}
        >
          <option value="All">All Priorities</option>
          <option>Urgent</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
        <select
          className="adm-select"
          value={assigneeFilter}
          onChange={e => setAssigneeFilter(e.target.value)}
          style={{ minWidth: 160, fontSize: '0.82rem' }}
        >
          <option value="All">All Assignees</option>
          {team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        {(priorityFilter !== 'All' || assigneeFilter !== 'All') && (
          <button
            onClick={() => { setPriorityFilter('All'); setAssigneeFilter('All'); }}
            style={{ fontSize: '0.78rem', color: 'var(--adm-accent)', background: 'var(--adm-accent-dim)', border: '1px solid var(--adm-border)', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontWeight: 600 }}
          >
            ✕ Clear Filters
          </button>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>
          Showing <strong style={{ color: 'var(--adm-text)' }}>{filteredTasks.length}</strong> tasks
        </span>
      </div>

      {/* ── KANBAN BOARD ────────────────────────────────── */}
      {viewMode === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, alignItems: 'flex-start' }}>
          {TASK_COLUMNS.map(col => {
            const meta     = COLUMN_META[col];
            const colTasks = filteredTasks.filter(t => t.status === col);

            return (
              <div key={col} style={{ background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 14, overflow: 'hidden' }}>
                {/* Column Header */}
                <div style={{
                  borderBottom: `1px solid ${meta.border}`,
                  padding: '14px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1rem' }}>{meta.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: meta.color }}>{meta.label}</span>
                  </div>
                  <span style={{
                    background: meta.color + '22', color: meta.color,
                    fontSize: '0.7rem', fontWeight: 800,
                    padding: '2px 9px', borderRadius: 20, border: `1px solid ${meta.color}44`
                  }}>
                    {colTasks.length}
                  </span>
                </div>

                {/* Column Progress Bar */}
                {tasks.length > 0 && (
                  <div style={{ height: 3, background: 'rgba(0,0,0,0.05)' }}>
                    <div style={{
                      height: '100%',
                      width: `${(colTasks.length / tasks.length) * 100}%`,
                      background: meta.color,
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                )}

                {/* Task Cards */}
                <div style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 80 }}>
                  {colTasks.length === 0 ? (
                    <div style={{
                      textAlign: 'center', padding: '28px 16px',
                      color: 'var(--adm-text-secondary)', fontSize: '0.78rem'
                    }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: 6, opacity: 0.5 }}>📭</div>
                      <div style={{ fontWeight: 600 }}>No tasks here</div>
                      <div style={{ opacity: 0.7, marginTop: 2 }}>Create a new task to get started</div>
                    </div>
                  ) : colTasks.map(task => {
                    const pMeta    = PRIORITY_META[task.priority] || PRIORITY_META['Low'];
                    const overdue  = isOverdue(task);
                    const initials = getAssigneeInitials(task.assignedTo);
                    const assignee = getAssigneeName(task.assignedTo);

                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        style={{
                          background: 'var(--adm-card)',
                          border: overdue
                            ? '1px solid rgba(225,29,72,0.3)'
                            : '1px solid var(--adm-border)',
                          borderRadius: 10,
                          padding: '12px 14px',
                          cursor: 'pointer',
                          transition: 'box-shadow 0.18s, transform 0.18s',
                          boxShadow: 'var(--adm-shadow)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.boxShadow = 'var(--adm-shadow-lg)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.boxShadow = 'var(--adm-shadow)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {/* Priority left bar */}
                        <div style={{
                          position: 'absolute', left: 0, top: 0, bottom: 0,
                          width: 3, background: pMeta.dot, borderRadius: '10px 0 0 10px'
                        }} />

                        {/* Overdue banner */}
                        {overdue && (
                          <div style={{
                            background: 'rgba(225,29,72,0.07)',
                            border: '1px solid rgba(225,29,72,0.15)',
                            borderRadius: 5,
                            padding: '3px 8px',
                            fontSize: '0.67rem',
                            color: '#e11d48',
                            fontWeight: 700,
                            marginBottom: 8,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}>
                            🚨 Overdue · {formatDate(task.dueDate)}
                          </div>
                        )}

                        {/* Title */}
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--adm-text)', marginBottom: 4, lineHeight: 1.3 }}>
                          {task.title}
                        </div>

                        {/* Description snippet */}
                        {task.description && (
                          <p style={{ margin: '0 0 10px 0', fontSize: '0.75rem', color: 'var(--adm-text-secondary)', lineHeight: 1.4 }}>
                            {task.description.slice(0, 60)}{task.description.length > 60 ? '…' : ''}
                          </p>
                        )}

                        {/* Tags */}
                        {(task.tags || []).length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                            {(task.tags || []).map(t => (
                              <span key={t} style={{
                                fontSize: '0.62rem', fontWeight: 700,
                                padding: '2px 7px', borderRadius: 20,
                                background: 'var(--adm-accent-dim)',
                                color: 'var(--adm-accent)',
                                border: '1px solid var(--adm-border)'
                              }}>{t}</span>
                            ))}
                          </div>
                        )}

                        {/* Footer row */}
                        <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                          {/* Left: priority + assignee */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{
                              fontSize: '0.65rem', fontWeight: 800,
                              padding: '2px 7px', borderRadius: 20,
                              background: pMeta.bg, color: pMeta.color
                            }}>
                              {task.priority}
                            </span>
                            <div title={assignee} style={{
                              width: 24, height: 24, borderRadius: '50%',
                              background: 'var(--adm-accent)', color: '#fff',
                              fontSize: '0.6rem', fontWeight: 800,
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              {initials}
                            </div>
                          </div>

                          {/* Right: due date + move buttons */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            {!overdue && task.dueDate && (
                              <span style={{ fontSize: '0.65rem', color: 'var(--adm-text-secondary)', fontWeight: 600 }}>
                                📅 {formatDate(task.dueDate)}
                              </span>
                            )}
                            <button
                              onClick={() => handleShiftTask(task.id, -1)}
                              style={{
                                width: 22, height: 22, border: '1px solid var(--adm-border)',
                                borderRadius: 4, background: 'var(--adm-bg)', cursor: 'pointer',
                                fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--adm-text-secondary)', transition: 'all 0.15s'
                              }}
                              title="Move back"
                            >←</button>
                            <button
                              onClick={() => handleShiftTask(task.id, 1)}
                              style={{
                                width: 22, height: 22, border: '1px solid var(--adm-border)',
                                borderRadius: 4, background: 'var(--adm-bg)', cursor: 'pointer',
                                fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--adm-accent)', transition: 'all 0.15s'
                              }}
                              title="Move forward"
                            >→</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add task shortcut */}
                <div style={{ padding: '0 10px 10px 10px' }}>
                  <button
                    onClick={() => setShowCreate(true)}
                    style={{
                      width: '100%', padding: '8px', background: 'transparent',
                      border: `1px dashed ${meta.color}55`, borderRadius: 8,
                      color: meta.color, fontSize: '0.78rem', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.18s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = meta.bg; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    + Add Task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── LIST VIEW ──────────────────────────────────── */
        <div className="adm-card" style={{ overflow: 'hidden', border: '1px solid var(--adm-border)' }}>
          <div className="adm-table-wrap">
            <table className="adm-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Task</th>
                  <th>Priority</th>
                  <th>Assignee</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Move</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--adm-text-secondary)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>No tasks match your filters</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: 4 }}>Try adjusting the priority or assignee filter</div>
                      </div>
                    </td>
                  </tr>
                ) : filteredTasks.map(task => {
                  const overdue = isOverdue(task);
                  const pMeta   = PRIORITY_META[task.priority] || PRIORITY_META['Low'];
                  const meta    = COLUMN_META[task.status];
                  return (
                    <tr
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      style={{ cursor: 'pointer', background: overdue ? 'rgba(225,29,72,0.02)' : 'transparent' }}
                    >
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--adm-text)', fontSize: '0.88rem' }}>{task.title}</div>
                        {task.description && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)', marginTop: 2 }}>
                            {task.description.slice(0, 70)}{task.description.length > 70 ? '…' : ''}
                          </div>
                        )}
                        {(task.tags || []).length > 0 && (
                          <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
                            {task.tags.map(t => (
                              <span key={t} style={{
                                fontSize: '0.62rem', fontWeight: 700, padding: '1px 6px', borderRadius: 20,
                                background: 'var(--adm-accent-dim)', color: 'var(--adm-accent)', border: '1px solid var(--adm-border)'
                              }}>{t}</span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{
                          fontSize: '0.72rem', fontWeight: 800, padding: '3px 9px', borderRadius: 20,
                          background: pMeta.bg, color: pMeta.color, display: 'inline-flex', alignItems: 'center', gap: 5
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: pMeta.dot, display: 'inline-block' }} />
                          {task.priority}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: 'var(--adm-accent)', color: '#fff',
                            fontSize: '0.65rem', fontWeight: 800,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {getAssigneeInitials(task.assignedTo)}
                          </div>
                          <span style={{ fontSize: '0.82rem', color: 'var(--adm-text)', fontWeight: 600 }}>
                            {getAssigneeName(task.assignedTo)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', color: overdue ? '#e11d48' : 'var(--adm-text)', fontWeight: overdue ? 700 : 400 }}>
                          {overdue && '🚨 '}{formatDate(task.dueDate)}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          fontSize: '0.72rem', fontWeight: 700, padding: '3px 9px', borderRadius: 20,
                          background: meta?.bg, color: meta?.color, border: `1px solid ${meta?.border}`
                        }}>
                          {meta?.icon} {task.status}
                        </span>
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button
                            onClick={() => handleShiftTask(task.id, -1)}
                            style={{
                              padding: '4px 8px', border: '1px solid var(--adm-border)',
                              borderRadius: 5, background: 'var(--adm-bg)', cursor: 'pointer',
                              fontSize: '0.78rem', color: 'var(--adm-text-secondary)'
                            }}
                          >←</button>
                          <button
                            onClick={() => handleShiftTask(task.id, 1)}
                            style={{
                              padding: '4px 8px', border: '1px solid var(--adm-border)',
                              borderRadius: 5, background: 'var(--adm-accent-dim)', cursor: 'pointer',
                              fontSize: '0.78rem', color: 'var(--adm-accent)', fontWeight: 700
                            }}
                          >→</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Task Detail Slide Panel ──────────────────────── */}
      {selectedTask && (
        <div
          onClick={() => setSelectedTask(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)',
            zIndex: 1000, backdropFilter: 'blur(2px)'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed', right: 0, top: 0, bottom: 0, width: 420,
              background: 'var(--adm-card)', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
              display: 'flex', flexDirection: 'column', zIndex: 1001,
              borderLeft: '1px solid var(--adm-border)'
            }}
          >
            {/* Panel Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--adm-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.1rem' }}>{COLUMN_META[selectedTask.status]?.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--adm-text-secondary)' }}>Task Details</span>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                style={{
                  width: 30, height: 30, border: '1px solid var(--adm-border)',
                  borderRadius: '50%', background: 'var(--adm-bg)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--adm-text-secondary)', fontSize: '0.85rem'
                }}
              >✕</button>
            </div>

            {/* Panel Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <h2 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--adm-text)', lineHeight: 1.3 }}>
                {selectedTask.title}
              </h2>

              {/* Status + Priority badges */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: 20,
                  background: PRIORITY_META[selectedTask.priority]?.bg,
                  color: PRIORITY_META[selectedTask.priority]?.color
                }}>
                  {selectedTask.priority} Priority
                </span>
                <span style={{
                  fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: 20,
                  background: COLUMN_META[selectedTask.status]?.bg,
                  color: COLUMN_META[selectedTask.status]?.color,
                  border: `1px solid ${COLUMN_META[selectedTask.status]?.border}`
                }}>
                  {COLUMN_META[selectedTask.status]?.icon} {selectedTask.status}
                </span>
                {isOverdue(selectedTask) && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: 20, background: 'rgba(225,29,72,0.08)', color: '#e11d48' }}>
                    🚨 Overdue
                  </span>
                )}
              </div>

              {/* Detail grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div style={{ background: 'var(--adm-bg)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--adm-border)' }}>
                  <div style={{ fontSize: '0.67rem', color: 'var(--adm-text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Assignee</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--adm-accent)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getAssigneeInitials(selectedTask.assignedTo)}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--adm-text)' }}>
                      {getAssigneeName(selectedTask.assignedTo)}
                    </span>
                  </div>
                </div>
                <div style={{ background: 'var(--adm-bg)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--adm-border)' }}>
                  <div style={{ fontSize: '0.67rem', color: 'var(--adm-text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Due Date</div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isOverdue(selectedTask) ? '#e11d48' : 'var(--adm-text)' }}>
                    {formatDate(selectedTask.dueDate)}
                  </span>
                </div>
              </div>

              {/* Description */}
              {selectedTask.description && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--adm-text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Description</div>
                  <p style={{
                    margin: 0, fontSize: '0.85rem', color: 'var(--adm-text)',
                    lineHeight: 1.7, whiteSpace: 'pre-wrap',
                    background: 'var(--adm-bg)', border: '1px solid var(--adm-border)',
                    borderRadius: 10, padding: '12px 14px'
                  }}>
                    {selectedTask.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {(selectedTask.tags || []).length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--adm-text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Tags</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selectedTask.tags.map(t => (
                      <span key={t} style={{
                        fontSize: '0.75rem', fontWeight: 700,
                        padding: '4px 10px', borderRadius: 20,
                        background: 'var(--adm-accent-dim)', color: 'var(--adm-accent)',
                        border: '1px solid var(--adm-border)'
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Move to column */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--adm-text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Move to Stage</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {TASK_COLUMNS.map(col => {
                    const m = COLUMN_META[col];
                    const isActive = selectedTask.status === col;
                    return (
                      <button
                        key={col}
                        onClick={() => {
                          updateTask(selectedTask.id, { status: col });
                          setSelectedTask({ ...selectedTask, status: col });
                          showToast(`Moved to ${col}`, 'success');
                        }}
                        style={{
                          padding: '8px 10px', border: isActive ? `2px solid ${m.color}` : '1px solid var(--adm-border)',
                          borderRadius: 8, background: isActive ? m.bg : 'var(--adm-bg)',
                          color: isActive ? m.color : 'var(--adm-text-secondary)',
                          fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.15s'
                        }}
                      >
                        <span>{m.icon}</span> {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--adm-border)', display: 'flex', gap: 10 }}>
              <button
                className="adm-btn adm-btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  updateTask(selectedTask.id, { status: 'Done' });
                  setSelectedTask(null);
                  showToast('Task marked as Done ✅', 'success');
                }}
              >
                ✅ Mark as Done
              </button>
              <button
                className="adm-btn adm-btn-ghost"
                onClick={() => setSelectedTask(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Create Task Modal ───────────────────────────── */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Task" size="md">
        <form onSubmit={handleCreate} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Task Title <span style={{ color: 'var(--adm-red)' }}>*</span></label>
            <input
              className="adm-input" required
              value={form.title}
              onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Schedule parent follow-up meeting"
            />
          </div>
          <div className="adm-form-group">
            <label>Description</label>
            <textarea className="adm-textarea" rows={3} value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} placeholder="Optional task details..." />
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Priority</label>
              <select className="adm-select" value={form.priority} onChange={e => setForm(prev => ({ ...prev, priority: e.target.value }))}>
                <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
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
              <label>Due Date <span style={{ color: 'var(--adm-red)' }}>*</span></label>
              <input type="date" className="adm-input" required value={form.dueDate} onChange={e => setForm(prev => ({ ...prev, dueDate: e.target.value }))} />
            </div>
            <div className="adm-form-group">
              <label>Tags <span style={{ color: 'var(--adm-text-secondary)', fontWeight: 400 }}>(comma-separated)</span></label>
              <input className="adm-input" value={form.tags} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))} placeholder="Follow-up, Counseling" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Create Task</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
