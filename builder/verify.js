const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = fs.existsSync('./index.html') ? './' : 'arenaC/';

console.log('--- 1. Testing questions.js ---');
const qJs = fs.readFileSync(baseDir + 'questions.js', 'utf8');
const qContext = {};
qContext.window = qContext;
vm.createContext(qContext);
vm.runInContext(qJs, qContext);
console.log('QUESTIONS difficulties:', Object.keys(qContext.QUESTIONS));
console.log('TOPICS count:', Object.keys(qContext.TOPICS).length);

console.log('--- 2. Testing debug_questions.js ---');
const dqJs = fs.readFileSync(baseDir + 'debug_questions.js', 'utf8');
const dqContext = {};
dqContext.window = dqContext;
vm.createContext(dqContext);
vm.runInContext(dqJs, dqContext);
console.log('DEBUG_QUESTIONS difficulties:', Object.keys(dqContext.DEBUG_QUESTIONS));

console.log('--- 3. Testing questions.json ---');
const qJson = JSON.parse(fs.readFileSync(baseDir + 'questions.json', 'utf8'));
console.log('JSON questions count:', Object.values(qJson.questions).reduce((a, b) => a + b.length, 0));

console.log('--- 4. Testing debug_questions.json ---');
const dqJson = JSON.parse(fs.readFileSync(baseDir + 'debug_questions.json', 'utf8'));
console.log('JSON debug questions count:', Object.values(dqJson.questions).reduce((a, b) => a + b.length, 0));

console.log('--- 5. Testing manifest.webmanifest ---');
const manifest = JSON.parse(fs.readFileSync(baseDir + 'manifest.webmanifest', 'utf8'));
console.log('Manifest name:', manifest.name);

console.log('--- 6. Testing sw.js syntax ---');
const swJs = fs.readFileSync(baseDir + 'sw.js', 'utf8');
new vm.Script(swJs);
console.log('sw.js valid syntax!');

console.log('--- 7. Testing app.js syntax ---');
const appJs = fs.readFileSync(baseDir + 'app.js', 'utf8');
new vm.Script(appJs);
console.log('app.js valid syntax!');

console.log('--- 8. Testing image files ---');
const pngFiles = ['favicon.png', 'icon-192.png', 'icon-512.png', 'arena.png'];
pngFiles.forEach(f => {
  const buf = fs.readFileSync(baseDir + f);
  const isPng = buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]));
  console.log(f, 'Size:', buf.length, 'Valid PNG header:', isPng);
  if (!isPng) throw new Error('Invalid PNG: ' + f);
});

console.log('--- 9. Checking all IDs in index.html against app.js ---');
const html = fs.readFileSync(baseDir + 'index.html', 'utf8');
const idMatches = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
console.log('Found IDs in index.html:', idMatches.length);

const appJsMatches = [...appJs.matchAll(/document\.getElementById\("([^"]+)"\)/g)].map(m => m[1]);
console.log('IDs accessed in app.js:', appJsMatches.length);
appJsMatches.forEach(id => {
  if (!idMatches.includes(id)) {
    console.error('MISSING ID IN HTML:', id);
    process.exit(1);
  }
});

console.log('\nALL VERIFICATION CHECKS PASSED WITH 100% SUCCESS!');
