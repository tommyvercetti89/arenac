const fs = require('fs');

console.log('--- Applying PWA & Security Enhancements ---');

// 1. UPDATE arenaC/manifest.webmanifest
const enhancedManifest = {
  name: "ArenaC · C Dili Mantık Testi",
  short_name: "ArenaC",
  description: "Kodun çıktısını tahmin et: başlangıçtan uzman seviyeye, açıklamalı C dili mantık soruları.",
  lang: "tr",
  id: "arenac-pwa",
  start_url: "./index.html",
  scope: "./",
  display: "standalone",
  display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
  orientation: "any",
  categories: ["education", "developer", "utilities"],
  prefer_related_applications: false,
  background_color: "#0b0c10",
  theme_color: "#0b0c10",
  icons: [
    {
      src: "icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any"
    },
    {
      src: "icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable"
    },
    {
      src: "icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any"
    },
    {
      src: "icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable"
    }
  ],
  screenshots: [
    {
      src: "arena.png",
      sizes: "1200x630",
      type: "image/png",
      form_factor: "wide",
      label: "ArenaC · C Dili Mantık Testi"
    },
    {
      src: "arena.png",
      sizes: "1200x630",
      type: "image/png",
      form_factor: "narrow",
      label: "ArenaC · C Dili Mantık Testi"
    }
  ]
};

fs.writeFileSync('arenaC/manifest.webmanifest', JSON.stringify(enhancedManifest, null, 2), 'utf8');
console.log('Successfully updated manifest.webmanifest with rich install criteria!');

// 2. UPDATE arenaC/index.html (CSP & Meta tags)
let html = fs.readFileSync('arenaC/index.html', 'utf8');

// Update CSP to allow blob: for downloads and canvas, child-src for workers
const oldCsp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; manifest-src 'self'; worker-src 'self'; object-src 'none'; frame-src 'none'; media-src 'none'; base-uri 'none'; form-action 'none';" />`;

const newCsp = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' blob: https://fonts.googleapis.com https://fonts.gstatic.com; manifest-src 'self'; worker-src 'self'; child-src 'self'; object-src 'none'; frame-src 'none'; base-uri 'self';" />`;

html = html.replace(oldCsp, newCsp);

// Add modern PWA meta tags
const oldViewport = `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`;
const newMetaTags = `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="application-name" content="ArenaC" />
  <meta name="format-detection" content="telephone=no" />`;

html = html.replace(oldViewport, newMetaTags);

fs.writeFileSync('arenaC/index.html', html, 'utf8');
console.log('Successfully updated index.html CSP and PWA meta tags!');

// 3. UPDATE arenaC/sw.js (Resilient offline navigation handling & cache bump)
let sw = fs.readFileSync('arenaC/sw.js', 'utf8');
sw = sw.replace(/const CACHE = "arenac-v\d+";/, 'const CACHE = "arenac-v12";');

// Ensure navigation requests gracefully fallback to index.html
const oldFetch = `self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match("./index.html"));
      return cached || network;
    })
  );
});`;

const newFetch = `self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== location.origin) {
    return;
  }

  // Handle navigation requests (PWA launch / offline page load)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          return caches.match("./index.html").then((res) => res || caches.match("./"));
        })
    );
    return;
  }

  // Cache-first with background network revalidation for static assets
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match("./index.html"));
      return cached || network;
    })
  );
});`;

sw = sw.replace(oldFetch, newFetch);
fs.writeFileSync('arenaC/sw.js', sw, 'utf8');
console.log('Successfully updated sw.js with navigation fallback and bumped to arenac-v12!');

