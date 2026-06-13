import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function fixSalesRole() {
  console.log('Fixing sales user role...');
  const { data, error } = await supabase
    .from('profiles')
    .update({ role: 'Sales' })
    .eq('email', 'sales@ebrave.in');

  if (error) {
    console.error('Error updating role:', error.message);
  } else {
    console.log('Successfully updated sales role to Sales');
  }
}

fixSalesRole();
