const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER EXCEPTION:', err.toString()));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  console.log('Navigating to https://ebrave.in ...');
  try {
    await page.goto('https://ebrave.in', { waitUntil: 'networkidle0' });
  } catch (e) {
    console.log('Navigation Error:', e.message);
  }
  
  await new Promise(r => setTimeout(r, 3000));
  
  const content = await page.content();
  if (!content.includes('id="main-content"')) {
     console.log('MAIN CONTENT MISSING! White screen confirmed.');
  } else {
     console.log('MAIN CONTENT FOUND! Site is loading correctly.');
  }
  
  await browser.close();
  process.exit(0);
})();
