import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

// ─── Static seed data (used when DataContext content is empty) ─────────────────
const SEED_CONTENT = [
  {
    id: 'c1', title: 'How I Studied Abroad With Zero Savings',
    platform: 'Instagram', hook: 'I had ₹0 in my account and still made it to Canada…',
    script: 'Full reel script about scholarship journey…', cta: 'Link in bio for free consultation',
    status: 'Published', stage: 'Published', assignedTo: 'Riya Shah',
    views: 182000, likes: 9400, leadsGenerated: 47, engagementRate: 5.2,
    tags: ['reel', 'viral'], createdAt: '2026-04-10',
  },
  {
    id: 'c2', title: '5 Countries You Can Study in Without IELTS',
    platform: 'YouTube', hook: 'These 5 countries accept you even without IELTS…',
    script: 'Long-form video script comparing 5 countries…', cta: 'Subscribe for weekly updates',
    status: 'Scheduled', stage: 'Scheduled', assignedTo: 'Arjun Mehta',
    views: 0, likes: 0, leadsGenerated: 0, engagementRate: 0,
    tags: ['education', 'ielts-free'], createdAt: '2026-05-01',
  },
  {
    id: 'c3', title: 'WhatsApp Broadcast: May Webinar Invite',
    platform: 'WhatsApp', hook: 'Hey! Our FREE Study Abroad Webinar is on 25th May…',
    script: 'Broadcast message template for webinar…', cta: 'Reply YES to register',
    status: 'In Progress', stage: 'Editing', assignedTo: 'Priya Kumar',
    views: 0, likes: 0, leadsGenerated: 0, engagementRate: 0,
    tags: ['broadcast', 'webinar'], createdAt: '2026-05-12',
  },
  {
    id: 'c4', title: 'Student Visa Rejection Reasons in 2026',
    platform: 'Instagram', hook: 'Your visa got rejected? Here are the top 7 reasons…',
    script: 'Carousel script listing rejection reasons with fixes…', cta: 'DM us "VISA" for help',
    status: 'Script Ready', stage: 'Script Ready', assignedTo: 'Riya Shah',
    views: 0, likes: 0, leadsGenerated: 0, engagementRate: 0,
    tags: ['visa', 'carousel'], createdAt: '2026-05-14',
  },
  {
    id: 'c5', title: 'Canada PR in 3 Steps Explained',
    platform: 'YouTube', hook: "Most people don't know you can get Canadian PR this easily…",
    script: 'YouTube shorts script for Canada PR pathway…', cta: 'Subscribe for more tips',
    status: 'Idea', stage: 'Idea', assignedTo: 'Arjun Mehta',
    views: 0, likes: 0, leadsGenerated: 0, engagementRate: 0,
    tags: ['canada', 'pr'], createdAt: '2026-05-17',
  },
  {
    id: 'c6', title: 'Top Scholarships Closing June 2026',
    platform: 'WhatsApp', hook: 'These scholarships close in 2 weeks — apply NOW…',
    script: 'Broadcast with scholarship list and deadlines…', cta: 'Tap for free guide',
    status: 'Recording', stage: 'Recording', assignedTo: 'Priya Kumar',
    views: 0, likes: 0, leadsGenerated: 0, engagementRate: 0,
    tags: ['scholarships', 'urgent'], createdAt: '2026-05-18',
  },
  {
    id: 'c7', title: 'UK Student Visa: Complete 2026 Guide',
    platform: 'Instagram', hook: 'Going to the UK? Watch this before you apply…',
    script: 'Carousel guide on UK student visa process…', cta: 'Save this post',
    status: 'Published', stage: 'Published', assignedTo: 'Riya Shah',
    views: 94000, likes: 5200, leadsGenerated: 29, engagementRate: 5.5,
    tags: ['uk', 'visa-guide'], createdAt: '2026-04-22',
  },
];

const STAGES = ['Idea', 'Script Ready', 'Recording', 'Editing', 'Scheduled', 'Published'];

const PLATFORM_VARIANTS = { Instagram: 'pink', YouTube: 'red', WhatsApp: 'green' };

const TEAM_OPTIONS = ['Riya Shah', 'Arjun Mehta', 'Priya Kumar', 'Nidhi Joshi', 'Kabir Verma'];

const EMPTY_FORM = {
  title: '', hook: '', script: '', platform: 'Instagram',
  cta: '', assignedTo: 'Riya Shah', stage: 'Idea',
};

function formatNum(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function Content() {
  const { content: ctxContent, dispatch } = useData();

  // Merge seed with context
  const allContent = useMemo(() => {
    const base = ctxContent && ctxContent.length > 0 ? ctxContent : SEED_CONTENT;
    return base;
  }, [ctxContent]);

  const [view, setView] = useState('kanban'); // 'kanban' | 'table'
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [filterStage, setFilterStage] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selected, setSelected] = useState(null);
  const [slideOpen, setSlideOpen] = useState(false);

  const filtered = useMemo(() => allContent.filter(c => {
    if (filterPlatform !== 'All' && c.platform !== filterPlatform) return false;
    if (filterStage !== 'All' && c.stage !== filterStage) return false;
    return true;
  }), [allContent, filterPlatform, filterStage]);

  // Stats
  const total       = allContent.length;
  const published   = allContent.filter(c => c.stage === 'Published').length;
  const inProgress  = allContent.filter(c => !['Published', 'Idea'].includes(c.stage)).length;
  const leadsTotal  = allContent.reduce((s, c) => s + (c.leadsGenerated || 0), 0);

  function openDetail(item) { setSelected(item); setSlideOpen(true); }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleAddContent(e) {
    e.preventDefault();
    const newItem = {
      ...form,
      id: `c${Date.now()}`,
      status: form.stage,
      views: 0, likes: 0, leadsGenerated: 0, engagementRate: 0,
      tags: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    if (dispatch) dispatch({ type: 'ADD_CONTENT', payload: newItem });
    setShowAddModal(false);
    setForm(EMPTY_FORM);
  }

  function moveStage(item, dir) {
    const idx = STAGES.indexOf(item.stage);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= STAGES.length) return;
    const updated = { ...item, stage: STAGES[newIdx], status: STAGES[newIdx] };
    if (dispatch) dispatch({ type: 'UPDATE_CONTENT', payload: updated });
  }

  return (
    <AdminLayout title="Content Pipeline">
      {/* ── Header ── */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Content Pipeline</h1>
          <p className="adm-page-subtitle">Manage content from idea to publication</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Content
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="adm-content-stats">
        {[
          { label: 'Total Pieces', value: total, color: '#6366f1' },
          { label: 'Published', value: published, color: '#10b981' },
          { label: 'In Progress', value: inProgress, color: '#f59e0b' },
          { label: 'Leads from Content', value: leadsTotal, color: '#3b82f6' },
        ].map(s => (
          <div key={s.label} className="adm-card adm-content-stat">
            <div className="adm-metric-value" style={{ color: s.color }}>{s.value}</div>
            <div className="adm-metric-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Filters & View Toggle ── */}
      <div className="adm-filters-bar" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, flex: 1, flexWrap: 'wrap' }}>
          <select className="adm-select" value={filterPlatform} onChange={e => setFilterPlatform(e.target.value)}>
            <option value="All">All Platforms</option>
            <option>Instagram</option>
            <option>YouTube</option>
            <option>WhatsApp</option>
          </select>
          <select className="adm-select" value={filterStage} onChange={e => setFilterStage(e.target.value)}>
            <option value="All">All Stages</option>
            {STAGES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="adm-view-toggle">
          <button
            className={`adm-btn ${view === 'kanban' ? 'adm-btn-primary' : 'adm-btn-ghost'}`}
            onClick={() => setView('kanban')}
          >⊞ Kanban</button>
          <button
            className={`adm-btn ${view === 'table' ? 'adm-btn-primary' : 'adm-btn-ghost'}`}
            onClick={() => setView('table')}
          >☰ Table</button>
        </div>
      </div>

      {/* ── Kanban View ── */}
      {view === 'kanban' && (
        <div className="adm-kanban-scroll">
          <div className="adm-kanban-board">
            {STAGES.map(stage => {
              const items = filtered.filter(c => c.stage === stage);
              return (
                <div key={stage} className="adm-kanban-col">
                  <div className="adm-kanban-col-header">
                    <span className="adm-kanban-col-title">{stage}</span>
                    <span className="adm-kanban-col-count">{items.length}</span>
                  </div>
                  <div className="adm-kanban-cards">
                    {items.length === 0 && (
                      <div className="adm-kanban-empty">No items</div>
                    )}
                    {items.map(item => (
                      <div
                        key={item.id}
                        className="adm-content-card"
                        onClick={() => openDetail(item)}
                      >
                        <div className="adm-content-card-header">
                          <Badge variant={PLATFORM_VARIANTS[item.platform] || 'gray'} size="sm">
                            {item.platform}
                          </Badge>
                          <span className="adm-content-card-date">{item.createdAt}</span>
                        </div>
                        <div className="adm-content-card-title">{item.title}</div>
                        <div className="adm-content-card-hook">
                          "{item.hook.slice(0, 70)}{item.hook.length > 70 ? '…' : ''}"
                        </div>
                        <div className="adm-content-card-footer">
                          <span className="adm-content-assignee">
                            <span className="adm-content-avatar">{item.assignedTo?.charAt(0)}</span>
                            <span>{item.assignedTo}</span>
                          </span>
                          {item.stage === 'Published' && (
                            <span className="adm-content-views">👁 {formatNum(item.views)}</span>
                          )}
                        </div>
                        {item.stage === 'Published' && (
                          <div className="adm-content-card-metrics">
                            <span>❤️ {formatNum(item.likes)}</span>
                            <span>🎯 {item.leadsGenerated} leads</span>
                            <span>📊 {item.engagementRate}%</span>
                          </div>
                        )}
                        <div className="adm-content-card-actions" onClick={e => e.stopPropagation()}>
                          <button
                            className="adm-btn adm-btn-ghost"
                            style={{ padding: '3px 8px', fontSize: 11 }}
                            onClick={() => moveStage(item, -1)}
                            disabled={STAGES.indexOf(item.stage) === 0}
                          >←</button>
                          <button
                            className="adm-btn adm-btn-ghost"
                            style={{ padding: '3px 8px', fontSize: 11 }}
                            onClick={() => moveStage(item, 1)}
                            disabled={STAGES.indexOf(item.stage) === STAGES.length - 1}
                          >→</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Table View ── */}
      {view === 'table' && (
        <div className="adm-card">
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Platform</th>
                  <th>Stage</th>
                  <th>Assigned</th>
                  <th>Views</th>
                  <th>Leads</th>
                  <th>Engagement</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="adm-empty-state">No content items found</td></tr>
                )}
                {filtered.map(item => (
                  <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => openDetail(item)}>
                    <td className="adm-td-name">{item.title}</td>
                    <td>
                      <Badge variant={PLATFORM_VARIANTS[item.platform] || 'gray'} size="sm">
                        {item.platform}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={
                        item.stage === 'Published' ? 'green'
                        : item.stage === 'Scheduled' ? 'blue'
                        : item.stage === 'Idea' ? 'gray'
                        : 'amber'
                      } size="sm">{item.stage}</Badge>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="adm-content-avatar">{item.assignedTo?.charAt(0)}</span>
                        <span style={{ fontSize: 13 }}>{item.assignedTo}</span>
                      </div>
                    </td>
                    <td>{item.views > 0 ? formatNum(item.views) : '—'}</td>
                    <td>{item.leadsGenerated > 0 ? item.leadsGenerated : '—'}</td>
                    <td>{item.engagementRate > 0 ? `${item.engagementRate}%` : '—'}</td>
                    <td className="adm-td-sub">{item.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Add Content Modal ── */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Content">
        <form onSubmit={handleAddContent}>
          <div className="adm-form-group">
            <label className="adm-label">Title *</label>
            <input className="adm-input" name="title" value={form.title} onChange={handleFormChange} required placeholder="Content title" />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Hook / Opening Line *</label>
            <textarea className="adm-input" name="hook" value={form.hook} onChange={handleFormChange} required rows={3} placeholder="The attention-grabbing hook…" style={{ resize: 'vertical' }} />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Script / Body</label>
            <textarea className="adm-input" name="script" value={form.script} onChange={handleFormChange} rows={5} placeholder="Full content script…" style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="adm-form-group">
              <label className="adm-label">Platform</label>
              <select className="adm-select" name="platform" value={form.platform} onChange={handleFormChange}>
                <option>Instagram</option>
                <option>YouTube</option>
                <option>WhatsApp</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Stage</label>
              <select className="adm-select" name="stage" value={form.stage} onChange={handleFormChange}>
                {STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Call to Action</label>
            <input className="adm-input" name="cta" value={form.cta} onChange={handleFormChange} placeholder="e.g. DM us 'JOIN'" />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Assigned To</label>
            <select className="adm-select" name="assignedTo" value={form.assignedTo} onChange={handleFormChange}>
              {TEAM_OPTIONS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Add Content</button>
          </div>
        </form>
      </Modal>

      {/* ── Slide Panel: Content Detail ── */}
      {slideOpen && selected && (
        <div className="adm-slide-overlay" onClick={() => setSlideOpen(false)}>
          <div className="adm-slide-panel" onClick={e => e.stopPropagation()}>
            <div className="adm-slide-header">
              <div>
                <Badge variant={PLATFORM_VARIANTS[selected.platform] || 'gray'} size="sm">{selected.platform}</Badge>
                <h2 className="adm-slide-title">{selected.title}</h2>
                <p className="adm-text-muted" style={{ fontSize: 13, marginTop: 4 }}>{selected.createdAt}</p>
              </div>
              <button className="adm-btn adm-btn-ghost" onClick={() => setSlideOpen(false)}>✕</button>
            </div>

            <div className="adm-slide-section">
              <h4 className="adm-slide-section-label">Stage</h4>
              <Badge variant={selected.stage === 'Published' ? 'green' : selected.stage === 'Scheduled' ? 'blue' : 'amber'}>
                {selected.stage}
              </Badge>
            </div>

            <div className="adm-slide-section">
              <h4 className="adm-slide-section-label">Hook</h4>
              <p className="adm-slide-text adm-hook-text">"{selected.hook}"</p>
            </div>

            {selected.script && (
              <div className="adm-slide-section">
                <h4 className="adm-slide-section-label">Script</h4>
                <p className="adm-slide-text">{selected.script}</p>
              </div>
            )}

            <div className="adm-slide-section">
              <h4 className="adm-slide-section-label">CTA</h4>
              <p className="adm-slide-text">{selected.cta || '—'}</p>
            </div>

            <div className="adm-slide-section">
              <h4 className="adm-slide-section-label">Assigned To</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="adm-content-avatar">{selected.assignedTo?.charAt(0)}</span>
                <span style={{ fontSize: 14 }}>{selected.assignedTo}</span>
              </div>
            </div>

            {selected.tags?.length > 0 && (
              <div className="adm-slide-section">
                <h4 className="adm-slide-section-label">Tags</h4>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selected.tags.map(t => <Badge key={t} variant="gray" size="sm">{t}</Badge>)}
                </div>
              </div>
            )}

            {selected.stage === 'Published' && (
              <div className="adm-slide-section">
                <h4 className="adm-slide-section-label">Performance</h4>
                <div className="adm-perf-grid">
                  <div className="adm-perf-cell">
                    <span className="adm-perf-val">{formatNum(selected.views)}</span>
                    <span className="adm-perf-key">Views</span>
                  </div>
                  <div className="adm-perf-cell">
                    <span className="adm-perf-val">{formatNum(selected.likes)}</span>
                    <span className="adm-perf-key">Likes</span>
                  </div>
                  <div className="adm-perf-cell">
                    <span className="adm-perf-val">{selected.leadsGenerated}</span>
                    <span className="adm-perf-key">Leads</span>
                  </div>
                  <div className="adm-perf-cell">
                    <span className="adm-perf-val">{selected.engagementRate}%</span>
                    <span className="adm-perf-key">Eng. Rate</span>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 16 }}>
              <button
                className="adm-btn adm-btn-ghost"
                onClick={() => { moveStage(selected, -1); setSlideOpen(false); }}
                disabled={STAGES.indexOf(selected.stage) === 0}
              >← Previous Stage</button>
              <button
                className="adm-btn adm-btn-primary"
                onClick={() => { moveStage(selected, 1); setSlideOpen(false); }}
                disabled={STAGES.indexOf(selected.stage) === STAGES.length - 1}
              >Next Stage →</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .adm-content-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        .adm-content-stat {
          padding: 16px;
          text-align: center;
        }
        .adm-view-toggle { display: flex; gap: 4px; }
        .adm-kanban-scroll { overflow-x: auto; padding-bottom: 12px; }
        .adm-kanban-board {
          display: flex;
          gap: 14px;
          min-width: max-content;
          align-items: flex-start;
        }
        .adm-kanban-col {
          width: 240px;
          flex-shrink: 0;
          background: var(--adm-bg);
          border: 1px solid var(--adm-border);
          border-radius: 12px;
          overflow: hidden;
        }
        .adm-kanban-col-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-bottom: 1px solid var(--adm-border);
          background: var(--adm-card);
        }
        .adm-kanban-col-title { font-size: 13px; font-weight: 600; color: var(--adm-text); }
        .adm-kanban-col-count {
          background: var(--adm-accent-dim);
          color: var(--adm-accent);
          font-size: 12px;
          font-weight: 700;
          padding: 1px 7px;
          border-radius: 10px;
        }
        .adm-kanban-cards { padding: 10px; display: flex; flex-direction: column; gap: 8px; min-height: 60px; }
        .adm-kanban-empty { font-size: 12px; color: var(--adm-muted); text-align: center; padding: 20px 0; }
        .adm-content-card {
          background: var(--adm-card);
          border: 1px solid var(--adm-border);
          border-radius: 10px;
          padding: 12px;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.15s;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .adm-content-card:hover { border-color: var(--adm-accent); transform: translateY(-1px); }
        .adm-content-card-header { display: flex; align-items: center; justify-content: space-between; }
        .adm-content-card-date { font-size: 11px; color: var(--adm-muted); }
        .adm-content-card-title { font-size: 13px; font-weight: 600; color: var(--adm-text); line-height: 1.4; }
        .adm-content-card-hook { font-size: 11px; color: var(--adm-text-secondary); font-style: italic; line-height: 1.4; }
        .adm-content-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .adm-content-assignee { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--adm-text-secondary); }
        .adm-content-avatar {
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--adm-accent-dim); color: var(--adm-accent);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .adm-content-views { font-size: 11px; color: var(--adm-text-secondary); }
        .adm-content-card-metrics {
          display: flex; gap: 8px;
          font-size: 11px; color: var(--adm-text-secondary);
          background: var(--adm-bg);
          border-radius: 6px;
          padding: 6px 8px;
        }
        .adm-content-card-actions { display: flex; gap: 6px; justify-content: flex-end; }
        /* Slide Panel */
        .adm-slide-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 200;
          display: flex; justify-content: flex-end;
        }
        .adm-slide-panel {
          width: 420px; max-width: 95vw;
          background: var(--adm-card);
          border-left: 1px solid var(--adm-border);
          height: 100%;
          overflow-y: auto;
          padding: 24px;
          display: flex; flex-direction: column; gap: 0;
          animation: slideIn 0.25s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .adm-slide-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; gap: 12px; }
        .adm-slide-title { font-size: 17px; font-weight: 700; color: var(--adm-text); margin: 8px 0 0; }
        .adm-slide-section { margin-bottom: 18px; }
        .adm-slide-section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--adm-muted); margin: 0 0 6px; }
        .adm-slide-text { font-size: 13px; color: var(--adm-text-secondary); line-height: 1.6; margin: 0; }
        .adm-hook-text { font-style: italic; color: var(--adm-text); }
        .adm-perf-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .adm-perf-cell { background: var(--adm-bg); border-radius: 8px; padding: 10px; text-align: center; }
        .adm-perf-val { display: block; font-size: 18px; font-weight: 700; color: var(--adm-accent); }
        .adm-perf-key { display: block; font-size: 11px; color: var(--adm-muted); margin-top: 2px; }
        @media (max-width: 800px) {
          .adm-content-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </AdminLayout>
  );
}
