const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
  console.log('Starting preview server...');
  // Ensure we are previewing the dist folder
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], { shell: true });
  
  // Wait for server to boot
  await new Promise(r => setTimeout(r, 4000));

  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Capture all console output
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER EXCEPTION:', err.toString()));
  
  console.log('Navigating to http://localhost:4173...');
  try {
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  } catch (e) {
    console.log('Navigation Error:', e.message);
  }
  
  // Give it a second to run any React effects
  await new Promise(r => setTimeout(r, 2000));
  
  const content = await page.content();
  if (!content.includes('<div id="root"></div>') || content.length < 500) {
     console.log("HTML LOOKS EMPTY OR CRASHED");
  }

  console.log('Done capturing errors.');
  await browser.close();
  server.kill();
  process.exit(0);
})();
