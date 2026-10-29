const fs = require('fs');

console.log('--- Applying User Profile Icon & Order Updates ---');

// 1. UPDATE arenaC/index.html
let html = fs.readFileSync('arenaC/index.html', 'utf8');

// Move profileBtn to the RIGHT of settingsBtn (at the very right corner)
// Find the topbar-actions block
const humanSvg = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;

// Remove profileBtn from its previous position
html = html.replace(
  `        <button class="icon-btn" id="profileBtn" type="button" title="Profil" aria-label="Profil" data-i18n-title="profileBtnTitle">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </button>\n`,
  ''
);

// Place profileBtn AFTER settingsBtn (at the far right corner)
const oldSettingsClose = `        <button class="icon-btn" id="settingsBtn" type="button" title="Ayarlar" aria-label="Ayarlar">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>`;

const newSettingsAndProfile = `${oldSettingsClose}
        <button class="icon-btn" id="profileBtn" type="button" title="Profil" aria-label="Profil" data-i18n-title="profileBtnTitle">
          ${humanSvg}
        </button>`;

html = html.replace(oldSettingsClose, newSettingsAndProfile);

// Now update the profile modal structure so that the avatar selection is right directly underneath the header
const oldProfileModalInner = `      <div class="profile-card-header">
        <div class="profile-avatar-large" id="profileAvatarIcon"></div>
        <div class="profile-header-info">
          <h4 class="profile-display-name" id="profileNameDisplay">C Programcısı</h4>
          <span class="profile-display-title" id="profileTitleDisplay">Seviye 1 · C Çırağı</span>
        </div>
      </div>

      <div class="profile-stats-grid">
        <div class="profile-stat-box">
          <span class="profile-stat-val" id="profileStatLevel">1</span>
          <span class="profile-stat-lbl" data-i18n="statLevelLabel">Seviye</span>
        </div>
        <div class="profile-stat-box">
          <span class="profile-stat-val" id="profileStatXp">0</span>
          <span class="profile-stat-lbl">XP</span>
        </div>
        <div class="profile-stat-box">
          <span class="profile-stat-val" id="profileStatStreak">0</span>
          <span class="profile-stat-lbl" data-i18n="statStreakLabel">Seri</span>
        </div>
        <div class="profile-stat-box">
          <span class="profile-stat-val" id="profileStatAccuracy">%0</span>
          <span class="profile-stat-lbl" data-i18n="statsAccuracy">Doğruluk</span>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label" data-i18n="profileActive">Aktif Profil</span>
          <span class="setting-desc" data-i18n="profileActiveDesc">Farklı profiller arasında geçiş yap</span>
        </div>
        <div class="profile-switch-wrap">
          <select class="select profile-select" id="profileSelector"></select>
          <button class="btn btn-ghost btn-sm" id="profileNewBtn" type="button" data-i18n="profileNew">+ Yeni</button>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label" data-i18n="profileName">Kullanıcı Adı</span>
          <span class="setting-desc" data-i18n="profileNameDesc">Profilinde görünecek takma isim</span>
        </div>
        <input type="text" class="profile-input" id="profileNameInput" maxlength="24" placeholder="C Programcısı" />
      </div>

      <div class="profile-avatar-section">
        <div class="setting-info">
          <span class="setting-label" data-i18n="profileAvatar">Avatar Seç</span>
          <span class="setting-desc" data-i18n="profileAvatarDesc">Sana uygun bir simge belirle</span>
        </div>
        <div class="profile-avatar-grid" id="profileAvatarGrid"></div>
      </div>`;

const newProfileModalInner = `      <div class="profile-card-header">
        <div class="profile-avatar-large" id="profileAvatarIcon"></div>
        <div class="profile-header-info">
          <h4 class="profile-display-name" id="profileNameDisplay">C Programcısı</h4>
          <span class="profile-display-title" id="profileTitleDisplay">Seviye 1 · C Çırağı</span>
        </div>
      </div>

      <!-- Avatar Picker directly underneath the header card -->
      <div class="profile-avatar-picker">
        <span class="profile-picker-label" data-i18n="profileAvatar">Avatar Seç:</span>
        <div class="profile-avatar-grid" id="profileAvatarGrid"></div>
      </div>

      <div class="profile-stats-grid">
        <div class="profile-stat-box">
          <span class="profile-stat-val" id="profileStatLevel">1</span>
          <span class="profile-stat-lbl" data-i18n="statLevelLabel">Seviye</span>
        </div>
        <div class="profile-stat-box">
          <span class="profile-stat-val" id="profileStatXp">0</span>
          <span class="profile-stat-lbl">XP</span>
        </div>
        <div class="profile-stat-box">
          <span class="profile-stat-val" id="profileStatStreak">0</span>
          <span class="profile-stat-lbl" data-i18n="statStreakLabel">Seri</span>
        </div>
        <div class="profile-stat-box">
          <span class="profile-stat-val" id="profileStatAccuracy">%0</span>
          <span class="profile-stat-lbl" data-i18n="statsAccuracy">Doğruluk</span>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label" data-i18n="profileActive">Aktif Profil</span>
          <span class="setting-desc" data-i18n="profileActiveDesc">Farklı profiller arasında geçiş yap</span>
        </div>
        <div class="profile-switch-wrap">
          <select class="select profile-select" id="profileSelector"></select>
          <button class="btn btn-ghost btn-sm" id="profileNewBtn" type="button" data-i18n="profileNew">+ Yeni</button>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-label" data-i18n="profileName">Kullanıcı Adı</span>
          <span class="setting-desc" data-i18n="profileNameDesc">Profilinde görünecek takma isim</span>
        </div>
        <input type="text" class="profile-input" id="profileNameInput" maxlength="24" placeholder="C Programcısı" />
      </div>`;

html = html.replace(oldProfileModalInner, newProfileModalInner);
fs.writeFileSync('arenaC/index.html', html, 'utf8');
console.log('Successfully updated index.html!');

// 2. UPDATE arenaC/app.js
let app = fs.readFileSync('arenaC/app.js', 'utf8');

// Update AVATARS to have user (human) as the first and primary avatar
const newAvatars = `const AVATARS = {
  user: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>\`,
  coder: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M6 21v-2a6 6 0 0 1 12 0v2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line><path d="M4 11v2a2 2 0 0 0 2 2"></path><path d="M20 11v2a2 2 0 0 1-2 2"></path></svg>\`,
  wizard: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>\`,
  terminal: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>\`,
  chip: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>\`,
  shield: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>\`,
  flame: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>\`,
  pointer: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="m13 13 6 6"></path></svg>\`
};`;

app = app.replace(/const AVATARS = \{[\s\S]*?\n\};/, newAvatars);

// In default profile and import, set default avatar to "user"
app = app.replace('avatar: "terminal"', 'avatar: "user"');
app = app.replace('avatar: "chip"', 'avatar: "user"');

// Fix updateProfileNavbarIcon so it DOES NOT overwrite the human icon on profileBtn!
const oldUpdateNavIcon = `function updateProfileNavbarIcon() {
  const cur = getCurrentProfile();
  const avKey = cur.avatar || "terminal";
  const svg = AVATARS[avKey] || AVATARS.terminal;
  els.profileBtn.innerHTML = svg;
  els.profileBtn.setAttribute("title", \`\${dict().profileBtnTitle} (\${cur.name})\`);
  els.profileBtn.setAttribute("aria-label", \`\${dict().profileBtnTitle} (\${cur.name})\`);
}`;

const newUpdateNavIcon = `function updateProfileNavbarIcon() {
  const cur = getCurrentProfile();
  els.profileBtn.setAttribute("title", \`\${dict().profileBtnTitle} (\${cur.name})\`);
  els.profileBtn.setAttribute("aria-label", \`\${dict().profileBtnTitle} (\${cur.name})\`);
}`;

app = app.replace(oldUpdateNavIcon, newUpdateNavIcon);

// In renderProfileModalUI, fallback to "user" avatar
app = app.replace(
  'const avKey = cur.avatar || "terminal";\n  els.profileAvatarIcon.innerHTML = AVATARS[avKey] || AVATARS.terminal;',
  'const avKey = cur.avatar || "user";\n  els.profileAvatarIcon.innerHTML = AVATARS[avKey] || AVATARS.user;'
);

fs.writeFileSync('arenaC/app.js', app, 'utf8');
console.log('Successfully updated app.js!');

// 3. UPDATE arenaC/style.css
let css = fs.readFileSync('arenaC/style.css', 'utf8');

const pickerCss = `
.profile-avatar-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  margin-bottom: 16px;
}

:root[data-theme="light"] .profile-avatar-picker {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.08);
}

.profile-picker-label {
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
}
`;

css += '\n' + pickerCss;
fs.writeFileSync('arenaC/style.css', css, 'utf8');
console.log('Successfully updated style.css!');

// 4. BUMP SERVICE WORKER CACHE TO arenac-v10
let sw = fs.readFileSync('arenaC/sw.js', 'utf8');
sw = sw.replace(/const CACHE = "arenac-v\d+";/, 'const CACHE = "arenac-v10";');
fs.writeFileSync('arenaC/sw.js', sw, 'utf8');
console.log('Successfully bumped sw.js to arenac-v10!');

