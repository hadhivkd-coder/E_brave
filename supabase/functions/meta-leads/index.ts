import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// Your secret verification token (You will enter this in Facebook later)
const FB_VERIFY_TOKEN = Deno.env.get('FB_VERIFY_TOKEN') || 'EBRAVE_OS_SECURE_TOKEN_2026';

serve(async (req) => {
  const url = new URL(req.url);

  // ==========================================
  // 1. FACEBOOK WEBHOOK VERIFICATION (GET)
  // ==========================================
  if (req.method === 'GET') {
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === FB_VERIFY_TOKEN) {
      console.log('Webhook verified successfully!');
      return new Response(challenge, { status: 200 });
    } else {
      console.error('Webhook verification failed.');
      return new Response('Forbidden', { status: 403 });
    }
  }

  // ==========================================
  // 2. RECEIVE LEAD DATA (POST)
  // ==========================================
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      console.log('Incoming Meta Webhook:', JSON.stringify(body));

      // Check if this is a leadgen event
      if (body.object === 'page' && body.entry && body.entry.length > 0) {
        for (const entry of body.entry) {
          if (entry.changes && entry.changes.length > 0) {
            for (const change of entry.changes) {
              
              if (change.field === 'leadgen') {
                const leadgenId = change.value.leadgen_id;
                console.log(`Processing Lead ID: ${leadgenId}`);

                // 3. FETCH REAL DATA FROM FACEBOOK GRAPH API
                const fbAccessToken = Deno.env.get('FB_ACCESS_TOKEN');
                if (!fbAccessToken) throw new Error("Missing FB_ACCESS_TOKEN environment variable");

                const graphResponse = await fetch(
                  `https://graph.facebook.com/v19.0/${leadgenId}?access_token=${fbAccessToken}`
                );
                
                const leadData = await graphResponse.json();
                if (leadData.error) throw new Error(leadData.error.message);

                // 4. PARSE THE FACEBOOK DATA FORMAT
                // Facebook returns an array of field_data: [{name: 'full_name', values: ['John']}, {name: 'phone_number', values: ['123']}]
                let name = 'Meta Lead';
                let phone = 'N/A';
                let email = '';
                let city = '';

                if (leadData.field_data) {
                  leadData.field_data.forEach(field => {
                    const value = field.values[0];
                    if (field.name === 'full_name' || field.name === 'first_name') name = value;
                    if (field.name === 'phone_number') phone = value;
                    if (field.name === 'email') email = value;
                    if (field.name === 'city') city = value;
                  });
                }

                // 5. INSERT INTO SUPABASE PERSONS TABLE
                const supabaseAdmin = createClient(
                  Deno.env.get('SUPABASE_URL') ?? '',
                  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
                );

                const personPayload = {
                  name,
                  phone,
                  email,
                  city,
                  source: 'Meta Ads',
                  lifecycle_stage: 'New Lead'
                };

                const { data: person, error: insertError } = await supabaseAdmin
                  .from('persons')
                  .insert([personPayload])
                  .select()
                  .single();

                if (insertError) throw insertError;

                // 6. LOG THE ACTIVITY
                await supabaseAdmin.from('activity_logs').insert([{
                  person_id: person.id,
                  action_type: 'Meta Ad Registration',
                  payload: { leadgen_id: leadgenId, form_id: change.value.form_id }
                }]);

                console.log(`Successfully saved Meta Lead: ${name}`);
              }
            }
          }
        }
      }

      return new Response('EVENT_RECEIVED', { status: 200 });

    } catch (error) {
      console.error('Error processing Meta lead:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  return new Response('Method Not Allowed', { status: 405 });
});
