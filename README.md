# ArenaC

> Interactive C Logic, Architecture, and Undefined Behavior Mastery Platform.

ArenaC is a high-performance, zero-dependency Progressive Web Application (PWA) engineered to train and test advanced low-level C programming skills. From integer promotion rules and sequence points to pointer arithmetic, memory management, and ISO C standard edge cases, ArenaC offers a structured, competitive arena for software engineers, systems programmers, and computer science students.

---

## Key Highlights

- **Zero External Dependencies**: Built entirely with standard vanilla Web technologies (HTML5, CSS3, ES6+ JavaScript, Web Audio API, Service Worker API).
- **Curated 200-Question Dataset**: Includes 160 core conceptual and logic challenges across 16 domain topics, plus 40 real-world debugging scenarios.
- **Strict Offline Capability**: Fully functional offline via a robust Service Worker cache strategy. Installable on desktop (Windows, macOS, Linux) and mobile devices (Android, iOS).
- **Achievements & Showcase**: 20 unlockable achievements categorized into 4 tiers (Easy, Medium, Hard, Legendary) with profile badge pinning.
- **Multi-Profile System**: Supports multiple local player profiles with granular progress tracking, statistics, and JSON export/import.
- **Dynamic Scorecard Generator**: Generates shareable, high-resolution PNG scorecards client-side using the HTML5 Canvas API.

---

## Features

### 1. Curated Question Bank
The curriculum spans four progressive difficulty tiers:
- **Beginner**: Syntax fundamentals, basic types, conditional branching, loops, and standard library I/O.
- **Intermediate**: Single and multi-dimensional arrays, basic pointer mechanics, struct memory layouts, and standard string manipulation.
- **Advanced**: Dynamic memory allocation (`malloc`, `calloc`, `realloc`, `free`), function pointers, type qualifiers (`const`, `volatile`, `restrict`), bitwise operators, and preprocessor macros.
- **Expert**: Undefined behavior (UB), implementation-defined behavior, sequence points, strict aliasing, type punning, integer overflows, memory alignment, and cache-aware logic.

### 2. Practice & Competitive Modes
- **Classic Practice**: Filter by difficulty and topic. Review detailed explanations referencing ISO/IEC 9899 standards after each question.
- **Survival / Time Attack**: Fast-paced challenge mode where players race against a dynamic countdown timer with streak score multipliers.
- **Debugging Challenge**: Identify and fix subtle logic errors, buffer overflows, memory leaks, and off-by-one bugs.
- **Bookmarks & Mistake Review**: Automatically logs incorrect answers for targeted practice and allows bookmarking specific challenges for later study.

### 3. Gamification & Showcase
- **Badge Vitrin**: Earn up to 20 distinct badges across Easy, Medium, Hard, and Legendary tiers.
- **Profile Showcase**: Pin your top achievement directly to your user profile card.
- **Streak & Accuracy Tracking**: Live metrics on answer accuracy, consecutive streak lengths, and topic-specific performance.

### 4. Code Presentation & Tools
- **Line Numbers & Highlighting**: Monospaced, high-contrast code presentation with line numbering for debugging questions.
- **C Cheat Sheet / Reference Modal**: Quick access to format specifier tables, memory pointers, precedence tables, and standard library summaries.
- **Synthesized Audio Engine**: Real-time sound feedback generated purely via the Web Audio API without external audio assets.
- **Scorecard Export**: One-click generation of customized summary cards exported directly as PNG images.

---

## Technical Architecture

```
arenac/
|-- index.html              # Main single-page application shell and UI components
|-- style.css               # Design system, CSS variables, dark/light themes, animations
|-- app.js                  # Application controller, audio engine, state management, PWA hooks
|-- questions.js            # Standard question dataset (160 questions)
|-- questions.json          # Standard question dataset in structured JSON
|-- debug_questions.js      # Debugging question dataset (40 questions)
|-- debug_questions.json    # Debugging question dataset in structured JSON
|-- sw.js                   # Service Worker implementation (offline caching, cache invalidation)
|-- manifest.webmanifest    # W3C Web App Manifest for PWA installation
|-- favicon.png             # Application favicon
|-- icon-192.png            # PWA standard icon (192x192)
|-- icon-512.png            # PWA high-resolution icon (512x512)
|-- arena.png               # Brand and scorecard graphics
|-- builder/                # Question generation and automated verification suites
|   |-- verify.js           # Full syntax, data integrity, and DOM link validator
|   |-- verify_pwa.js       # PWA manifest, meta tags, and Service Worker auditor
|   `-- ...                 # Dataset compilation utilities
|-- .gitignore              # Git ignore rules
|-- LICENSE                 # MIT License
`-- README.md               # Project documentation
```

### Technology Stack
- **Frontend Core**: Vanilla ECMAScript 2020+ (ES6+)
- **Styling**: CSS3 Custom Properties (Design Tokens), Flexbox, CSS Grid
- **Sound**: Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`)
- **Graphics**: HTML5 Canvas 2D Context
- **Storage**: Browser LocalStorage with JSON serialization for profiles and progress
- **PWA**: Service Worker Cache API (`CacheStorage`), Web App Manifest specification

---

## Getting Started

### Local Setup
Because ArenaC has zero external dependencies and requires no compilation step, you can run it using any static HTTP server.

#### Option A: Python 3
```bash
# Clone the repository
git clone https://github.com/tommyvercetti89/arenac.git
cd arenac

# Start local server
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

#### Option B: Node.js (npx serve or http-server)
```bash
# Using npx serve
npx serve .

# Or using http-server
npx http-server -p 8000 .
```

#### Option C: Direct File Access
You can also open `index.html` directly in modern web browsers (Chrome, Edge, Firefox, Safari). Note that Service Worker features require an `http://`, `https://`, or `localhost` context to register.

---

## Quality Assurance & Verification

ArenaC includes automated test scripts to ensure data integrity, valid syntax, complete DOM mapping, and strict PWA compliance.

Run the verification test suite:
```bash
node builder/verify.js
```
Expected output:
```
--- 1. Testing questions.js ---
QUESTIONS difficulties: [ 'beginner', 'intermediate', 'advanced', 'expert' ]
TOPICS count: 16
--- 2. Testing debug_questions.js ---
DEBUG_QUESTIONS difficulties: [ 'beginner', 'intermediate', 'advanced', 'expert' ]
--- 3. Testing questions.json ---
JSON questions count: 160
--- 4. Testing debug_questions.json ---
JSON debug questions count: 40
--- 5. Testing manifest.webmanifest ---
Manifest name: ArenaC · C Dili Mantık Testi
--- 6. Testing sw.js syntax ---
sw.js valid syntax!
--- 7. Testing app.js syntax ---
app.js valid syntax!
--- 8. Testing image files ---
... Valid PNG header: true
--- 9. Checking all IDs in index.html against app.js ---
Found IDs in index.html: 174
IDs accessed in app.js: 164

ALL VERIFICATION CHECKS PASSED WITH 100% SUCCESS!
```

Run the PWA compliance suite:
```bash
node builder/verify_pwa.js
```
Expected output:
```
--- Comprehensive PWA Verification ---
Manifest is valid JSON: YES
Manifest field [name]: OK
Manifest field [short_name]: OK
Manifest field [start_url]: OK
Manifest field [display]: OK
Manifest field [icons]: OK
Total icons in manifest: 4
...
--- PWA Audit Complete ---
```

---

## Deployment to GitHub Pages

To host ArenaC freely using GitHub Pages:

1. Push this repository to your GitHub account (`tommyvercetti89/arenac`).
2. Navigate to **Settings** > **Pages** in the repository navigation.
3. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
4. Set the branch to `main` and the folder to `/ (root)`.
5. Click **Save**.
6. Your application will be live at `https://tommyvercetti89.github.io/arenac/`.

---

## Security & Privacy

- **No Remote Tracking**: ArenaC does not collect, transmit, or store any personal data or usage analytics.
- **Strict Content Security Policy**: Configured to restrict script and resource execution to self-contained assets.
- **Local Persistence**: All profile information, custom settings, and progress remain strictly within the user's local browser storage.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

