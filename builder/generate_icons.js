const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ -1) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function makePng(width, height, pixelFn) {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bit per channel
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdrData);

  const rawScanlines = Buffer.alloc((width * 4 + 1) * height);
  let pos = 0;
  for (let y = 0; y < height; y++) {
    rawScanlines[pos++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const rgba = pixelFn(x, y, width, height);
      rawScanlines[pos++] = rgba[0];
      rawScanlines[pos++] = rgba[1];
      rawScanlines[pos++] = rgba[2];
      rawScanlines[pos++] = rgba[3];
    }
  }

  const compressed = zlib.deflateSync(rawScanlines, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Icon renderer: Stylized "C" with glowing cyan/sapphire gradient on dark background
function drawIconPixel(x, y, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const rOuter = w * 0.40;
  const rInner = w * 0.22;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx); // -pi to pi

  // Background: dark rounded rectangle or radial glow
  const cornerR = w * 0.22;
  const inBoxX = Math.abs(dx) <= (cx - cornerR);
  const inBoxY = Math.abs(dy) <= (cy - cornerR);
  let inRounded = false;
  if (inBoxX || inBoxY) {
    inRounded = (Math.abs(dx) <= cx && Math.abs(dy) <= cy);
  } else {
    const cdx = Math.abs(dx) - (cx - cornerR);
    const cdy = Math.abs(dy) - (cy - cornerR);
    inRounded = (cdx * cdx + cdy * cdy) <= cornerR * cornerR;
  }

  if (!inRounded) {
    return [0, 0, 0, 0]; // Transparent outside icon bounds
  }

  // Base background: deep carbon (#0c1017 with sapphire radial glow)
  const bgGrad = Math.min(1, dist / (w * 0.65));
  let bgR = Math.round(10 + 12 * (1 - bgGrad));
  let bgG = Math.round(14 + 18 * (1 - bgGrad));
  let bgB = Math.round(24 + 40 * (1 - bgGrad));

  // Outer subtle shield rim
  if (dist > rOuter * 1.15 && dist < rOuter * 1.22) {
    return [30, 80, 160, 255];
  }

  // C Letter arc: angle between -0.75 rad and +0.75 rad is the right-side gap of "C"
  const inGap = (angle > -0.65 && angle < 0.65);
  const inCArc = (dist >= rInner && dist <= rOuter && !inGap);

  if (inCArc) {
    // Beautiful cyan-to-sapphire vertical gradient
    const grad = (y - (cy - rOuter)) / (2 * rOuter);
    const r = Math.round(0 * (1 - grad) + 56 * grad);
    const g = Math.round(210 * (1 - grad) + 140 * grad);
    const b = Math.round(255 * (1 - grad) + 245 * grad);
    return [r, g, b, 255];
  }

  // Soft glow inside the gap
  if (dist >= rInner * 0.8 && dist <= rOuter * 1.05 && inGap) {
    const glow = Math.max(0, 1 - Math.abs(angle) / 0.7);
    return [
      Math.min(255, bgR + Math.round(0 * glow)),
      Math.min(255, bgG + Math.round(120 * glow)),
      Math.min(255, bgB + Math.round(180 * glow)),
      255
    ];
  }

  return [bgR, bgG, bgB, 255];
}

// Banner / Social Share (arena.png 1200x630)
function drawBannerPixel(x, y, w, h) {
  // Deep dark gradient background
  const t = x / w;
  const bgR = Math.round(8 + 10 * t);
  const bgG = Math.round(12 + 15 * t);
  const bgB = Math.round(22 + 35 * t);

  // Big centered C icon on the left-center
  const iconSize = 280;
  const icx = 300;
  const icy = 315;
  const idx = x - icx;
  const idy = y - icy;
  const idist = Math.sqrt(idx * idx + idy * idy);
  const iangle = Math.atan2(idy, idx);

  const rOuter = iconSize * 0.42;
  const rInner = iconSize * 0.24;
  const inGap = (iangle > -0.65 && iangle < 0.65);
  const inCArc = (idist >= rInner && idist <= rOuter && !inGap);

  if (inCArc) {
    const grad = (y - (icy - rOuter)) / (2 * rOuter);
    const r = Math.round(30 * (1 - grad) + 70 * grad);
    const g = Math.round(200 * (1 - grad) + 160 * grad);
    const b = Math.round(255);
    return [r, g, b, 255];
  }

  // Cyan glowing accent line across top
  if (y >= 0 && y < 6) {
    return [0, 210, 255, 255];
  }

  // Glowing tech dots or subtle grid
  if (x > 550 && y > 150 && y < 480) {
    if ((x % 30 === 0 && y % 30 === 0)) {
      return [40, 90, 160, 255];
    }
  }

  return [bgR, bgG, bgB, 255];
}

const outDir = path.resolve(__dirname, '..', 'arenaC');

console.log('Generating favicon.png (64x64)...');
fs.writeFileSync(path.join(outDir, 'favicon.png'), makePng(64, 64, drawIconPixel));

console.log('Generating icon-192.png (192x192)...');
fs.writeFileSync(path.join(outDir, 'icon-192.png'), makePng(192, 192, drawIconPixel));

console.log('Generating icon-512.png (512x512)...');
fs.writeFileSync(path.join(outDir, 'icon-512.png'), makePng(512, 512, drawIconPixel));

console.log('Generating arena.png (1200x630)...');
fs.writeFileSync(path.join(outDir, 'arena.png'), makePng(1200, 630, drawBannerPixel));

console.log('ALL ICONS GENERATED SUCCESSFULLY!');

