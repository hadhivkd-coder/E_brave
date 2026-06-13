import fs from 'fs';

const FB_TOKEN = 'EAAQlezl4XikBRnAn9FpZCMBnvtx2IBIZAtPnlp192Cy0YRWDEYXZBqlp9FRpC9jDe0b6RGqQzKJj6B5op283llg0Jf8P20uzQ3h2AMuem0GXN5JoaVNbjeeAIZAcx37EZAOcelMeE6pUgXFBKFc3rvotOTihbZAdOTON7KSqeB3SQiC4AZCKiviCC7TS0QlpgZDZD';

async function run() {
  try {
    const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${FB_TOKEN}`);
    const pagesData = await pagesRes.json();
    if (!pagesData.data || pagesData.data.length === 0) return;

    const pageId = pagesData.data[0].id;
    const pageAccessToken = pagesData.data[0].access_token;

    const formsRes = await fetch(`https://graph.facebook.com/v19.0/${pageId}/leadgen_forms?access_token=${pageAccessToken}`);
    const formsData = await formsRes.json();

    let sql = `INSERT INTO public.persons (name, phone, email, source, lifecycle_stage)\n`;
    let values = [];

    for (const form of formsData.data) {
      const leadsRes = await fetch(`https://graph.facebook.com/v19.0/${form.id}/leads?access_token=${pageAccessToken}&limit=500`);
      const leadsData = await leadsRes.json();
      
      const leads = leadsData.data || [];

      for (const lead of leads) {
        let name = 'Meta Lead';
        let phone = '';
        let email = '';

        for (const field of lead.field_data) {
          if (field.name === 'full_name' || field.name === 'first_name') name = field.values[0];
          if (field.name === 'phone_number') phone = field.values[0];
          if (field.name === 'email') email = field.values[0];
        }

        if (!phone) continue;
        phone = phone.replace(/\D/g, ''); // Extract only digits
        
        // Escape single quotes for SQL
        name = name.replace(/'/g, "''");
        email = email.replace(/'/g, "''");

        values.push(`SELECT '${name}', '${phone}', '${email}', 'Meta Ads', 'New Lead' WHERE NOT EXISTS (SELECT 1 FROM public.persons WHERE phone = '${phone}')`);
      }
    }
    
    if (values.length > 0) {
      sql += values.join('\nUNION ALL\n') + `;\n`;
      fs.writeFileSync('./supabase/insert_meta.sql', sql);
      console.log(`Generated SQL to insert ${values.length} leads into supabase/insert_meta.sql`);
    }

  } catch (err) {
    console.error(err);
  }
}

run();
