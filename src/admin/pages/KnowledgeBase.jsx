import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Modal from '../components/ui/Modal';
import { useNotifications } from '../context/NotificationContext';

export default function KnowledgeBase() {
  const { showToast } = useNotifications();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'SOPs', content: '' });

  const [articles, setArticles] = useState([
    {
      id: 'a1',
      title: 'Lead Follow-up SOP & Response SLA',
      category: 'SOPs',
      preview: 'Step-by-step instructions for contacting new leads registered via Instagram ads within 24 hours.',
      content: `### Lead Follow-up SOP & Response SLA

To maintain high enrollment conversions, counselors must follow this structured follow-up protocol.

#### 1. SLA Requirements
* **Instagram/WhatsApp Leads:** Contact within 2 hours during work hours (9 AM - 7 PM).
* **Webinar Leads:** Contact within 24 hours post-webinar completion.

#### 2. Communication Protocol
1. **First Attempt (WhatsApp):** Send welcome greeting using the 'Initial Lead Template'.
2. **Second Attempt (Phone Call):** Call if no WhatsApp response within 4 hours.
3. **Follow-up Log:** Update status in CRM to 'Contacted' and add call summary notes.

#### 3. Handling Objection
* If student is confused: Guide them to book a free 30-min discovery session.
* If parent objects to cost: Emphasize payment installation plans and scholarship eligibility.`,
      updatedAt: '2026-05-10',
      author: 'Neha Gupta'
    },
    {
      id: 'a2',
      title: 'Career discovery counseling framework',
      category: 'Counseling Frameworks',
      preview: 'Standard framework for counselor discovery intakes, confusion mapping, and suggested paths.',
      content: `### Career Discovery Counseling Framework

Utilize this checklist during the 60-minute initial discovery intake.

#### Stage 1: Icebreaker & Goals (10 mins)
* Establish rapport with the student and parents.
* Ask: "If you had a magic wand, what career would you wake up doing?"

#### Stage 2: Core Confusion Mapping (20 mins)
* Document academic strengths (e.g. Maths, Drawing).
* Identify confusion drivers: peer pressure, parent preference vs self interest.

#### Stage 3: Options Exploration (20 mins)
* Review paths: Engineering vs Design, CA vs MBA.
* Present career pathway slide comparisons.

#### Stage 4: Action Items (10 mins)
* Set three follow-up milestones (e.g. review syllabus, attempt practice mock test).
* Log action steps in EOS session notes.`,
      updatedAt: '2026-05-12',
      author: 'Rohan Deshmukh'
    },
    {
      id: 'a3',
      title: 'Decoded Stream Webinar Slide Script',
      category: 'Webinar Scripts',
      preview: 'Script structure and audience interaction prompts for the post-10th stream choice webinars.',
      content: `### Decoded Stream Webinar Slide Script

Use this pitch structure to host Zoom webinars for stream selection.

#### Introduction (15 mins)
* Host introduction & credentials.
* Poll: "Who here is taking science purely because of parents?"

#### The Problem: The 11th Grade Shock (30 mins)
* Contrast 10th grade ease vs 11th grade deep syllabus.
* Highlight drop-out trends and stream mismatch.

#### Interactive Workshop: Choices Breakdown (45 mins)
* Science (PCM vs PCB), Commerce, Arts pathways comparison.
* Student success case studies.

#### Call to Action (30 mins)
* Direct attendees to book career counselling diagnostic assessments.
* Launch limited seats coupon code.`,
      updatedAt: '2026-05-15',
      author: 'Priya Iyer'
    }
  ]);

  const categories = ['All', 'SOPs', 'Counseling Frameworks', 'Webinar Scripts', 'Sales Scripts', 'Onboarding Guides', 'AI Instructions'];

  const filteredArticles = articles.filter(art => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = !searchQuery || art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    const newArt = {
      id: `art_${Date.now()}`,
      title: form.title,
      category: form.category,
      preview: form.content.slice(0, 100) + '...',
      content: form.content,
      updatedAt: new Date().toISOString().split('T')[0],
      author: 'Admin'
    };
    setArticles(prev => [newArt, ...prev]);
    setForm({ title: '', category: 'SOPs', content: '' });
    setShowAdd(false);
    showToast('Knowledge Base article created', 'success');
  };

  return (
    <AdminLayout title="Knowledge Base">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Operational Knowledge Base</h1>
          <p className="adm-page-subtitle">Central documentation repository for counseling playbooks, scripts, onboarding steps, and system SOPs</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setShowAdd(true)}>+ Add Article</button>
      </div>

      <div className="adm-kb-container">
        {/* Left categories sidebar */}
        <div className="adm-kb-sidebar adm-card">
          <h4 className="adm-detail-label" style={{ padding: '0 8px 12px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Categories</h4>
          <div className="adm-kb-categories-list">
            {categories.map(cat => (
              <button
                key={cat}
                className={`adm-kb-category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Center list + Right reader layout */}
        <div className="adm-kb-main">
          <div className="adm-kb-list-section">
            <div className="adm-search-wrap" style={{ marginBottom: 16 }}>
              <svg className="adm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                className="adm-search-input"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="adm-kb-articles-grid">
              {filteredArticles.map(art => (
                <div
                  key={art.id}
                  className={`adm-card adm-kb-article-card ${selectedArticle?.id === art.id ? 'active' : ''}`}
                  onClick={() => setSelectedArticle(art)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="adm-badge adm-badge-sm" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>{art.category}</span>
                    <span className="adm-td-sub" style={{ fontSize: '0.75rem' }}>{art.updatedAt}</span>
                  </div>
                  <h4 className="adm-kb-art-title" style={{ fontSize: '1rem', fontWeight: 600, color: '#e4e4e7' }}>{art.title}</h4>
                  <p className="adm-td-sub" style={{ fontSize: '0.85rem', marginTop: 8 }}>{art.preview}</p>
                </div>
              ))}
              {filteredArticles.length === 0 && <div className="adm-empty-state-full">No articles match search filters</div>}
            </div>
          </div>

          {/* Right reader panel */}
          <div className="adm-kb-reader-section adm-card">
            {selectedArticle ? (
              <div className="adm-kb-article-render">
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16, marginBottom: 20 }}>
                  <span className="adm-badge" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1', marginBottom: 12 }}>
                    {selectedArticle.category}
                  </span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>{selectedArticle.title}</h2>
                  <div className="adm-td-sub" style={{ fontSize: '0.8rem', marginTop: 8 }}>
                    Published by {selectedArticle.author} · Last updated {selectedArticle.updatedAt}
                  </div>
                </div>
                <div className="adm-kb-content-body" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.9rem', color: '#d1d5db' }}>
                  {selectedArticle.content}
                </div>
              </div>
            ) : (
              <div className="adm-kb-no-article">
                <span>📖</span>
                <h3>Select an article to read</h3>
                <p className="adm-td-sub">Playbooks and operational SOP instructions will render here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Article Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Create Documentation Article" size="lg">
        <form onSubmit={handleAdd} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Article Title *</label>
            <input className="adm-input" required value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g. Sales Playbook for Webinar Non-attendees" />
          </div>
          <div className="adm-form-group">
            <label>Category *</label>
            <select className="adm-select" value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}>
              {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="adm-form-group">
            <label>Content (supports markdown line spaces) *</label>
            <textarea
              className="adm-textarea"
              rows={12}
              required
              value={form.content}
              onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
              placeholder="### Header ... Write complete SOP content here."
            />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Publish Article</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
