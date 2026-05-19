// ============================================================
// EOS AI ENGINE - E-Brave Operational System
// Pure logic-based contextual intelligence engine
// No external APIs - computes real metrics from admin context
// ============================================================

// ─────────────────────────────────────────
// QUICK ACTIONS
// ─────────────────────────────────────────
export const EOS_QUICK_ACTIONS = [
  { id: 'analyze_leads',      label: 'Analyze Leads',       icon: '📊', prompt: 'Give me a full lead analysis' },
  { id: 'check_followups',    label: 'Missed Follow-ups',   icon: '⚠️', prompt: 'Which leads have missed follow-ups?' },
  { id: 'funnel_analysis',    label: 'Funnel Analysis',     icon: '🔀', prompt: 'Analyze our conversion funnel' },
  { id: 'weekly_report',      label: 'Weekly Report',       icon: '📋', prompt: 'Generate weekly operational report' },
  { id: 'top_content',        label: 'Top Content',         icon: '🎬', prompt: 'Which content is performing best?' },
  { id: 'revenue_summary',    label: 'Revenue Summary',     icon: '💰', prompt: 'Give me the revenue summary' },
  { id: 'ai_recommendations', label: 'AI Recommendations',  icon: '🤖', prompt: 'Give me operational recommendations' },
  { id: 'website_health',     label: 'Website Health',      icon: '🌐', prompt: 'How is the website performing?' },
];

// ─────────────────────────────────────────
// HELPER UTILITIES
// ─────────────────────────────────────────
function safeArr(val) {
  return Array.isArray(val) ? val : [];
}

function safeNum(val, fallback = 0) {
  const n = Number(val);
  return isNaN(n) ? fallback : n;
}

function pct(num, den) {
  if (!den) return '0.0';
  return ((num / den) * 100).toFixed(1);
}

function daysAgo(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

function daysSince(dateStr) {
  return daysAgo(dateStr);
}

function topN(arr, key, n = 3) {
  const counts = {};
  arr.forEach(item => {
    const k = item[key] || 'Unknown';
    counts[k] = (counts[k] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, count]) => ({ name, count }));
}

function formatCurrency(amount) {
  const n = safeNum(amount);
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toFixed(0)}`;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ─────────────────────────────────────────
// INTENT DETECTION
// ─────────────────────────────────────────
function detectIntent(message) {
  const msg = message.toLowerCase().trim();

  const patterns = {
    leads:         /lead|crm|prospect|inquiry|enquir|follow.?up|contact|pipeline|hot|warm|cold|conversion|source/,
    analytics:     /website|traffic|visitor|session|pageview|analytics|seo|bounce|page view|web stat|online|site/,
    counseling:    /student|counsel|session|appointment|booking|class|enrolled|batch|mentoring|mentor|program/,
    webinar:       /webinar|event|seminar|workshop|online class|live session|attendee|register|webinar/,
    content:       /content|video|post|blog|social|media|youtube|instagram|facebook|reel|publish|engagement|view|like|share/,
    financial:     /revenue|payment|fee|income|earn|money|finance|profit|cost|expense|invoice|collection|due|paid|amount/,
    automation:    /automat|workflow|task|reminder|schedule|assign|pipeline|trigger|notification|alert/,
    report:        /report|summary|overview|dashboard|weekly|monthly|daily|stat|metric|performance|kpi|highlight/,
    recommendations: /recommend|suggest|tip|advice|improve|optimize|action|should i|what should|how can|strategy/,
    help:          /help|what can you|what do you|capabilities|feature|what are you|who are you|guide|how to use/,
    missed_followups: /missed|overdue|pending|late|forgot|delay|not follow|didn.?t follow|missed follow/,
    funnel:        /funnel|stage|conversion path|pipeline stage|lead stage|journey/,
    greeting:      /^(hi|hello|hey|good\s?(morning|afternoon|evening)|howdy|sup|what.?s up)/,
  };

  // Priority ordering matters for overlapping intents
  if (patterns.missed_followups.test(msg)) return 'missed_followups';
  if (patterns.greeting.test(msg))        return 'greeting';
  if (patterns.help.test(msg))            return 'help';
  if (patterns.report.test(msg))          return 'report';
  if (patterns.funnel.test(msg))          return 'funnel';
  if (patterns.recommendations.test(msg)) return 'recommendations';
  if (patterns.leads.test(msg))           return 'leads';
  if (patterns.financial.test(msg))       return 'financial';
  if (patterns.counseling.test(msg))      return 'counseling';
  if (patterns.webinar.test(msg))         return 'webinar';
  if (patterns.content.test(msg))         return 'content';
  if (patterns.analytics.test(msg))       return 'analytics';
  if (patterns.automation.test(msg))      return 'automation';

  return 'general';
}

// ─────────────────────────────────────────
// INTENT HANDLERS
// ─────────────────────────────────────────

function handleGreeting(context) {
  const leads    = safeArr(context.leads);
  const students = safeArr(context.students);
  const tasks    = safeArr(context.tasks);
  const sessions = safeArr(context.sessions);
  const finances = safeArr(context.finances);

  const now      = new Date();
  const hour     = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr  = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  const hotLeads        = leads.filter(l => (l.status || '').toLowerCase().includes('hot')).length;
  const pendingTasks    = tasks.filter(t => t.status !== 'done' && t.status !== 'completed').length;
  const todayRevenue    = finances
    .filter(f => {
      const d = new Date(f.date || f.createdAt);
      return !isNaN(d) && d.toDateString() === now.toDateString();
    })
    .reduce((sum, f) => sum + safeNum(f.amount), 0);
  const upcomingSession = sessions.find(s => {
    const d = new Date(s.date || s.scheduledAt);
    return !isNaN(d) && d >= now;
  });

  let lines = [
    `${greeting}! ⚡ I'm **EOS** — your E-Brave Operational System.`,
    `Today is **${dateStr}**. Here's a quick pulse on your operation:\n`,
    `📊 **Total Leads:** ${leads.length} | 🔥 **Hot Leads:** ${hotLeads}`,
    `👩‍🎓 **Enrolled Students:** ${students.length}`,
    `✅ **Pending Tasks:** ${pendingTasks}`,
  ];

  if (todayRevenue > 0) {
    lines.push(`💰 **Today's Collections:** ${formatCurrency(todayRevenue)}`);
  }
  if (upcomingSession) {
    const sessionDate = new Date(upcomingSession.date || upcomingSession.scheduledAt);
    lines.push(`📅 **Next Session:** ${upcomingSession.title || upcomingSession.subject || 'Session'} on ${sessionDate.toLocaleDateString('en-IN')}`);
  }

  lines.push('\nWhat would you like to analyze? Try the **Quick Actions** on the left or just ask me anything!');

  return { response: lines.join('\n'), type: 'greeting' };
}

function handleLeadAnalysis(context) {
  const leads = safeArr(context.leads);
  if (!leads.length) {
    return { response: '📊 **Lead Analysis**\n\nNo lead data found in the system yet. Start capturing leads from your registration forms and they\'ll appear here.', type: 'leads' };
  }

  const total    = leads.length;
  const statusMap = {};
  leads.forEach(l => {
    const s = capitalize(l.status || 'Unknown');
    statusMap[s] = (statusMap[s] || 0) + 1;
  });

  const converted  = leads.filter(l => /convert|enrol|paid|student/i.test(l.status || '')).length;
  const hot        = leads.filter(l => /hot/i.test(l.status || '')).length;
  const warm       = leads.filter(l => /warm/i.test(l.status || '')).length;
  const cold       = leads.filter(l => /cold/i.test(l.status || '')).length;
  const followupReq = leads.filter(l => /follow.?up/i.test(l.status || '')).length;
  const newLeads   = leads.filter(l => /new/i.test(l.status || '')).length;

  const convRate = pct(converted, total);
  const hotRate  = pct(hot, total);

  const topSources = topN(leads, 'source', 4);
  const sourceLines = topSources.map(s => `  • **${s.name}:** ${s.count} leads (${pct(s.count, total)}%)`).join('\n');

  // Recent leads (last 7 days)
  const sevenDaysAgo = Date.now() - 7 * 86400000;
  const recentLeads  = leads.filter(l => {
    const d = new Date(l.date || l.createdAt);
    return !isNaN(d) && d.getTime() > sevenDaysAgo;
  }).length;

  // Top cities
  const topCities = topN(leads, 'city', 3);
  const cityLines = topCities.map(c => `  • **${c.name}:** ${c.count}`).join('\n');

  const lines = [
    `📊 **Lead Performance Analysis**\n`,
    `**📈 Volume Overview:**`,
    `  • Total Leads: **${total}**`,
    `  • New Leads (Last 7 Days): **${recentLeads}**`,
    `  • Conversion Rate: **${convRate}%** (${converted} converted)\n`,
    `**🔥 Lead Temperature:**`,
    `  • 🔴 Hot: **${hot}** (${hotRate}%)`,
    `  • 🟡 Warm: **${warm}**`,
    `  • 🔵 Cold: **${cold}**`,
    `  • 🆕 New: **${newLeads}**`,
    `  • ⏰ Follow-up Required: **${followupReq}**\n`,
    `**📡 Top Lead Sources:**`,
    sourceLines || '  • No source data available',
    `\n**🏙️ Top Cities:**`,
    cityLines || '  • No city data available',
    `\n**💡 EOS Insight:**`,
  ];

  if (convRate < 10) {
    lines.push(`  Conversion rate of ${convRate}% is below the 10% benchmark. Focus on qualifying hot leads and reducing follow-up delays.`);
  } else if (convRate < 25) {
    lines.push(`  Conversion rate of ${convRate}% is healthy. Accelerate hot leads by scheduling same-day counseling sessions.`);
  } else {
    lines.push(`  Excellent conversion rate of ${convRate}%! Your counseling pipeline is highly effective. Increase lead volume to scale revenue.`);
  }

  if (followupReq > 5) {
    lines.push(`  ⚠️ ${followupReq} leads need immediate follow-up — prioritize these to avoid losing potential enrollments.`);
  }

  return { response: lines.join('\n'), type: 'leads', data: { total, converted, hot, warm, cold, followupReq, convRate } };
}

function handleMissedFollowups(context) {
  const leads = safeArr(context.leads);
  if (!leads.length) {
    return { response: '⚠️ **Missed Follow-ups**\n\nNo leads in the system yet to track follow-ups.', type: 'followups' };
  }

  const now = new Date();

  // Leads where status explicitly says follow-up required
  const statusFollowups = leads.filter(l => /follow.?up\s*(required|needed|pending)?/i.test(l.status || ''));

  // Leads where followUpDate is in the past
  const overdueByDate = leads.filter(l => {
    if (!l.followUpDate && !l.nextFollowUp) return false;
    const d = new Date(l.followUpDate || l.nextFollowUp);
    return !isNaN(d) && d < now;
  });

  // Merge and deduplicate
  const allIds = new Set();
  const missed = [];
  [...statusFollowups, ...overdueByDate].forEach(l => {
    const id = l.id || l._id || l.phone || l.name;
    if (!allIds.has(id)) {
      allIds.add(id);
      missed.push(l);
    }
  });

  if (!missed.length) {
    return {
      response: `✅ **Missed Follow-ups**\n\nGreat news! No overdue follow-ups detected. All leads are up to date.\n\n_EOS monitors follow-up dates and status flags automatically._`,
      type: 'followups'
    };
  }

  const lines = [
    `⚠️ **Missed Follow-ups — ${missed.length} Lead${missed.length > 1 ? 's' : ''} Require Attention**\n`,
  ];

  missed.slice(0, 15).forEach((l, i) => {
    const name   = l.name || l.studentName || `Lead #${i + 1}`;
    const phone  = l.phone || l.mobile || '—';
    const status = l.status || 'Follow-up Required';
    const fuDate = l.followUpDate || l.nextFollowUp;
    const daysOver = fuDate ? daysAgo(fuDate) : null;
    const overdue  = daysOver !== null && daysOver > 0 ? ` _(${daysOver} day${daysOver > 1 ? 's' : ''} overdue)_` : '';
    const source   = l.source ? ` · ${l.source}` : '';

    lines.push(`**${i + 1}. ${name}**${overdue}`);
    lines.push(`   📱 ${phone} · Status: ${status}${source}`);
    if (fuDate) {
      lines.push(`   📅 Follow-up was due: ${new Date(fuDate).toLocaleDateString('en-IN')}`);
    }
    lines.push('');
  });

  if (missed.length > 15) {
    lines.push(`_...and ${missed.length - 15} more overdue leads not shown._\n`);
  }

  lines.push(`**⚡ EOS Recommendation:**`);
  lines.push(`Prioritize the top ${Math.min(5, missed.length)} leads above. Assign them to your counselors and set reminders within 24 hours to prevent lead decay.`);

  return { response: lines.join('\n'), type: 'followups', data: { missedCount: missed.length, leads: missed } };
}

function handleFunnelAnalysis(context) {
  const leads = safeArr(context.leads);
  if (!leads.length) {
    return { response: '🔀 **Funnel Analysis**\n\nNo lead data available to build the funnel.', type: 'funnel' };
  }

  const stages = {
    'New':               0,
    'Hot':               0,
    'Warm':              0,
    'Cold':              0,
    'Follow-up':         0,
    'In Counseling':     0,
    'Converted':         0,
    'Lost':              0,
    'Other':             0,
  };

  leads.forEach(l => {
    const s = (l.status || '').toLowerCase();
    if (/^new/.test(s))                      stages['New']++;
    else if (/hot/.test(s))                  stages['Hot']++;
    else if (/warm/.test(s))                 stages['Warm']++;
    else if (/cold/.test(s))                 stages['Cold']++;
    else if (/follow.?up/.test(s))           stages['Follow-up']++;
    else if (/counsel/.test(s))              stages['In Counseling']++;
    else if (/convert|enrol|paid|student/.test(s)) stages['Converted']++;
    else if (/lost|drop|disqualif/.test(s)) stages['Lost']++;
    else                                     stages['Other']++;
  });

  const total = leads.length;
  const maxBar = 20;

  const lines = [
    `🔀 **Conversion Funnel Analysis — ${total} Total Leads**\n`,
    `\`\`\``,
  ];

  Object.entries(stages).forEach(([stage, count]) => {
    if (count === 0) return;
    const bars    = Math.round((count / total) * maxBar);
    const bar     = '█'.repeat(bars) + '░'.repeat(maxBar - bars);
    const percent = pct(count, total);
    lines.push(`${stage.padEnd(16)} ${bar} ${String(count).padStart(3)}  (${percent}%)`);
  });

  lines.push('```\n');

  const converted = stages['Converted'];
  const lost      = stages['Lost'];
  const inPipeline = total - converted - lost;
  const convRate  = pct(converted, total);
  const lossRate  = pct(lost, total);

  lines.push(`**📊 Key Funnel Metrics:**`);
  lines.push(`  • Total in active pipeline: **${inPipeline}**`);
  lines.push(`  • Overall conversion rate: **${convRate}%**`);
  lines.push(`  • Lead loss/drop rate: **${lossRate}%**`);
  lines.push(`  • Biggest stage: **${Object.entries(stages).sort((a,b) => b[1]-a[1])[0]?.[0] || 'N/A'}**\n`);

  lines.push(`**💡 Funnel Insights:**`);
  if (stages['Follow-up'] > stages['In Counseling']) {
    lines.push(`  • Large bottleneck at Follow-up stage — ${stages['Follow-up']} leads are stuck. Push them to counseling faster.`);
  }
  if (stages['Cold'] > total * 0.3) {
    lines.push(`  • ${stages['Cold']} cold leads (${pct(stages['Cold'], total)}%) — consider a re-engagement campaign.`);
  }
  if (converted > 0 && convRate > 20) {
    lines.push(`  • Conversion rate of ${convRate}% is excellent! Scale lead generation to multiply revenue.`);
  }
  if (lost > converted) {
    lines.push(`  • ⚠️ More leads lost (${lost}) than converted (${converted}). Review your counseling pitch and response time.`);
  }

  return { response: lines.join('\n'), type: 'funnel', data: stages };
}

function handleWeeklyReport(context) {
  const leads    = safeArr(context.leads);
  const students = safeArr(context.students);
  const sessions = safeArr(context.sessions);
  const webinars = safeArr(context.webinars);
  const content  = safeArr(context.content);
  const finances = safeArr(context.finances);
  const tasks    = safeArr(context.tasks);

  const now         = new Date();
  const weekStart   = new Date(now);
  weekStart.setDate(now.getDate() - 7);
  const weekLabel   = `${weekStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;

  const isThisWeek = (dateStr) => {
    const d = new Date(dateStr);
    return !isNaN(d) && d >= weekStart && d <= now;
  };

  // Leads
  const weekLeads     = leads.filter(l => isThisWeek(l.date || l.createdAt));
  const weekConverted = leads.filter(l => isThisWeek(l.date || l.createdAt) && /convert|enrol|paid/i.test(l.status || ''));

  // Revenue
  const weekRevenue = finances
    .filter(f => isThisWeek(f.date || f.createdAt))
    .reduce((sum, f) => sum + safeNum(f.amount), 0);
  const totalRevenue = finances.reduce((sum, f) => sum + safeNum(f.amount), 0);

  // Sessions
  const weekSessions = sessions.filter(s => isThisWeek(s.date || s.scheduledAt || s.createdAt));

  // Webinars
  const weekWebinars = webinars.filter(w => isThisWeek(w.date || w.createdAt));

  // Content
  const weekContent = content.filter(c => isThisWeek(c.publishedAt || c.date || c.createdAt));
  const weekEngagement = weekContent.reduce((sum, c) => sum + safeNum(c.views || c.engagement), 0);

  // Tasks
  const weekTasksDone    = tasks.filter(t => isThisWeek(t.completedAt || t.updatedAt) && /done|complete/i.test(t.status || '')).length;
  const weekTasksPending = tasks.filter(t => !/done|complete/i.test(t.status || '')).length;

  const lines = [
    `📋 **Weekly Operational Report**`,
    `_Period: ${weekLabel}_\n`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `\n**📊 LEADS & CONVERSIONS**`,
    `  • New Leads This Week: **${weekLeads.length}**`,
    `  • Conversions This Week: **${weekConverted.length}**`,
    `  • Week Conversion Rate: **${pct(weekConverted.length, weekLeads.length)}%**`,
    `  • Total Leads All-Time: ${leads.length}`,
    `\n**💰 REVENUE**`,
    `  • Week Collections: **${formatCurrency(weekRevenue)}**`,
    `  • Total Revenue (All-Time): ${formatCurrency(totalRevenue)}`,
    `\n**📅 SESSIONS & WEBINARS**`,
    `  • Counseling Sessions This Week: **${weekSessions.length}**`,
    `  • Webinars This Week: **${weekWebinars.length}**`,
    `  • Total Students Enrolled: ${students.length}`,
    `\n**🎬 CONTENT PERFORMANCE**`,
    `  • Content Published This Week: **${weekContent.length}**`,
    `  • Combined Engagement: **${weekEngagement.toLocaleString()}** views/interactions`,
    `\n**✅ TASK COMPLETION**`,
    `  • Tasks Completed This Week: **${weekTasksDone}**`,
    `  • Tasks Still Pending: **${weekTasksPending}**`,
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `\n**⚡ EOS WEEKLY VERDICT:**`,
  ];

  const score = [
    weekLeads.length > 10 ? 1 : 0,
    weekConverted.length > 2 ? 1 : 0,
    weekRevenue > 10000 ? 1 : 0,
    weekSessions.length > 3 ? 1 : 0,
    weekContent.length > 2 ? 1 : 0,
    weekTasksDone > 3 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  if (score >= 5) {
    lines.push(`🟢 **Excellent week!** Operations are firing on all cylinders. Key focus: maintain momentum and push top-of-funnel lead generation.`);
  } else if (score >= 3) {
    lines.push(`🟡 **Solid week overall.** ${6 - score} area(s) can be improved. Review missed targets above and prioritize for next week.`);
  } else {
    lines.push(`🔴 **Below-average week.** Multiple KPIs are underperforming. Immediate action needed on lead generation and follow-ups.`);
  }

  lines.push(`\n_Generated by EOS · ${now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}_`);

  return { response: lines.join('\n'), type: 'report' };
}

function handleContentAnalysis(context) {
  const content = safeArr(context.content);
  if (!content.length) {
    return { response: '🎬 **Content Performance**\n\nNo content data available yet. Start publishing content to track performance here.', type: 'content' };
  }

  // Sort by views/engagement
  const sorted = [...content].sort((a, b) => safeNum(b.views || b.engagement) - safeNum(a.views || a.engagement));
  const top5   = sorted.slice(0, 5);
  const totalViews = content.reduce((sum, c) => sum + safeNum(c.views || c.engagement), 0);
  const totalLikes = content.reduce((sum, c) => sum + safeNum(c.likes), 0);
  const totalShares = content.reduce((sum, c) => sum + safeNum(c.shares), 0);

  const platformMap = {};
  content.forEach(c => {
    const p = c.platform || c.type || 'Unknown';
    platformMap[p] = (platformMap[p] || 0) + 1;
  });
  const topPlatform = Object.entries(platformMap).sort((a,b) => b[1]-a[1])[0];

  const lines = [
    `🎬 **Content Performance Analysis**`,
    `_${content.length} total pieces tracked_\n`,
    `**📊 Aggregate Stats:**`,
    `  • Total Views/Reach: **${totalViews.toLocaleString()}**`,
    `  • Total Likes: **${totalLikes.toLocaleString()}**`,
    `  • Total Shares: **${totalShares.toLocaleString()}**`,
    `  • Top Platform: **${topPlatform?.[0] || 'N/A'}** (${topPlatform?.[1] || 0} pieces)`,
    `  • Avg. Views per Content: **${Math.round(totalViews / content.length).toLocaleString()}**\n`,
    `**🏆 Top 5 Performing Content:**`,
  ];

  top5.forEach((c, i) => {
    const title   = c.title || c.name || `Content #${i + 1}`;
    const views   = safeNum(c.views || c.engagement);
    const platform = c.platform || c.type || '';
    const date    = c.publishedAt || c.date ? new Date(c.publishedAt || c.date).toLocaleDateString('en-IN') : '';
    lines.push(`  **${i + 1}. ${title}**`);
    lines.push(`     ${platform ? `📱 ${platform} · ` : ''}👁️ ${views.toLocaleString()} views${date ? ` · ${date}` : ''}`);
  });

  lines.push(`\n**💡 EOS Insight:**`);
  const avgViews = totalViews / content.length;
  if (avgViews < 500) {
    lines.push(`  Average view count is low (${Math.round(avgViews)}). Consider increasing posting frequency and cross-promoting content across platforms.`);
  } else {
    lines.push(`  Content is performing well with an average of ${Math.round(avgViews)} views. Replicate the format of your top performers.`);
  }
  if (totalShares > totalLikes * 0.1) {
    lines.push(`  High share-to-like ratio indicates strong viral potential — lean into shareable formats like carousels and short videos.`);
  }

  return { response: lines.join('\n'), type: 'content', data: { top5, totalViews, totalLikes } };
}

function handleFinancialAnalysis(context) {
  const finances = safeArr(context.finances);
  const students = safeArr(context.students);

  const totalRevenue  = finances.reduce((sum, f) => sum + safeNum(f.amount), 0);
  const totalExpenses = finances
    .filter(f => safeNum(f.amount) < 0 || /expense|cost|debit/i.test(f.type || ''))
    .reduce((sum, f) => sum + Math.abs(safeNum(f.amount)), 0);
  const collections   = finances
    .filter(f => safeNum(f.amount) > 0 && !/expense|cost|debit/i.test(f.type || ''))
    .reduce((sum, f) => sum + safeNum(f.amount), 0);

  const now       = new Date();
  const thisMonth = finances.filter(f => {
    const d = new Date(f.date || f.createdAt);
    return !isNaN(d) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthRevenue = thisMonth.reduce((sum, f) => sum + safeNum(f.amount), 0);

  // Overdue / pending payments
  const pending = finances.filter(f => /pending|due|unpaid/i.test(f.status || '')).length;
  const pendingAmt = finances
    .filter(f => /pending|due|unpaid/i.test(f.status || ''))
    .reduce((sum, f) => sum + safeNum(f.amount), 0);

  const avgFee = students.length ? totalRevenue / students.length : 0;

  const lines = [
    `💰 **Revenue & Financial Summary**\n`,
    `**📊 Overview:**`,
    `  • Total Collections (All-Time): **${formatCurrency(collections)}**`,
    `  • Total Expenses: **${formatCurrency(totalExpenses)}**`,
    `  • Net Position: **${formatCurrency(collections - totalExpenses)}**`,
    `  • This Month's Collections: **${formatCurrency(monthRevenue)}**\n`,
    `**🎓 Student Economics:**`,
    `  • Total Enrolled Students: **${students.length}**`,
    `  • Average Revenue per Student: **${formatCurrency(avgFee)}**\n`,
    `**⏳ Pending Dues:**`,
    `  • Pending Invoices/Payments: **${pending}**`,
    `  • Pending Amount: **${formatCurrency(pendingAmt)}**\n`,
  ];

  // Monthly trend if data allows
  const monthMap = {};
  finances.forEach(f => {
    const d = new Date(f.date || f.createdAt);
    if (!isNaN(d)) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthMap[key] = (monthMap[key] || 0) + safeNum(f.amount);
    }
  });

  const monthKeys = Object.keys(monthMap).sort().slice(-4);
  if (monthKeys.length > 1) {
    lines.push(`**📈 Monthly Revenue Trend (Last ${monthKeys.length} Months):**`);
    monthKeys.forEach(k => {
      const [yr, mn] = k.split('-');
      const label = new Date(parseInt(yr), parseInt(mn) - 1, 1).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      const val   = monthMap[k];
      const bar   = '█'.repeat(Math.min(15, Math.round(val / Math.max(...Object.values(monthMap)) * 15)));
      lines.push(`  ${label.padEnd(8)} ${bar} ${formatCurrency(val)}`);
    });
    lines.push('');
  }

  lines.push(`**💡 EOS Insight:**`);
  if (pendingAmt > totalRevenue * 0.2) {
    lines.push(`  ⚠️ Pending dues (${formatCurrency(pendingAmt)}) represent over 20% of total revenue. Follow up on outstanding payments immediately.`);
  }
  if (students.length && avgFee > 0) {
    lines.push(`  Average revenue per student is ${formatCurrency(avgFee)}. Increasing batch sizes or premium package offerings can significantly boost revenue.`);
  }

  return { response: lines.join('\n'), type: 'financial', data: { totalRevenue, totalExpenses, collections, monthRevenue } };
}

function handleCounselingAnalysis(context) {
  const sessions = safeArr(context.sessions);
  const students = safeArr(context.students);
  const leads    = safeArr(context.leads);

  const now = new Date();
  const upcoming = sessions.filter(s => {
    const d = new Date(s.date || s.scheduledAt);
    return !isNaN(d) && d >= now;
  }).sort((a, b) => new Date(a.date || a.scheduledAt) - new Date(b.date || b.scheduledAt));

  const completed = sessions.filter(s => /complet|done|finish/i.test(s.status || '')).length;
  const cancelled = sessions.filter(s => /cancel/i.test(s.status || '')).length;
  const scheduled = sessions.filter(s => /schedul|upcoming|confirm/i.test(s.status || '')).length;

  const avgPerWeek = sessions.length > 0
    ? (sessions.length / Math.max(1, Math.ceil((now - new Date(Math.min(...sessions.map(s => new Date(s.date || s.scheduledAt || now))))) / 604800000))).toFixed(1)
    : '0';

  const lines = [
    `📅 **Counseling Sessions Overview**\n`,
    `**📊 Session Stats:**`,
    `  • Total Sessions (All-Time): **${sessions.length}**`,
    `  • ✅ Completed: **${completed}**`,
    `  • 📅 Scheduled/Upcoming: **${scheduled}**`,
    `  • ❌ Cancelled: **${cancelled}**`,
    `  • Average Sessions per Week: **${avgPerWeek}**\n`,
    `**👩‍🎓 Student Pipeline:**`,
    `  • Total Enrolled Students: **${students.length}**`,
    `  • Leads in Counseling Stage: **${leads.filter(l => /counsel/i.test(l.status || '')).length}**\n`,
    `**📅 Next Upcoming Sessions:**`,
  ];

  if (upcoming.length === 0) {
    lines.push(`  No upcoming sessions scheduled.`);
  } else {
    upcoming.slice(0, 5).forEach((s, i) => {
      const d    = new Date(s.date || s.scheduledAt);
      const dStr = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
      const tStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const name = s.studentName || s.student || s.title || `Session ${i + 1}`;
      const counselor = s.counselor || s.assignedTo || '';
      lines.push(`  **${i + 1}. ${name}** — ${dStr} at ${tStr}${counselor ? ` · 👤 ${counselor}` : ''}`);
    });
  }

  if (cancelled > sessions.length * 0.2) {
    lines.push(`\n⚠️ **EOS Alert:** Cancellation rate is high (${pct(cancelled, sessions.length)}%). Review scheduling and send reminder notifications 24h before sessions.`);
  } else {
    lines.push(`\n✅ **EOS Note:** Session pipeline looks healthy. Keep follow-up leads moving into scheduled sessions.`);
  }

  return { response: lines.join('\n'), type: 'counseling', data: { total: sessions.length, completed, scheduled, cancelled } };
}

function handleWebinarAnalysis(context) {
  const webinars = safeArr(context.webinars);
  if (!webinars.length) {
    return { response: '📡 **Webinar Analysis**\n\nNo webinar data available. Schedule and run webinars to start tracking performance.', type: 'webinar' };
  }

  const now = new Date();
  const upcoming  = webinars.filter(w => new Date(w.date || w.scheduledAt) >= now);
  const completed = webinars.filter(w => /done|complet|finish/i.test(w.status || '') || new Date(w.date || w.scheduledAt) < now);
  const totalRegistrations = webinars.reduce((sum, w) => sum + safeNum(w.registrations || w.registrationCount), 0);
  const totalAttendees     = webinars.reduce((sum, w) => sum + safeNum(w.attendees || w.attendeeCount), 0);
  const showRate = pct(totalAttendees, totalRegistrations);

  const bestWebinar = [...webinars].sort((a,b) =>
    safeNum(b.attendees || b.attendeeCount) - safeNum(a.attendees || a.attendeeCount)
  )[0];

  const lines = [
    `📡 **Webinar Performance Report**\n`,
    `**📊 Overview:**`,
    `  • Total Webinars: **${webinars.length}**`,
    `  • Completed: **${completed.length}**`,
    `  • Upcoming: **${upcoming.length}**`,
    `  • Total Registrations: **${totalRegistrations.toLocaleString()}**`,
    `  • Total Attendees: **${totalAttendees.toLocaleString()}**`,
    `  • Average Show-up Rate: **${showRate}%**\n`,
  ];

  if (bestWebinar) {
    const bwDate = new Date(bestWebinar.date || bestWebinar.scheduledAt);
    lines.push(`**🏆 Best Performing Webinar:**`);
    lines.push(`  • Title: **${bestWebinar.title || bestWebinar.name || 'Unnamed'}**`);
    lines.push(`  • Registrations: ${safeNum(bestWebinar.registrations || bestWebinar.registrationCount)}`);
    lines.push(`  • Attendees: ${safeNum(bestWebinar.attendees || bestWebinar.attendeeCount)}`);
    if (!isNaN(bwDate)) lines.push(`  • Date: ${bwDate.toLocaleDateString('en-IN')}`);
    lines.push('');
  }

  if (upcoming.length > 0) {
    lines.push(`**📅 Upcoming Webinars:**`);
    upcoming.slice(0, 3).forEach((w, i) => {
      const d = new Date(w.date || w.scheduledAt);
      lines.push(`  ${i + 1}. **${w.title || w.name || 'Webinar'}** — ${!isNaN(d) ? d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBD'}`);
    });
    lines.push('');
  }

  lines.push(`**💡 EOS Insight:**`);
  if (parseFloat(showRate) < 40) {
    lines.push(`  Show-up rate of ${showRate}% is below industry average (40-60%). Send WhatsApp/SMS reminders 1 hour before webinars.`);
  } else if (parseFloat(showRate) < 60) {
    lines.push(`  Show-up rate of ${showRate}% is within the standard range. A/B test your reminder sequence to push above 60%.`);
  } else {
    lines.push(`  Excellent show-up rate of ${showRate}%! Your audience is highly engaged. Increase webinar frequency to generate more leads.`);
  }

  return { response: lines.join('\n'), type: 'webinar', data: { total: webinars.length, totalRegistrations, totalAttendees, showRate } };
}

function handleWebsiteAnalytics(context) {
  const analytics = context.analytics || {};
  const sessions  = safeArr(context.sessions);

  const visitors    = safeNum(analytics.visitors || analytics.totalVisitors);
  const pageViews   = safeNum(analytics.pageViews || analytics.views);
  const bounceRate  = safeNum(analytics.bounceRate);
  const avgDuration = safeNum(analytics.avgDuration || analytics.avgSessionDuration);
  const leads       = safeArr(context.leads);
  const convRate    = visitors ? pct(leads.length, visitors) : '—';

  const lines = [
    `🌐 **Website Health & Analytics**\n`,
    `**📊 Traffic Overview:**`,
    `  • Total Visitors: **${visitors ? visitors.toLocaleString() : 'Not tracked'}**`,
    `  • Total Page Views: **${pageViews ? pageViews.toLocaleString() : 'Not tracked'}**`,
    `  • Bounce Rate: **${bounceRate ? bounceRate + '%' : 'Not tracked'}**`,
    `  • Avg. Session Duration: **${avgDuration ? Math.floor(avgDuration / 60) + 'm ' + (avgDuration % 60) + 's' : 'Not tracked'}**`,
    `  • Visitor → Lead Conversion: **${convRate}${convRate !== '—' ? '%' : ''}**\n`,
  ];

  if (analytics.topPages && Array.isArray(analytics.topPages)) {
    lines.push(`**🔝 Top Pages:**`);
    analytics.topPages.slice(0, 5).forEach((p, i) => {
      lines.push(`  ${i + 1}. **${p.path || p.page || '/'}** — ${(p.views || 0).toLocaleString()} views`);
    });
    lines.push('');
  }

  if (analytics.trafficSources && typeof analytics.trafficSources === 'object') {
    lines.push(`**📡 Traffic Sources:**`);
    Object.entries(analytics.trafficSources).forEach(([src, val]) => {
      lines.push(`  • ${src}: **${typeof val === 'number' ? val + '%' : val}**`);
    });
    lines.push('');
  }

  if (!visitors && !pageViews) {
    lines.push(`**ℹ️ Note:** Full website analytics data isn't connected yet. Consider integrating Google Analytics or Plausible for real-time tracking.\n`);
  }

  lines.push(`**💡 EOS Insight:**`);
  if (bounceRate > 70) {
    lines.push(`  ⚠️ Bounce rate of ${bounceRate}% is high. Improve page load speed and add an engaging above-the-fold CTA.`);
  } else if (bounceRate > 40 && bounceRate <= 70) {
    lines.push(`  Bounce rate of ${bounceRate}% is moderate. Test different hero section CTAs to improve engagement.`);
  } else if (bounceRate > 0) {
    lines.push(`  Bounce rate of ${bounceRate}% is excellent. Your landing page is highly engaging.`);
  } else {
    lines.push(`  Connect analytics tracking to get detailed insights on visitor behavior and conversion paths.`);
  }

  return { response: lines.join('\n'), type: 'analytics', data: analytics };
}

function handleAutomationQuery(context) {
  const tasks         = safeArr(context.tasks);
  const notifications = safeArr(context.notifications);
  const leads         = safeArr(context.leads);

  const pending  = tasks.filter(t => !/done|complete/i.test(t.status || ''));
  const overdue  = tasks.filter(t => {
    const d = new Date(t.dueDate || t.deadline);
    return !isNaN(d) && d < new Date() && !/done|complete/i.test(t.status || '');
  });
  const high     = tasks.filter(t => /high|urgent|critical/i.test(t.priority || ''));
  const unread   = notifications.filter(n => !n.read && !n.isRead).length;

  const lines = [
    `⚙️ **Automation & Workflow Status**\n`,
    `**📋 Task Pipeline:**`,
    `  • Total Active Tasks: **${pending.length}**`,
    `  • 🔴 Overdue Tasks: **${overdue.length}**`,
    `  • 🟠 High Priority: **${high.length}**`,
    `  • Unread Notifications: **${unread}**\n`,
    `**⏰ Overdue Tasks:**`,
  ];

  if (overdue.length === 0) {
    lines.push(`  ✅ No overdue tasks! Great execution.`);
  } else {
    overdue.slice(0, 8).forEach((t, i) => {
      const due    = new Date(t.dueDate || t.deadline);
      const daysO  = Math.floor((Date.now() - due.getTime()) / 86400000);
      const assignee = t.assignee || t.assignedTo || 'Unassigned';
      lines.push(`  **${i + 1}. ${t.title || t.name || 'Task'}** — ${daysO}d overdue · 👤 ${assignee}`);
    });
  }

  lines.push(`\n**🤖 EOS Automation Recommendations:**`);
  if (overdue.length > 3) {
    lines.push(`  • Set up daily 9 AM task review reminders for your team.`);
  }
  const followupLeads = leads.filter(l => /follow.?up/i.test(l.status || '')).length;
  if (followupLeads > 5) {
    lines.push(`  • Auto-schedule WhatsApp follow-up sequences for ${followupLeads} pending leads.`);
  }
  lines.push(`  • Enable automated session reminder notifications 24h and 1h before each session.`);
  lines.push(`  • Set up weekly performance digest sent every Monday morning.`);

  return { response: lines.join('\n'), type: 'automation', data: { pending: pending.length, overdue: overdue.length } };
}

function handleRecommendations(context) {
  const leads    = safeArr(context.leads);
  const sessions = safeArr(context.sessions);
  const content  = safeArr(context.content);
  const finances = safeArr(context.finances);
  const tasks    = safeArr(context.tasks);
  const webinars = safeArr(context.webinars);

  const recs = [];
  let priority = 1;

  // Lead analysis recs
  const followupLeads = leads.filter(l => /follow.?up/i.test(l.status || '')).length;
  if (followupLeads > 5) {
    recs.push({ p: priority++, icon: '🔴', title: 'Clear Follow-up Backlog', desc: `${followupLeads} leads are waiting for follow-up. Each delayed day reduces conversion probability by ~5%. Assign counselors and clear this queue within 48 hours.` });
  }

  const convRate = leads.length ? (leads.filter(l => /convert|enrol|paid/i.test(l.status || '')).length / leads.length) * 100 : 0;
  if (convRate < 15 && leads.length > 10) {
    recs.push({ p: priority++, icon: '🟠', title: 'Optimize Conversion Funnel', desc: `Conversion rate of ${convRate.toFixed(1)}% is below target. Review your counseling script, reduce first-response time to under 2 hours, and add testimonial social proof to the website.` });
  }

  // Content recs
  const totalViews = content.reduce((s, c) => s + safeNum(c.views || c.engagement), 0);
  const avgViews   = content.length ? totalViews / content.length : 0;
  if (content.length < 10) {
    recs.push({ p: priority++, icon: '🟡', title: 'Increase Content Frequency', desc: `Only ${content.length} content pieces tracked. Publish at least 3 pieces/week across Instagram, YouTube Shorts, and LinkedIn to grow organic lead generation.` });
  } else if (avgViews < 1000) {
    recs.push({ p: priority++, icon: '🟡', title: 'Boost Content Reach', desc: `Average ${Math.round(avgViews)} views per content is low. Analyze your top 3 performing posts, replicate their format, and boost them with a small paid promotion budget.` });
  }

  // Session recs
  const cancelledSessions = sessions.filter(s => /cancel/i.test(s.status || '')).length;
  if (sessions.length && cancelledSessions / sessions.length > 0.2) {
    recs.push({ p: priority++, icon: '🟠', title: 'Reduce Session Cancellations', desc: `${cancelledSessions} sessions cancelled (${pct(cancelledSessions, sessions.length)}% rate). Implement 24h and 1h automated WhatsApp reminders. Offer easy rescheduling to prevent no-shows.` });
  }

  // Webinar recs
  if (webinars.length === 0) {
    recs.push({ p: priority++, icon: '🟢', title: 'Launch Your First Webinar', desc: `Webinars are the highest ROI lead generation tool for education businesses. Run a free 45-minute "Career Planning Masterclass" webinar targeting Class 10/12 students to generate 50+ qualified leads per event.` });
  }

  // Finance recs
  const pendingPayments = finances.filter(f => /pending|due|unpaid/i.test(f.status || ''));
  const pendingAmt = pendingPayments.reduce((s, f) => s + safeNum(f.amount), 0);
  if (pendingAmt > 0) {
    recs.push({ p: priority++, icon: '💰', title: 'Collect Pending Dues', desc: `${formatCurrency(pendingAmt)} in pending collections from ${pendingPayments.length} payment(s). Send payment reminders with a clear deadline and offer online payment links to reduce friction.` });
  }

  // General strategic recs (always show at least some)
  if (recs.length < 3) {
    recs.push({ p: priority++, icon: '🌟', title: 'Launch Student Referral Program', desc: `Incentivize enrolled students to refer friends with a ₹500–₹1,000 fee discount. Referral leads convert 3–5× better than cold traffic and cost nearly nothing to acquire.` });
    recs.push({ p: priority++, icon: '📱', title: 'Build WhatsApp Broadcast List', desc: `Create segmented WhatsApp broadcast lists by class (10, 11, 12) and send weekly career tips. This maintains mindshare and drives warm leads to your webinars and sessions.` });
    recs.push({ p: priority++, icon: '⭐', title: 'Collect & Display Testimonials', desc: `Request video/text testimonials from your top 5 recent students. Add them to your website hero section and WhatsApp business profile. Social proof is the fastest conversion booster.` });
  }

  const lines = [
    `🤖 **EOS Operational Recommendations**`,
    `_Personalized based on your current data_\n`,
  ];

  recs.slice(0, 6).forEach((r, i) => {
    lines.push(`**${r.icon} #${i + 1}: ${r.title}**`);
    lines.push(`${r.desc}\n`);
  });

  lines.push(`_EOS generates recommendations from your live operational data. Act on the highest-priority items first._`);

  return { response: lines.join('\n'), type: 'recommendations' };
}

function handleHelp() {
  const lines = [
    `🛡️ **EOS — E-Brave Operational System**`,
    `_Your AI-powered admin intelligence engine_\n`,
    `I analyze your real-time operational data and provide actionable insights. Here's what I can do:\n`,
    `**📊 Lead Intelligence:**`,
    `  • Full lead performance analysis`,
    `  • Identify missed & overdue follow-ups`,
    `  • Conversion funnel breakdown`,
    `  • Lead source attribution\n`,
    `**💰 Financial Analytics:**`,
    `  • Revenue summaries and trends`,
    `  • Pending dues tracking`,
    `  • Student economics metrics\n`,
    `**📅 Operations:**`,
    `  • Counseling session pipeline`,
    `  • Webinar registration & show-up rates`,
    `  • Task and workflow monitoring\n`,
    `**🎬 Content & Marketing:**`,
    `  • Content performance rankings`,
    `  • Platform-wise engagement stats`,
    `  • Website traffic analysis\n`,
    `**📋 Reports:**`,
    `  • Weekly operational reports`,
    `  • AI-powered recommendations`,
    `  • Cross-system performance summaries\n`,
    `**💬 Just ask me naturally**, like:`,
    `  • _"How are our leads performing this week?"_`,
    `  • _"Which leads need immediate follow-up?"_`,
    `  • _"Generate a weekly report"_`,
    `  • _"What should I focus on improving?"_\n`,
    `Or use the **Quick Actions** on the left for instant analysis! ⚡`,
  ];

  return { response: lines.join('\n'), type: 'help' };
}

function handleGeneral(message, context) {
  const leads    = safeArr(context.leads);
  const students = safeArr(context.students);
  const sessions = safeArr(context.sessions);
  const tasks    = safeArr(context.tasks);

  const hotLeads    = leads.filter(l => /hot/i.test(l.status || '')).length;
  const pendingFU   = leads.filter(l => /follow.?up/i.test(l.status || '')).length;
  const pendingTask = tasks.filter(t => !/done|complete/i.test(t.status || '')).length;
  const upcomingSessions = sessions.filter(s => new Date(s.date || s.scheduledAt) >= new Date()).length;

  return {
    response: [
      `I understood your question but wasn't sure which data domain it relates to. Here's a quick status snapshot:\n`,
      `📊 **Live Metrics:**`,
      `  • Total Leads: **${leads.length}** · 🔥 Hot: **${hotLeads}** · ⏰ Follow-up Due: **${pendingFU}**`,
      `  • Students: **${students.length}**`,
      `  • Upcoming Sessions: **${upcomingSessions}**`,
      `  • Pending Tasks: **${pendingTask}**\n`,
      `Try rephrasing your question or use one of the **Quick Actions** on the left panel for instant deep analysis.`,
      `\nExamples:`,
      `  • _"Analyze my leads"_ → Lead analysis`,
      `  • _"Show revenue summary"_ → Financial report`,
      `  • _"What needs attention?"_ → AI recommendations`,
    ].join('\n'),
    type: 'general',
  };
}

import { supabase } from '../../../supabaseClient';
import { getRelevantMemory } from './EOSMemory';

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return url && !url.includes('your-project-id') && !url.includes('your-project-ref');
};

// ─────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────

/**
 * generateEOSResponse
 * @param {string} message - User's message
 * @param {object} context - Admin data context
 * @returns {Promise<{ response: string, type: string, data?: any }>}
 */
export async function generateEOSResponse(message, context = {}, quickAnswer = false) {
  if (!message || typeof message !== 'string') {
    return { response: 'Please type a message to get started.', type: 'error' };
  }

  // If Supabase is configured, use secure Edge Function routing to OpenAI
  if (isSupabaseConfigured()) {
    try {
      const memoryContext = getRelevantMemory(message);
      const { data, error } = await supabase.functions.invoke('eos-ai', {
        body: { 
          message, 
          context: {
            ...context,
            memoryContext
          },
          quickAnswer
        }
      });
      if (error) throw error;
      if (data && data.response) {
        return { response: data.response, type: data.type || 'ai_generation' };
      }
    } catch (err) {
      console.warn('[EOS Edge Function Error, falling back to local processing]', err);
    }
  }

  // Fallback local pattern/regex processing engine
  const intent = detectIntent(message);

  try {
    switch (intent) {
      case 'greeting':        return handleGreeting(context);
      case 'leads':           return handleLeadAnalysis(context);
      case 'missed_followups': return handleMissedFollowups(context);
      case 'funnel':          return handleFunnelAnalysis(context);
      case 'report':          return handleWeeklyReport(context);
      case 'content':         return handleContentAnalysis(context);
      case 'financial':       return handleFinancialAnalysis(context);
      case 'counseling':      return handleCounselingAnalysis(context);
      case 'webinar':         return handleWebinarAnalysis(context);
      case 'analytics':       return handleWebsiteAnalytics(context);
      case 'automation':      return handleAutomationQuery(context);
      case 'recommendations': return handleRecommendations(context);
      case 'help':            return handleHelp();
      default:                return handleGeneral(message, context);
    }
  } catch (err) {
    console.error('[EOS Engine Error]', err);
    return {
      response: `⚠️ EOS encountered an issue processing that request. Please try rephrasing or use a Quick Action button.\n\n_Error: ${err.message}_`,
      type: 'error',
    };
  }
}

/**
 * generateEOSGreeting
 * Generates the initial greeting message when the EOS page loads
 * @param {object} context - Admin data context
 * @returns {Promise<{ response: string, type: string }>}
 */
export async function generateEOSGreeting(context = {}) {
  // If Supabase is configured, generate personalized greet from AI Edge Function
  if (isSupabaseConfigured()) {
    try {
      const memoryContext = getRelevantMemory('greeting report');
      const { data, error } = await supabase.functions.invoke('eos-ai', {
        body: { 
          message: "Generate your initial greeting overview dashboard report.", 
          context: {
            ...context,
            memoryContext
          }
        }
      });
      if (error) throw error;
      if (data && data.response) {
        return { response: data.response, type: 'greeting' };
      }
    } catch (err) {
      console.warn('[EOS Edge Greeting Error, falling back to local greeting]', err);
    }
  }
  return handleGreeting(context);
}

