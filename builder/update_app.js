const fs = require('fs');

let code = fs.readFileSync('arenaC/app.js', 'utf8');

// 1. Add lineNumbers to state
code = code.replace(
  'pendingDifficulty: "beginner",\n  progress: null,\n  lastSession: null\n};',
  'pendingDifficulty: "beginner",\n  progress: null,\n  lastSession: null,\n  lineNumbers: true\n};'
);

// 2. formatCode & applyLineNumbers
const formatCodeFunc = `
function formatCode(cCode) {
  const highlighted = highlightC(cCode);
  const lines = highlighted.split("\\n");
  const showNums = state.lineNumbers;
  return lines.map((l, idx) => {
    return \`<span class="code-line\${showNums ? "" : " no-num"}"><span class="line-num">\${idx + 1}</span><span class="line-content">\${l}</span></span>\`;
  }).join("\\n");
}

function applyLineNumbers(show) {
  state.lineNumbers = show;
  try {
    localStorage.setItem("arenac:line_numbers", show ? "1" : "0");
  } catch (e) {}
  if (els.lineNumsOnBtn && els.lineNumsOffBtn) {
    els.lineNumsOnBtn.classList.toggle("active", show);
    els.lineNumsOffBtn.classList.toggle("active", !show);
  }
  if (currentScreen === "quiz" && state.activeSession) {
    const q = state.activeSession.queue[state.activeSession.index];
    if (q) {
      els.codeBlock.innerHTML = formatCode(q.code);
    }
  }
}
`;

code = code.replace('function highlightC(code) {', formatCodeFunc + '\nfunction highlightC(code) {');

// 3. defaultProgress: add bookmarks: []
code = code.replace(
  'badges: [],\n    mistakes: [],\n    totalAnswered: 0,',
  'badges: [],\n    mistakes: [],\n    bookmarks: [],\n    totalAnswered: 0,'
);

// 4. getProgress: ensure bookmarks is an array
code = code.replace(
  'return { ...defaultProgress(), ...p };',
  'return { ...defaultProgress(), ...p, bookmarks: Array.isArray(p.bookmarks) ? p.bookmarks : [], mistakes: Array.isArray(p.mistakes) ? p.mistakes : [] };'
);

// 5. toggleHomeMode: support survival
const newToggleHomeMode = `function toggleHomeMode(mode) {
  state.homeMode = mode;
  els.modeTabQuiz.classList.toggle("active", mode === "quiz");
  els.modeTabDebug.classList.toggle("active", mode === "debug");
  els.modeTabSurvival.classList.toggle("active", mode === "survival");
  els.quizSection.classList.toggle("hidden", mode !== "quiz");
  els.debugSection.classList.toggle("hidden", mode !== "debug");
  els.survivalSection.classList.toggle("hidden", mode !== "survival");
  if (mode === "survival") {
    renderSurvivalBanner();
  }
}`;
code = code.replace(/function toggleHomeMode\(mode\) \{[\s\S]*?els\.debugSection\.classList\.toggle\("hidden", mode !== "debug"\);\s*\}/, newToggleHomeMode);

// 6. renderSurvivalBanner, buildSurvivalPool, startSurvivalQuiz, showTimeBonusPop
const survivalAndBookmarkHelpers = `
function renderSurvivalBanner() {
  let best = 0;
  try {
    best = parseInt(localStorage.getItem("arenac:best:survival") || "0", 10) || 0;
  } catch (e) {}
  let total = 0;
  try {
    total = parseInt(localStorage.getItem("arenac:survival_games") || "0", 10) || 0;
  } catch (e) {}
  els.survivalBestScore.textContent = best;
  els.survivalTotalGames.textContent = total;
}

function buildSurvivalPool() {
  let pool = [];
  ORDER.forEach((key) => {
    (QUESTIONS[key] || []).forEach((q, idx) => {
      pool.push({ ...q, source: key, ref: \`\${key}:\${idx}\` });
    });
  });
  return pool;
}

function startSurvivalQuiz() {
  const pool = shuffle(buildSurvivalPool());
  const meta = {
    type: "survival",
    title: dict().survivalTitle,
    chipClass: "chip-survival"
  };
  startSession(pool, { mode: "survival", count: pool.length, time: 20 }, meta);
}

function showTimeBonusPop(text) {
  const pop = document.createElement("span");
  pop.className = "time-bonus-pop";
  pop.textContent = text;
  if (els.timerChip && els.timerChip.parentElement) {
    els.timerChip.parentElement.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
  }
}

function updateBookmarkBtnUI() {
  const s = state.activeSession;
  if (!s || !els.bookmarkBtn) return;
  const q = s.queue[s.index];
  const isBookmarked = q && q.ref && (state.progress.bookmarks || []).includes(q.ref);
  els.bookmarkBtn.classList.toggle("active", !!isBookmarked);
  const title = isBookmarked
    ? (state.lang === "tr" ? "Yıldızı Kaldır" : "Remove Bookmark")
    : (state.lang === "tr" ? "Soruyu Yıldızla" : "Bookmark Question");
  els.bookmarkBtn.setAttribute("title", title);
  els.bookmarkBtn.setAttribute("aria-label", title);
}

function toggleBookmarkCurrent() {
  const s = state.activeSession;
  if (!s) return;
  const q = s.queue[s.index];
  if (!q || !q.ref) return;
  const p = state.progress;
  if (!p.bookmarks) p.bookmarks = [];
  const idx = p.bookmarks.indexOf(q.ref);
  if (idx !== -1) {
    p.bookmarks.splice(idx, 1);
  } else {
    p.bookmarks.push(q.ref);
  }
  saveProgress(p);
  sound.play("click");
  updateBookmarkBtnUI();
  renderHomePanel();
}

function startBookmarksQuiz() {
  const p = state.progress;
  if (!p.bookmarks || p.bookmarks.length === 0) return;
  const pool = [];
  p.bookmarks.forEach((ref) => {
    if (ref.startsWith("debug:")) {
      const parts = ref.split(":");
      const lvl = parts[1];
      const idx = parseInt(parts[2], 10);
      if (DEBUG_QUESTIONS[lvl] && DEBUG_QUESTIONS[lvl][idx]) {
        pool.push({
          ...DEBUG_QUESTIONS[lvl][idx],
          source: "debug",
          ref,
          question: dict().qDebug
        });
      }
    } else {
      const parts = ref.split(":");
      const diff = parts[0];
      const idx = parseInt(parts[1], 10);
      if (QUESTIONS[diff] && QUESTIONS[diff][idx]) {
        pool.push({
          ...QUESTIONS[diff][idx],
          source: diff,
          ref
        });
      }
    }
  });
  if (pool.length === 0) return;
  const meta = {
    type: "bookmarks",
    title: dict().bookmarksTest,
    chipClass: "chip-bookmarks"
  };
  startSession(pool, { mode: "classic", count: pool.length, time: 0 }, meta);
}

function renderFeedbackExtras(q) {
  let extrasHtml = "";
  if (q.memory) {
    const memText = typeof q.memory === "object" ? (q.memory[state.lang] || q.memory.tr) : q.memory;
    extrasHtml += \`
      <div class="feedback-memory-box">
        <span class="memory-label">\${state.lang === "tr" ? "Bellek & Pointer Şeması" : "Memory & Pointer Layout"}</span>
        <div>\${esc(memText)}</div>
      </div>
    \`;
  }
  const expStr = typeof q.explanation === "object" ? (q.explanation[state.lang] || q.explanation.tr) : (q.explanation || "");
  const isUB = expStr.toLowerCase().includes("tanımsız davranış") || expStr.toLowerCase().includes("undefined behavior") || expStr.toLowerCase().includes("ub");
  if (isUB && !q.memory) {
    extrasHtml += \`
      <div class="feedback-ub-box">
        <span class="ub-label">\${state.lang === "tr" ? "ISO C Standardı · Tanımsız Davranış (UB)" : "ISO C Standard · Undefined Behavior (UB)"}</span>
        <div>\${state.lang === "tr" ? "Bu işlem ISO C standardına göre tanımsızdır. Derleyici optimizasyonuna ve mimariye göre beklenmeyen çıktılar veya çökmeler üretebilir." : "This operation invokes Undefined Behavior according to the ISO C Standard. Behavior may vary across compilers, flags, and targets."}</div>
      </div>
    \`;
  }
  return extrasHtml;
}
`;

code = code.replace('function renderHomePanel() {', survivalAndBookmarkHelpers + '\nfunction renderHomePanel() {');

// 7. Update renderHomePanel to update bookmarksBtn
code = code.replace(
  'els.mistakesBtn.disabled = mistakeCount === 0;',
  'els.mistakesBtn.disabled = mistakeCount === 0;\n\n  const bookmarkCount = (p.bookmarks || []).length;\n  els.bookmarksBtn.textContent = `${dict().bookmarksTest} (${bookmarkCount})`;\n  els.bookmarksBtn.disabled = bookmarkCount === 0;'
);

// 8. Update startSession for survival mode
code = code.replace(
  `  const count = config.count === "all" ? pool.length : Math.min(config.count || 10, pool.length);
  const queue = shuffle(pool).slice(0, count);

  state.activeSession = {
    pool,
    queue,
    config,
    meta,
    index: 0,
    score: 0,
    answers: new Array(queue.length).fill(null),
    timeLeft: config.time || 0,
    timerActive: (config.time || 0) > 0,
    answered: false
  };`,
  `  const isSurvival = config.mode === "survival";
  const count = config.count === "all" ? pool.length : Math.min(config.count || 10, pool.length);
  const queue = shuffle(pool).slice(0, count);

  state.activeSession = {
    pool,
    queue,
    config,
    meta,
    isSurvival,
    index: 0,
    score: 0,
    answers: new Array(queue.length).fill(null),
    timeLeft: isSurvival ? 20 : (config.time || 0),
    timerActive: isSurvival || (config.time || 0) > 0,
    answered: false
  };`
);

// 9. Update updateTimerDisplay
code = code.replace(
  `function updateTimerDisplay() {
  const s = state.activeSession;
  if (!s || !s.timerActive) return;
  const m = Math.floor(s.timeLeft / 60);
  const sec = s.timeLeft % 60;
  els.timerChip.textContent = \`\${String(m).padStart(2, "0")}:\${String(sec).padStart(2, "0")}\`;
  if (s.timeLeft <= 30) {
    els.timerChip.classList.add("danger");
  } else {
    els.timerChip.classList.remove("danger");
  }
}`,
  `function updateTimerDisplay() {
  const s = state.activeSession;
  if (!s || !s.timerActive) return;
  const m = Math.floor(s.timeLeft / 60);
  const sec = s.timeLeft % 60;
  els.timerChip.textContent = s.isSurvival ? \`\${s.timeLeft}s\` : \`\${String(m).padStart(2, "0")}:\${String(sec).padStart(2, "0")}\`;
  const isDanger = s.isSurvival ? s.timeLeft <= 5 : s.timeLeft <= 30;
  els.timerChip.classList.toggle("danger", isDanger);
  els.timerChip.classList.toggle("urgent", s.isSurvival && s.timeLeft <= 5);
}`
);

// 10. Update renderQuestion: formatCode & updateBookmarkBtnUI
code = code.replace(
  'els.codeBlock.innerHTML = highlightC(q.code);',
  'els.codeBlock.innerHTML = formatCode(q.code);\n  updateBookmarkBtnUI();'
);

// 11. Update selectOption for survival
const survivalSelectOption = `function selectOption(idx) {
  const s = state.activeSession;
  if (!s) return;
  const q = s.queue[s.index];
  const isExam = s.config.mode === "exam";

  if (!isExam && s.answered) return;

  if (s.isSurvival) {
    const isCorrect = idx === q.answer;
    s.answers[s.index] = idx;
    s.answered = true;
    recordAnswer(q, isCorrect);
    if (isCorrect) {
      s.score++;
      sound.play("correct");
      s.timeLeft = Math.min(60, s.timeLeft + 3);
      showTimeBonusPop("+3s");
      updateTimerDisplay();
      renderQuestion();
      setTimeout(() => {
        if (state.activeSession === s && currentScreen === "quiz") {
          nextQuestion();
        }
      }, 340);
    } else {
      sound.play("wrong");
      renderQuestion();
      setTimeout(() => {
        if (state.activeSession === s && currentScreen === "quiz") {
          finishQuiz("survival_wrong");
        }
      }, 420);
    }
    return;
  }`;

code = code.replace('function selectOption(idx) {\n  const s = state.activeSession;\n  if (!s) return;\n  const q = s.queue[s.index];\n  const isExam = s.config.mode === "exam";\n\n  if (!isExam && s.answered) return;', survivalSelectOption);

// 12. Update showFeedback with renderFeedbackExtras(q)
code = code.replace(
  'els.feedbackText.textContent = exp || "";\n  els.feedback.classList.remove("hidden");',
  'els.feedbackText.innerHTML = `${esc(exp || "")}${renderFeedbackExtras(q)}`;\n  els.feedback.classList.remove("hidden");'
);

// 13. Update finishQuiz for survival stats & pass reason to renderResult
code = code.replace(
  `  const newBadges = evaluateBadges(p, percent);
  saveProgress(p);

  renderResult(newBadges, percent, score, total);
  showScreen("result");`,
  `  if (s.isSurvival) {
    try {
      const prevGames = parseInt(localStorage.getItem("arenac:survival_games") || "0", 10) || 0;
      localStorage.setItem("arenac:survival_games", String(prevGames + 1));
      const prevBest = parseInt(localStorage.getItem("arenac:best:survival") || "0", 10) || 0;
      if (s.score > prevBest) {
        localStorage.setItem("arenac:best:survival", String(s.score));
      }
    } catch (e) {}
    renderSurvivalBanner();
  }

  const newBadges = evaluateBadges(p, percent);
  saveProgress(p);

  renderResult(newBadges, percent, score, total, reason);
  showScreen("result");`
);

// 14. Update renderResult: signature, survival result, and formatCode in review
code = code.replace(
  'function renderResult(newBadges, percent, score, total) {',
  'function renderResult(newBadges, percent, score, total, reason) {\n  const s = state.activeSession;'
);

code = code.replace(
  'const s = state.activeSession;\n  const wrongs = [];',
  'const wrongs = [];'
);

code = code.replace(
  `  els.resultTitle.textContent = d.result[tier].title;
  els.resultSubtitle.textContent = d.result[tier].sub;`,
  `  if (s && s.isSurvival) {
    els.ringPercent.textContent = \`\${score}\`;
    els.ringScore.textContent = state.lang === "tr" ? "Soru" : "Questions";
    els.resultTitle.textContent = fmt(d.survivalResult, { n: score });
    els.resultSubtitle.textContent = reason === "timeout"
      ? (state.lang === "tr" ? "Süre bitti! Müthiş bir refleks ve bilgi mücadelesiydi." : "Time's up! Great display of speed and knowledge.")
      : (state.lang === "tr" ? "Yanlış cevap! Hayatta kalma serin sona erdi." : "Wrong answer! Your survival streak ended.");
  } else {
    els.resultTitle.textContent = d.result[tier].title;
    els.resultSubtitle.textContent = d.result[tier].sub;
  }`
);

code = code.replace(
  `<pre class="code review-code"><code>\${highlightC(q.code)}</code></pre>
        <div class="review-answers">
          <div class="review-ans review-wrong"><strong>\${d.yourAnswer}</strong> \${esc(yourText)}</div>
          <div class="review-ans review-correct"><strong>\${d.correctAnswer}</strong> \${esc(correctText)}</div>
        </div>
        <p class="review-exp">\${esc(exp)}</p>`,
  `<pre class="code review-code"><code>\${formatCode(q.code)}</code></pre>
        <div class="review-answers">
          <div class="review-ans review-wrong"><strong>\${d.yourAnswer}</strong> \${esc(yourText)}</div>
          <div class="review-ans review-correct"><strong>\${d.correctAnswer}</strong> \${esc(correctText)}</div>
        </div>
        <p class="review-exp">\${esc(exp)}</p>
        \${renderFeedbackExtras(q)}`
);

// 15. Export, Import, and Canvas scorecard export functions
const exportImportCardFuncs = `
function exportData() {
  const backup = {
    appName: "ArenaC",
    version: 2,
    exportDate: new Date().toISOString(),
    progress: state.progress,
    bestScores: {},
    settings: {
      theme: state.theme,
      lang: state.lang,
      soundEnabled: sound.enabled,
      soundVolume: sound.volume,
      lineNumbers: state.lineNumbers
    }
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
  a.download = \`arenac_backup_\${dateStr}.json\`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showSettingsFeedback(dict().exportDone);
}

function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      if (!backup || (!backup.progress && !backup.version)) {
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
      if (backup.settings) {
        if (typeof backup.settings.theme === "string") applyTheme(backup.settings.theme);
        if (typeof backup.settings.lang === "string") applyLanguage(backup.settings.lang);
        if (typeof backup.settings.soundEnabled === "boolean") applySoundEnabled(backup.settings.soundEnabled);
        if (typeof backup.settings.soundVolume === "number") applySoundVolume(backup.settings.soundVolume);
        if (typeof backup.settings.lineNumbers === "boolean") applyLineNumbers(backup.settings.lineNumbers);
      }
      refreshCurrentView();
      renderSurvivalBanner();
      showSettingsFeedback(dict().importDone);
      sound.play("correct");
    } catch (err) {
      showSettingsFeedback(dict().importError);
      sound.play("wrong");
    }
  };
  reader.readAsText(file);
}

function generateScoreCard() {
  const s = state.activeSession;
  if (!s) return;
  const p = state.progress;
  const d = dict();

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background - Dark gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
  bgGrad.addColorStop(0, "#0b0c10");
  bgGrad.addColorStop(0.5, "#12141d");
  bgGrad.addColorStop(1, "#07080b");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 630);

  // Subtle radial glow accents
  const glow = ctx.createRadialGradient(250, 180, 20, 250, 180, 400);
  glow.addColorStop(0, "rgba(255, 212, 59, 0.12)");
  glow.addColorStop(1, "rgba(255, 212, 59, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1200, 630);

  const glow2 = ctx.createRadialGradient(950, 480, 20, 950, 480, 450);
  glow2.addColorStop(0, "rgba(56, 189, 248, 0.08)");
  glow2.addColorStop(1, "rgba(56, 189, 248, 0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, 1200, 630);

  // Card border outline
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, 1140, 570);

  // App Brand / Logo
  ctx.fillStyle = "#ffd43b";
  ctx.font = "900 32px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillText("ArenaC", 70, 95);

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "600 18px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillText("·  C Dili Mantık & Algoritma Testi", 215, 95);

  // Mode / Difficulty Chip
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
  ctx.fillText(modeTitle, 88, 154);

  // Main Score Block
  const total = s.queue.length;
  const score = s.score;
  const percent = s.isSurvival ? score : (total > 0 ? Math.round((score / total) * 100) : 0);

  if (s.isSurvival) {
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
  }

  // Stats Cards Row
  const cards = [
    { label: state.lang === "tr" ? "SEVİYE" : "LEVEL", val: \`Lvl \${levelFromXp(p.xp)}\` },
    { label: state.lang === "tr" ? "TOPLAM XP" : "TOTAL XP", val: \`\${p.xp} XP\` },
    { label: state.lang === "tr" ? "GÜN SERİSİ" : "STREAK", val: \`\${p.streak || 1} Gün\` },
    { label: state.lang === "tr" ? "DOĞRULUK" : "ACCURACY", val: \`%\${p.totalAnswered ? Math.round((p.totalCorrect / p.totalAnswered) * 100) : 0}\` }
  ];

  cards.forEach((c, idx) => {
    const x = 70 + idx * 265;
    const y = 390;
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, 240, 110, 16);
    } else {
      ctx.rect(x, y, 240, 110);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "700 12px 'JetBrains Mono', monospace, sans-serif";
    ctx.fillText(c.label, x + 20, y + 36);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 26px 'Space Grotesk', sans-serif";
    ctx.fillText(c.val, x + 20, y + 80);
  });

  // Footer text
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.font = "500 15px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillText(\`ArenaC · \${utcDayString()} · arenac.github.io\`, 70, 560);

  // Download PNG
  try {
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = \`arenac_skor_\${utcDayString()}.png\`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    sound.play("click");
  } catch (e) {
    console.error("Canvas export failed", e);
  }
}
`;

code = code.replace('function openSettings() {', exportImportCardFuncs + '\nfunction openSettings() {');

// 16. Wire Event Listeners
const newListeners = `
els.modeTabSurvival.addEventListener("click", () => toggleHomeMode("survival"));
els.survivalStartBtn.addEventListener("click", startSurvivalQuiz);
els.bookmarkBtn.addEventListener("click", toggleBookmarkCurrent);
els.bookmarksBtn.addEventListener("click", startBookmarksQuiz);
els.shareCardBtn.addEventListener("click", generateScoreCard);

els.lineNumsOnBtn.addEventListener("click", () => applyLineNumbers(true));
els.lineNumsOffBtn.addEventListener("click", () => applyLineNumbers(false));

els.exportDataBtn.addEventListener("click", exportData);
els.importDataBtn.addEventListener("click", () => els.importFileInput.click());
els.importFileInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    importData(e.target.files[0]);
    e.target.value = "";
  }
});
`;

code = code.replace(
  'els.modeTabQuiz.addEventListener("click", () => toggleHomeMode("quiz"));',
  newListeners + '\nels.modeTabQuiz.addEventListener("click", () => toggleHomeMode("quiz"));'
);

// 17. In init sequence, apply line numbers & render survival banner
code = code.replace(
  `state.progress = getProgress();
state.setup = getSavedSetup();
state.debugSetup = getSavedDebugSetup();
applyTheme(getSavedTheme() || "dark");
applyLanguage(getSavedLang() || "tr");
showScreen("home");`,
  `state.progress = getProgress();
state.setup = getSavedSetup();
state.debugSetup = getSavedDebugSetup();
try {
  const savedLineNums = localStorage.getItem("arenac:line_numbers");
  state.lineNumbers = savedLineNums !== "0";
} catch (e) {
  state.lineNumbers = true;
}
applyLineNumbers(state.lineNumbers);
renderSurvivalBanner();
applyTheme(getSavedTheme() || "dark");
applyLanguage(getSavedLang() || "tr");
showScreen("home");`
);

fs.writeFileSync('arenaC/app.js', code, 'utf8');
console.log('Successfully updated arenaC/app.js!');

