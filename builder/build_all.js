const fs = require('fs');
const path = require('path');

const beginner = require('./beginner_questions');
const intermediate = require('./intermediate_questions');
const advanced = require('./advanced_questions');
const expert = require('./expert_questions');
const debugQuestions = require('./debug_questions');

const TOPICS = {
  variables: { tr: "Değişkenler ve Tipler", en: "Variables and Types" },
  operators: { tr: "Operatörler", en: "Operators" },
  conditions: { tr: "Koşullar", en: "Conditions" },
  loops: { tr: "Döngüler", en: "Loops" },
  pointers: { tr: "İşaretçiler (Pointers)", en: "Pointers" },
  pointer_arithmetic: { tr: "Pointer Aritmetiği", en: "Pointer Arithmetic" },
  arrays: { tr: "Diziler", en: "Arrays" },
  strings: { tr: "String'ler", en: "Strings" },
  functions: { tr: "Fonksiyonlar", en: "Functions" },
  structs: { tr: "Yapılar (Struct & Union)", en: "Structs and Unions" },
  bitwise: { tr: "Bit Düzeyi İşlemler", en: "Bitwise Operations" },
  preprocessor: { tr: "Önişlemci ve Makrolar", en: "Preprocessor and Macros" },
  memory: { tr: "Dinamik Bellek", en: "Dynamic Memory" },
  scope: { tr: "Kapsam ve Bellek Ömrü", en: "Scope and Storage Duration" },
  sizeof_types: { tr: "Sizeof ve Tip Dönüşümleri", en: "Sizeof and Type Conversions" },
  undefined_behavior: { tr: "Tanımsız Davranış ve Tuzaklar", en: "Undefined Behavior and Traps" }
};

const difficulties = ["beginner", "intermediate", "advanced", "expert"];

const quizData = {
  topics: TOPICS,
  difficulties: difficulties,
  questions: {
    beginner,
    intermediate,
    advanced,
    expert
  }
};

// Validate Quiz questions
difficulties.forEach(diff => {
  const list = quizData.questions[diff];
  console.log(`Validating ${diff}: ${list.length} questions`);
  if (!list || list.length === 0) {
    throw new Error(`Empty questions for ${diff}`);
  }
  list.forEach((q, idx) => {
    if (!q.code || typeof q.code !== 'string') throw new Error(`Missing code in ${diff}[${idx}]`);
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Options length not 4 in ${diff}[${idx}]`);
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) throw new Error(`Invalid answer in ${diff}[${idx}]: ${q.answer}`);
    if (!q.explanation || !q.explanation.tr || !q.explanation.en) throw new Error(`Missing explanation in ${diff}[${idx}]`);
    if (!q.topic || !TOPICS[q.topic]) throw new Error(`Invalid or missing topic in ${diff}[${idx}]: ${q.topic}`);
  });
});

// Validate Debug questions
const debugDifficulties = Object.keys(debugQuestions);
debugDifficulties.forEach(lvl => {
  const list = debugQuestions[lvl];
  console.log(`Validating debug ${lvl}: ${list.length} questions`);
  list.forEach((q, idx) => {
    if (!q.code || typeof q.code !== 'string') throw new Error(`Missing debug code in ${lvl}[${idx}]`);
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Debug options length not 4 in ${lvl}[${idx}]`);
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) throw new Error(`Invalid debug answer in ${lvl}[${idx}]: ${q.answer}`);
    if (!q.explanation || !q.explanation.tr || !q.explanation.en) throw new Error(`Missing debug explanation in ${lvl}[${idx}]`);
    if (!q.bugError) throw new Error(`Missing bugError in debug ${lvl}[${idx}]`);
  });
});

const outDir = path.resolve(__dirname, '..', 'arenaC');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Write questions.json
fs.writeFileSync(path.join(outDir, 'questions.json'), JSON.stringify(quizData, null, 2), 'utf8');

// 2. Write questions.js (window.QUESTIONS and window.TOPICS)
const questionsJsContent = `// ArenaC · C Quiz Questions
const TOPICS = ${JSON.stringify(TOPICS, null, 2)};

const QUESTIONS = ${JSON.stringify(quizData.questions, null, 2)};

if (typeof window !== "undefined") {
  window.TOPICS = TOPICS;
  window.QUESTIONS = QUESTIONS;
}
`;
fs.writeFileSync(path.join(outDir, 'questions.js'), questionsJsContent, 'utf8');

// 3. Write debug_questions.json
const debugData = {
  difficulties: debugDifficulties,
  questions: debugQuestions
};
fs.writeFileSync(path.join(outDir, 'debug_questions.json'), JSON.stringify(debugData, null, 2), 'utf8');

// 4. Write debug_questions.js (window.DEBUG_QUESTIONS)
const debugJsContent = `// ArenaC · C Debugging Questions
const DEBUG_QUESTIONS = ${JSON.stringify(debugQuestions, null, 2)};

if (typeof window !== "undefined") {
  window.DEBUG_QUESTIONS = DEBUG_QUESTIONS;
}
`;
fs.writeFileSync(path.join(outDir, 'debug_questions.js'), debugJsContent, 'utf8');

console.log('SUCCESS: All questions and debug questions built and validated!');
