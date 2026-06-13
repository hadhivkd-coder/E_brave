import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// Your secret verification token for WhatsApp Webhook
const WA_VERIFY_TOKEN = Deno.env.get('WA_VERIFY_TOKEN') || 'EBRAVE_WA_SECURE_TOKEN_2026';

serve(async (req) => {
  const url = new URL(req.url);

  // ==========================================
  // 1. WHATSAPP WEBHOOK VERIFICATION (GET)
  // ==========================================
  if (req.method === 'GET') {
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === WA_VERIFY_TOKEN) {
      console.log('WhatsApp Webhook verified successfully!');
      return new Response(challenge, { status: 200 });
    } else {
      console.error('WhatsApp Webhook verification failed.');
      return new Response('Forbidden', { status: 403 });
    }
  }

  // ==========================================
  // 2. RECEIVE INCOMING MESSAGES (POST)
  // ==========================================
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      console.log('Incoming WhatsApp Webhook:', JSON.stringify(body));

      if (body.object === 'whatsapp_business_account' && body.entry && body.entry.length > 0) {
        for (const entry of body.entry) {
          if (entry.changes && entry.changes.length > 0) {
            for (const change of entry.changes) {
              if (change.value.messages && change.value.messages.length > 0) {
                const message = change.value.messages[0];
                const contact = change.value.contacts[0];
                
                const senderPhone = message.from;
                const messageText = message.text?.body || '[Non-text message]';
                const messageId = message.id;

                // 3. MATCH PHONE NUMBER TO PERSON IN SUPABASE
                const supabaseAdmin = createClient(
                  Deno.env.get('SUPABASE_URL') ?? '',
                  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
                );

                const { data: persons } = await supabaseAdmin
                  .from('persons')
                  .select('id, name')
                  .eq('phone', senderPhone)
                  .limit(1);

                let personId = null;

                if (persons && persons.length > 0) {
                  personId = persons[0].id;
                  
                  // 4. LOG INCOMING MESSAGE TO TIMELINE
                  await supabaseAdmin.from('activity_logs').insert([{
                    person_id: personId,
                    action_type: 'WhatsApp Received',
                    payload: { message: messageText, provider_message_id: messageId }
                  }]);
                  
                  console.log(`Logged incoming message from ${persons[0].name}`);
                } else {
                  console.log(`Received message from unknown number: ${senderPhone}`);
                }
              }
            }
          }
        }
      }

      return new Response('EVENT_RECEIVED', { status: 200 });

    } catch (error) {
      console.error('Error processing WhatsApp webhook:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  return new Response('Method Not Allowed', { status: 405 });
});
