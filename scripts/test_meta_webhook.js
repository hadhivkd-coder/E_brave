// Using native fetch

const FUNCTION_URL = 'https://ndoteayinrpxqvwfsftc.supabase.co/functions/v1/meta-leads';

const mockFacebookPayload = {
  object: 'page',
  entry: [
    {
      id: 'mock_page_id',
      time: Date.now(),
      changes: [
        {
          value: {
            form_id: 'mock_form_123',
            leadgen_id: 'mock_lead_999',
            created_time: Math.floor(Date.now() / 1000),
            page_id: 'mock_page_id'
          },
          field: 'leadgen'
        }
      ]
    }
  ]
};

async function testWebhook() {
  console.log('🚀 Simulating Facebook Webhook Push...');
  
  try {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockFacebookPayload)
    });

    const text = await response.text();
    console.log(`\nStatus Code: ${response.status}`);
    console.log(`Response: ${text}`);

    if (response.status === 200) {
      console.log('\n✅ SUCCESS: The Edge Function accepted the Facebook payload.');
      console.log('However, since "mock_lead_999" is not a real Facebook Lead ID, the function will likely log a 500 error internally when it tries to fetch the actual Graph API data using the FB_ACCESS_TOKEN.');
    } else {
      console.log('\n❌ FAILED: The Edge Function rejected the payload.');
    }
  } catch (err) {
    console.error('Error hitting webhook:', err.message);
  }
}

testWebhook();
