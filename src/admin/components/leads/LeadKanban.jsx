import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Badge, leadStatusBadge } from '../ui/Badge';
import '../../admin.css';

const MAIN_COLUMNS = [
  'New Lead',
  'Contacted',
  'Interested',
  'Webinar Registered',
  'Webinar Attended',
  'Counseling Booked',
  'Counseling Completed',
  'Converted',
];

const SIDE_STATUSES = ['Not Interested', 'Closed'];

const STATUS_COLORS = {
  'New Lead':               'var(--adm-blue)',
  'Contacted':              'var(--adm-accent)',
  'Interested':             '#a855f7',
  'Webinar Registered':     'var(--adm-amber)',
  'Webinar Attended':       '#f97316',
  'Counseling Booked':      'var(--adm-blue)',
  'Counseling Completed':   'var(--adm-accent)',
  'Converted':              'var(--adm-green)',
  'Not Interested':         'var(--adm-muted)',
  'Closed':                 'var(--adm-red)',
};

function scoreColor(score) {
  if (score >= 8) return 'var(--adm-green)';
  if (score >= 5) return 'var(--adm-amber)';
  return 'var(--adm-red)';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function LeadCard({ lead, onOpen, onMoveLeft, onMoveRight, columns }) {
  const statusBadge = leadStatusBadge(lead.status);
  const score = lead.leadScore ?? lead.score ?? 0;
  const col = columns.indexOf(lead.status);
  const canLeft = col > 0;
  const canRight = col < columns.length - 1;

  return (
    <div
      className="adm-kanban-card"
      onClick={() => onOpen(lead)}
    >
      <div className="adm-kanban-card-top">
        <div className="adm-kanban-card-name">{lead.name}</div>
        <div
          className="adm-kanban-score"
          style={{ borderColor: scoreColor(score), color: scoreColor(score) }}
        >
          {score}
        </div>
      </div>
      <div className="adm-kanban-card-phone">{lead.phone || '—'}</div>
      <div className="adm-kanban-card-meta">
        {lead.source && (
          <Badge variant="blue" size="sm">{lead.source}</Badge>
        )}
        {lead.assignedCounselor && (
          <span className="adm-kanban-counselor">👤 {lead.assignedCounselor}</span>
        )}
      </div>
      {lead.followUpDate && (
        <div className="adm-kanban-followup">
          📅 {formatDate(lead.followUpDate)}
        </div>
      )}
      <div className="adm-kanban-card-actions" onClick={e => e.stopPropagation()}>
        <button
          className="adm-kanban-move-btn"
          disabled={!canLeft}
          onClick={e => { e.stopPropagation(); onMoveLeft(lead); }}
          title="Move left"
        >◀</button>
        <button
          className="adm-kanban-move-btn"
          disabled={!canRight}
          onClick={e => { e.stopPropagation(); onMoveRight(lead); }}
          title="Move right"
        >▶</button>
      </div>
    </div>
  );
}

function KanbanColumn({ status, leads, onOpen, onMoveLeft, onMoveRight, columns }) {
  const color = STATUS_COLORS[status] || 'var(--adm-accent)';
  return (
    <div className="adm-kanban-column">
      <div className="adm-kanban-col-header" style={{ borderTop: `3px solid ${color}` }}>
        <span className="adm-kanban-col-title">{status}</span>
        <span className="adm-kanban-col-count" style={{ background: `${color}22`, color }}>
          {leads.length}
        </span>
      </div>
      <div className="adm-kanban-cards">
        {leads.length === 0 ? (
          <div className="adm-kanban-empty">No leads</div>
        ) : (
          leads.map(lead => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onOpen={onOpen}
              onMoveLeft={onMoveLeft}
              onMoveRight={onMoveRight}
              columns={columns}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function LeadKanban({ onOpenLead }) {
  const { leads = [], updateLead } = useData();

  // Group by status
  const grouped = useMemo(() => {
    const g = {};
    [...MAIN_COLUMNS, ...SIDE_STATUSES].forEach(s => { g[s] = []; });
    leads.forEach(lead => {
      const status = lead.status || 'New Lead';
      if (g[status] !== undefined) {
        g[status].push(lead);
      } else {
        if (!g['Other']) g['Other'] = [];
        g['Other'].push(lead);
      }
    });
    return g;
  }, [leads]);

  const handleMoveLeft = (lead) => {
    const idx = MAIN_COLUMNS.indexOf(lead.status);
    if (idx <= 0) return;
    updateLead(lead.id, { status: MAIN_COLUMNS[idx - 1] });
  };

  const handleMoveRight = (lead) => {
    const idx = MAIN_COLUMNS.indexOf(lead.status);
    if (idx < 0 || idx >= MAIN_COLUMNS.length - 1) return;
    updateLead(lead.id, { status: MAIN_COLUMNS[idx + 1] });
  };

  const handleOpen = (lead) => {
    if (onOpenLead) onOpenLead(lead);
  };

  return (
    <div className="adm-kanban-root">
      {/* Main pipeline */}
      <div className="adm-kanban-board">
        {MAIN_COLUMNS.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            leads={grouped[status] || []}
            onOpen={handleOpen}
            onMoveLeft={handleMoveLeft}
            onMoveRight={handleMoveRight}
            columns={MAIN_COLUMNS}
          />
        ))}
      </div>

      {/* Side statuses (Not Interested, Closed) */}
      <div className="adm-kanban-side">
        <div className="adm-kanban-side-label">Closed Statuses</div>
        <div className="adm-kanban-side-cols">
          {SIDE_STATUSES.map(status => (
            <KanbanColumn
              key={status}
              status={status}
              leads={grouped[status] || []}
              onOpen={handleOpen}
              onMoveLeft={() => {}}
              onMoveRight={() => {}}
              columns={SIDE_STATUSES}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
