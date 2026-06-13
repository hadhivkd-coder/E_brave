import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { person_id, message, provider = 'WhatsApp' } = await req.json()

    // Setup Supabase Admin Client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch the person to get their phone number
    const { data: person, error: personError } = await supabaseAdmin
      .from('persons')
      .select('*')
      .eq('id', person_id)
      .single()

    if (personError || !person) {
      throw new Error('Person not found')
    }

    // In a real production environment, you would invoke the WhatsApp Cloud API here:
    /*
      const waToken = Deno.env.get('WA_ACCESS_TOKEN');
      const waPhoneNumberId = Deno.env.get('WA_PHONE_NUMBER_ID');
      
      const response = await fetch(`https://graph.facebook.com/v19.0/${waPhoneNumberId}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${waToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: person.phone,
          type: "text",
          text: { body: message }
        })
      });
      const result = await response.json();
    */

    // For this simulation, we assume success and log the activity directly
    const mockMessageId = `wamid.mock.${Date.now()}`

    await supabaseAdmin.from('activity_logs').insert([{
      person_id: person.id,
      action_type: `${provider} Sent`,
      payload: { 
        message: message, 
        provider_message_id: mockMessageId, 
        status: 'delivered' 
      }
    }])

    return new Response(
      JSON.stringify({ success: true, messageId: mockMessageId, message: "Simulated outbound message sent successfully." }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
