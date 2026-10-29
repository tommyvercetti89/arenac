const fs = require('fs');

console.log('--- Applying Badges Showcase & Profile Pinning Feature ---');

// 1. UPDATE arenaC/index.html
let html = fs.readFileSync('arenaC/index.html', 'utf8');

// Add badgesBtn in .home-panel-actions
const oldPanelActions = `<div class="home-panel-actions">
          <button class="btn btn-primary btn-sm" id="dailyBtn" type="button" data-i18n="dailyChallenge">Günlük Meydan Okuma</button>
          <button class="btn btn-ghost btn-sm" id="statsBtn" type="button" data-i18n="statsTitle">İstatistikler</button>
          <button class="btn btn-ghost btn-sm" id="mistakesBtn" type="button" data-i18n="mistakesTest">Yanlışlarımı Çalış</button>
          <button class="btn btn-ghost btn-sm" id="bookmarksBtn" type="button" data-i18n="bookmarksTest">Yıldızlı Sorular</button>
        </div>`;

const newPanelActions = `<div class="home-panel-actions">
          <button class="btn btn-primary btn-sm" id="dailyBtn" type="button" data-i18n="dailyChallenge">Günlük Meydan Okuma</button>
          <button class="btn btn-ghost btn-sm" id="statsBtn" type="button" data-i18n="statsTitle">İstatistikler</button>
          <button class="btn btn-ghost btn-sm" id="badgesBtn" type="button">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span data-i18n="badgesBtn">Başarımlar</span>
          </button>
          <button class="btn btn-ghost btn-sm" id="mistakesBtn" type="button" data-i18n="mistakesTest">Yanlışlarımı Çalış</button>
          <button class="btn btn-ghost btn-sm" id="bookmarksBtn" type="button" data-i18n="bookmarksTest">Yıldızlı Sorular</button>
        </div>`;

html = html.replace(oldPanelActions, newPanelActions);

// Update profileModal: remove avatar picker, add pinned badge showcase section
const oldProfileModalInner = `      <div class="profile-card-header">
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
      </div>`;

const newProfileModalInner = `      <div class="profile-card-header">
        <div class="profile-avatar-large" id="profileAvatarIcon">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <div class="profile-header-info">
          <h4 class="profile-display-name" id="profileNameDisplay">C Programcısı</h4>
          <span class="profile-display-title" id="profileTitleDisplay">Seviye 1 · C Çırağı</span>
        </div>
      </div>

      <!-- Pinned / Featured Badge Showcase -->
      <div class="profile-pinned-wrap" id="profilePinnedBadge"></div>`;

html = html.replace(oldProfileModalInner, newProfileModalInner);

// Add badgesModal before <script src="questions.js" defer>
const badgesModalHtml = `
  <!-- Badges & Achievements Modal -->
  <div class="modal-backdrop hidden" id="badgesModal">
    <div class="modal modal-badges" role="dialog" aria-modal="true" aria-labelledby="badgesTitle">
      <div class="modal-head">
        <div class="modal-title-wrap">
          <h3 id="badgesTitle" data-i18n="badgesModalTitle">Başarımlar & Rozetler</h3>
          <span class="chip chip-docs" id="badgesCount">0 / 20</span>
        </div>
        <button class="icon-btn" id="badgesClose" type="button" title="Kapat" aria-label="Kapat">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
        </button>
      </div>
      <p class="modal-sub" data-i18n="badgesModalSub">Kolaydan efsaneviye tüm hedefler. Kazandığın rozetlerden en beğendiğini profiline sabitleyebilirsin.</p>
      <div class="badges-showcase" id="badgesList"></div>
    </div>
  </div>
`;

html = html.replace('<script src="questions.js" defer></script>', badgesModalHtml + '\n  <script src="questions.js" defer></script>');
fs.writeFileSync('arenaC/index.html', html, 'utf8');
console.log('Successfully updated index.html with badgesBtn and badgesModal!');

// 2. UPDATE arenaC/style.css
let css = fs.readFileSync('arenaC/style.css', 'utf8');

// Remove avatar picker CSS rules
css = css.replace(/\.profile-avatar-picker\s*\{[\s\S]*?\.profile-picker-label\s*\{[\s\S]*?\}/, '');

const badgesAndPinStyles = `
/* Badges Modal & Pinned Badge Styles */
.modal-badges {
  max-width: 660px;
  height: min(88vh, 820px);
  display: flex;
  flex-direction: column;
  overflow: hidden !important;
}

.modal-sub {
  margin: 0 0 14px 0;
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.5;
  flex-shrink: 0;
}

.badges-showcase {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 4px 6px 20px 2px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scrollbar-width: thin;
}

.badge-tier-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.badge-tier-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

.badge-tier-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.badge-tier-pill {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badge-tier-pill.tier-easy {
  color: #3ddc84;
  background: rgba(61, 220, 132, 0.12);
  border: 1px solid rgba(61, 220, 132, 0.35);
}

.badge-tier-pill.tier-medium {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.35);
}

.badge-tier-pill.tier-hard {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.12);
  border: 1px solid rgba(192, 132, 252, 0.35);
}

.badge-tier-pill.tier-legendary {
  color: #ffd43b;
  background: rgba(255, 212, 59, 0.14);
  border: 1px solid rgba(255, 212, 59, 0.45);
}

.badge-tier-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 540px) {
  .badge-tier-grid {
    grid-template-columns: 1fr;
  }
}

.showcase-badge-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

:root[data-theme="light"] .showcase-badge-card {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.08);
}

.showcase-badge-card.unlocked {
  border-color: rgba(255, 212, 59, 0.4);
  background: rgba(255, 212, 59, 0.04);
}

.showcase-badge-card.unlocked.is-pinned {
  border-color: #ffd43b;
  box-shadow: 0 0 16px rgba(255, 212, 59, 0.18);
  background: linear-gradient(135deg, rgba(255, 212, 59, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%);
}

.showcase-badge-card.locked {
  opacity: 0.45;
}

.badge-card-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.badge-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  flex-shrink: 0;
  margin-top: 1px;
}

.showcase-badge-card.unlocked .badge-card-icon {
  color: #ffd43b;
  background: rgba(255, 212, 59, 0.16);
  border: 1px solid rgba(255, 212, 59, 0.35);
}

.showcase-badge-card.locked .badge-card-icon {
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
}

.badge-card-details {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.badge-card-name {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
}

.showcase-badge-card.unlocked .badge-card-name {
  color: var(--yellow);
}

:root[data-theme="light"] .showcase-badge-card.unlocked .badge-card-name {
  color: #d97706;
}

.badge-card-desc {
  font-size: 12px;
  color: var(--text-dim);
  line-height: 1.45;
}

.badge-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

:root[data-theme="light"] .badge-card-foot {
  border-top-color: rgba(0, 0, 0, 0.05);
}

.badge-status-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: #3ddc84;
}

.badge-status-tag.locked-tag {
  color: var(--text-dim);
}

.badge-pin-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 212, 59, 0.35);
  background: rgba(255, 212, 59, 0.08);
  color: #ffd43b;
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

:root[data-theme="light"] .badge-pin-btn {
  color: #b45309;
  border-color: rgba(180, 83, 9, 0.35);
  background: rgba(245, 158, 11, 0.1);
}

.badge-pin-btn:hover {
  background: rgba(255, 212, 59, 0.2);
  transform: translateY(-1px);
}

.badge-pin-btn.is-pinned {
  background: #ffd43b;
  color: #0b0c10;
  border-color: #ffd43b;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(255, 212, 59, 0.35);
}

/* Profile Pinned Badge Showcase Card */
.profile-pinned-wrap {
  margin-bottom: 16px;
}

.profile-pinned-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255, 212, 59, 0.09) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 212, 59, 0.35);
  box-shadow: 0 4px 14px rgba(255, 212, 59, 0.08);
}

:root[data-theme="light"] .profile-pinned-card {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(0, 0, 0, 0.02) 100%);
  border-color: rgba(245, 158, 11, 0.35);
}

.pinned-card-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.pinned-badge-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 212, 59, 0.18);
  color: #ffd43b;
  border: 1px solid rgba(255, 212, 59, 0.45);
  flex-shrink: 0;
}

.pinned-badge-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.pinned-badge-tag {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffd43b;
}

:root[data-theme="light"] .pinned-badge-tag {
  color: #b45309;
}

.pinned-badge-name {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pinned-badge-desc {
  font-size: 11.5px;
  color: var(--text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-pinned-empty {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed var(--border);
}

:root[data-theme="light"] .profile-pinned-empty {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.12);
}

.pinned-empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  font-size: 16px;
  flex-shrink: 0;
}

.pinned-empty-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pinned-empty-text strong {
  font-size: 12.5px;
  color: var(--text-muted);
}

.pinned-empty-text small {
  font-size: 11.5px;
  color: var(--text-dim);
}
`;

css += '\n' + badgesAndPinStyles;
fs.writeFileSync('arenaC/style.css', css, 'utf8');
console.log('Successfully updated style.css with badges modal and pinned badge styles!');

// 3. UPDATE arenaC/app.js
let app = fs.readFileSync('arenaC/app.js', 'utf8');

// Expanded 20 badges in BADGE_ORDER
const newBadgeOrder = `const BADGE_ORDER = [
  "first_step", "debug_first", "daily_done",
  "sharp_eye", "streak_3", "level_5", "timed_hero", "exam_master", "mistake_fixer", "century",
  "pointer_master", "streak_7", "debug_perfect", "expert_ace", "debug_expert", "survival_streak_10",
  "five_hundred", "level_10", "survival_streak_20", "ub_survivor"
];`;

app = app.replace(/const BADGE_ORDER = \[[\s\S]*?\];/, newBadgeOrder);

// Badge metadata (tiers and SVG icons)
const badgeMetaAndIcons = `
const BADGE_META = {
  first_step: { tier: "easy", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>' },
  debug_first: { tier: "easy", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path></svg>' },
  daily_done: { tier: "easy", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' },
  sharp_eye: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>' },
  streak_3: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>' },
  level_5: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>' },
  timed_hero: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' },
  exam_master: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>' },
  mistake_fixer: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' },
  century: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>' },
  pointer_master: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="m13 13 6 6"></path></svg>' },
  streak_7: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>' },
  debug_perfect: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>' },
  expert_ace: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>' },
  debug_expert: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>' },
  survival_streak_10: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>' },
  five_hundred: { tier: "legendary", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9 6 3"></polygon><line x1="2" y1="9" x2="22" y2="9"></line><line x1="12" y1="22" x2="6" y2="9"></line><line x1="12" y1="22" x2="18" y2="9"></line></svg>' },
  level_10: { tier: "legendary", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>' },
  survival_streak_20: { tier: "legendary", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>' },
  ub_survivor: { tier: "legendary", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' }
};
`;

app = app.replace('const BADGE_ORDER = [', badgeMetaAndIcons + '\nconst BADGE_ORDER = [');

// Update I18N with new badges and texts
const trExtraI18n = `
    badgesBtn: "Başarımlar",
    badgesModalTitle: "Başarımlar & Rozetler",
    badgesModalSub: "Kolaydan efsaneviye tüm hedefler. Kazandığın rozetlerden en beğendiğini profiline sabitleyebilirsin.",
    badgePin: "Sabitle",
    badgePinned: "Sabitlendi",
    badgeEarned: "Kazanıldı",
    badgeLocked: "Kilitli",
    tierEasy: "Kolay",
    tierMedium: "Orta",
    tierHard: "Zor",
    tierLegendary: "Efsanevi",
    pinnedShowcaseTitle: "Vitrin Rozeti",
    noPinnedBadge: "Vitrin Rozeti Seçilmedi",
    noPinnedBadgeSub: "Başarımlar menüsünden beğendiğin bir rozeti profiline sabitle.",
    badgePinnedDone: "Rozet profiline sabitlendi!",
    badgeUnpinnedDone: "Vitrin rozeti kaldırıldı.",`;

const enExtraI18n = `
    badgesBtn: "Achievements",
    badgesModalTitle: "Achievements & Badges",
    badgesModalSub: "Goals from easy to legendary. Pin your favorite unlocked badge to showcase it on your profile.",
    badgePin: "Pin",
    badgePinned: "Pinned",
    badgeEarned: "Unlocked",
    badgeLocked: "Locked",
    tierEasy: "Easy",
    tierMedium: "Medium",
    tierHard: "Hard",
    tierLegendary: "Legendary",
    pinnedShowcaseTitle: "Featured Badge",
    noPinnedBadge: "No Featured Badge",
    noPinnedBadgeSub: "Pin your favorite unlocked badge from the Achievements showcase.",
    badgePinnedDone: "Badge pinned to profile!",
    badgeUnpinnedDone: "Featured badge unpinned.",`;

app = app.replace('profileGuru: "C Gurusu",', 'profileGuru: "C Gurusu",' + trExtraI18n);
app = app.replace('profileGuru: "C Guru",', 'profileGuru: "C Guru",' + enExtraI18n);

// Add new badge translations to TR and EN
const trBadgeDefs = `
      survival_streak_10: { name: "Hayatta Kalan", desc: "Zamana Karşı modunda 10 soru serisine ulaş" },
      level_10: { name: "Sistem Mimarı", desc: "10. oyuncu seviyesine ulaş" },
      survival_streak_20: { name: "Zaman Bükücü", desc: "Zamana Karşı modunda 20+ soru serisi yap" },
      ub_survivor: { name: "UB Terbiyecisi", desc: "15 tanımsız davranış & tuzak sorusunu doğru yanıtla" },`;

const enBadgeDefs = `
      survival_streak_10: { name: "Survivor", desc: "Reach a streak of 10 in Time Attack" },
      level_10: { name: "System Architect", desc: "Reach Player Level 10" },
      survival_streak_20: { name: "Time Bender", desc: "Score a 20+ streak in Time Attack" },
      ub_survivor: { name: "UB Tamer", desc: "Answer 15 Undefined Behavior & trap questions correctly" },`;

app = app.replace('pointer_master: { name: "Pointer Ustası", desc: "20 işaretçi sorusunu doğru yanıtla" }', 'pointer_master: { name: "Pointer Ustası", desc: "20 işaretçi sorusunu doğru yanıtla" },' + trBadgeDefs);
app = app.replace('pointer_master: { name: "Pointer Master", desc: "Answer 20 pointer questions correctly" }', 'pointer_master: { name: "Pointer Master", desc: "Answer 20 pointer questions correctly" },' + enBadgeDefs);

// Update els object with badges DOM elements
const newEls = `  badgesBtn: document.getElementById("badgesBtn"),
  badgesModal: document.getElementById("badgesModal"),
  badgesClose: document.getElementById("badgesClose"),
  badgesCount: document.getElementById("badgesCount"),
  badgesList: document.getElementById("badgesList"),
  profilePinnedBadge: document.getElementById("profilePinnedBadge"),\n`;

app = app.replace('  profileFileInput: document.getElementById("profileFileInput"),\n  profileFeedback: document.getElementById("profileFeedback"),', '  profileFileInput: document.getElementById("profileFileInput"),\n  profileFeedback: document.getElementById("profileFeedback"),\n' + newEls);

// Remove profileAvatarGrid from els
app = app.replace('  profileAvatarGrid: document.getElementById("profileAvatarGrid"),\n', '');

// Update defaultProgress to include pinnedBadge
app = app.replace('bookmarks: [],\n    totalAnswered: 0,', 'bookmarks: [],\n    pinnedBadge: null,\n    totalAnswered: 0,');

// Update getProgress to ensure pinnedBadge
app = app.replace(
  'return { ...defaultProgress(), ...p, bookmarks: Array.isArray(p.bookmarks) ? p.bookmarks : [], mistakes: Array.isArray(p.mistakes) ? p.mistakes : [] };',
  'return { ...defaultProgress(), ...p, bookmarks: Array.isArray(p.bookmarks) ? p.bookmarks : [], mistakes: Array.isArray(p.mistakes) ? p.mistakes : [], pinnedBadge: p.pinnedBadge || null };'
);

// Update evaluateBadges with new achievements
const evalExtraBadges = `
  if (levelFromXp(p.xp) >= 10) grant("level_10");
  try {
    const survivalBest = parseInt(localStorage.getItem("arenac:best:survival") || "0", 10) || 0;
    if (survivalBest >= 10 || (s.isSurvival && s.score >= 10)) grant("survival_streak_10");
    if (survivalBest >= 20 || (s.isSurvival && s.score >= 20)) grant("survival_streak_20");
  } catch (e) {}

  const trapStats = (p.topicStats["traps"] || { correct: 0 });
  const expStats = (p.byLevel["expert"] || { correct: 0 });
  if (trapStats.correct >= 15 || expStats.correct >= 25) grant("ub_survivor");
`;

app = app.replace('if (ptrStats.correct >= 20) grant("pointer_master");', 'if (ptrStats.correct >= 20) grant("pointer_master");' + evalExtraBadges);

// Badges showcase functions & Pinning
const badgesShowcaseCode = `
function openBadgesModal() {
  renderBadgesShowcase();
  els.badgesModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeBadgesModal() {
  els.badgesModal.classList.add("hidden");
  refreshModalOpen();
}

function togglePinBadge(bKey) {
  const p = state.progress;
  const d = dict();
  if (p.pinnedBadge === bKey) {
    p.pinnedBadge = null;
    showProfileFeedback(d.badgeUnpinnedDone);
  } else {
    p.pinnedBadge = bKey;
    showProfileFeedback(\`\${d.badgePinnedDone} (\${d.badges[bKey]?.name || bKey})\`);
  }
  saveProgress(p);
  sound.play("click");
  renderBadgesShowcase();
  renderProfilePinnedBadgeUI();
}

function renderBadgesShowcase() {
  const p = state.progress;
  const d = dict();
  const unlockedBadges = p.badges || [];
  els.badgesCount.textContent = \`\${unlockedBadges.length} / \${BADGE_ORDER.length}\`;

  const tiers = [
    { key: "easy", label: d.tierEasy, pillCls: "tier-easy" },
    { key: "medium", label: d.tierMedium, pillCls: "tier-medium" },
    { key: "hard", label: d.tierHard, pillCls: "tier-hard" },
    { key: "legendary", label: d.tierLegendary, pillCls: "tier-legendary" }
  ];

  let html = "";
  tiers.forEach((tier) => {
    const tierBadges = BADGE_ORDER.filter((bKey) => BADGE_META[bKey] && BADGE_META[bKey].tier === tier.key);
    if (tierBadges.length === 0) return;

    html += \`
      <div class="badge-tier-section">
        <div class="badge-tier-head">
          <span class="badge-tier-title">\${tier.label}</span>
          <span class="badge-tier-pill \${tier.pillCls}">\${tier.label}</span>
        </div>
        <div class="badge-tier-grid">
    \`;

    tierBadges.forEach((bKey) => {
      const unlocked = unlockedBadges.includes(bKey);
      const isPinned = p.pinnedBadge === bKey;
      const meta = BADGE_META[bKey] || { icon: "" };
      const info = d.badges[bKey] || { name: bKey, desc: "" };

      html += \`
        <div class="showcase-badge-card \${unlocked ? "unlocked" : "locked"} \${isPinned ? "is-pinned" : ""}">
          <div class="badge-card-top">
            <span class="badge-card-icon">\${unlocked ? meta.icon : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'}</span>
            <div class="badge-card-details">
              <strong class="badge-card-name">\${esc(info.name)}</strong>
              <small class="badge-card-desc">\${esc(info.desc)}</small>
            </div>
          </div>
          <div class="badge-card-foot">
            \${unlocked
              ? \`<span class="badge-status-tag">✓ \${d.badgeEarned}</span>
                 <button class="badge-pin-btn \${isPinned ? "is-pinned" : ""}" type="button" data-badge="\${bKey}">
                   ★ \${isPinned ? d.badgePinned : d.badgePin}
                 </button>\`
              : \`<span class="badge-status-tag locked-tag">\${d.badgeLocked}</span>\`
            }
          </div>
        </div>
      \`;
    });

    html += \`</div></div>\`;
  });

  els.badgesList.innerHTML = html;

  // Bind pin buttons
  els.badgesList.querySelectorAll(".badge-pin-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bKey = btn.dataset.badge;
      if (bKey) togglePinBadge(bKey);
    });
  });
}

function renderProfilePinnedBadgeUI() {
  const p = state.progress;
  const d = dict();
  const bKey = p.pinnedBadge;

  if (bKey && d.badges[bKey]) {
    const info = d.badges[bKey];
    const meta = BADGE_META[bKey] || { tier: "medium", icon: "" };
    const tierName = meta.tier === "easy" ? d.tierEasy : meta.tier === "hard" ? d.tierHard : meta.tier === "legendary" ? d.tierLegendary : d.tierMedium;

    els.profilePinnedBadge.innerHTML = \`
      <div class="profile-pinned-card">
        <div class="pinned-card-left">
          <span class="pinned-badge-icon">\${meta.icon}</span>
          <div class="pinned-badge-info">
            <span class="pinned-badge-tag">★ \${d.pinnedShowcaseTitle} · \${tierName}</span>
            <strong class="pinned-badge-name">\${esc(info.name)}</strong>
            <small class="pinned-badge-desc">\${esc(info.desc)}</small>
          </div>
        </div>
        <button class="btn btn-ghost btn-xs unpin-badge-btn" type="button" title="Vitrin rozetini kaldır">×</button>
      </div>
    \`;

    const unpinBtn = els.profilePinnedBadge.querySelector(".unpin-badge-btn");
    if (unpinBtn) {
      unpinBtn.addEventListener("click", () => togglePinBadge(bKey));
    }
  } else {
    els.profilePinnedBadge.innerHTML = \`
      <div class="profile-pinned-empty">
        <span class="pinned-empty-icon">★</span>
        <div class="pinned-empty-text">
          <strong>\${d.noPinnedBadge}</strong>
          <small>\${d.noPinnedBadgeSub}</small>
        </div>
      </div>
    \`;
  }
}
`;

app = app.replace('function renderProfileModalUI() {', badgesShowcaseCode + '\nfunction renderProfileModalUI() {');

// Update renderProfileModalUI: remove avatar grid rendering, add pinned badge rendering
const oldRenderProfileModalUI = `  // Avatar Grid
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
  });`;

const newRenderProfileModalUI = `  // Pinned Badge Showcase
  renderProfilePinnedBadgeUI();`;

app = app.replace(oldRenderProfileModalUI, newRenderProfileModalUI);

// Remove avatar saving from saveCurrentProfileEdits
app = app.replace(
`  const activeAvatarBtn = els.profileAvatarGrid.querySelector(".avatar-choice-btn.active");
  if (activeAvatarBtn && activeAvatarBtn.dataset.avatar) {
    cur.avatar = activeAvatarBtn.dataset.avatar;
  }`,
''
);

// Comprehensive export of EVERYTHING in exportData and exportCurrentProfile
const newExportData = `function exportData() {
  syncCurrentProfileProgress();
  const backup = {
    appName: "ArenaC",
    version: 3,
    exportDate: new Date().toISOString(),
    progress: state.progress,
    bestScores: {},
    settings: {
      theme: state.theme,
      lang: state.lang,
      soundEnabled: sound.enabled,
      soundVolume: sound.volume,
      lineNumbers: state.lineNumbers
    },
    profiles: getProfiles(),
    activeProfileId: getActiveProfileId()
  };
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("arenac:best:") || k === "arenac:survival_games")) {
        backup.bestScores[k] = localStorage.getItem(k);
      }
    }
  } catch (e) {}

  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateStr = utcDayString();
  a.href = url;
  a.download = \`arenac_tam_yedek_\${dateStr}.json\`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showSettingsFeedback(dict().exportDone);
}`;

app = app.replace(/function exportData\(\) \{[\s\S]*?showSettingsFeedback\(dict\(\)\.exportDone\);\s*\}/, newExportData);

// Comprehensive importData restoring EVERYTHING
const newImportData = `function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      if (!backup || (!backup.progress && !backup.version && !backup.profile)) {
        throw new Error("Invalid structure");
      }
      if (backup.progress) {
        state.progress = { ...defaultProgress(), ...backup.progress };
        saveProgress(state.progress);
      }
      if (backup.bestScores && typeof backup.bestScores === "object") {
        Object.keys(backup.bestScores).forEach((k) => {
          try {
            localStorage.setItem(k, backup.bestScores[k]);
          } catch (err) {}
        });
      }
      if (Array.isArray(backup.profiles) && backup.profiles.length > 0) {
        saveProfiles(backup.profiles);
      }
      if (backup.activeProfileId) {
        setActiveProfileId(backup.activeProfileId);
      }
      if (backup.settings) {
        if (typeof backup.settings.theme === "string") applyTheme(backup.settings.theme);
        if (typeof backup.settings.lang === "string") applyLanguage(backup.settings.lang);
        if (typeof backup.settings.soundEnabled === "boolean") applySoundEnabled(backup.settings.soundEnabled);
        if (typeof backup.settings.soundVolume === "number") applySoundVolume(backup.settings.soundVolume);
        if (typeof backup.settings.lineNumbers === "boolean") applyLineNumbers(backup.settings.lineNumbers);
      }
      refreshCurrentView();
      renderSurvivalBanner();
      renderProfileModalUI();
      showSettingsFeedback(dict().importDone);
      sound.play("correct");
    } catch (err) {
      showSettingsFeedback(dict().importError);
      sound.play("wrong");
    }
  };
  reader.readAsText(file);
}`;

app = app.replace(/function importData\(file\) \{[\s\S]*?reader\.readAsText\(file\);\s*\}/, newImportData);

// Comprehensive exportCurrentProfile
const newExportProfile = `function exportCurrentProfile() {
  syncCurrentProfileProgress();
  const cur = getCurrentProfile();
  const d = dict();
  const exportData = {
    appName: "ArenaC",
    type: "arenac_profile",
    version: 3,
    exportDate: new Date().toISOString(),
    profile: {
      id: cur.id,
      name: cur.name,
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
}`;

app = app.replace(/function exportCurrentProfile\(\) \{[\s\S]*?showProfileFeedback\(d\.profileExportDone\);\s*sound\.play\("click"\);\s*\}/, newExportProfile);

// Wire badges event listeners
const badgesListeners = `
els.badgesBtn.addEventListener("click", openBadgesModal);
els.badgesClose.addEventListener("click", closeBadgesModal);
els.badgesModal.addEventListener("click", (e) => {
  if (e.target === els.badgesModal) closeBadgesModal();
});
`;

app = app.replace('els.profileBtn.addEventListener("click", openProfile);', badgesListeners + '\nels.profileBtn.addEventListener("click", openProfile);');

// Handle Escape key for badgesModal
app = app.replace(
  'if (!els.profileModal.classList.contains("hidden")) { closeProfile(); closed = true; }',
  'if (!els.badgesModal.classList.contains("hidden")) { closeBadgesModal(); closed = true; }\n    else if (!els.profileModal.classList.contains("hidden")) { closeProfile(); closed = true; }'
);

fs.writeFileSync('arenaC/app.js', app, 'utf8');
console.log('Successfully updated app.js with badges showcase, pinning, and comprehensive backup!');

// 4. BUMP SERVICE WORKER CACHE TO arenac-v11
let sw = fs.readFileSync('arenaC/sw.js', 'utf8');
sw = sw.replace(/const CACHE = "arenac-v\d+";/, 'const CACHE = "arenac-v11";');
fs.writeFileSync('arenaC/sw.js', sw, 'utf8');
console.log('Successfully bumped sw.js cache to arenac-v11!');

