import React, { useState, useCallback } from 'react';
import AdminLayout from '../components/layout/AdminLayout';

const INSIGHTS = [
  {
    id: 1,
    category: 'Leads',
    title: 'Conversion Rate Drop Detected',
    text: 'Leads are converting at 3.2%, down from 4.8% last month — a 33% decline. Root cause analysis shows follow-up messages are delayed by an average of 3.2 days after initial inquiry, compared to the optimal window of <6 hours.',
    impact: 'High',
    action: 'Take Action',
    confidence: 94,
  },
  {
    id: 2,
    category: 'Revenue',
    title: 'Webinar Revenue Opportunity',
    text: '28 leads registered for the last webinar but did not attend. Historical data shows a targeted replay campaign converts 8–12 of these leads within 48 hours. Expected revenue impact: ₹56,000–₹84,000.',
    impact: 'High',
    action: 'Take Action',
    confidence: 87,
  },
  {
    id: 3,
    category: 'Content',
    title: 'Top Performing Hook Identified',
    text: 'The hook "What if you chose the wrong career?" is generating 3.2x more qualified leads than any other content hook this quarter. Reels using this hook average 92k views vs 28k for others.',
    impact: 'Medium',
    action: 'View Details',
    confidence: 91,
  },
  {
    id: 4,
    category: 'Operations',
    title: 'Counselor Capacity Warning',
    text: 'Your top counselor is at 94% capacity with 47 active leads. Performance data shows counselor quality drops above 85% load. Redistributing 5 leads to available team members could prevent 2–3 lost conversions.',
    impact: 'High',
    action: 'Take Action',
    confidence: 89,
  },
  {
    id: 5,
    category: 'Leads',
    title: 'Instagram Source Quality Rising',
    text: 'Instagram-sourced leads are showing 2.1x higher conversion rates compared to Google Ads leads this month (6.8% vs 3.2%). Cost per acquisition from Instagram is also 38% lower at ₹412 vs ₹663.',
    impact: 'Medium',
    action: 'View Details',
    confidence: 85,
  },
  {
    id: 6,
    category: 'Content',
    title: 'Posting Frequency Dip',
    text: 'Content output has dropped 40% over the last 2 weeks (from 5 posts/week to 3). Engagement metrics are already falling — reach down 28% and story views down 34%. Algorithm favorability is at risk.',
    impact: 'Medium',
    action: 'Take Action',
    confidence: 96,
  },
  {
    id: 7,
    category: 'Revenue',
    title: 'High Value Lead Cluster',
    text: '8 leads from Mumbai with lead scores of 8+ have not been contacted in 5 or more days. Based on historical patterns, leads with score 8+ contacted within 24 hours close at 41%. Current risk: cold leads losing interest.',
    impact: 'Medium',
    action: 'Take Action',
    confidence: 88,
  },
  {
    id: 8,
    category: 'Operations',
    title: 'Session Cancellation Pattern',
    text: 'Analysis of 3 months of session data reveals a 23% cancellation rate specifically for Monday morning slots (before 10 AM). This compares to a 7% average cancellation rate for other slots. Recommend removing Monday AM availability.',
    impact: 'Low',
    action: 'View Details',
    confidence: 92,
  },
  {
    id: 9,
    category: 'Leads',
    title: 'WhatsApp Response Time',
    text: 'Average first-response time to WhatsApp leads is 4.2 hours. Industry benchmark for career counseling is under 1 hour. Data shows leads responded to within 30 minutes convert at 2.8x the rate of those responded to after 2 hours.',
    impact: 'High',
    action: 'Take Action',
    confidence: 97,
  },
  {
    id: 10,
    category: 'Content',
    title: 'Viral Content Window',
    text: 'Engineering career content (B.Tech, M.Tech, job market) is performing 4x better than all other categories this month — driven by JEE results season. This window typically lasts 6–8 weeks. Increasing output now maximizes reach.',
    impact: 'High',
    action: 'Take Action',
    confidence: 90,
  },
  {
    id: 11,
    category: 'Revenue',
    title: 'Revenue Concentration Risk',
    text: '62% of total revenue this quarter came from just 3 webinars. If any one of these formats underperforms next quarter, revenue could drop by 20–30%. Recommendation: diversify with 1:1 sessions and group coaching packages.',
    impact: 'High',
    action: 'View Details',
    confidence: 83,
  },
  {
    id: 12,
    category: 'Operations',
    title: 'Follow-up Automation Opportunity',
    text: '15 leads are currently sitting in "Follow-up Required" status with no scheduled action. Manual follow-up compliance rate is 68%. Implementing an automated reminder sequence could increase follow-up compliance to 95%+ and recover 4–6 stalled leads.',
    impact: 'Medium',
    action: 'Take Action',
    confidence: 86,
  },
];

const TABS = ['All', 'Leads', 'Revenue', 'Content', 'Operations'];

const CATEGORY_COLORS = {
  Leads: { bg: 'var(--adm-accent-dim)', color: 'var(--adm-accent)' },
  Revenue: { bg: 'var(--adm-green-dim)', color: 'var(--adm-green)' },
  Content: { bg: 'var(--adm-amber-dim)', color: 'var(--adm-amber)' },
  Operations: { bg: 'var(--adm-blue-dim)', color: 'var(--adm-blue)' },
};

const IMPACT_COLORS = {
  High: { bg: 'var(--adm-red-dim)', color: 'var(--adm-red)' },
  Medium: { bg: 'var(--adm-amber-dim)', color: 'var(--adm-amber)' },
  Low: { bg: 'var(--adm-green-dim)', color: 'var(--adm-green)' },
};

function InsightCard({ insight, onAction }) {
  const catStyle = CATEGORY_COLORS[insight.category] || {};
  const impStyle = IMPACT_COLORS[insight.impact] || {};
  const confColor =
    insight.confidence >= 90
      ? 'var(--adm-green)'
      : insight.confidence >= 75
      ? 'var(--adm-amber)'
      : 'var(--adm-red)';

  return (
    <div className="adm-insight-card">
      <div className="adm-insight-card-header">
        <span
          className="adm-insight-cat-badge"
          style={{ background: catStyle.bg, color: catStyle.color }}
        >
          {insight.category}
        </span>
        <span
          className="adm-insight-impact-badge"
          style={{ background: impStyle.bg, color: impStyle.color }}
        >
          {insight.impact} Impact
        </span>
      </div>
      <h3 className="adm-insight-title">{insight.title}</h3>
      <p className="adm-insight-text">{insight.text}</p>
      <div className="adm-insight-card-footer">
        <span className="adm-insight-confidence" style={{ color: confColor }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4, verticalAlign: 'middle' }}>
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          {insight.confidence}% confidence
        </span>
        <button
          className="adm-insight-action-btn"
          onClick={() => onAction(insight)}
          style={{
            background: insight.action === 'Take Action' ? 'var(--adm-accent)' : 'var(--adm-card-hover)',
            color: insight.action === 'Take Action' ? '#fff' : 'var(--adm-text)',
          }}
        >
          {insight.action}
        </button>
      </div>
    </div>
  );
}

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState('All');
  const [lastUpdated] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  });
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = activeTab === 'All' ? INSIGHTS : INSIGHTS.filter(i => i.category === activeTab);

  const countByTab = useCallback((tab) => {
    if (tab === 'All') return INSIGHTS.length;
    return INSIGHTS.filter(i => i.category === tab).length;
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('Insights refreshed successfully', 'success');
    }, 1800);
  };

  const handleAction = (insight) => {
    showToast(`Action triggered for: ${insight.title}`, 'info');
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const highCount = INSIGHTS.filter(i => i.impact === 'High').length;
  const medCount = INSIGHTS.filter(i => i.impact === 'Medium').length;
  const lowCount = INSIGHTS.filter(i => i.impact === 'Low').length;

  return (
    <AdminLayout>
      <style>{`
        .adm-ai-page { padding: 28px 32px; min-height: 100vh; }
        .adm-ai-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; gap: 16px; flex-wrap: wrap; }
        .adm-ai-header-left h1 { font-size: 26px; font-weight: 700; color: var(--adm-text); margin: 0 0 4px; }
        .adm-ai-header-left p { font-size: 13px; color: var(--adm-text-secondary); margin: 0; }
        .adm-ai-header-right { display: flex; align-items: center; gap: 12px; }
        .adm-refresh-btn { display: flex; align-items: center; gap: 8px; padding: 9px 18px; background: var(--adm-accent); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .adm-refresh-btn:hover { background: var(--adm-accent-hover); }
        .adm-refresh-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .adm-refresh-btn svg { transition: transform 0.8s; }
        .adm-refresh-btn.spinning svg { animation: admSpin 1s linear infinite; }
        @keyframes admSpin { 100% { transform: rotate(360deg); } }

        .adm-ai-summary-bar { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
        .adm-ai-summary-pill { display: flex; align-items: center; gap: 8px; padding: 10px 18px; background: var(--adm-card); border: 1px solid var(--adm-border); border-radius: 10px; font-size: 13px; }
        .adm-ai-summary-pill .adm-pill-dot { width: 10px; height: 10px; border-radius: 50%; }
        .adm-ai-summary-pill span { color: var(--adm-text-secondary); }
        .adm-ai-summary-pill strong { color: var(--adm-text); }

        .adm-ai-tabs { display: flex; gap: 4px; background: var(--adm-card); border: 1px solid var(--adm-border); border-radius: 10px; padding: 4px; margin-bottom: 28px; width: fit-content; }
        .adm-ai-tab { padding: 8px 18px; border: none; border-radius: 7px; background: transparent; color: var(--adm-text-secondary); font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.18s; display: flex; align-items: center; gap: 6px; }
        .adm-ai-tab:hover { color: var(--adm-text); background: var(--adm-card-hover); }
        .adm-ai-tab.active { background: var(--adm-accent); color: #fff; }
        .adm-ai-tab .adm-tab-count { background: rgba(255,255,255,0.2); border-radius: 10px; padding: 1px 7px; font-size: 11px; font-weight: 600; }
        .adm-ai-tab:not(.active) .adm-tab-count { background: var(--adm-card-hover); color: var(--adm-text-secondary); }

        .adm-insights-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px; }

        .adm-insight-card { background: var(--adm-card); border: 1px solid var(--adm-border); border-radius: 14px; padding: 22px; display: flex; flex-direction: column; gap: 12px; transition: border-color 0.2s, transform 0.15s; }
        .adm-insight-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-1px); }
        .adm-insight-card-header { display: flex; align-items: center; justify-content: space-between; }
        .adm-insight-cat-badge, .adm-insight-impact-badge { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.03em; }
        .adm-insight-title { font-size: 16px; font-weight: 700; color: var(--adm-text); margin: 0; line-height: 1.35; }
        .adm-insight-text { font-size: 13.5px; color: var(--adm-text-secondary); line-height: 1.65; margin: 0; flex: 1; }
        .adm-insight-card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
        .adm-insight-confidence { font-size: 12px; font-weight: 600; display: flex; align-items: center; }
        .adm-insight-action-btn { padding: 7px 16px; border: none; border-radius: 7px; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.15s; }
        .adm-insight-action-btn:hover { opacity: 0.85; }

        .adm-toast { position: fixed; bottom: 28px; right: 28px; padding: 12px 20px; border-radius: 10px; font-size: 14px; font-weight: 500; z-index: 9999; animation: admSlideUp 0.25s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .adm-toast.success { background: var(--adm-green); color: #fff; }
        .adm-toast.info { background: var(--adm-accent); color: #fff; }
        @keyframes admSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .adm-no-insights { text-align: center; padding: 60px 24px; color: var(--adm-text-secondary); grid-column: 1/-1; }
        .adm-no-insights svg { margin-bottom: 12px; opacity: 0.4; }
      `}</style>

      <div className="adm-ai-page">
        {/* Header */}
        <div className="adm-ai-header">
          <div className="adm-ai-header-left">
            <h1>AI Insights</h1>
            <p>Powered by EOS AI · Last updated at {lastUpdated}</p>
          </div>
          <div className="adm-ai-header-right">
            <button
              className={`adm-refresh-btn${refreshing ? ' spinning' : ''}`}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              {refreshing ? 'Refreshing…' : 'Refresh Insights'}
            </button>
          </div>
        </div>

        {/* Summary Pills */}
        <div className="adm-ai-summary-bar">
          <div className="adm-ai-summary-pill">
            <div className="adm-pill-dot" style={{ background: 'var(--adm-accent)' }} />
            <span>Total Insights:</span>
            <strong>{INSIGHTS.length}</strong>
          </div>
          <div className="adm-ai-summary-pill">
            <div className="adm-pill-dot" style={{ background: 'var(--adm-red)' }} />
            <span>High Impact:</span>
            <strong style={{ color: 'var(--adm-red)' }}>{highCount}</strong>
          </div>
          <div className="adm-ai-summary-pill">
            <div className="adm-pill-dot" style={{ background: 'var(--adm-amber)' }} />
            <span>Medium Impact:</span>
            <strong style={{ color: 'var(--adm-amber)' }}>{medCount}</strong>
          </div>
          <div className="adm-ai-summary-pill">
            <div className="adm-pill-dot" style={{ background: 'var(--adm-green)' }} />
            <span>Low Impact:</span>
            <strong style={{ color: 'var(--adm-green)' }}>{lowCount}</strong>
          </div>
        </div>

        {/* Tabs */}
        <div className="adm-ai-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`adm-ai-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className="adm-tab-count">{countByTab(tab)}</span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="adm-insights-grid">
          {filtered.length === 0 ? (
            <div className="adm-no-insights">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>No insights in this category.</p>
            </div>
          ) : (
            filtered.map(insight => (
              <InsightCard key={insight.id} insight={insight} onAction={handleAction} />
            ))
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`adm-toast ${toast.type}`}>{toast.msg}</div>
      )}
    </AdminLayout>
  );
}
