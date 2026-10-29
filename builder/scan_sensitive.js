const fs = require('fs');
const path = require('path');

function searchKeyword(dir, word) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const matches = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scan_sensitive.js') continue;
    if (entry.isDirectory()) {
      matches.push(...searchKeyword(full, word));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.html', '.css', '.js', '.json', '.webmanifest', '.md', '.txt'].includes(ext)) {
        const text = fs.readFileSync(full, 'utf8');
        if (text.toLowerCase().includes(word.toLowerCase())) {
          matches.push(full);
        }
      }
    }
  }
  return matches;
}

console.log('Search "toshiba":', searchKeyword('.', 'toshiba'));
console.log('Search "c:\\\\users":', searchKeyword('.', 'c:\\users'));
console.log('Search "desktop":', searchKeyword('.', 'desktop'));
console.log('Search "@":', searchKeyword('.', '@'));
