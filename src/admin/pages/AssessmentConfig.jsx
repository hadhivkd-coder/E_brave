import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { ASSESSMENT_SECTIONS, QUESTION_BANK, ARCHETYPES, CAREER_CLUSTERS } from '../data/assessmentConfig';

export default function AssessmentConfig() {
  return (
    <AdminLayout title="Assessment Configuration Engine">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 className="adm-page-title" style={{ margin: '0 0 4px 0' }}>Intelligence Engine</h1>
          <p className="adm-page-subtitle" style={{ margin: 0 }}>Configure the core logic, questions, archetypes, and career mappings.</p>
        </div>
        <button className="adm-btn adm-btn-primary">Publish Updates</button>
      </div>

      <div style={{ background: 'rgba(217,119,6,0.07)', border: '1px solid rgba(217,119,6,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.1rem' }}>⚠️</span>
        <span style={{ fontSize: '0.84rem', color: '#92400e', fontWeight: 600 }}>
          <strong>PLACEHOLDER MODE:</strong> The current data is structural only. Awaiting final E-Brave Assessment logic injection.
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        
        {/* Sections */}
        <div className="adm-card" style={{ padding: 24, border: '1px solid var(--adm-border)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>The Six Labs</h3>
          <ul style={{ paddingLeft: 20, color: 'var(--adm-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {ASSESSMENT_SECTIONS.map(s => <li key={s.id}><strong>{s.title}</strong> - {s.description}</li>)}
          </ul>
          <button className="adm-btn adm-btn-ghost" style={{ marginTop: 16, width: '100%' }}>Edit Labs</button>
        </div>

        {/* Archetypes */}
        <div className="adm-card" style={{ padding: 24, border: '1px solid var(--adm-border)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Archetypes ({ARCHETYPES.length})</h3>
          <ul style={{ paddingLeft: 20, color: 'var(--adm-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {ARCHETYPES.map(a => <li key={a.id}><strong>{a.name}</strong></li>)}
          </ul>
          <button className="adm-btn adm-btn-ghost" style={{ marginTop: 16, width: '100%' }}>Edit Thresholds</button>
        </div>

        {/* Questions */}
        <div className="adm-card" style={{ padding: 24, border: '1px solid var(--adm-border)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Question Bank ({QUESTION_BANK.length}/100)</h3>
          <p style={{ color: 'var(--adm-text-secondary)', fontSize: '0.85rem', marginBottom: 16 }}>
            Manage the 100 questions, multiple choice options, and underlying trait scoring weights.
          </p>
          <button className="adm-btn adm-btn-ghost" style={{ width: '100%' }}>Manage Question Bank</button>
        </div>

        {/* Careers */}
        <div className="adm-card" style={{ padding: 24, border: '1px solid var(--adm-border)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Career Matrix ({CAREER_CLUSTERS.length} clusters)</h3>
          <p style={{ color: 'var(--adm-text-secondary)', fontSize: '0.85rem', marginBottom: 16 }}>
            Configure exactly which archetypes and trait scores map to which professional careers and pathways.
          </p>
          <button className="adm-btn adm-btn-ghost" style={{ width: '100%' }}>Edit Matrix</button>
        </div>

      </div>
    </AdminLayout>
  );
}
