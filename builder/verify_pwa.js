const fs = require('fs');

const baseDir = fs.existsSync('./index.html') ? './' : 'arenaC/';

console.log('--- Comprehensive PWA Verification ---');

// 1. Check manifest.webmanifest
const manifestRaw = fs.readFileSync(baseDir + 'manifest.webmanifest', 'utf8');
let manifest;
try {
  manifest = JSON.parse(manifestRaw);
  console.log('Manifest is valid JSON: YES');
} catch (e) {
  console.error('Manifest JSON Parse Error:', e);
  process.exit(1);
}

// Required fields
const reqs = ['name', 'short_name', 'start_url', 'display', 'icons'];
reqs.forEach(r => {
  if (!manifest[r]) {
    console.error('MISSING in manifest:', r);
  } else {
    console.log(`Manifest field [${r}]: OK`);
  }
});

// Check icons
if (Array.isArray(manifest.icons)) {
  console.log('Total icons in manifest:', manifest.icons.length);
  manifest.icons.forEach((ic, i) => {
    const p = baseDir + ic.src;
    const exists = fs.existsSync(p);
    console.log(`  Icon ${i + 1} (${ic.src}, ${ic.sizes}, ${ic.purpose}): ${exists ? 'EXISTS' : 'MISSING!'}`);
    if (!exists) process.exit(1);
  });
}

// 2. Check HTML meta tags
const html = fs.readFileSync(baseDir + 'index.html', 'utf8');

const checks = [
  { name: 'viewport', regex: /<meta name="viewport"[^>]+>/ },
  { name: 'theme-color', regex: /<meta name="theme-color"[^>]+>/ },
  { name: 'manifest link', regex: /<link rel="manifest"[^>]+>/ },
  { name: 'apple-touch-icon', regex: /<link rel="apple-touch-icon"[^>]+>/ },
  { name: 'apple-mobile-web-app-capable', regex: /<meta name="apple-mobile-web-app-capable"[^>]+>/ },
  { name: 'CSP meta tag', regex: /<meta http-equiv="Content-Security-Policy"[^>]+>/ },
  { name: 'favicon link', regex: /<link rel="icon"[^>]+>/ }
];

checks.forEach(c => {
  const match = html.match(c.regex);
  console.log(`HTML tag [${c.name}]: ${match ? 'FOUND' : 'MISSING'}`);
});

// 3. Check Service Worker
const sw = fs.readFileSync(baseDir + 'sw.js', 'utf8');
console.log('SW has install event:', sw.includes('self.addEventListener("install"'));
console.log('SW has activate event:', sw.includes('self.addEventListener("activate"'));
console.log('SW has fetch event:', sw.includes('self.addEventListener("fetch"'));

// 4. Check App.js install prompt handler
const app = fs.readFileSync(baseDir + 'app.js', 'utf8');
console.log('App has beforeinstallprompt handler:', app.includes('beforeinstallprompt'));
console.log('App has install modal / prompt logic:', app.includes('deferredInstallPrompt.prompt()'));

console.log('\n--- PWA Audit Complete ---');
