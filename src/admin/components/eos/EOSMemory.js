// src/admin/components/eos/EOSMemory.js
// Centralized Context Architecture for E-Brave AI Memory Layer
// Implements dynamic priority ranking, token cost ceilings, and cache optimization.

export const OPERATIONAL_MEMORY = `
[OPERATIONAL MEMORY - E-BRAVE LEAD STAGES]
- "New Lead": Just registered, needs immediate assignment.
- "Contacted": First contact attempted or made by counselor.
- "Interested": Shown positive interest, target for webinar registration.
- "Webinar Registered" / "Webinar Attended": Funnel progression milestones.
- "Counseling Booked": Scheduled a paid/free 1-on-1 counseling session.
- "Counseling Completed": Session occurred, final evaluation in progress.
- "Converted": Paid enrollment completed.
- "Follow-up Required": Missed follow-up date or needs callback.
- "Not Interested" / "Closed": Disqualified lead.
`;

export const COUNSELING_MEMORY = `
[COUNSELING MEMORY - E-BRAVE STREAM GUIDELINES]
- Target Audience: Indian students from Class 8 to Class 12, and 12th pass graduates.
- Class 10 Stream Selection Guidance:
  * Science (PCM): Target Careers: Engineering, Architecture, Data Science, Defense, Aviation.
  * Science (PCB): Target Careers: Medical (MBBS/BDS), Biotechnology, Pharmacy, Nursing, Agricultural Sciences.
  * Commerce: Target Careers: Chartered Accountancy (CA), MBA, Finance Analyst, Investment Banking, CS, CMA.
  * Humanities (Arts): Target Careers: Law (CLAT), Design (NID/NIFT), Psychology, Mass Communication, Journalism, Civil Services.
- Framework: Core Counseling focuses on matching student aptitude (via psychometrics) with interest patterns and market feasibility.
`;

export const ANALYTICS_MEMORY = `
[ANALYTICS MEMORY - WEBSITE PERFORMANCE BENCHMARKS]
- Standard Traffic funnels: Ad/Organic Reach -> Landing Page -> Lead Form -> Webinar -> 1-on-1 Counseling -> Conversion.
- Bounce Rate: Target < 45% for landing pages. Bounce rates > 70% indicate slow loading speed, mismatched user intent, or weak hero CTA.
- Visitor-to-Lead Ratio: Ideal benchmark is 8% to 15%. Lower ratios demand landing page copywriting audits.
- CTA Optimization: Hero section CTA must direct to free booking or WhatsApp counseling instantly.
`;

export const WORKFLOW_MEMORY = `
[WORKFLOW MEMORY - SPRINT & TASK ASSIGNMENTS]
- Critical SLA: First response to "New Lead" must occur within 2 hours.
- Overdue follow-up triggers: Auto-remind assignee counselor at 9 AM daily.
- Session confirmation: Automated WhatsApp confirmation dispatch 24h prior, and 1h countdown reminder with room link.
`;

export const BUSINESS_RULES_MEMORY = `
[BUSINESS RULES MEMORY - OPERATIONS CRITERIA]
- Lead Score Index:
  * Score 9-10 (Hot): Highly engaged, multiple webinar touchpoints, outreach immediately.
  * Score 5-8 (Warm): Webinar attendee or form submission, follow up within 24 hours.
  * Score 1-4 (Cold): Social media click, add to weekly broadcast list.
- Standard Pricing:
  * Primary Counseling Package: ₹2,499 (includes psychometric test + detailed roadmaps).
  * Webinar Entry: Usually Free or ₹99 depending on target stream.
`;

// Session-based memory scoring for dynamic weight adjustments
const SESSION_SCORE_KEY = 'ebrave_eos_memory_scores';

function getSessionScores() {
  try {
    const scores = localStorage.getItem(SESSION_SCORE_KEY);
    return scores ? JSON.parse(scores) : { counseling: 0, operational: 0, analytics: 0, workflow: 0, business: 0 };
  } catch (e) {
    return { counseling: 0, operational: 0, analytics: 0, workflow: 0, business: 0 };
  }
}

function updateSessionScores(scores) {
  try {
    localStorage.setItem(SESSION_SCORE_KEY, JSON.stringify(scores));
  } catch (e) {
    // Fail silently in restricted environment
  }
}

/**
 * Retrieves prioritized operational memory contexts based on semantic keywords
 * and dynamic session weights, respecting token budget ceilings.
 * @param {string} query - The user's query string
 * @param {number} charCeiling - Character-based token ceiling to limit payload sizes
 * @returns {string} Combined relevant memory blocks matching budget constraints
 */
export function getRelevantMemory(query = '', charCeiling = 1400) {
  const q = query.toLowerCase();
  const scores = getSessionScores();

  // Keyword categorization & scoring boots
  const matches = {
    counseling: q.includes('counsel') || q.includes('student') || q.includes('stream') || q.includes('class') || q.includes('pcm') || q.includes('pcb') || q.includes('guidance'),
    operational: q.includes('lead') || q.includes('crm') || q.includes('prospect') || q.includes('hot') || q.includes('cold') || q.includes('funnel') || q.includes('stage'),
    analytics: q.includes('analytics') || q.includes('traffic') || q.includes('bounce') || q.includes('visitor') || q.includes('view') || q.includes('seo') || q.includes('site'),
    workflow: q.includes('task') || q.includes('workflow') || q.includes('automation') || q.includes('rule') || q.includes('trigger') || q.includes('alert'),
    business: q.includes('price') || q.includes('rule') || q.includes('business') || q.includes('score') || q.includes('cost') || q.includes('revenue') || q.includes('finance')
  };

  // Boost dynamic category weights based on active matches
  Object.keys(matches).forEach(key => {
    if (matches[key]) {
      scores[key] = Math.min((scores[key] || 0) + 2, 10); // cap boost at 10
    } else {
      scores[key] = Math.max((scores[key] || 0) - 0.5, 0); // slowly decay unused boost
    }
  });
  updateSessionScores(scores);

  // Define modules with base priorities (lower index = high priority)
  const modules = [
    { key: 'operational', content: OPERATIONAL_MEMORY, basePriority: 10 },
    { key: 'business', content: BUSINESS_RULES_MEMORY, basePriority: 8 },
    { key: 'counseling', content: COUNSELING_MEMORY, basePriority: 6 },
    { key: 'analytics', content: ANALYTICS_MEMORY, basePriority: 5 },
    { key: 'workflow', content: WORKFLOW_MEMORY, basePriority: 4 }
  ];

  // Calculate final dynamic weight scores
  const prioritized = modules.map(mod => {
    const dynamicBoost = scores[mod.key] || 0;
    return {
      ...mod,
      finalScore: mod.basePriority + dynamicBoost
    };
  }).sort((a, b) => b.finalScore - a.finalScore);

  // Assemble modules respecting character budget ceilings (Token governance)
  let result = '';
  for (const mod of prioritized) {
    // Only inject if the category matches or if it's high priority (finalScore >= 8)
    const isRelevant = matches[mod.key] || mod.finalScore >= 8;
    if (isRelevant) {
      const prospectiveLength = result.length + mod.content.length + 1;
      if (prospectiveLength <= charCeiling) {
        result += mod.content + '\n';
      } else {
        // Budget limit reached, skip remaining low-priority blocks
        break;
      }
    }
  }

  // Fallback default context if budget didn't fit anything or query is completely generic
  if (!result.trim()) {
    result = OPERATIONAL_MEMORY + '\n' + BUSINESS_RULES_MEMORY;
  }

  return result;
}
