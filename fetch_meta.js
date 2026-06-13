const token = 'EAAQlezl4XikBRnAn9FpZCMBnvtx2IBIZAtPnlp192Cy0YRWDEYXZBqlp9FRpC9jDe0b6RGqQzKJj6B5op283llg0Jf8P20uzQ3h2AMuem0GXN5JoaVNbjeeAIZAcx37EZAOcelMeE6pUgXFBKFc3rvotOTihbZAdOTON7KSqeB3SQiC4AZCKiviCC7TS0QlpgZDZD';

async function run() {
  try {
    // 1. Get the pages this token has access to
    const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${token}`);
    const pagesData = await pagesRes.json();

    if (!pagesData.data || pagesData.data.length === 0) return;
    const pageId = pagesData.data[0].id;
    const pageAccessToken = pagesData.data[0].access_token; // <--- MUST USE THIS TOKEN

    // 2. Get the leadgen forms for the page
    const formsRes = await fetch(`https://graph.facebook.com/v19.0/${pageId}/leadgen_forms?access_token=${pageAccessToken}`);
    const formsData = await formsRes.json();

    if (!formsData.data || formsData.data.length === 0) {
      console.log("No forms found for page", pageId);
      return;
    }
    
    // We will collect all leads from all forms
    for (const form of formsData.data) {
        console.log(`Fetching leads for form: ${form.name} (${form.id})`);
        const leadsRes = await fetch(`https://graph.facebook.com/v19.0/${form.id}/leads?access_token=${pageAccessToken}&limit=100`);
        const leadsData = await leadsRes.json();
        console.log(`Leads Data for Form ${form.id}:`, JSON.stringify(leadsData.data, null, 2));
    }

  } catch (err) {
    console.error(err);
  }
}

run();
