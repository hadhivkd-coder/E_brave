import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const CATEGORY_META = {
  All:                   { icon: '📚', color: 'var(--adm-accent)',  bg: 'var(--adm-accent-dim)' },
  SOPs:                  { icon: '📋', color: '#7c3aed',            bg: 'rgba(124,58,237,0.08)' },
  'Counseling Frameworks':{ icon: '🧭', color: 'var(--adm-blue)',   bg: 'var(--adm-blue-dim)'   },
  'Webinar Scripts':     { icon: '🎙',  color: '#db2777',           bg: 'rgba(219,39,119,0.08)' },
  'Sales Scripts':       { icon: '💰', color: 'var(--adm-amber)',   bg: 'var(--adm-amber-dim)'  },
  'Onboarding Guides':   { icon: '🚀', color: 'var(--adm-green)',   bg: 'var(--adm-green-dim)'  },
  'AI Instructions':     { icon: '🤖', color: '#0891b2',            bg: 'rgba(8,145,178,0.08)'  },
};

function renderMarkdown(content) {
  if (!content) return null;
  const lines = content.split('\n');
  const elements = [];
  let bulletBuffer = [];

  const flushBullets = (key) => {
    if (bulletBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} style={{ margin: '8px 0 12px 0', paddingLeft: 20, listStyle: 'none' }}>
          {bulletBuffer.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6, fontSize: '0.9rem', color: 'var(--adm-text)', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--adm-accent)', marginTop: 2, flexShrink: 0 }}>▸</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--adm-text)">$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('### ')) {
      flushBullets(i);
      elements.push(
        <h2 key={i} style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--adm-accent)', marginBottom: 8, marginTop: elements.length > 0 ? 24 : 0, letterSpacing: '-0.01em' }}>
          {line.replace('### ', '')}
        </h2>
      );
    } else if (line.startsWith('#### ')) {
      flushBullets(i);
      elements.push(
        <h3 key={i} style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--adm-text)', marginBottom: 6, marginTop: 18, borderLeft: '3px solid var(--adm-accent)', paddingLeft: 10 }}>
          {line.replace('#### ', '')}
        </h3>
      );
    } else if (line.match(/^\d+\. /)) {
      flushBullets(i);
      const text = line.replace(/^\d+\. /, '');
      const num = line.match(/^(\d+)\./)[1];
      elements.push(
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8, fontSize: '0.9rem', color: 'var(--adm-text)', lineHeight: 1.6 }}>
          <span style={{ background: 'var(--adm-accent)', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{num}</span>
          <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--adm-text)">$1</strong>') }} />
        </div>
      );
    } else if (line.startsWith('* ')) {
      bulletBuffer.push(line.replace('* ', ''));
    } else if (line.trim() === '') {
      flushBullets(i);
      if (elements.length > 0) {
        elements.push(<div key={i} style={{ height: 4 }} />);
      }
    } else {
      flushBullets(i);
      elements.push(
        <p key={i} style={{ fontSize: '0.9rem', color: 'var(--adm-text-secondary)', lineHeight: 1.7, marginBottom: 8 }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--adm-text)">$1</strong>') }}
        />
      );
    }
  });
  flushBullets('end');
  return elements;
}

export default function KnowledgeBase() {
  const { showToast } = useNotifications();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'SOPs', content: '' });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredCat, setHoveredCat] = useState(null);

  const [articles, setArticles] = useState([
    { id: 'a1', title: 'Lead Follow-up SOP & Response SLA', category: 'SOPs', preview: 'Step-by-step instructions for contacting new leads registered via Instagram ads within 24 hours.', content: `### Lead Follow-up SOP & Response SLA\n\nTo maintain high enrollment conversions, counselors must follow this structured follow-up protocol.\n\n#### 1. SLA Requirements\n* **Instagram/WhatsApp Leads:** Contact within 2 hours during work hours (9 AM - 7 PM).\n* **Webinar Leads:** Contact within 24 hours post-webinar completion.\n\n#### 2. Communication Protocol\n1. **First Attempt (WhatsApp):** Send welcome greeting using the 'Initial Lead Template'.\n2. **Second Attempt (Phone Call):** Call if no WhatsApp response within 4 hours.\n3. **Follow-up Log:** Update status in CRM to 'Contacted' and add call summary notes.\n\n#### 3. Handling Objection\n* If student is confused: Guide them to book a free 30-min discovery session.\n* If parent objects to cost: Emphasize payment installation plans and scholarship eligibility.`, updatedAt: '2026-05-10', author: 'Neha Gupta' },
    { id: 'a2', title: 'Career discovery counseling framework', category: 'Counseling Frameworks', preview: 'Standard framework for counselor discovery intakes, confusion mapping, and suggested paths.', content: `### Career Discovery Counseling Framework\n\nUtilize this checklist during the 60-minute initial discovery intake.\n\n#### Stage 1: Icebreaker & Goals (10 mins)\n* Establish rapport with the student and parents.\n* Ask: "If you had a magic wand, what career would you wake up doing?"\n\n#### Stage 2: Core Confusion Mapping (20 mins)\n* Document academic strengths (e.g. Maths, Drawing).\n* Identify confusion drivers: peer pressure, parent preference vs self interest.\n\n#### Stage 3: Options Exploration (20 mins)\n* Review paths: Engineering vs Design, CA vs MBA.\n* Present career pathway slide comparisons.\n\n#### Stage 4: Action Items (10 mins)\n* Set three follow-up milestones (e.g. review syllabus, attempt practice mock test).\n* Log action steps in EOS session notes.`, updatedAt: '2026-05-12', author: 'Rohan Deshmukh' },
    { id: 'a3', title: 'Decoded Stream Webinar Slide Script', category: 'Webinar Scripts', preview: 'Script structure and audience interaction prompts for the post-10th stream choice webinars.', content: `### Decoded Stream Webinar Slide Script\n\nUse this pitch structure to host Zoom webinars for stream selection.\n\n#### Introduction (15 mins)\n* Host introduction & credentials.\n* Poll: "Who here is taking science purely because of parents?"\n\n#### The Problem: The 11th Grade Shock (30 mins)\n* Contrast 10th grade ease vs 11th grade deep syllabus.\n* Highlight drop-out trends and stream mismatch.\n\n#### Interactive Workshop: Choices Breakdown (45 mins)\n* Science (PCM vs PCB), Commerce, Arts pathways comparison.\n* Student success case studies.\n\n#### Call to Action (30 mins)\n* Direct attendees to book career counselling diagnostic assessments.\n* Launch limited seats coupon code.`, updatedAt: '2026-05-15', author: 'Priya Iyer' }
  ]);

  let categories = ['All', 'SOPs', 'Counseling Frameworks', 'Webinar Scripts', 'Sales Scripts', 'Onboarding Guides', 'AI Instructions'];
  
  if (user?.role === 'Sales Representative') {
    categories = ['All', 'SOPs', 'Sales Scripts', 'Onboarding Guides'];
  }

  const allowedCategories = new Set(categories);
  const filteredByRole = articles.filter(a => allowedCategories.has(a.category) || allowedCategories.has('All'));

  const filteredArticles = filteredByRole.filter(art => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = !searchQuery || art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    const newArt = { id: `art_${Date.now()}`, title: form.title, category: form.category, preview: form.content.slice(0, 100) + '...', content: form.content, updatedAt: new Date().toISOString().split('T')[0], author: 'Admin' };
    setArticles(prev => [newArt, ...prev]);
    setForm({ title: '', category: 'SOPs', content: '' });
    setShowAdd(false);
    showToast('Knowledge Base article created', 'success');
  };

  // Stat computations
  const totalArticles = articles.length;
  const usedCategories = [...new Set(articles.map(a => a.category))].length;
  const lastUpdated = articles.reduce((latest, art) => art.updatedAt > latest ? art.updatedAt : latest, '');
  const categoryCount = cat => cat === 'All' ? articles.length : articles.filter(a => a.category === cat).length;

  const statCards = [
    { label: 'Total Articles', value: totalArticles, icon: '📄', color: 'var(--adm-accent)', bg: 'var(--adm-accent-dim)' },
    { label: 'Categories Used', value: usedCategories, icon: '🗂️', color: 'var(--adm-blue)', bg: 'var(--adm-blue-dim)' },
    { label: 'Last Updated', value: lastUpdated || '—', icon: '🕒', color: 'var(--adm-green)', bg: 'var(--adm-green-dim)', small: true },
  ];

  return (
    <AdminLayout title="Knowledge Base">
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="adm-page-title">Operational Knowledge Base</h1>
          <p className="adm-page-subtitle">Central documentation repository for counseling playbooks, scripts, onboarding steps, and system SOPs</p>
        </div>
        <button
          className="adm-btn adm-btn-primary"
          onClick={() => setShowAdd(true)}
          style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontSize: '1.1rem' }}>✍️</span> Add Article
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {statCards.map(s => (
          <div key={s.label} className="adm-card" style={{ flex: '1 1 160px', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: s.small ? '1rem' : '1.5rem', fontWeight: 700, color: s.color, lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginTop: 3 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Three-Panel Layout ── */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', minHeight: 600 }}>

        {/* LEFT: Category Sidebar */}
        <div className="adm-card" style={{ width: 240, flexShrink: 0, padding: '18px 12px', alignSelf: 'stretch' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', padding: '0 8px', marginBottom: 12 }}>
            Categories
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {categories.map(cat => {
              const meta = CATEGORY_META[cat] || CATEGORY_META['All'];
              const isActive = activeCategory === cat;
              const count = categoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setHoveredCat(cat)}
                  onMouseLeave={() => setHoveredCat(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '9px 10px', border: 'none', borderRadius: 'var(--adm-radius-sm)',
                    cursor: 'pointer', textAlign: 'left',
                    background: isActive ? meta.bg : (hoveredCat === cat ? 'var(--adm-accent-dim)' : 'transparent'),
                    transition: 'background var(--adm-transition)',
                    outline: isActive ? `1.5px solid ${meta.color}30` : 'none',
                  }}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: isActive ? meta.bg : 'var(--adm-border-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.95rem', flexShrink: 0,
                    border: isActive ? `1.5px solid ${meta.color}30` : '1px solid var(--adm-border)',
                    transition: 'all var(--adm-transition)',
                  }}>
                    {meta.icon}
                  </span>
                  <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: isActive ? 600 : 400, color: isActive ? meta.color : 'var(--adm-text)', transition: 'color var(--adm-transition)' }}>
                    {cat}
                  </span>
                  {count > 0 && (
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700,
                      background: isActive ? meta.color : 'var(--adm-border)',
                      color: isActive ? '#fff' : 'var(--adm-text-secondary)',
                      borderRadius: 20, padding: '1px 7px',
                      transition: 'all var(--adm-transition)',
                    }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER: Article List */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Search bar */}
          <div className="adm-search-wrap">
            <svg className="adm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="adm-search-input"
              placeholder="Search articles, keywords, content…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--adm-text-secondary)', fontSize: '1rem', lineHeight: 1 }}>
                ✕
              </button>
            )}
          </div>

          {/* Results count */}
          {(searchQuery || activeCategory !== 'All') && (
            <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', padding: '0 2px' }}>
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              {activeCategory !== 'All' && <span> in <strong style={{ color: 'var(--adm-accent)' }}>{activeCategory}</strong></span>}
            </div>
          )}

          {/* Article cards */}
          {filteredArticles.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredArticles.map(art => {
                const meta = CATEGORY_META[art.category] || CATEGORY_META['All'];
                const isSelected = selectedArticle?.id === art.id;
                const isHovered = hoveredCard === art.id;
                return (
                  <div
                    key={art.id}
                    className="adm-card"
                    onClick={() => setSelectedArticle(art)}
                    onMouseEnter={() => setHoveredCard(art.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      padding: '14px 16px',
                      cursor: 'pointer',
                      borderLeft: isSelected ? `4px solid ${meta.color}` : '4px solid transparent',
                      background: isSelected ? meta.bg : (isHovered ? 'var(--adm-surface)' : 'var(--adm-card)'),
                      transition: 'all var(--adm-transition)',
                      boxShadow: isSelected ? 'var(--adm-shadow-lg)' : (isHovered ? 'var(--adm-shadow)' : 'none'),
                      transform: isHovered && !isSelected ? 'translateX(2px)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8, flexWrap: 'wrap' }}>
                      {/* Category badge */}
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: '0.72rem', fontWeight: 600,
                        background: meta.bg, color: meta.color,
                        borderRadius: 20, padding: '3px 10px',
                        border: `1px solid ${meta.color}20`,
                      }}>
                        {meta.icon} {art.category}
                      </span>
                      <span style={{ fontSize: '0.73rem', color: 'var(--adm-text-secondary)', whiteSpace: 'nowrap' }}>
                        🕒 {art.updatedAt}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: isSelected ? meta.color : 'var(--adm-text)', margin: '0 0 6px 0', lineHeight: 1.3, transition: 'color var(--adm-transition)' }}>
                      {art.title}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--adm-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {art.preview}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: meta.color, border: `1px solid ${meta.color}30` }}>
                        {art.author.charAt(0)}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>{art.author}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="adm-card" style={{ textAlign: 'center', padding: '52px 24px', color: 'var(--adm-text-secondary)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--adm-text)', marginBottom: 6 }}>No articles found</div>
              <div style={{ fontSize: '0.85rem' }}>Try adjusting your search or selecting a different category.</div>
            </div>
          )}
        </div>

        {/* RIGHT: Reader Panel */}
        <div className="adm-card" style={{ width: 400, flexShrink: 0, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {selectedArticle ? (() => {
            const meta = CATEGORY_META[selectedArticle.category] || CATEGORY_META['All'];
            return (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Reader header */}
                <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid var(--adm-border)', flexShrink: 0 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: '0.72rem', fontWeight: 600,
                    background: meta.bg, color: meta.color,
                    borderRadius: 20, padding: '3px 10px',
                    border: `1px solid ${meta.color}20`,
                    marginBottom: 10,
                  }}>
                    {meta.icon} {selectedArticle.category}
                  </span>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--adm-text)', margin: '0 0 10px 0', lineHeight: 1.35 }}>
                    {selectedArticle.title}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: meta.color, border: `1px solid ${meta.color}30` }}>
                        {selectedArticle.author.charAt(0)}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>{selectedArticle.author}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--adm-text-secondary)' }}>·</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>🕒 {selectedArticle.updatedAt}</span>
                  </div>
                </div>

                {/* Scrollable body */}
                <div style={{ padding: '20px 22px', overflowY: 'auto', flex: 1 }}>
                  {renderMarkdown(selectedArticle.content)}
                </div>
              </div>
            );
          })() : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 32, textAlign: 'center', color: 'var(--adm-text-secondary)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: 16, opacity: 0.6 }}>📖</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--adm-text)', margin: '0 0 8px 0' }}>Select an article to read</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--adm-text-secondary)', margin: 0 }}>
                Playbooks and operational SOP instructions will be rendered here with full formatting.
              </p>
              <div style={{ marginTop: 24, padding: '14px 20px', background: 'var(--adm-accent-dim)', borderRadius: 'var(--adm-radius)', border: '1px solid var(--adm-border)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--adm-accent)', fontWeight: 500 }}>
                  💡 Tip: Use the search bar to quickly find specific SOPs and scripts.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Add Article Modal ── */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Create Documentation Article" size="lg">
        <form onSubmit={handleAdd} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Article Title *</label>
            <input
              className="adm-input"
              required
              value={form.title}
              onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Sales Playbook for Webinar Non-attendees"
            />
          </div>
          <div className="adm-form-group">
            <label>Category *</label>
            <select
              className="adm-select"
              value={form.category}
              onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
            >
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="adm-form-group">
            <label>Content (supports ### headings, #### subheadings, * bullets) *</label>
            <textarea
              className="adm-textarea"
              rows={12}
              required
              value={form.content}
              onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
              placeholder="### Article Title&#10;&#10;Intro paragraph...&#10;&#10;#### Section Header&#10;* Bullet point one&#10;* Bullet point two"
            />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">✍️ Publish Article</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
