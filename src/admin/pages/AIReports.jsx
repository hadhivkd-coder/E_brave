import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';

// ─── Report Data ──────────────────────────────────────────────────────────────

const REPORTS = {
  weekly: {
    id: 'weekly',
    label: 'Weekly Summary',
    title: 'Weekly Business Summary Report',
    dateRange: '12 May 2026 – 18 May 2026',
    summary:
      'This week demonstrated solid momentum in lead acquisition with a notable uptick from Instagram channels. Webinar attendance reached a 3-month high, and revenue collections exceeded the weekly target by 14%. Counselor utilisation remained healthy at 76% capacity overall, though distribution across the team remains uneven — an area flagged for immediate action.',
    metrics: [
      { label: 'New Leads', value: '47', change: '+12%', up: true },
      { label: 'Sessions Held', value: '38', change: '+8%', up: true },
      { label: 'Revenue Collected', value: '₹2,84,000', change: '+14%', up: true },
      { label: 'Conversion Rate', value: '3.8%', change: '-0.4%', up: false },
      { label: 'Webinar Attendees', value: '213', change: '+31%', up: true },
      { label: 'Avg Response Time', value: '3.1 hrs', change: '+0.8 hrs', up: false },
    ],
    findings: [
      'Instagram reels contributed 58% of all new leads this week, up from 41% the previous week.',
      'The "Engineering Career 2025" campaign delivered a CPL of ₹535, outperforming the ₹700 target.',
      '3 leads crossed the score threshold of 9+ and should be prioritised for immediate counselor contact.',
      'Monday morning session cancellations spiked to 31%, above the 23% monthly average.',
      'Content output dipped mid-week — only 3 posts published vs the 5-post weekly target.',
      'WhatsApp inquiry volume rose 22%, but average first-response time worsened to 4.2 hours.',
    ],
    recommendations: [
      'Reassign 5–7 leads from the overloaded counselor to distribute workload evenly.',
      'Launch a replay email campaign to the 28 no-show webinar registrants within 48 hours.',
      'Remove Monday AM slots or introduce a buffer confirmation system to reduce cancellations.',
      'Schedule a content batch session to replenish the social media pipeline for the coming week.',
    ],
    nextSteps: [
      'Review and approve lead redistribution plan by Wednesday.',
      'Send webinar replay link to non-attendees by Tuesday 10 AM.',
      'A/B test two new content hooks on Instagram Thursday–Friday.',
    ],
  },
  leadquality: {
    id: 'leadquality',
    label: 'Lead Quality Report',
    title: 'Lead Quality & Segmentation Report',
    dateRange: '1 May 2026 – 18 May 2026',
    summary:
      'Lead quality has shown a diverging trend across acquisition channels. Instagram-sourced leads demonstrate significantly higher intent scores and conversion rates compared to Google Ads and organic traffic. A total of 142 leads were analysed across 6 sources, with average lead scores ranging from 4.1 (Google Ads) to 7.9 (Instagram Reels). The pipeline currently holds 38 high-quality leads (score ≥7) that require priority engagement.',
    metrics: [
      { label: 'Total Leads Analysed', value: '142', change: 'May 2026', up: null },
      { label: 'Avg Lead Score', value: '6.3/10', change: '+0.7 vs Apr', up: true },
      { label: 'High Quality (≥7)', value: '38', change: '26.7%', up: null },
      { label: 'Insta Conversion Rate', value: '6.8%', change: '2.1x Google', up: true },
      { label: 'Google Ads Conv. Rate', value: '3.2%', change: '-0.6% MoM', up: false },
      { label: 'Uncontacted (Score ≥8)', value: '8 leads', change: '5+ days idle', up: false },
    ],
    findings: [
      'Instagram Reels leads score 7.9/10 avg — highest of any channel. 34% convert to paid clients.',
      'Google Ads leads average 4.1/10 and convert at 3.2%, with a CPL of ₹663 vs ₹412 for Instagram.',
      '8 leads from Mumbai with scores ≥8 have not been contacted in 5+ days — highest risk cluster.',
      'WhatsApp organic leads (score avg 6.8) respond fastest and have highest satisfaction scores.',
      'Referral leads: only 12 this month but 50% conversion — the highest of all channels.',
      'Form-fill completeness is 73% — 27% of leads are missing phone number or city, reducing segmentation accuracy.',
    ],
    recommendations: [
      'Reallocate 20% of Google Ads budget to Instagram to improve blended CPL.',
      'Immediately contact the 8 high-score Mumbai leads with a personalised outreach message.',
      'Add mandatory phone field to all landing page forms to improve contact rate.',
      'Create a referral incentive programme to scale the highest-converting channel.',
    ],
    nextSteps: [
      'Update landing page forms to require phone + city fields.',
      'Assign Mumbai leads cluster to senior counselor by end of day.',
      'Present channel budget reallocation proposal at next team meeting.',
    ],
  },
  webinar: {
    id: 'webinar',
    label: 'Webinar ROI',
    title: 'Webinar ROI & Performance Report',
    dateRange: '1 April 2026 – 18 May 2026',
    summary:
      'Over the past 6 weeks, 4 webinars were conducted with a total attendance of 847 participants. Gross revenue directly attributable to webinars stands at ₹7,12,000. The best-performing webinar was "Engineering Career Roadmap 2025" with a 34% lead-to-enrolment conversion. However, revenue concentration in webinars remains a risk — 62% of total monthly revenue is webinar-dependent.',
    metrics: [
      { label: 'Webinars Conducted', value: '4', change: 'Apr–May 2026', up: null },
      { label: 'Total Registrations', value: '1,124', change: '+38% vs Q1', up: true },
      { label: 'Avg Attendance Rate', value: '75.3%', change: '+5.1%', up: true },
      { label: 'Webinar Revenue', value: '₹7,12,000', change: '62% of total', up: null },
      { label: 'Best Conv. Rate', value: '34%', change: 'Engineering', up: true },
      { label: 'No-Show Rate', value: '24.7%', change: '278 missed', up: false },
    ],
    findings: [
      '"Engineering Career Roadmap 2025" generated ₹2,80,000 with 34% post-webinar conversion — best ever.',
      '"Medical Career Guidance" had highest registrations (312) but only 21% conversion due to vague CTA.',
      '278 registrants across all 4 webinars did not attend — representing ₹1.5L+ in potential revenue.',
      'Average post-webinar follow-up time is 28 hours — benchmark leaders follow up within 2 hours.',
      'Replay views account for 18% of total conversions — a significant and underutilised channel.',
      'Free webinars convert at 18.4% vs paid webinars at 9.2% — free format has 2x better ROI.',
    ],
    recommendations: [
      'Send replay links to all 278 no-show registrants within 48 hours with a time-limited offer.',
      'Reduce post-webinar follow-up SLA from 28 hours to under 2 hours.',
      'Add clearer CTA and outcome guarantee to "Medical Career" format to lift conversions.',
      'Diversify from webinar-heavy revenue by launching 3 group coaching cohorts by July.',
    ],
    nextSteps: [
      'Draft replay campaign email sequence (3-email) and schedule immediately.',
      'Define and enforce 2-hour post-webinar follow-up policy with counseling team.',
      'Design group coaching package and pricing by next week.',
    ],
  },
  content: {
    id: 'content',
    label: 'Content Performance',
    title: 'Content Performance Report',
    dateRange: '1 May 2026 – 18 May 2026',
    summary:
      'Content performance this month has been defined by two contrasting trends: exceptional engagement on engineering-focused reels, and a notable drop in posting frequency mid-month. The top reel reached 148,000 views and directly generated 23 qualified leads. However, the overall output fell to 3 posts/week in the second half of May, threatening to erode algorithmic favour. Engineering career content continues to outperform all other categories by a factor of 4x.',
    metrics: [
      { label: 'Posts Published', value: '22', change: '-18% vs Apr', up: false },
      { label: 'Total Reach', value: '4,82,000', change: '+29%', up: true },
      { label: 'Top Reel Views', value: '1,48,000', change: 'Engineering', up: true },
      { label: 'Leads from Content', value: '63', change: '44% of total', up: true },
      { label: 'Avg Engagement Rate', value: '8.3%', change: '+1.1%', up: true },
      { label: 'Content→Lead Conv.', value: '1.3%', change: '+0.4%', up: true },
    ],
    findings: [
      '"What if you chose the wrong career?" hook used in 3 reels — all 3 in top 5 performers this month.',
      'Engineering category reels average 92k views vs 28k for other categories — 3.2x differential.',
      'Story engagement declined 34% in week 3 — correlates with posting frequency drop.',
      'Carousel posts generate 2.1x more saves and shares than single-image posts.',
      'Reels posted between 7–9 PM IST receive 41% more reach than other time slots.',
      'Call-to-action "Comment GUIDE" outperforms "DM us" by 2.8x in lead capture rate.',
    ],
    recommendations: [
      'Produce 6–8 additional engineering career reels in the next 2 weeks to capitalise on JEE season.',
      'Standardise posting time to 7–9 PM IST for all reels.',
      'Replace "DM us" CTAs with "Comment GUIDE" across all new posts.',
      'Batch-create 10 carousel posts on medical, design, and commerce career paths.',
    ],
    nextSteps: [
      'Block 2-day content creation sprint this week with existing team.',
      'Update content calendar template with engineering-first priority slots.',
      'A/B test 2 new hook variations on Friday reel.',
    ],
  },
  financial: {
    id: 'financial',
    label: 'Financial Summary',
    title: 'Financial Performance Report',
    dateRange: '1 May 2026 – 18 May 2026',
    summary:
      'May 2026 (partial) shows strong revenue performance with ₹8,94,000 collected in the first 18 days — projecting to a full-month total of ₹14,90,000, which would represent a 22% increase over April. Gross margins remain healthy at 68%. Accounts receivable stands at ₹1,84,000 across 7 clients. Cost per acquisition blended is ₹548, within target range.',
    metrics: [
      { label: 'Revenue (MTD)', value: '₹8,94,000', change: 'On track +22%', up: true },
      { label: 'Projected Month Total', value: '₹14,90,000', change: 'vs ₹12,20,000 Apr', up: true },
      { label: 'Gross Margin', value: '68%', change: '+2% vs Apr', up: true },
      { label: 'Ad Spend (MTD)', value: '₹45,000', change: '5% of revenue', up: null },
      { label: 'Accounts Receivable', value: '₹1,84,000', change: '7 clients', up: false },
      { label: 'Blended CPA', value: '₹548', change: 'Target: ₹600', up: true },
    ],
    findings: [
      'Top revenue source: webinars (62%, ₹5,54,000) — above healthy diversification threshold.',
      'One-on-one counseling sessions contributed ₹2,12,000 — growth of 18% over April.',
      '₹1,84,000 in outstanding receivables; 3 accounts are 14+ days overdue.',
      'Ad spend ROI is 19.9x (₹45,000 spend → ₹8,94,000 revenue) — exceptional performance.',
      'Content costs (₹18,000/month) generate 44% of leads — highest efficiency channel.',
      'Operational costs increased 7% due to additional counselor onboarding in week 2.',
    ],
    recommendations: [
      'Initiate collections follow-up for the 3 overdue accounts (14+ days) by end of week.',
      'Cap webinar revenue dependency by launching 2 additional revenue streams before June.',
      'Maintain ad spend at current levels — ROI is exceptional; scaling 20% could yield ₹2L+ additional revenue.',
      'Review operational cost increase and optimise onboarding process for efficiency.',
    ],
    nextSteps: [
      'Send overdue invoice reminders with payment links by Thursday.',
      'Prepare Q2 revenue diversification roadmap for team review.',
      'Model incremental ad spend scenarios for June budget planning.',
    ],
  },
};

const TAB_KEYS = ['weekly', 'leadquality', 'webinar', 'content', 'financial'];

const HISTORY = [
  { id: 'h1', type: 'Weekly Summary', date: '12 May 2026', size: '284 KB' },
  { id: 'h2', type: 'Lead Quality Report', date: '5 May 2026', size: '198 KB' },
  { id: 'h3', type: 'Financial Summary', date: '30 Apr 2026', size: '312 KB' },
  { id: 'h4', type: 'Webinar ROI', date: '28 Apr 2026', size: '247 KB' },
  { id: 'h5', type: 'Weekly Summary', date: '26 Apr 2026', size: '271 KB' },
  { id: 'h6', type: 'Content Performance', date: '20 Apr 2026', size: '189 KB' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AIReports() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [toast, setToast] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [schedule, setSchedule] = useState({ frequency: 'Weekly', emails: '', day: 'Monday' });

  const report = REPORTS[activeTab];

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleDownload = () => {
    showToast(`PDF download started for: ${report.title}`, 'success');
  };

  const handleGenerate = () => {
    showToast('Generating new report… This may take a moment.', 'info');
  };

  const handleScheduleSave = () => {
    if (!schedule.emails.trim()) {
      showToast('Please enter at least one email address.', 'error');
      return;
    }
    setShowScheduleModal(false);
    showToast(`Report scheduled ${schedule.frequency} to ${schedule.emails}`, 'success');
  };

  return (
    <AdminLayout>
      <style>{`
        .adm-reports-page { padding: 28px 32px; min-height: 100vh; }
        .adm-reports-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; gap: 12px; flex-wrap: wrap; }
        .adm-reports-header h1 { font-size: 26px; font-weight: 700; color: var(--adm-text); margin: 0 0 4px; }
        .adm-reports-header p { font-size: 13px; color: var(--adm-text-secondary); margin: 0; }
        .adm-reports-header-actions { display: flex; gap: 10px; align-items: center; }
        .adm-rep-btn-primary { padding: 9px 18px; background: var(--adm-accent); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .adm-rep-btn-primary:hover { background: var(--adm-accent-hover); }
        .adm-rep-btn-ghost { padding: 9px 18px; background: var(--adm-card); color: var(--adm-text); border: 1px solid var(--adm-border); border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .adm-rep-btn-ghost:hover { background: var(--adm-card-hover); }

        .adm-rep-tabs { display: flex; gap: 4px; background: var(--adm-card); border: 1px solid var(--adm-border); border-radius: 10px; padding: 4px; margin-bottom: 28px; overflow-x: auto; width: fit-content; max-width: 100%; }
        .adm-rep-tab { padding: 8px 16px; border: none; border-radius: 7px; background: transparent; color: var(--adm-text-secondary); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.18s; white-space: nowrap; }
        .adm-rep-tab:hover { color: var(--adm-text); background: var(--adm-card-hover); }
        .adm-rep-tab.active { background: var(--adm-accent); color: #fff; }

        .adm-rep-card { background: var(--adm-card); border: 1px solid var(--adm-border); border-radius: 16px; padding: 32px; margin-bottom: 28px; }
        .adm-rep-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
        .adm-rep-top-left { }
        .adm-rep-title { font-size: 20px; font-weight: 700; color: var(--adm-text); margin: 0 0 6px; }
        .adm-rep-meta { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
        .adm-rep-meta span { font-size: 12px; color: var(--adm-text-secondary); display: flex; align-items: center; gap: 5px; }
        .adm-rep-meta .adm-eos-badge { background: var(--adm-accent-dim); color: var(--adm-accent); padding: 3px 10px; border-radius: 20px; font-weight: 600; font-size: 11px; }
        .adm-rep-actions { display: flex; gap: 10px; align-items: center; }

        .adm-rep-section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--adm-text-secondary); margin: 0 0 12px; }
        .adm-rep-summary-box { background: var(--adm-surface); border: 1px solid var(--adm-border); border-left: 3px solid var(--adm-accent); border-radius: 10px; padding: 18px 20px; margin-bottom: 28px; font-size: 14px; line-height: 1.75; color: var(--adm-text-secondary); }

        .adm-rep-metrics { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 16px; margin-bottom: 28px; }
        .adm-rep-metric { background: var(--adm-surface); border: 1px solid var(--adm-border); border-radius: 10px; padding: 16px 18px; }
        .adm-rep-metric-label { font-size: 11px; color: var(--adm-text-secondary); margin-bottom: 6px; font-weight: 500; }
        .adm-rep-metric-value { font-size: 22px; font-weight: 700; color: var(--adm-text); line-height: 1.1; margin-bottom: 4px; }
        .adm-rep-metric-change { font-size: 12px; font-weight: 600; }
        .adm-change-up { color: var(--adm-green); }
        .adm-change-down { color: var(--adm-red); }
        .adm-change-neutral { color: var(--adm-text-secondary); }

        .adm-rep-findings { margin-bottom: 28px; }
        .adm-rep-finding-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--adm-border-light); font-size: 14px; color: var(--adm-text-secondary); line-height: 1.6; }
        .adm-rep-finding-item:last-child { border-bottom: none; }
        .adm-rep-finding-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--adm-accent); flex-shrink: 0; margin-top: 7px; }

        .adm-rep-recs { margin-bottom: 28px; }
        .adm-rep-rec-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: var(--adm-green-dim); border-radius: 8px; margin-bottom: 8px; font-size: 14px; color: var(--adm-text); line-height: 1.55; }
        .adm-rep-rec-icon { color: var(--adm-green); flex-shrink: 0; margin-top: 2px; font-size: 16px; }

        .adm-rep-next { background: var(--adm-amber-dim); border: 1px solid rgba(245,158,11,0.2); border-radius: 10px; padding: 18px 20px; }
        .adm-rep-next-items { list-style: none; margin: 0; padding: 0; }
        .adm-rep-next-item { display: flex; align-items: flex-start; gap: 8px; padding: 7px 0; font-size: 14px; color: var(--adm-text); border-bottom: 1px solid rgba(245,158,11,0.1); }
        .adm-rep-next-item:last-child { border-bottom: none; }
        .adm-rep-next-num { background: var(--adm-amber); color: #000; font-weight: 700; font-size: 11px; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        /* History */
        .adm-rep-history { background: var(--adm-card); border: 1px solid var(--adm-border); border-radius: 16px; padding: 24px; }
        .adm-rep-history h2 { font-size: 16px; font-weight: 700; color: var(--adm-text); margin: 0 0 16px; }
        .adm-rep-history-table { width: 100%; border-collapse: collapse; }
        .adm-rep-history-table th { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--adm-text-secondary); text-align: left; padding: 8px 12px; border-bottom: 1px solid var(--adm-border); }
        .adm-rep-history-table td { font-size: 14px; color: var(--adm-text); padding: 12px 12px; border-bottom: 1px solid var(--adm-border-light); }
        .adm-rep-history-table tr:last-child td { border-bottom: none; }
        .adm-rep-history-table tr:hover td { background: var(--adm-card-hover); }
        .adm-rep-dl-link { color: var(--adm-accent); font-size: 13px; font-weight: 500; background: none; border: none; cursor: pointer; text-decoration: underline; }
        .adm-rep-dl-link:hover { color: var(--adm-accent-hover); }

        /* Modal */
        .adm-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(3px); }
        .adm-modal { background: var(--adm-card); border: 1px solid var(--adm-border); border-radius: 16px; padding: 28px; width: 480px; max-width: 95vw; }
        .adm-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .adm-modal-header h2 { font-size: 18px; font-weight: 700; color: var(--adm-text); margin: 0; }
        .adm-modal-close { background: none; border: none; color: var(--adm-text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
        .adm-modal-body { display: flex; flex-direction: column; gap: 18px; }
        .adm-form-group { display: flex; flex-direction: column; gap: 6px; }
        .adm-form-label { font-size: 13px; font-weight: 600; color: var(--adm-text-secondary); }
        .adm-form-select, .adm-form-input { background: var(--adm-surface); border: 1px solid var(--adm-border); border-radius: 8px; color: var(--adm-text); font-size: 14px; padding: 10px 14px; outline: none; width: 100%; box-sizing: border-box; }
        .adm-form-select:focus, .adm-form-input:focus { border-color: var(--adm-accent); }
        .adm-modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; }

        /* Toast */
        .adm-toast { position: fixed; bottom: 28px; right: 28px; padding: 12px 20px; border-radius: 10px; font-size: 14px; font-weight: 500; z-index: 9999; animation: admSlideUp 0.25s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .adm-toast.success { background: var(--adm-green); color: #fff; }
        .adm-toast.info { background: var(--adm-accent); color: #fff; }
        .adm-toast.error { background: var(--adm-red); color: #fff; }
        @keyframes admSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      <div className="adm-reports-page">
        {/* Header */}
        <div className="adm-reports-header">
          <div>
            <h1>AI Reports</h1>
            <p>Auto-generated analytics reports powered by EOS AI</p>
          </div>
          <div className="adm-reports-header-actions">
            <button className="adm-rep-btn-ghost" onClick={() => setShowScheduleModal(true)}>
              Schedule Report
            </button>
            <button className="adm-rep-btn-primary" onClick={handleGenerate}>
              + Generate New Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="adm-rep-tabs">
          {TAB_KEYS.map(key => (
            <button
              key={key}
              className={`adm-rep-tab${activeTab === key ? ' active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {REPORTS[key].label}
            </button>
          ))}
        </div>

        {/* Report Card */}
        <div className="adm-rep-card">
          <div className="adm-rep-top">
            <div className="adm-rep-top-left">
              <h2 className="adm-rep-title">{report.title}</h2>
              <div className="adm-rep-meta">
                <span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {report.dateRange}
                </span>
                <span className="adm-eos-badge">EOS AI Generated</span>
                <span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Generated just now
                </span>
              </div>
            </div>
            <div className="adm-rep-actions">
              <button className="adm-rep-btn-ghost" onClick={() => setShowScheduleModal(true)}>
                Schedule
              </button>
              <button className="adm-rep-btn-primary" onClick={handleDownload}>
                ↓ Download PDF
              </button>
            </div>
          </div>

          {/* Executive Summary */}
          <p className="adm-rep-section-title">Executive Summary</p>
          <div className="adm-rep-summary-box">{report.summary}</div>

          {/* Key Metrics */}
          <p className="adm-rep-section-title">Key Metrics</p>
          <div className="adm-rep-metrics">
            {report.metrics.map((m, i) => (
              <div key={i} className="adm-rep-metric">
                <div className="adm-rep-metric-label">{m.label}</div>
                <div className="adm-rep-metric-value">{m.value}</div>
                <div className={`adm-rep-metric-change ${m.up === true ? 'adm-change-up' : m.up === false ? 'adm-change-down' : 'adm-change-neutral'}`}>
                  {m.up === true ? '▲' : m.up === false ? '▼' : ''} {m.change}
                </div>
              </div>
            ))}
          </div>

          {/* Findings */}
          <p className="adm-rep-section-title">Key Findings</p>
          <div className="adm-rep-findings">
            {report.findings.map((f, i) => (
              <div key={i} className="adm-rep-finding-item">
                <div className="adm-rep-finding-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <p className="adm-rep-section-title">Recommendations</p>
          <div className="adm-rep-recs">
            {report.recommendations.map((r, i) => (
              <div key={i} className="adm-rep-rec-item">
                <span className="adm-rep-rec-icon">✓</span>
                <span>{r}</span>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <p className="adm-rep-section-title">Next Steps</p>
          <div className="adm-rep-next">
            <ul className="adm-rep-next-items">
              {report.nextSteps.map((s, i) => (
                <li key={i} className="adm-rep-next-item">
                  <span className="adm-rep-next-num">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Report History */}
        <div className="adm-rep-history">
          <h2>Report History</h2>
          <table className="adm-rep-history-table">
            <thead>
              <tr>
                <th>Report Type</th>
                <th>Generated On</th>
                <th>File Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map(h => (
                <tr key={h.id}>
                  <td>{h.type}</td>
                  <td style={{ color: 'var(--adm-text-secondary)' }}>{h.date}</td>
                  <td style={{ color: 'var(--adm-text-secondary)' }}>{h.size}</td>
                  <td>
                    <button className="adm-rep-dl-link" onClick={() => showToast(`Downloading ${h.type} — ${h.date}`, 'success')}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="adm-modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2>Schedule Report</h2>
              <button className="adm-modal-close" onClick={() => setShowScheduleModal(false)}>×</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-form-group">
                <label className="adm-form-label">Report Type</label>
                <select className="adm-form-select" value={activeTab} readOnly>
                  {TAB_KEYS.map(k => (
                    <option key={k} value={k}>{REPORTS[k].label}</option>
                  ))}
                </select>
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Frequency</label>
                <select
                  className="adm-form-select"
                  value={schedule.frequency}
                  onChange={e => setSchedule(s => ({ ...s, frequency: e.target.value }))}
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              {schedule.frequency === 'Weekly' && (
                <div className="adm-form-group">
                  <label className="adm-form-label">Send On</label>
                  <select
                    className="adm-form-select"
                    value={schedule.day}
                    onChange={e => setSchedule(s => ({ ...s, day: e.target.value }))}
                  >
                    {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="adm-form-group">
                <label className="adm-form-label">Email Recipients (comma separated)</label>
                <input
                  type="text"
                  className="adm-form-input"
                  placeholder="admin@ebrave.in, team@ebrave.in"
                  value={schedule.emails}
                  onChange={e => setSchedule(s => ({ ...s, emails: e.target.value }))}
                />
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-rep-btn-ghost" onClick={() => setShowScheduleModal(false)}>Cancel</button>
              <button className="adm-rep-btn-primary" onClick={handleScheduleSave}>Save Schedule</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className={`adm-toast ${toast.type}`}>{toast.msg}</div>}
    </AdminLayout>
  );
}
