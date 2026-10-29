const fs = require('fs');

const html = fs.readFileSync('arenaC/index.html', 'utf8');

// Check all a tags and their href
const aTags = [...html.matchAll(/<a[^>]+>/g)].map(m => m[0]);
console.log('A tags count:', aTags.length);
console.log(aTags);

// Check all input tags
const inputTags = [...html.matchAll(/<input[^>]+>/g)].map(m => m[0]);
console.log('Input tags count:', inputTags.length);
console.log(inputTags);

// Check all select tags
const selectTags = [...html.matchAll(/<select[^>]+>/g)].map(m => m[0]);
console.log('Select tags count:', selectTags.length);
console.log(selectTags);
