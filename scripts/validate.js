const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'src/app.js',
  'src/styles.css',
  'manifest.webmanifest',
  'assets/icon.svg',
  'assets/route-pattern.svg',
];

const requiredText = [
  ['index.html', 'Booking Party'],
  ['index.html', 'Truck Owner'],
  ['index.html', 'Live Tracking'],
  ['src/app.js', 'etaDestination'],
  ['src/app.js', 'available'],
  ['src/app.js', 'window.setInterval'],
  ['manifest.webmanifest', 'standalone'],
];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

for (const [file, text] of requiredText) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  if (!content.includes(text)) {
    throw new Error(`Expected ${file} to contain ${text}`);
  }
}

JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
console.log('Validation passed: mobile transport app files and key features are present.');
