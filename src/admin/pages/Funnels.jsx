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
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Funnel Analytics</h1>
          <p className="adm-page-subtitle">Track conversion drop-offs between Instagram impressions, webinar registrations, and counselor bookings</p>
        </div>
        <div className="adm-view-toggle">
          {['main', 'instagram', 'google'].map(t => (
            <button
              key={t}
              className={`adm-view-btn ${funnelType === t ? 'active' : ''}`}
              onClick={() => setFunnelType(t)}
              style={{ textTransform: 'capitalize' }}
            >
              {t} Funnel
            </button>
          ))}
        </div>
      </div>

      <div className="adm-funnel-container">
        {/* Funnel Graph Visualization */}
        <div className="adm-card adm-funnel-graph-card">
          <h3 className="adm-card-title" style={{ marginBottom: 20 }}>Visual Dropoff Funnel</h3>
          <div className="adm-funnel-bars-list">
            {activeFunnel.map((item, idx) => {
              // Width calculation relative to first step (100%)
              const relativeWidth = (item.count / activeFunnel[0].count) * 100;
              const nextStep = activeFunnel[idx + 1];
              const dropoff = nextStep ? Math.round((1 - (nextStep.count / item.count)) * 100) : 0;

              return (
                <div key={item.stage} className="adm-funnel-bar-wrapper">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 4 }}>
                    <span className="adm-td-name">{item.stage}</span>
                    <span>{item.count.toLocaleString()} ({Math.round(relativeWidth)}%)</span>
                  </div>
                  <div className="adm-funnel-bar-track">
                    <div
                      className="adm-funnel-bar-fill"
                      style={{
                        width: `${relativeWidth}%`,
                        background: `linear-gradient(90deg, #6366f1, #3b82f6)`
                      }}
                    />
                  </div>
                  <p className="adm-td-sub" style={{ fontSize: '0.75rem', marginTop: 2 }}>{item.label}</p>

                  {nextStep && (
                    <div className="adm-funnel-dropoff-alert">
                      <span>↓ Dropoff: {dropoff}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Funnel Insights Panel */}
        <div className="adm-card adm-funnel-insights-card">
          <h3 className="adm-card-title">EOS Funnel Audit</h3>
          <p className="adm-td-sub" style={{ margin: '8px 0 20px 0' }}>AI-generated diagnostic review of current conversion funnel stages.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="adm-alert adm-alert-warning" style={{ margin: 0 }}>
              <span>⚠️</span>
              <div>
                <strong>Top Dropoff Point:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem' }}>
                  85% of Landing Page visitors fail to register for webinars. Optimize page form count and heading copy to improve signups.
                </p>
              </div>
            </div>

            <div className="adm-alert adm-alert-success" style={{ margin: 0, background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.1)' }}>
              <span>🔥</span>
              <div>
                <strong>Strongest Conversion:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#a7f3d0' }}>
                  33% of counseling bookers convert to paid students. High counselor qualification rate ensures booking values.
                </p>
              </div>
            </div>

            <div className="adm-detail-section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
              <label className="adm-detail-label">Key Improvements Checklist</label>
              <ul style={{ paddingLeft: 20, margin: '8px 0 0 0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 8, color: '#e4e4e7' }}>
                <li>Implement 1-click WhatsApp quick registration.</li>
                <li>Add secondary parent-centric reviews on Landing Page.</li>
                <li>Shorten intake form fields from 8 fields down to 3 fields.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
