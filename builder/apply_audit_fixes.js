const fs = require('fs');

console.log('--- Applying Audit Fixes ---');

// 1. UPDATE arenaC/style.css
let css = fs.readFileSync('arenaC/style.css', 'utf8');

// Fix .line-content whitespace
css = css.replace(
`.line-content {
  flex: 1;
  white-space: pre-wrap;
  word-break: break-all;
}`,
`.line-content {
  flex: 1;
  white-space: pre;
}`
);

// Add Mode Chip Colors and Light Theme Styles
const additionalChipStyles = `
/* Mode Chips */
.chip-survival {
  color: #ffd43b !important;
  border-color: rgba(255, 212, 59, 0.45) !important;
  background: rgba(255, 212, 59, 0.1) !important;
}

.chip-bookmarks {
  color: #fbbf24 !important;
  border-color: rgba(251, 191, 36, 0.45) !important;
  background: rgba(251, 191, 36, 0.1) !important;
}

.chip-debug {
  color: #38bdf8 !important;
  border-color: rgba(56, 189, 248, 0.45) !important;
  background: rgba(56, 189, 248, 0.1) !important;
}

.chip-daily {
  color: #3ddc84 !important;
  border-color: rgba(61, 220, 132, 0.45) !important;
  background: rgba(61, 220, 132, 0.1) !important;
}

.chip-mistakes {
  color: #ff6b6b !important;
  border-color: rgba(255, 107, 107, 0.45) !important;
  background: rgba(255, 107, 107, 0.1) !important;
}

:root[data-theme="light"] .chip-survival {
  color: #b45309 !important;
  border-color: rgba(180, 83, 9, 0.35) !important;
  background: rgba(251, 191, 36, 0.15) !important;
}

:root[data-theme="light"] .chip-bookmarks {
  color: #b45309 !important;
  border-color: rgba(180, 83, 9, 0.35) !important;
  background: rgba(251, 191, 36, 0.15) !important;
}

:root[data-theme="light"] .chip-debug {
  color: #0369a1 !important;
  border-color: rgba(3, 105, 161, 0.35) !important;
  background: rgba(56, 189, 248, 0.15) !important;
}

:root[data-theme="light"] .chip-daily {
  color: #15803d !important;
  border-color: rgba(21, 128, 61, 0.35) !important;
  background: rgba(61, 220, 132, 0.15) !important;
}

:root[data-theme="light"] .chip-mistakes {
  color: #b91c1c !important;
  border-color: rgba(185, 28, 28, 0.35) !important;
  background: rgba(255, 107, 107, 0.15) !important;
}
`;

// Add Stats Modal & Badges Styles
const statsModalStyles = `
/* Stats Modal Detailed Grid & Badges */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

@media (max-width: 520px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  text-align: center;
}

:root[data-theme="light"] .stat-box {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.1);
}

.stat-num {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 900;
  color: var(--yellow);
}

:root[data-theme="light"] .stat-num {
  color: #d97706;
}

.stat-lbl {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 4px;
}

.stats-section-title {
  font-family: var(--font-display);
  font-size: 13.5px;
  font-weight: 800;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 18px 0 10px;
}

.level-stats-list,
.weak-topics-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.level-stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  font-size: 13.5px;
}

:root[data-theme="light"] .level-stat-row {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.08);
}

.level-stat-row span:first-child {
  color: var(--text-muted);
  font-weight: 600;
}

.level-stat-row span:last-child {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--text);
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 8px;
}

@media (max-width: 520px) {
  .badges-grid {
    grid-template-columns: 1fr;
  }
}

.badge-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}

.badge-item.unlocked {
  border-color: rgba(255, 212, 59, 0.4);
  background: rgba(255, 212, 59, 0.06);
}

.badge-item.locked {
  opacity: 0.42;
}

.badge-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  flex-shrink: 0;
  margin-top: 1px;
}

.badge-item.unlocked .badge-icon {
  color: #ffd43b;
  background: rgba(255, 212, 59, 0.15);
}

.badge-item.locked .badge-icon {
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
}

.icon-badge {
  width: 17px;
  height: 17px;
}

.badge-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.badge-info strong {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--text);
}

.badge-item.unlocked .badge-info strong {
  color: var(--yellow);
}

.badge-info small {
  font-size: 11.5px;
  color: var(--text-dim);
  line-height: 1.4;
}

:root[data-theme="light"] .badge-item {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.08);
}

:root[data-theme="light"] .badge-item.unlocked {
  border-color: rgba(217, 119, 6, 0.35);
  background: rgba(245, 158, 11, 0.08);
}

:root[data-theme="light"] .badge-item.unlocked .badge-info strong {
  color: #d97706;
}

:root[data-theme="light"] .badge-item.locked .badge-icon {
  background: rgba(0, 0, 0, 0.04);
}

/* Light Theme Additions for Bookmarks, Feedback Memory & UB */
:root[data-theme="light"] .bookmark-btn {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.03);
  color: #64748b;
}

:root[data-theme="light"] .bookmark-btn:hover {
  background: rgba(0, 0, 0, 0.07);
  color: #d97706;
  border-color: rgba(217, 119, 6, 0.35);
}

:root[data-theme="light"] .bookmark-btn.active {
  color: #d97706;
  border-color: rgba(217, 119, 6, 0.5);
  background: rgba(245, 158, 11, 0.12);
}

:root[data-theme="light"] .bookmark-btn.active svg {
  fill: #d97706;
}

:root[data-theme="light"] .feedback-memory-box {
  background: rgba(14, 165, 233, 0.08);
  border-color: rgba(14, 165, 233, 0.35);
  color: #0c4a6e;
}

:root[data-theme="light"] .feedback-memory-box .memory-label {
  color: #0284c7;
}

:root[data-theme="light"] .feedback-ub-box {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.35);
  color: #7f1d1d;
}

:root[data-theme="light"] .feedback-ub-box .ub-label {
  color: #dc2626;
}

:root[data-theme="light"] .time-bonus-pop {
  color: #16a34a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}
`;

css += '\n' + additionalChipStyles + '\n' + statsModalStyles;
fs.writeFileSync('arenaC/style.css', css, 'utf8');
console.log('Successfully updated style.css with chip and stats styles!');

// 2. UPDATE arenaC/app.js
let app = fs.readFileSync('arenaC/app.js', 'utf8');

// Fix startTimer to pause when any modal is open
app = app.replace(
`function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    const s = state.activeSession;
    if (!s || !s.timerActive) return;
    s.timeLeft--;
    updateTimerDisplay();
    if (s.timeLeft <= 0) {
      stopTimer();
      finishQuiz("timeout");
    }
  }, 1000);
}`,
`function isAnyModalOpen() {
  return !!document.querySelector(".modal-backdrop:not(.hidden)");
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    const s = state.activeSession;
    if (!s || !s.timerActive) return;
    if (isAnyModalOpen()) return; // Pause timer during any open modal
    s.timeLeft--;
    updateTimerDisplay();
    if (s.timeLeft <= 0) {
      stopTimer();
      finishQuiz("timeout");
    }
  }, 1000);
}`
);

// Fix animatePercent -> animateNumber to prevent race condition in survival
app = app.replace(
`function animatePercent(target) {
  const el = els.ringPercent;
  let cur = 0;
  const step = Math.max(1, Math.floor(target / 30));
  const timer = setInterval(() => {
    cur += step;
    if (cur >= target) {
      cur = target;
      clearInterval(timer);
    }
    el.textContent = \`\${cur}%\`;
  }, 20);
}`,
`let numberAnimTimer = null;

function animateNumber(target, isPercent = true) {
  if (numberAnimTimer) {
    clearInterval(numberAnimTimer);
    numberAnimTimer = null;
  }
  const el = els.ringPercent;
  let cur = 0;
  if (target === 0) {
    el.textContent = isPercent ? "0%" : "0";
    return;
  }
  const step = Math.max(1, Math.floor(target / 25));
  numberAnimTimer = setInterval(() => {
    cur += step;
    if (cur >= target) {
      cur = target;
      clearInterval(numberAnimTimer);
      numberAnimTimer = null;
    }
    el.textContent = isPercent ? \`\${cur}%\` : \`\${cur}\`;
  }, 20);
}`
);

// Update renderResult to use animateNumber and fix survival score / stats / reviews
const oldRenderResultStart = `function renderResult(newBadges, percent, score, total, reason) {
  const s = state.activeSession;
  const d = dict();

  // Ring animation
  const offset = RING_CIRC - (percent / 100) * RING_CIRC;
  els.ringFill.style.strokeDashoffset = offset;
  animatePercent(percent);
  els.ringScore.textContent = \`\${score} / \${total}\`;`;

const newRenderResultStart = `function renderResult(newBadges, percent, score, total, reason) {
  const s = state.activeSession;
  const d = dict();

  // Ring animation
  if (s && s.isSurvival) {
    const ringFraction = Math.min(1, score / 20);
    const offset = RING_CIRC - ringFraction * RING_CIRC;
    els.ringFill.style.strokeDashoffset = offset;
    animateNumber(score, false);
    els.ringScore.textContent = state.lang === "tr" ? "Soru Serisi" : "Question Streak";
  } else {
    const offset = RING_CIRC - (percent / 100) * RING_CIRC;
    els.ringFill.style.strokeDashoffset = offset;
    animateNumber(percent, true);
    els.ringScore.textContent = \`\${score} / \${total}\`;
  }`;

app = app.replace(oldRenderResultStart, newRenderResultStart);

// Fix survival stats in renderResult
app = app.replace(
`  // Stats counters
  els.statCorrect.textContent = score;
  els.statWrong.textContent = total - score;
  els.statDiff.textContent = state.activeSession.meta.title || "-";`,
`  // Stats counters
  els.statCorrect.textContent = score;
  if (s && s.isSurvival) {
    els.statWrong.textContent = reason === "timeout" ? 0 : 1;
    els.statDiff.textContent = d.survivalTitle;
  } else {
    els.statWrong.textContent = total - score;
    els.statDiff.textContent = s.meta.title || "-";
  }`
);

// Fix survival review items collection
app = app.replace(
`  // Review section
  const wrongs = [];
  s.queue.forEach((q, idx) => {
    if (s.answers[idx] !== q.answer) {
      wrongs.push({ q, chosen: s.answers[idx], index: idx });
    }
  });`,
`  // Review section: in survival mode, only check questions reached
  const wrongs = [];
  const maxIdx = (s && s.isSurvival) ? s.index : s.queue.length - 1;
  for (let idx = 0; idx <= maxIdx && idx < s.queue.length; idx++) {
    const q = s.queue[idx];
    if (s.answers[idx] !== null && s.answers[idx] !== q.answer) {
      wrongs.push({ q, chosen: s.answers[idx], index: idx });
    }
  }`
);

// Fix canvas scorecard font stack & measurement
app = app.replace(
`  // Mode / Difficulty Chip
  const modeTitle = (s.meta && s.meta.title ? s.meta.title : "C Mantık Testi").toUpperCase();
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(70, 130, ctx.measureText(modeTitle).width + 36, 36, 18);
  } else {
    ctx.rect(70, 130, ctx.measureText(modeTitle).width + 36, 36);
  }
  ctx.fill();
  ctx.fillStyle = "#38bdf8";
  ctx.font = "700 14px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillText(modeTitle, 88, 154);`,
`  // Mode / Difficulty Chip
  const modeTitle = (s.meta && s.meta.title ? s.meta.title : "C Mantık Testi").toUpperCase();
  ctx.font = "700 14px 'JetBrains Mono', monospace, sans-serif";
  const chipWidth = ctx.measureText(modeTitle).width + 36;
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(70, 130, chipWidth, 36, 18);
  } else {
    ctx.rect(70, 130, chipWidth, 36);
  }
  ctx.fill();
  ctx.fillStyle = "#38bdf8";
  ctx.fillText(modeTitle, 88, 154);`
);

app = app.replace(
`  if (s.isSurvival) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 84px 'Space Grotesk', sans-serif";
    ctx.fillText(\`\${score}\`, 70, 270);

    ctx.fillStyle = "#ffd43b";
    ctx.font = "700 36px 'Space Grotesk', sans-serif";
    ctx.fillText("Soru Serisi", 200, 260);

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "500 22px 'Space Grotesk', sans-serif";
    ctx.fillText("Hayatta Kalma & Zamana Karşı Meydan Okuma", 70, 320);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 96px 'Space Grotesk', sans-serif";
    ctx.fillText(\`%\${percent}\`, 70, 280);

    ctx.fillStyle = "#ffd43b";
    ctx.font = "700 36px 'Space Grotesk', sans-serif";
    ctx.fillText(\`\${score} / \${total} Doğru\`, 340, 260);

    let tier = 4;
    if (percent === 100) tier = 0;
    else if (percent >= 80) tier = 1;
    else if (percent >= 60) tier = 2;
    else if (percent >= 40) tier = 3;
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "600 24px 'Space Grotesk', sans-serif";
    ctx.fillText(d.result[tier].title + " — " + d.result[tier].sub, 70, 335);
  }`,
`  if (s.isSurvival) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 84px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(\`\${score}\`, 70, 270);

    ctx.fillStyle = "#ffd43b";
    ctx.font = "700 34px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(state.lang === "tr" ? "Soru Serisi" : "Streak", 210, 260);

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "500 20px 'Manrope', 'Segoe UI', sans-serif";
    ctx.fillText(state.lang === "tr" ? "Hayatta Kalma & Zamana Karşı Meydan Okuma" : "Time Attack & Survival Challenge", 70, 320);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 96px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(\`%\${percent}\`, 70, 280);

    ctx.fillStyle = "#ffd43b";
    ctx.font = "700 34px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(\`\${score} / \${total} \${state.lang === "tr" ? "Doğru" : "Correct"}\`, 340, 260);

    let tier = 4;
    if (percent === 100) tier = 0;
    else if (percent >= 80) tier = 1;
    else if (percent >= 60) tier = 2;
    else if (percent >= 40) tier = 3;
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "600 22px 'Manrope', 'Segoe UI', sans-serif";
    ctx.fillText(d.result[tier].title + " — " + d.result[tier].sub, 70, 335);
  }`
);

app = app.replace(
`    ctx.fillStyle = "#ffffff";
    ctx.font = "800 26px 'Space Grotesk', sans-serif";
    ctx.fillText(c.val, x + 20, y + 80);`,
`    ctx.fillStyle = "#ffffff";
    ctx.font = "800 26px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(c.val, x + 20, y + 80);`
);

// Fix resetBestBtn to also reset survival best & survival games
app = app.replace(
`els.resetBestBtn.addEventListener("click", () => {
  CARD_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(\`arenac:best:\${key}\`);
      localStorage.removeItem(\`arenac:best:debug_\${key}\`);
    } catch (e) {}
  });
  showSettingsFeedback(dict().settingsResetDone);`,
`els.resetBestBtn.addEventListener("click", () => {
  CARD_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(\`arenac:best:\${key}\`);
      localStorage.removeItem(\`arenac:best:debug_\${key}\`);
    } catch (e) {}
  });
  try {
    localStorage.removeItem("arenac:best:survival");
    localStorage.removeItem("arenac:survival_games");
  } catch (e) {}
  renderSurvivalBanner();
  showSettingsFeedback(dict().settingsResetDone);`
);

// Add 'F' keyboard shortcut to bookmark question on quiz screen
app = app.replace(
`  if (!s.answered || s.config.mode === "exam") {
    let idx = ["a", "b", "c", "d"].indexOf(key);
    if (idx === -1) idx = ["1", "2", "3", "4"].indexOf(key);
    if (idx !== -1 && idx < s.queue[s.index].options.length) {
      selectOption(idx);
      return;
    }
  }`,
`  if (key === "f" || key === "*") {
    e.preventDefault();
    toggleBookmarkCurrent();
    return;
  }

  if (!s.answered || s.config.mode === "exam") {
    let idx = ["a", "b", "c", "d"].indexOf(key);
    if (idx === -1) idx = ["1", "2", "3", "4"].indexOf(key);
    if (idx !== -1 && idx < s.queue[s.index].options.length) {
      selectOption(idx);
      return;
    }
  }`
);

fs.writeFileSync('arenaC/app.js', app, 'utf8');
console.log('Successfully updated app.js with audit fixes!');

