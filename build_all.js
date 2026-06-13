const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building main site...');
execSync('vite build', { stdio: 'inherit' });

console.log('Building compass...');
execSync('npm install', { cwd: 'compass', stdio: 'inherit' });
execSync('npm run build', { cwd: 'compass', stdio: 'inherit' });

console.log('Copying compass/dist to dist/compass...');
const src = path.join(__dirname, 'compass', 'dist');
const dest = path.join(__dirname, 'dist', 'compass');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(src, dest);
console.log('Done!');
