// supabase/functions/eos-ai/index.js
// Supabase Edge Function for EOS AI Operations Officer
// Routes queries to OpenAI GPT-4o-mini securely using environment keys

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, context, quickAnswer } = await req.json();
    const apiKey = Deno.env.get('OPENAI_API_KEY');

    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          response: "⚠️ OpenAI API key is missing on the server. Please configure OPENAI_API_KEY in your Supabase project dashboard settings.",
          type: "error" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Assemble operational summary context to pass as system prompt context
    const leads = context?.leads || [];
    const students = context?.students || [];
    const sessions = context?.sessions || [];
    const webinars = context?.webinars || [];
    const content = context?.content || [];
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

    // Call OpenAI GPT-4o-mini
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
        temperature: quickAnswer ? 0.4 : 0.2, // Slightly more creative for quick answers, highly structured for reports
      }),
    });

    const aiData = await openAiResponse.json();
    const replyText = aiData.choices?.[0]?.message?.content || "No reply from AI.";

    return new Response(
      JSON.stringify({ 
        response: replyText, 
        type: "ai_generation" 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
