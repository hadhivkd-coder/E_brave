const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
  console.log('Starting preview server...');
  const server = spawn('npm', ['run', 'preview'], { shell: true });
  
  await new Promise(r => setTimeout(r, 2000));

  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
  console.log('Navigating to http://localhost:4173...');
  try {
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  } catch (e) {
    console.log('Nav error:', e.message);
  }
  
  console.log('Done.');
  await browser.close();
  server.kill();
  process.exit(0);
})();
