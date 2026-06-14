const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log('Navigating to https://ebrave.vercel.app/admin/test-report ...');
  await page.goto('https://ebrave.vercel.app/admin/test-report', { waitUntil: 'networkidle2' });
  
  // Wait a few seconds for React to finish rendering if needed
  await new Promise(r => setTimeout(r, 3000));
  
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('BODY HTML LENGTH:', html.length);
  if (html.length < 2000) {
    console.log('BODY HTML:', html);
  } else {
    console.log('BODY HTML (first 500 chars):', html.substring(0, 500));
  }

  await browser.close();
})();
