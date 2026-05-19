// api/eos-ai.js
// Vercel Serverless Function for EOS AI Operations Officer
// Securely proxies prompts to OpenAI GPT-4o-mini using Vercel environment keys

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context, quickAnswer } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        response: "⚠️ OpenAI API key is missing on the Vercel server. Please configure OPENAI_API_KEY in your Vercel Project Settings.",
        type: "error"
      });
    }

    // Assemble operational summary context to pass as system prompt context
    const leads = context?.leads || [];
    const students = context?.students || [];
    const sessions = context?.sessions || [];
    const webinars = context?.webinars || [];
    const finances = context?.finances || [];
    const tasks = context?.tasks || [];
    const analytics = context?.analytics || {};

    const totalLeads = leads.length;
    const hotLeads = leads.filter(l => l.leadScore >= 8 || /hot/i.test(l.status)).length;
    const convertedLeads = leads.filter(l => l.status === 'Converted' || /converted/i.test(l.status)).length;
    const conversionRate = totalLeads ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;
    const followupsDue = leads.filter(l => l.status === 'Follow-up Required' || /follow/i.test(l.status)).length;

    const totalRevenue = finances.filter(f => f.type === 'Revenue' || f.amount > 0).reduce((sum, f) => sum + Math.abs(f.amount), 0);
    const totalExpenses = finances.filter(f => f.type === 'Expense' || f.amount < 0).reduce((sum, f) => sum + Math.abs(f.amount), 0);
    
    const upcomingSessions = sessions.filter(s => s.status === 'Scheduled').length;
    const openTasks = tasks.filter(t => t.status !== 'Done').length;

    const memoryContext = context?.memoryContext || "";

    const systemPrompt = `
You are EOS (E-Brave Operational System), a premium, state-of-the-art AI Operational Intelligence Assistant, Analytics Officer, and Business Monitoring dashboard companion for E-Brave (an educational & career guidance counseling ecosystem in India).

You write responses in clear, readable Github Markdown with emojis.
Keep your response professional, precise, direct, and actionable. Avoid generic fluff. Do not build custom analytics engines from scratch, but summarize operational metrics and logs.

Below is the structured E-Brave business memory context relevant to this query:
${memoryContext}

Below is the live operational dashboard telemetry context:
- TOTAL LEADS: ${totalLeads}
- HOT LEADS (Score 8+): ${hotLeads}
- CONVERTED LEADS: ${convertedLeads}
- CONVERSION RATE: ${conversionRate}%
- PENDING/DUE FOLLOW-UPS: ${followupsDue}
- INCOMING SESSIONS: ${upcomingSessions}
- PENDING TASKS: ${openTasks}
- TOTAL REVENUE ACQUIRED: ₹${totalRevenue.toLocaleString('en-IN')}
- TOTAL EXPENSES RECORDED: ₹${totalExpenses.toLocaleString('en-IN')}
- NET ESTIMATED PROFIT: ₹${(totalRevenue - totalExpenses).toLocaleString('en-IN')}
- WEB ANALYTICS SUMMARY: Bounce rate is ${analytics.bounceRate || '52'}%, daily pageviews average ${analytics.pageViews || '1,200'}, traffic sources are predominantly Instagram (45%), YouTube (30%), Google SEO Search Console (25%).

RESPONSE FORMAT RULES:
${quickAnswer ? `
- You are in Quick Answer Mode. Keep response extremely concise, direct, and under 3-4 sentences maximum. Answer the query directly and professionally without headers or summary blocks.
` : `
- Strictly format your response in Github Markdown using the following sections:
  ### 📝 Summary
  [A 1-2 sentence overview of the query and current state]

  ### 🚨 Key Issues
  [List bullet points identifying operational or funnel anomalies]

  ### 💡 Recommendations
  [Concrete steps or suggestions based on business rules or stream guidance]

  ### ⚠️ Risks
  [Potential issues or blockers if recommendations are not carried out]

  ### 🛠️ Suggested Actions
  [Specific checklist of tasks/assignments with counselor roles]
`}

Answer the user's request based on this telemetry and memory guidelines. Highlight anomalies (like high bounce rates, overdue followups, drop in conversion) and suggest specific, low-friction next actions. Do not assume or hallucinate details beyond what the context contains.
`;

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: quickAnswer ? 0.4 : 0.2,
      }),
    });

    const aiData = await openAiResponse.json();
    const replyText = aiData.choices?.[0]?.message?.content || "No reply from AI.";

    return res.status(200).json({
      response: replyText,
      type: 'ai_generation'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
