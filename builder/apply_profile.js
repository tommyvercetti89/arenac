const fs = require('fs');

console.log('--- Applying Profile Feature Updates ---');

// 1. UPDATE arenaC/index.html
let html = fs.readFileSync('arenaC/index.html', 'utf8');

// Add profileBtn next to settingsBtn
const oldSettingsBtn = `<button class="icon-btn" id="settingsBtn" type="button" title="Ayarlar" aria-label="Ayarlar">`;
const newProfileAndSettingsBtn = `<button class="icon-btn" id="profileBtn" type="button" title="Profil" aria-label="Profil" data-i18n-title="profileBtnTitle">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </button>
        <button class="icon-btn" id="settingsBtn" type="button" title="Ayarlar" aria-label="Ayarlar">`;

html = html.replace(oldSettingsBtn, newProfileAndSettingsBtn);

// Add profileModal after settingsModal
const profileModalHtml = `
  <!-- Profile Modal -->
  <div class="modal-backdrop hidden" id="profileModal">
    <div class="modal modal-profile" role="dialog" aria-modal="true" aria-labelledby="profileTitle">
      <div class="modal-head">
        <h3 id="profileTitle" data-i18n="profileTitle">Kullanıcı Profili</h3>
        <button class="icon-btn" id="profileClose" type="button" title="Kapat" aria-label="Kapat">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="profile-card-header">
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
      </div>

      <div class="profile-actions-row">
        <button class="btn btn-primary" id="profileSaveBtn" type="button" data-i18n="profileSave">Kaydet</button>
        <button class="btn btn-ghost" id="profileDeleteBtn" type="button" data-i18n="profileDelete">Profili Sil</button>
      </div>

      <div class="setting-row profile-export-row">
        <div class="setting-info">
          <span class="setting-label" data-i18n="profileBackupTitle">Profil Yedekleme</span>
          <span class="setting-desc" data-i18n="profileBackupDesc">Bu profili ve ilerlemesini JSON olarak dışa aktar</span>
        </div>
        <div class="btn-group">
          <button class="btn btn-ghost btn-sm" id="profileExportBtn" type="button">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span data-i18n="profileExport">Profili İndir</span>
          </button>
          <button class="btn btn-ghost btn-sm" id="profileImportBtn" type="button">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            <span data-i18n="profileImport">Profil Yükle</span>
          </button>
          <input type="file" id="profileFileInput" accept=".json" class="hidden" />
        </div>
      </div>

      <p class="settings-feedback hidden" id="profileFeedback"></p>
    </div>
  </div>
`;

html = html.replace('</div>\n  </div>\n\n  <script src="questions.js" defer></script>', '</div>\n  </div>\n' + profileModalHtml + '\n  <script src="questions.js" defer></script>');
fs.writeFileSync('arenaC/index.html', html, 'utf8');
console.log('Successfully updated index.html with profile button and modal!');

// 2. UPDATE arenaC/style.css
let css = fs.readFileSync('arenaC/style.css', 'utf8');

const profileCss = `
/* Profile Modal Styles */
.modal-profile {
  max-width: 500px;
}

.profile-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(255, 212, 59, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 212, 59, 0.25);
  margin-bottom: 16px;
}

:root[data-theme="light"] .profile-card-header {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(0, 0, 0, 0.02) 100%);
  border-color: rgba(245, 158, 11, 0.3);
}

.profile-avatar-large {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: rgba(255, 212, 59, 0.15);
  color: #ffd43b;
  border: 2px solid rgba(255, 212, 59, 0.4);
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(255, 212, 59, 0.15);
}

:root[data-theme="light"] .profile-avatar-large {
  background: rgba(245, 158, 11, 0.18);
  color: #b45309;
  border-color: rgba(245, 158, 11, 0.45);
}

.profile-avatar-large .icon {
  width: 32px;
  height: 32px;
}

.profile-header-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.profile-display-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.01em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-display-title {
  font-family: var(--font-mono);
  font-size: 12.5px;
  font-weight: 700;
  color: #ffd43b;
  letter-spacing: 0.02em;
}

:root[data-theme="light"] .profile-display-title {
  color: #b45309;
}

.profile-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 18px;
}

@media (max-width: 480px) {
  .profile-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.profile-stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 6px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  text-align: center;
}

:root[data-theme="light"] .profile-stat-box {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.profile-stat-val {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  color: var(--text);
}

.profile-stat-lbl {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 2px;
}

.profile-switch-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-select {
  padding: 8px 12px;
  font-size: 13px;
  min-width: 150px;
}

.profile-input {
  width: 100%;
  max-width: 220px;
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.profile-input:focus {
  border-color: #ffd43b;
  box-shadow: 0 0 0 3px rgba(255, 212, 59, 0.2);
}

.profile-avatar-section {
  padding: 12px 0 6px;
  border-bottom: 1px solid var(--border);
}

.profile-avatar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.avatar-choice-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.avatar-choice-btn .icon {
  width: 20px;
  height: 20px;
}

.avatar-choice-btn:hover {
  background: var(--surface-strong);
  color: var(--text);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.avatar-choice-btn.active {
  background: rgba(255, 212, 59, 0.15);
  color: #ffd43b;
  border-color: rgba(255, 212, 59, 0.5);
  box-shadow: 0 3px 10px rgba(255, 212, 59, 0.2);
}

:root[data-theme="light"] .avatar-choice-btn.active {
  background: rgba(245, 158, 11, 0.16);
  color: #b45309;
  border-color: rgba(245, 158, 11, 0.5);
}

.profile-actions-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 0 6px;
  border-bottom: 1px solid var(--border);
}

.profile-export-row {
  border-bottom: 0 !important;
  padding-bottom: 4px !important;
}
`;

css += '\n' + profileCss;
fs.writeFileSync('arenaC/style.css', css, 'utf8');
console.log('Successfully updated style.css with profile modal styles!');

// 3. UPDATE arenaC/app.js
let app = fs.readFileSync('arenaC/app.js', 'utf8');

// Add i18n keys to tr and en
const trProfileKeys = `
    profileTitle: "Kullanıcı Profili",
    profileBtnTitle: "Profil",
    profileActive: "Aktif Profil",
    profileActiveDesc: "Farklı profiller arasında geçiş yap",
    profileNew: "+ Yeni",
    profileName: "Kullanıcı Adı",
    profileNameDesc: "Profilinde görünecek takma isim",
    profileAvatar: "Avatar Seç",
    profileAvatarDesc: "Sana uygun bir simge belirle",
    profileSave: "Kaydet",
    profileDelete: "Profili Sil",
    profileBackupTitle: "Profil Yedekleme",
    profileBackupDesc: "Bu profili ve ilerlemesini JSON olarak dışa aktar",
    profileExport: "Profili İndir",
    profileImport: "Profil Yükle",
    profileSaved: "Profil başarıyla güncellendi.",
    profileCreated: "Yeni profil oluşturuldu.",
    profileSwitch: "Profile geçildi.",
    profileExportDone: "Profil ve ilerleme başarıyla indirildi.",
    profileImportDone: "Profil başarıyla içe aktarıldı!",
    profileDeleteConfirm: "Bu profili ve ilerlemesini silmek istediğine emin misin?",
    profileDefaultName: "C Programcısı",
    profileApprentice: "C Çırağı",
    profileCoder: "C Geliştirici",
    profilePointerMaster: "Pointer Ustası",
    profileArchitect: "Bellek Mimarı",
    profileGuru: "C Gurusu",`;

const enProfileKeys = `
    profileTitle: "User Profile",
    profileBtnTitle: "Profile",
    profileActive: "Active Profile",
    profileActiveDesc: "Switch between different profiles",
    profileNew: "+ New",
    profileName: "Username",
    profileNameDesc: "Display name on your profile",
    profileAvatar: "Choose Avatar",
    profileAvatarDesc: "Select an avatar that suits you",
    profileSave: "Save",
    profileDelete: "Delete Profile",
    profileBackupTitle: "Profile Backup",
    profileBackupDesc: "Export this profile and its progress as JSON",
    profileExport: "Export Profile",
    profileImport: "Import Profile",
    profileSaved: "Profile updated successfully.",
    profileCreated: "New profile created.",
    profileSwitch: "Switched profile.",
    profileExportDone: "Profile and progress exported successfully.",
    profileImportDone: "Profile imported successfully!",
    profileDeleteConfirm: "Are you sure you want to delete this profile and its progress?",
    profileDefaultName: "C Programmer",
    profileApprentice: "C Apprentice",
    profileCoder: "C Developer",
    profilePointerMaster: "Pointer Master",
    profileArchitect: "Memory Architect",
    profileGuru: "C Guru",`;

app = app.replace('    documentTitle: "ArenaC · C Dili Mantık Testi",', '    documentTitle: "ArenaC · C Dili Mantık Testi",' + trProfileKeys);
app = app.replace('    documentTitle: "ArenaC · C Logic Quiz",', '    documentTitle: "ArenaC · C Logic Quiz",' + enProfileKeys);

// Add AVATARS dictionary before state
const avatarsCode = `
const AVATARS = {
  terminal: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>\`,
  chip: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>\`,
  pointer: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="m13 13 6 6"></path></svg>\`,
  shield: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>\`,
  bug: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="m10 4 1 2"></path><path d="m14 4-1 2"></path></svg>\`,
  gear: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>\`,
  flame: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>\`,
  code: \`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>\`
};
`;

app = app.replace('const state = {', avatarsCode + '\nconst state = {');

// Add currentProfile to state
app = app.replace(
  'lineNumbers: true\n};',
  'lineNumbers: true,\n  currentProfile: null\n};'
);

// Add profile DOM elements to els
const profileEls = `  profileBtn: document.getElementById("profileBtn"),
  profileModal: document.getElementById("profileModal"),
  profileClose: document.getElementById("profileClose"),
  profileAvatarIcon: document.getElementById("profileAvatarIcon"),
  profileNameDisplay: document.getElementById("profileNameDisplay"),
  profileTitleDisplay: document.getElementById("profileTitleDisplay"),
  profileStatLevel: document.getElementById("profileStatLevel"),
  profileStatXp: document.getElementById("profileStatXp"),
  profileStatStreak: document.getElementById("profileStatStreak"),
  profileStatAccuracy: document.getElementById("profileStatAccuracy"),
  profileSelector: document.getElementById("profileSelector"),
  profileNewBtn: document.getElementById("profileNewBtn"),
  profileNameInput: document.getElementById("profileNameInput"),
  profileAvatarGrid: document.getElementById("profileAvatarGrid"),
  profileSaveBtn: document.getElementById("profileSaveBtn"),
  profileDeleteBtn: document.getElementById("profileDeleteBtn"),
  profileExportBtn: document.getElementById("profileExportBtn"),
  profileImportBtn: document.getElementById("profileImportBtn"),
  profileFileInput: document.getElementById("profileFileInput"),
  profileFeedback: document.getElementById("profileFeedback"),\n`;

app = app.replace('  settingsBtn: document.getElementById("settingsBtn"),', profileEls + '  settingsBtn: document.getElementById("settingsBtn"),');

// Add profile management functions before openSettings
const profileLogic = `
let profileFeedbackTimer = null;

function showProfileFeedback(msg) {
  els.profileFeedback.textContent = msg;
  els.profileFeedback.classList.remove("hidden");
  if (profileFeedbackTimer) clearTimeout(profileFeedbackTimer);
  profileFeedbackTimer = setTimeout(() => {
    els.profileFeedback.classList.add("hidden");
  }, 2600);
}

function getProfileTitle(level) {
  const d = dict();
  if (level <= 2) return d.profileApprentice;
  if (level <= 4) return d.profileCoder;
  if (level <= 7) return d.profilePointerMaster;
  if (level <= 10) return d.profileArchitect;
  return d.profileGuru;
}

function getProfiles() {
  try {
    const raw = localStorage.getItem("arenac:profiles");
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
  } catch (e) {}

  const defaultProf = {
    id: "prof_default",
    name: dict().profileDefaultName,
    avatar: "terminal",
    createdAt: utcDayString(),
    progress: state.progress || defaultProgress()
  };
  saveProfiles([defaultProf]);
  return [defaultProf];
}

function saveProfiles(profiles) {
  try {
    localStorage.setItem("arenac:profiles", JSON.stringify(profiles));
  } catch (e) {}
}

function getActiveProfileId() {
  try {
    return localStorage.getItem("arenac:active_profile_id") || "prof_default";
  } catch (e) {
    return "prof_default";
  }
}

function setActiveProfileId(id) {
  try {
    localStorage.setItem("arenac:active_profile_id", id);
  } catch (e) {}
}

function getCurrentProfile() {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  const found = profiles.find((p) => p.id === activeId);
  return found || profiles[0];
}

function syncCurrentProfileProgress() {
  const profiles = getProfiles();
  const cur = getCurrentProfile();
  const idx = profiles.findIndex((p) => p.id === cur.id);
  if (idx !== -1) {
    profiles[idx].progress = state.progress;
    profiles[idx].bestScores = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("arenac:best:") || k === "arenac:survival_games")) {
        profiles[idx].bestScores[k] = localStorage.getItem(k);
      }
    }
    saveProfiles(profiles);
  }
}

function updateProfileNavbarIcon() {
  const cur = getCurrentProfile();
  const avKey = cur.avatar || "terminal";
  const svg = AVATARS[avKey] || AVATARS.terminal;
  els.profileBtn.innerHTML = svg;
  els.profileBtn.setAttribute("title", \`\${dict().profileBtnTitle} (\${cur.name})\`);
  els.profileBtn.setAttribute("aria-label", \`\${dict().profileBtnTitle} (\${cur.name})\`);
}

function renderProfileModalUI() {
  const cur = getCurrentProfile();
  const p = state.progress;
  const d = dict();
  const lvl = levelFromXp(p.xp);
  const total = p.totalAnswered || 0;
  const correct = p.totalCorrect || 0;
  const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Header
  const avKey = cur.avatar || "terminal";
  els.profileAvatarIcon.innerHTML = AVATARS[avKey] || AVATARS.terminal;
  els.profileNameDisplay.textContent = cur.name;
  els.profileTitleDisplay.textContent = \`\${fmt(d.level, { n: lvl })} · \${getProfileTitle(lvl)}\`;

  // Stats
  els.profileStatLevel.textContent = lvl;
  els.profileStatXp.textContent = p.xp || 0;
  els.profileStatStreak.textContent = p.streak || 0;
  els.profileStatAccuracy.textContent = \`%\${acc}\`;

  // Input
  els.profileNameInput.value = cur.name;

  // Selector
  const profiles = getProfiles();
  els.profileSelector.innerHTML = "";
  profiles.forEach((prof) => {
    const opt = document.createElement("option");
    opt.value = prof.id;
    opt.textContent = prof.name;
    if (prof.id === cur.id) opt.selected = true;
    els.profileSelector.appendChild(opt);
  });

  // Avatar Grid
  els.profileAvatarGrid.innerHTML = "";
  Object.keys(AVATARS).forEach((k) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = \`avatar-choice-btn\${k === avKey ? " active" : ""}\`;
    btn.dataset.avatar = k;
    btn.innerHTML = AVATARS[k];
    btn.addEventListener("click", () => {
      document.querySelectorAll(".avatar-choice-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      cur.avatar = k;
      els.profileAvatarIcon.innerHTML = AVATARS[k];
      sound.play("click");
    });
    els.profileAvatarGrid.appendChild(btn);
  });
}

function openProfile() {
  renderProfileModalUI();
  els.profileModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeProfile() {
  els.profileModal.classList.add("hidden");
  refreshModalOpen();
}

function switchProfile(targetId) {
  syncCurrentProfileProgress();
  const profiles = getProfiles();
  const target = profiles.find((p) => p.id === targetId);
  if (!target) return;

  setActiveProfileId(target.id);
  state.currentProfile = target;
  state.progress = target.progress ? { ...defaultProgress(), ...target.progress } : defaultProgress();
  saveProgress(state.progress);

  if (target.bestScores) {
    Object.keys(target.bestScores).forEach((k) => {
      try {
        localStorage.setItem(k, target.bestScores[k]);
      } catch (e) {}
    });
  }

  updateProfileNavbarIcon();
  refreshCurrentView();
  renderSurvivalBanner();
  renderProfileModalUI();
  showProfileFeedback(\`\${dict().profileSwitch} (\${target.name})\`);
  sound.play("click");
}

function createNewProfile() {
  const d = dict();
  const name = prompt(state.lang === "tr" ? "Yeni profil adı girin:" : "Enter new profile name:", d.profileDefaultName);
  if (!name || !name.trim()) return;

  syncCurrentProfileProgress();
  const profiles = getProfiles();
  const newProf = {
    id: \`prof_\${Date.now()}\`,
    name: name.trim().slice(0, 24),
    avatar: "chip",
    createdAt: utcDayString(),
    progress: defaultProgress(),
    bestScores: {}
  };

  profiles.push(newProf);
  saveProfiles(profiles);
  switchProfile(newProf.id);
  showProfileFeedback(d.profileCreated);
}

function saveCurrentProfileEdits() {
  const cur = getCurrentProfile();
  const newName = els.profileNameInput.value.trim();
  if (newName) {
    cur.name = newName.slice(0, 24);
  }
  const activeAvatarBtn = els.profileAvatarGrid.querySelector(".avatar-choice-btn.active");
  if (activeAvatarBtn && activeAvatarBtn.dataset.avatar) {
    cur.avatar = activeAvatarBtn.dataset.avatar;
  }

  const profiles = getProfiles();
  const idx = profiles.findIndex((p) => p.id === cur.id);
  if (idx !== -1) {
    profiles[idx] = cur;
    saveProfiles(profiles);
  }

  updateProfileNavbarIcon();
  renderProfileModalUI();
  showProfileFeedback(dict().profileSaved);
  sound.play("click");
}

function deleteCurrentProfile() {
  const profiles = getProfiles();
  if (profiles.length <= 1) {
    showProfileFeedback(state.lang === "tr" ? "En az bir profil bulunmalıdır." : "At least one profile is required.");
    sound.play("wrong");
    return;
  }
  const cur = getCurrentProfile();
  if (!confirm(dict().profileDeleteConfirm)) return;

  const remaining = profiles.filter((p) => p.id !== cur.id);
  saveProfiles(remaining);
  switchProfile(remaining[0].id);
  sound.play("click");
}

function exportCurrentProfile() {
  syncCurrentProfileProgress();
  const cur = getCurrentProfile();
  const d = dict();
  const exportData = {
    appName: "ArenaC",
    type: "arenac_profile",
    version: 2,
    exportDate: new Date().toISOString(),
    profile: {
      id: cur.id,
      name: cur.name,
      avatar: cur.avatar,
      createdAt: cur.createdAt
    },
    progress: state.progress,
    bestScores: cur.bestScores || {}
  };

  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const cleanName = cur.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
  a.href = url;
  a.download = \`arenac_profil_\${cleanName}_\${utcDayString()}.json\`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showProfileFeedback(d.profileExportDone);
  sound.play("click");
}

function importProfile(file) {
  if (!file) return;
  const d = dict();
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || (!data.profile && !data.progress)) {
        throw new Error("Geçersiz profil dosyası");
      }
      const profName = (data.profile && data.profile.name) ? data.profile.name : (data.appName ? "İçe Aktarılan Profil" : "Yedek Profil");
      const avatar = (data.profile && data.profile.avatar) ? data.profile.avatar : "terminal";
      const createdAt = (data.profile && data.profile.createdAt) ? data.profile.createdAt : utcDayString();
      const progress = data.progress ? { ...defaultProgress(), ...data.progress } : defaultProgress();
      const bestScores = data.bestScores || {};

      syncCurrentProfileProgress();
      const profiles = getProfiles();
      const newProf = {
        id: \`prof_\${Date.now()}\`,
        name: profName.slice(0, 24),
        avatar,
        createdAt,
        progress,
        bestScores
      };
      profiles.push(newProf);
      saveProfiles(profiles);
      switchProfile(newProf.id);
      showProfileFeedback(d.profileImportDone);
      sound.play("correct");
    } catch (err) {
      showProfileFeedback(dict().importError);
      sound.play("wrong");
    }
  };
  reader.readAsText(file);
}
`;

app = app.replace('function openSettings() {', profileLogic + '\nfunction openSettings() {');

// In saveProgress, sync with active profile
app = app.replace(
`function saveProgress(p) {
  try {
    localStorage.setItem("arenac:progress", JSON.stringify(p));
  } catch (e) {
    // ignore
  }
}`,
`function saveProgress(p) {
  try {
    localStorage.setItem("arenac:progress", JSON.stringify(p));
  } catch (e) {
    // ignore
  }
  syncCurrentProfileProgress();
}`
);

// Add event listeners for profile
const profileListeners = `
els.profileBtn.addEventListener("click", openProfile);
els.profileClose.addEventListener("click", closeProfile);
els.profileModal.addEventListener("click", (e) => {
  if (e.target === els.profileModal) closeProfile();
});
els.profileSelector.addEventListener("change", (e) => switchProfile(e.target.value));
els.profileNewBtn.addEventListener("click", createNewProfile);
els.profileSaveBtn.addEventListener("click", saveCurrentProfileEdits);
els.profileDeleteBtn.addEventListener("click", deleteCurrentProfile);
els.profileExportBtn.addEventListener("click", exportCurrentProfile);
els.profileImportBtn.addEventListener("click", () => els.profileFileInput.click());
els.profileFileInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    importProfile(e.target.files[0]);
    e.target.value = "";
  }
});
`;

app = app.replace('els.settingsBtn.addEventListener("click", openSettings);', profileListeners + '\nels.settingsBtn.addEventListener("click", openSettings);');

// Handle Escape key for profile modal
app = app.replace(
  'if (!els.confirmModal.classList.contains("hidden")) { closeConfirmExit(); closed = true; }',
  'if (!els.profileModal.classList.contains("hidden")) { closeProfile(); closed = true; }\n    else if (!els.confirmModal.classList.contains("hidden")) { closeConfirmExit(); closed = true; }'
);

// In init sequence, init profile and navbar icon
app = app.replace(
`state.progress = getProgress();
state.setup = getSavedSetup();`,
`state.progress = getProgress();
state.currentProfile = getCurrentProfile();
state.setup = getSavedSetup();`
);

app = app.replace(
`applyTheme(getSavedTheme() || "dark");
applyLanguage(getSavedLang() || "tr");
showScreen("home");`,
`applyTheme(getSavedTheme() || "dark");
applyLanguage(getSavedLang() || "tr");
updateProfileNavbarIcon();
showScreen("home");`
);

fs.writeFileSync('arenaC/app.js', app, 'utf8');
console.log('Successfully updated app.js with profile management!');

// 4. UPDATE arenaC/sw.js (bump cache to arenac-v9)
let sw = fs.readFileSync('arenaC/sw.js', 'utf8');
sw = sw.replace(/const CACHE = "arenac-v\d+";/, 'const CACHE = "arenac-v9";');
fs.writeFileSync('arenaC/sw.js', sw, 'utf8');
console.log('Successfully bumped sw.js cache to arenac-v9!');

