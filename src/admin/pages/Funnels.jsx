import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';

export default function Funnels() {
  const [funnelType, setFunnelType] = useState('main');
  const [funnelData, setFunnelData] = useState({
    main: [
      { stage: 'Instagram Reel Views', count: 10000, percentage: 100, label: 'Top-of-funnel impression outreach' },
      { stage: 'Landing Page Visit', count: 2800, percentage: 28, label: 'CTR landing traffic' },
      { stage: 'Webinar Registration', count: 420, percentage: 15, label: 'Form submission registration conversion' },
      { stage: 'WhatsApp Inquiry', count: 280, percentage: 66, label: 'WhatsApp lead validation inquiry response' },
      { stage: 'Counseling Booked', count: 84, percentage: 30, label: 'Scheduled counseling intake conversation' },
      { stage: 'Paid Conversion', count: 28, percentage: 33, label: 'Completed payment program signups' }
    ],
    instagram: [
      { stage: 'Organic Reel Views', count: 8500, percentage: 100, label: 'Reels outreach views' },
      { stage: 'Link Clicks', count: 1700, percentage: 20, label: 'Bio link clicks' },
      { stage: 'Webinar Signup', count: 220, percentage: 12.9, label: 'Webinar registers' },
      { stage: 'Counseling Intakes', count: 32, percentage: 14.5, label: 'Intakes Scheduled' },
      { stage: 'Paid conversions', count: 14, percentage: 43.7, label: 'Purchased mentors' }
    ],
    google: [
      { stage: 'Google search impressions', count: 15000, percentage: 100, label: 'Organic keywords' },
      { stage: 'SEO website clicks', count: 1200, percentage: 8, label: 'Organic CTR' },
      { stage: 'Counselling Queries', count: 110, percentage: 9.1, label: 'Contact submits' },
      { stage: 'Intakes Completed', count: 54, percentage: 49.0, label: 'Completed session calls' },
      { stage: 'Paid Conversions', count: 11, percentage: 20.3, label: 'Enrolled pupils' }
    ]
  });

  const activeFunnel = funnelData[funnelType];

  return (
    <AdminLayout title="Funnel Analytics">
      <div className="adm-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <h1 className="adm-page-title" style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 4px 0' }}>Funnel Analytics</h1>
          <p className="adm-page-subtitle" style={{ fontSize: '0.85rem', margin: 0 }}>
            Track conversion drop-offs between Instagram impressions, webinar registrations, and counselor bookings
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--adm-accent-dim)', padding: '4px', borderRadius: '8px', border: '1px solid var(--adm-border)' }}>
          {['main', 'instagram', 'google'].map(t => (
            <button
              key={t}
              onClick={() => setFunnelType(t)}
              style={{
                textTransform: 'capitalize',
                padding: '6px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600',
                transition: 'all 0.2s',
                background: funnelType === t ? 'var(--adm-accent)' : 'transparent',
                color: funnelType === t ? '#fff' : 'var(--adm-accent)'
              }}
            >
              {t} Funnel
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', alignItems: 'flex-start' }}>
        {/* Funnel Graph Visualization */}
        <div className="adm-card" style={{ padding: '24px', background: 'var(--adm-card)', borderRadius: '16px', border: '1px solid var(--adm-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 className="adm-card-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>Visual Dropoff Funnel</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)', background: 'var(--adm-accent-dim)', padding: '4px 10px', borderRadius: '20px' }}>
              Dynamic View
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%' }}>
            {activeFunnel.map((item, idx) => {
              const baseCount = activeFunnel[0].count;
              const relativeWidth = (item.count / baseCount) * 100;
              const nextStep = activeFunnel[idx + 1];
              const dropoff = nextStep ? Math.round((1 - (nextStep.count / item.count)) * 100) : 0;
              const lostCount = nextStep ? (item.count - nextStep.count) : 0;

              // Cascading Green-to-Gold premium gradients (Theme Matching)
              const colors = [
                'linear-gradient(135deg, #093024, #0f4c3a)', // Stage 1 (Deep Forest Green)
                'linear-gradient(135deg, #0f4c3a, #156b52)', // Stage 2 (Medium Forest Green)
                'linear-gradient(135deg, #156b52, #1b8768)', // Stage 3 (Emerald Green)
                'linear-gradient(135deg, #1b8768, #10b981)', // Stage 4 (Fresh Green)
                'linear-gradient(135deg, #10b981, #d97706)', // Stage 5 (Green to Gold transition)
                'linear-gradient(135deg, #d97706, #f59e0b)'  // Stage 6 (Warm Amber Gold)
              ];

              return (
                <div key={item.stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  
                  {/* Stage row block */}
                  <div 
                    style={{
                      width: `${Math.max(40, relativeWidth)}%`,
                      minWidth: '290px',
                      background: 'var(--adm-surface)',
                      border: '1px solid var(--adm-border)',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      boxShadow: 'var(--adm-shadow)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--adm-accent)';
                      e.currentTarget.style.boxShadow = 'var(--adm-shadow-lg)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--adm-border)';
                      e.currentTarget.style.boxShadow = 'var(--adm-shadow)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: colors[idx % colors.length]
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{
                            background: colors[idx % colors.length],
                            color: '#fff',
                            fontSize: '9px',
                            fontWeight: '800',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            letterSpacing: '0.5px'
                          }}>
                            STAGE {idx + 1}
                          </span>
                          <h4 style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem', color: 'var(--adm-text)' }}>
                            {item.stage}
                          </h4>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--adm-text-secondary)' }}>{item.label}</p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--adm-text)' }}>
                          {item.count.toLocaleString()}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--adm-accent)', fontWeight: '700' }}>
                          {idx === 0 ? '100% Traffic' : `${Math.round((item.count / activeFunnel[idx-1].count) * 100)}% conv`}
                        </span>
                      </div>
                    </div>

                    <div style={{ background: 'var(--adm-border-light)', height: '5px', borderRadius: '4px', marginTop: '12px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${relativeWidth}%`,
                        background: colors[idx % colors.length],
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>

                  {nextStep && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: '10px 0',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <div style={{
                        height: '20px',
                        width: '2px',
                        borderLeft: '2px dashed var(--adm-red-dim)'
                      }} />
                      
                      <div style={{
                        background: 'var(--adm-red-dim)',
                        border: '1px solid rgba(225, 29, 72, 0.15)',
                        borderRadius: '30px',
                        padding: '4px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        color: 'var(--adm-red)',
                        boxShadow: 'var(--adm-shadow)'
                      }}>
                        <span>🔻 Drop-off: {dropoff}%</span>
                        <span style={{ color: 'var(--adm-border)' }}>|</span>
                        <span>-{lostCount.toLocaleString()} lost</span>
                      </div>

                      <div style={{
                        height: '20px',
                        width: '2px',
                        borderLeft: '2px dashed var(--adm-red-dim)'
                      }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Funnel Insights Panel */}
        <div className="adm-card" style={{ padding: '24px', background: 'var(--adm-card)', borderRadius: '16px', border: '1px solid var(--adm-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.2rem' }}>✨</span>
            <h3 className="adm-card-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>EOS Funnel Audit</h3>
          </div>
          <p className="adm-td-sub" style={{ margin: '0 0 20px 0', fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
            AI-generated diagnostic review of current conversion funnel stages.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{
              background: 'var(--adm-red-dim)',
              border: '1px solid rgba(225, 29, 72, 0.15)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '1.1rem', marginTop: '-2px' }}>⚠️</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--adm-red)', fontWeight: '700', marginBottom: '4px' }}>
                  Critical Bottleneck Detected
                </strong>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--adm-text)', lineHeight: '1.4' }}>
                  {funnelType === 'main' && "85% of Landing Page visitors fail to register for webinars. Optimize page form count and heading copy to improve signups."}
                  {funnelType === 'instagram' && "80% drop-off between Bio Link clicks and Webinar signups. Check if landing page loading speed is slow on mobile devices."}
                  {funnelType === 'google' && "92% drop-off from Search impressions to website clicks. Revamp metadata descriptions and target search query intent."}
                </p>
              </div>
            </div>

            <div style={{
              background: 'var(--adm-green-dim)',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '1.1rem', marginTop: '-2px' }}>🔥</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--adm-green)', fontWeight: '700', marginBottom: '4px' }}>
                  High Conversion Highlight
                </strong>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--adm-text)', lineHeight: '1.4' }}>
                  {funnelType === 'main' && "33% of counseling bookers convert to paid students. High counselor qualification rate ensures booking values."}
                  {funnelType === 'instagram' && "43.7% of counselor leads convert to paid memberships. Organic outreach brings highly motivated leads."}
                  {funnelType === 'google' && "49% conversion rate from inquiries to completed calls. Search engine intent shows immediate purchase urgency."}
                </p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--adm-border)', paddingTop: '20px', marginTop: '4px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--adm-text)', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Key Improvements Checklist
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  "Implement 1-click WhatsApp quick registration.",
                  "Add secondary parent-centric testimonials on Landing Page.",
                  "Shorten intake form fields from 8 fields down to 3 fields."
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: 'var(--adm-accent)', fontSize: '0.8rem', marginTop: '1px' }}>✓</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--adm-text)', lineHeight: '1.4' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
