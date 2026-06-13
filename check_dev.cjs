const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
  console.log('Starting dev server...');
  const server = spawn('npm', ['run', 'dev', '--', '--port', '4173'], { shell: true });
  
  let serverReady = false;
  server.stdout.on('data', (data) => {
    if (data.toString().includes('Local:')) serverReady = true;
  });

  for (let i=0; i<15; i++) {
    if (serverReady) break;
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER EXCEPTION:', err.toString()));
  
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
  });

  console.log('Navigating to http://localhost:4173...');
  try {
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  } catch (e) {
    console.log('Navigation Error:', e.message);
  }
  
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('Done capturing errors.');
  await browser.close();
  server.kill();
  process.exit(0);
})();
