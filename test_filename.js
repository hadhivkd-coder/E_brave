import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndoteayinrpxqvwfsftc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kb3RlYXlpbnJweHF2d2ZzZnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMzY4OTUsImV4cCI6MjA5NDgxMjg5NX0.KR9wB5SAd7NL_74gz8ZhFO-b_1qL1ZQD3nZH206Y7-c';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const dummyBlob = new Blob(['Test'], { type: 'application/pdf' });
  const badFileName = Date.now() + '_+91 9876543210_dossier.pdf';

  const { data, error } = await supabase.storage.from('dossiers').upload(badFileName, dummyBlob, {
    contentType: 'application/pdf',
    upsert: true
  });

  if (error) {
    console.error('ERROR:', error);
  } else {
    console.log('SUCCESS:', data);
  }
}

run();
