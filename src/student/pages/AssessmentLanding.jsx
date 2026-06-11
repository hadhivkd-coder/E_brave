import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AssessmentLanding() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--adm-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: 800, width: '100%', background: 'var(--adm-card)', border: '1px solid var(--adm-border)', borderRadius: 16, padding: '40px', textAlign: 'center' }}>
        
        {/* Brand Header */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(99,102,241,0.08)', padding: '8px 16px', borderRadius: 30, color: 'var(--adm-accent)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 20 }}>
          <span style={{ fontSize: '1.2rem' }}>✨</span> E-Brave Career Discovery
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--adm-text)', marginBottom: '16px', lineHeight: 1.2 }}>
          Discover Your True <span style={{ color: 'var(--adm-accent)' }}>Archetype</span>
        </h1>
        
        <p style={{ fontSize: '1.1rem', color: 'var(--adm-text-secondary)', lineHeight: 1.6, marginBottom: '40px', maxWidth: 600, margin: '0 auto 40px auto' }}>
          This is not a traditional test. The E-Brave AI engine analyzes your underlying interests, personality traits, and problem-solving styles across six intelligence labs to map your perfect career pathway.
        </p>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px', textAlign: 'left' }}>
          {[
            { icon: '🧠', title: '6 Intelligence Labs', desc: 'Deep psychometric profiling.' },
            { icon: '⚡', title: 'AI Matching', desc: 'Maps your traits to 100+ careers.' },
            { icon: '⏱️', title: '25 Minutes', desc: 'Fast, engaging, and accurate.' }
          ].map((f, i) => (
            <div key={i} style={{ background: 'var(--adm-bg)', padding: '20px', borderRadius: 12, border: '1px solid var(--adm-border)' }}>
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--adm-text)', marginBottom: 4 }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/student/assessment/info')}
          className="adm-btn adm-btn-primary" 
          style={{ padding: '16px 40px', fontSize: '1.2rem', borderRadius: 30, display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 25px rgba(99,102,241,0.3)' }}
        >
          Begin Assessment <span style={{ fontSize: '1.4rem' }}>→</span>
        </button>

        <div style={{ marginTop: 20, fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
          100% Private &amp; Secure. Your data is never shared.
        </div>
      </div>
    </div>
  );
}
