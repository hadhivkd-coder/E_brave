import React, { useState, useMemo, useCallback } from 'react';
import { useData } from '../context/DataContext';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import LeadKanban from '../components/leads/LeadKanban';
import LeadForm from '../components/leads/LeadForm';

const ALL_STATUSES = [
  'New Lead', 'Contacted', 'Interested', 'Webinar Registered',
  'Webinar Attended', 'Counseling Booked', 'Counseling Completed',
  'Converted', 'Follow-up Required', 'Not Interested', 'Closed'
];

const STATUS_COLORS = {
  'New Lead': 'indigo', 'Contacted': 'blue', 'Interested': 'amber',
  'Webinar Registered': 'purple', 'Webinar Attended': 'blue',
  'Counseling Booked': 'amber', 'Counseling Completed': 'green',
  'Converted': 'green', 'Follow-up Required': 'red',
  'Not Interested': 'gray', 'Closed': 'gray'
};

const SOURCES = ['All Sources', 'Instagram', 'WhatsApp', 'Google', 'YouTube', 'Referral', 'Direct'];

function LeadDetailPanel({ lead, onClose, onUpdate, onDelete, team }) {
  const [editStatus, setEditStatus] = useState(lead.status);
  const [note, setNote] = useState('');
  const [tab, setTab] = useState('overview');

  if (!lead) return null;

  return (
    <div className="adm-slide-panel-overlay" onClick={onClose}>
      <div className="adm-slide-panel" onClick={e => e.stopPropagation()}>
        <div className="adm-slide-panel-header">
          <div className="adm-slide-panel-title">
            <div className="adm-avatar" style={{ background: '#6366f120', color: '#6366f1' }}>
              {lead.name?.charAt(0)}
            </div>
            <div>
              <h3>{lead.name}</h3>
              <p>{lead.phone} · {lead.city}, {lead.state}</p>
            </div>
          </div>
          <button className="adm-icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="adm-lead-score-bar">
          <span>Lead Score</span>
          <div className="adm-score-track">
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <div
                key={n}
                className={`adm-score-pip ${n <= lead.leadScore ? 'adm-score-pip-active' : ''}`}
                style={{ background: n <= lead.leadScore ? (lead.leadScore >= 8 ? '#ef4444' : lead.leadScore >= 6 ? '#f59e0b' : '#6366f1') : undefined }}
              />
            ))}
          </div>
          <strong>{lead.leadScore}/10</strong>
        </div>

        <div className="adm-panel-tabs">
          {['overview', 'activity', 'notes'].map(t => (
            <button key={t} className={`adm-panel-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="adm-panel-content">
            <div className="adm-detail-grid">
              <div className="adm-detail-item"><span className="adm-detail-label">Email</span><span>{lead.email || '—'}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Phone</span><span>{lead.phone}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Education</span><span>{lead.education || '—'}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Source</span><Badge variant="blue" size="sm">{lead.source}</Badge></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Parent Contact</span><span>{lead.parentContact || '—'}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Follow-up</span><span>{lead.followUpDate || '—'}</span></div>
            </div>

            <div className="adm-detail-section">
              <label className="adm-detail-label">Update Status</label>
              <select
                className="adm-select"
                value={editStatus}
                onChange={e => {
                  setEditStatus(e.target.value);
                  onUpdate(lead.id, { status: e.target.value });
                }}
              >
                {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="adm-panel-actions">
              <a
                href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="adm-btn adm-btn-ghost adm-btn-sm"
                style={{ color: '#25D366' }}
              >
                💬 WhatsApp
              </a>
              <a href={`tel:${lead.phone}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                📞 Call
              </a>
              {onDelete && (
                <button
                  onClick={() => onDelete(lead.id)}
                  className="adm-btn adm-btn-ghost adm-btn-sm"
                  style={{ color: 'var(--adm-red)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                >
                  🗑️ Delete
                </button>
              )}
            </div>

            {lead.tags?.length > 0 && (
              <div className="adm-detail-tags">
                {lead.tags.map(tag => (
                  <span key={tag} className="adm-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'activity' && (
          <div className="adm-panel-content">
            <div className="adm-timeline">
              {(lead.activityHistory || []).map((act, i) => (
                <div key={i} className="adm-timeline-item">
                  <div className="adm-timeline-dot" />
                  <div className="adm-timeline-body">
                    <p>{act.message}</p>
                    <span className="adm-timeline-time">{act.time}</span>
                  </div>
                </div>
              ))}
              {(!lead.activityHistory || lead.activityHistory.length === 0) && (
                <p className="adm-empty-state">No activity recorded yet</p>
              )}
            </div>
          </div>
        )}

        {tab === 'notes' && (
          <div className="adm-panel-content">
            {lead.notes && (
              <div className="adm-note-display">
                <p>{lead.notes}</p>
              </div>
            )}
            <div className="adm-form-group">
              <label>Add Note</label>
              <textarea
                className="adm-textarea"
                rows={3}
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Type a note..."
              />
              <button
                className="adm-btn adm-btn-primary adm-btn-sm"
                onClick={() => {
                  if (note.trim()) {
                    onUpdate(lead.id, { notes: (lead.notes ? lead.notes + '\n\n' : '') + note });
                    setNote('');
                  }
                }}
              >
                Save Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Leads() {
  const { leads, team, updateLead, addLead, deleteLead } = useData();
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const [view, setView] = useState('table'); // 'table' | 'kanban'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All Sources');
  const [scoreFilter, setScoreFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const filteredLeads = useMemo(() => {
    let result = [...leads];
    if (user?.role === 'Counselor') {
      result = result.filter(l => l.counselorId === user.id);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.city?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') result = result.filter(l => l.status === statusFilter);
    if (sourceFilter !== 'All Sources') result = result.filter(l => l.source === sourceFilter);
    if (scoreFilter === 'Hot (8+)') result = result.filter(l => l.leadScore >= 8);
    if (scoreFilter === 'Warm (5-7)') result = result.filter(l => l.leadScore >= 5 && l.leadScore < 8);
    if (scoreFilter === 'Cold (<5)') result = result.filter(l => l.leadScore < 5);

    result.sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
    return result;
  }, [leads, search, statusFilter, sourceFilter, scoreFilter, sortBy, sortDir, user]);

  const paginatedLeads = filteredLeads.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredLeads.length / perPage);

  const handleSort = useCallback((col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  }, [sortBy]);

  const handleUpdateLead = useCallback((id, updates) => {
    updateLead(id, updates);
    if (selectedLead?.id === id) setSelectedLead(prev => ({ ...prev, ...updates }));
    showToast('Lead updated', 'success');
  }, [updateLead, selectedLead, showToast]);

  const handleAddLead = useCallback((leadData) => {
    addLead(leadData);
    setShowAddModal(false);
    showToast('Lead added successfully', 'success');
  }, [addLead, showToast]);

  const handleDeleteConfirm = useCallback(() => {
    if (!leadToDelete) return;
    const targetLead = leads.find(l => l.id === leadToDelete);
    deleteLead(leadToDelete, {
      actor: user?.name || 'System Admin',
      action: 'DELETE_LEAD',
      entity: 'leads',
      previousValues: targetLead
    });
    setSelectedLead(null);
    setLeadToDelete(null);
    showToast('Lead deleted successfully', 'success');
  }, [leadToDelete, deleteLead, leads, user, showToast]);

  return (
    <AdminLayout title="Leads">
      {/* Page Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Lead Management</h1>
          <p className="adm-page-subtitle">{leads.length} total leads · {filteredLeads.length} shown</p>
        </div>
        <div className="adm-page-actions">
          <div className="adm-view-toggle">
            <button className={`adm-view-btn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')}>
              ☰ Table
            </button>
            <button className={`adm-view-btn ${view === 'kanban' ? 'active' : ''}`} onClick={() => setView('kanban')}>
              ⊞ Kanban
            </button>
          </div>
          <button className="adm-btn adm-btn-primary" onClick={() => setShowAddModal(true)}>
            + Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="adm-filters-bar">
        <div className="adm-search-wrap">
          <svg className="adm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            className="adm-search-input"
            placeholder="Search by name, phone, email, city..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select className="adm-select adm-filter-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="All">All Statuses</option>
          {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="adm-select adm-filter-select" value={sourceFilter} onChange={e => { setSourceFilter(e.target.value); setPage(1); }}>
          {SOURCES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="adm-select adm-filter-select" value={scoreFilter} onChange={e => { setScoreFilter(e.target.value); setPage(1); }}>
          <option value="All">All Scores</option>
          <option value="Hot (8+)">🔥 Hot (8+)</option>
          <option value="Warm (5-7)">♨️ Warm (5-7)</option>
          <option value="Cold (<5)">❄️ Cold (&lt;5)</option>
        </select>
        {(search || statusFilter !== 'All' || sourceFilter !== 'All Sources' || scoreFilter !== 'All') && (
          <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => { setSearch(''); setStatusFilter('All'); setSourceFilter('All Sources'); setScoreFilter('All'); setPage(1); }}>
            Clear filters
          </button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="adm-lead-quick-stats">
        {[
          { label: 'Total', count: leads.length, color: '#6366f1' },
          { label: 'Hot Leads', count: leads.filter(l => l.leadScore >= 8).length, color: '#ef4444' },
          { label: 'Follow-up', count: leads.filter(l => l.status === 'Follow-up Required').length, color: '#f59e0b' },
          { label: 'Converted', count: leads.filter(l => l.status === 'Converted').length, color: '#10b981' },
          { label: 'Not Interested', count: leads.filter(l => l.status === 'Not Interested').length, color: '#71717a' },
        ].map(stat => (
          <div key={stat.label} className="adm-quick-stat" style={{ borderLeft: `3px solid ${stat.color}` }}>
            <span className="adm-quick-stat-count" style={{ color: stat.color }}>{stat.count}</span>
            <span className="adm-quick-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      {view === 'kanban' ? (
        <LeadKanban
          leads={filteredLeads}
          onLeadClick={setSelectedLead}
          onUpdateLead={handleUpdateLead}
        />
      ) : (
        <>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')} className="adm-th-sortable">
                    Name {sortBy === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th>Contact</th>
                  <th onClick={() => handleSort('source')} className="adm-th-sortable">
                    Source {sortBy === 'source' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => handleSort('status')} className="adm-th-sortable">
                    Status {sortBy === 'status' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => handleSort('leadScore')} className="adm-th-sortable">
                    Score {sortBy === 'leadScore' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th>Counselor</th>
                  <th onClick={() => handleSort('followUpDate')} className="adm-th-sortable">
                    Follow-up {sortBy === 'followUpDate' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map(lead => {
                  const counselor = team.find(t => t.id === lead.counselorId);
                  const isOverdue = lead.followUpDate && new Date(lead.followUpDate) < new Date();
                  return (
                    <tr key={lead.id} className="adm-tr-clickable" onClick={() => setSelectedLead(lead)}>
                      <td>
                        <div className="adm-td-lead-name">
                          <div className="adm-avatar adm-avatar-xs" style={{ background: '#6366f120', color: '#6366f1' }}>
                            {lead.name?.charAt(0)}
                          </div>
                          <div>
                            <div className="adm-td-name">{lead.name}</div>
                            <div className="adm-td-sub">{lead.city}, {lead.state}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="adm-td-name">{lead.phone}</div>
                        <div className="adm-td-sub">{lead.email}</div>
                      </td>
                      <td><Badge variant="blue" size="sm">{lead.source}</Badge></td>
                      <td><Badge variant={STATUS_COLORS[lead.status] || 'gray'} size="sm">{lead.status}</Badge></td>
                      <td>
                        <div className="adm-score-badge" style={{
                          background: lead.leadScore >= 8 ? '#ef444420' : lead.leadScore >= 5 ? '#f59e0b20' : '#6366f120',
                          color: lead.leadScore >= 8 ? '#ef4444' : lead.leadScore >= 5 ? '#f59e0b' : '#6366f1'
                        }}>
                          {lead.leadScore}/10
                        </div>
                      </td>
                      <td>
                        {counselor ? (
                          <div className="adm-td-counselor">
                            <div className="adm-avatar adm-avatar-xs" style={{ background: '#10b98120', color: '#10b981' }}>
                              {counselor.name?.charAt(0)}
                            </div>
                            <span>{counselor.name?.split(' ')[0]}</span>
                          </div>
                        ) : <span className="adm-td-sub">Unassigned</span>}
                      </td>
                      <td>
                        {lead.followUpDate ? (
                          <span className={isOverdue ? 'adm-text-red adm-font-bold' : 'adm-text-muted'}>
                            {isOverdue ? '⚠️ ' : ''}{new Date(lead.followUpDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        ) : <span className="adm-td-sub">—</span>}
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <div className="adm-td-actions">
                          <a
                            href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="adm-icon-action adm-icon-action-green"
                            title="WhatsApp"
                          >💬</a>
                          <a href={`tel:${lead.phone}`} className="adm-icon-action" title="Call">📞</a>
                          <button className="adm-icon-action" onClick={() => setSelectedLead(lead)} title="View details">→</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {paginatedLeads.length === 0 && (
              <div className="adm-table-empty">
                <p>No leads match your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="adm-pagination">
              <button className="adm-btn adm-btn-ghost adm-btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
              <span className="adm-pagination-info">Page {page} of {totalPages} · {filteredLeads.length} leads</span>
              <button className="adm-btn adm-btn-ghost adm-btn-sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
            </div>
          )}
        </>
      )}

      {/* Lead Detail Slide Panel */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdateLead}
          onDelete={setLeadToDelete}
          team={team}
        />
      )}

      {/* Add Lead Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Lead" size="lg">
        <LeadForm
          onSubmit={handleAddLead}
          onCancel={() => setShowAddModal(false)}
          team={team}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!leadToDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete this lead? This action cannot be undone and will be tracked in administrative action logs.`}
        requireWord="DELETE"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setLeadToDelete(null)}
      />
    </AdminLayout>
  );
}
