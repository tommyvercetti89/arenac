const fs = require('fs');
const html = fs.readFileSync('arenaC/index.html', 'utf8');
const topbarMatch = html.match(/<div class="topbar-actions">([\s\S]*?)<\/div>/);
console.log('Topbar actions content:\n', topbarMatch ? topbarMatch[1] : 'NOT FOUND');

