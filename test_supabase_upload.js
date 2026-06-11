import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndoteayinrpxqvwfsftc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kb3RlYXlpbnJweHF2d2ZzZnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMzY4OTUsImV4cCI6MjA5NDgxMjg5NX0.KR9wB5SAd7NL_74gz8ZhFO-b_1qL1ZQD3nZH206Y7-c';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpload() {
  console.log('Testing Supabase Upload directly...');
  
  const dummyBlob = new Blob(['Test PDF Content'], { type: 'application/pdf' });
  const fileName = 'test_dossier.pdf';

  const { data, error } = await supabase.storage
    .from('dossiers')
    .upload(fileName, dummyBlob, {
      contentType: 'application/pdf',
      upsert: true
    });

  if (error) {
    console.log('\n=== EXACT SUPABASE ERROR MESSAGE ===');
    console.error(JSON.stringify(error, null, 2));
  } else {
    console.log('\nUpload Successful!');
    console.log(data);
  }
}

testUpload();
