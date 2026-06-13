import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// This function receives the webhook payload from Project A (ebrave.in website)
// and securely inserts it into Project B (E-Brave OS)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    // 1. Parse the incoming payload from the Website Database Webhook
    const payload = await req.json()
    console.log('Received payload from Website:', payload)

    // The webhook sends the new row data inside the `record` object
    const newRegistration = payload.record

    // If there is no record, return early
    if (!newRegistration) {
      return new Response(JSON.stringify({ error: 'No record found in payload' }), { status: 400 })
    }

    // 2. Initialize the Supabase Client for E-Brave OS (Project B)
    // We use the Service Role Key to bypass RLS policies for server-side inserts
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 3. Map the website registration data to the EOS `persons` table structure
    // (Adjust these fields depending on what your actual website registration table looks like)
    const personData = {
      name: newRegistration.name || newRegistration.full_name || 'Website Registration',
      email: newRegistration.email || '',
      phone: newRegistration.phone || 'N/A',
      city: newRegistration.city || 'Unknown',
      source: 'ebrave.in Website',
      lifecycle_stage: 'New Lead'
    }

    console.log('Inserting into EOS persons table:', personData)

    // 4. Insert the new person into the EOS database
    const { data: person, error: insertError } = await supabaseAdmin
      .from('persons')
      .insert([personData])
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting person:', insertError)
      throw insertError
    }

    // 5. (Optional but recommended) Log the activity in activity_logs
    await supabaseAdmin
      .from('activity_logs')
      .insert([{
        person_id: person.id,
        action_type: 'Website Registration',
        payload: { source: 'ebrave.in Website Webhook', raw_data: newRegistration }
      }])

    // Return success
    return new Response(
      JSON.stringify({ message: 'Successfully captured lead', person_id: person.id }),
      { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Webhook Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
