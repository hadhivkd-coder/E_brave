import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function createSalesUser() {
  console.log('Creating sales user...');
  const { data, error } = await supabase.auth.signUp({
    email: 'sales@ebrave.in',
    password: 'sales123',
    options: {
      data: {
        name: 'Sales Rep'
      }
    }
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('Successfully created sales user:', data.user.email);
  }
}

createSalesUser();
