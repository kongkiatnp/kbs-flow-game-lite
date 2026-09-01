# เกมผังงาน สัตหีบ — Alternative Simple Play Mode

**Current Stage:** `ALT-12 — CHAPTER 5 + FINAL IMPLEMENTATION`

Project ทางเลือกนี้แยกจาก Project ใหญ่โดยสมบูรณ์

## Technical Scope

- React + TypeScript + Vite
- Static SPA + Hash Routing
- No Backend / Database / Authentication
- No Statistics / Play History / Time Tracking
- Local Storage = Progress only
- AI Companion = `KBS-AI`
- 5 Chapters × 3 activities
- Final Challenge 10 questions
- Pass threshold = 8/10 (80%)

## All 5 Chapters — Real Implementation

### Chapter 1 — นาจอมเทียน / Symbols
1. Match symbols
2. Situation symbol choice
3. First flow build

### Chapter 2 — บางเสร่ / Sequence
1. Arrange sequence
2. Fill missing step
3. Restore Bang Sare harbor sequence

### Chapter 3 — สัตหีบ / Decision
1. Yes / No branch
2. Fill Decision question
3. Restore Sattahip Decision Gate

### Chapter 4 — แสมสาร / Loop
1. Conservation card loop 0/5 → 5/5
2. Stop condition
3. Repair Samaesan robot loop

### Chapter 5 — พลูตาหลวง / Integrated Review
1. **FLOW CORE REVIEW**
   - Symbol
   - Sequence
   - Decision
   - Loop

2. **MASTER FLOW MISSION**
   - START
   - รับชื่อผู้เล่น
   - เก็บ Logic Fragment
   - Decision “ครบ 3 ชิ้นหรือยัง?”
   - NO → loop back
   - YES → Output “FLOW CORE พร้อม!”
   - END
   - Visual context: โรงเรียนบ้านเขาบายศรี

3. **MASTER FLOW CHALLENGE**
   - 10 questions
   - Symbols = 2
   - Sequence = 2
   - Decision = 2
   - Loop = 2
   - Integrated = 2
   - Score is runtime-only
   - >= 8/10 = PASS
   - < 8/10 = retry or review
   - No Game Over

## Final Completion Transaction

Activities 1–2 of Chapter 5 advance only to:

```text
chapterProgress[5] = 2
```

Only a passing Final Challenge performs:

```text
chapterProgress[5] = 3
completedChapters += 5
logicCores += MASTER
finalCompleted = true
resume = ending
```

This prevents receiving MASTER CORE before Final success.

## Ending

- Logic Core 5 ชิ้นรวมเป็น FLOW CORE
- โรงเรียนบ้านเขาบายศรีเป็น Final Command Center
- Badge: `KHAOBYSRI FLOW MASTER`
- Final message: “ทุกปัญหาแก้ได้ เมื่อเราคิดอย่างเป็นขั้นตอน”

## Commands

```bash
npm install
npm run dev
npm test
npm run build
```

## Local Storage

```text
kbs_flow_game_save
```

No `localStorage.clear()`.

## Current Functional State

- Chapter 1 = REAL
- Chapter 2 = REAL
- Chapter 3 = REAL
- Chapter 4 = REAL
- Chapter 5 = REAL
- Final = REAL
- Ending = REAL

## Remaining Before Hosting

`ALT-13 — INTEGRATION QA + PRODUCTION BUILD`

- npm install
- unit tests
- TypeScript build
- Vite production build
- route/resume QA
- final threshold QA
- responsive QA
- static-hosting artifact packaging

After ALT-13, proceed to hosting deployment.

## ALT-13 QA Status

Offline integration QA passed **26/26** targeted logic tests and applied two fail-closed progression hardening corrections. Native `npm test` / Vite production build could not be completed in the current execution environment because npm registry access is unavailable. Run `bash qa/ALT13_BUILD_HARNESS.sh` in a Node environment with registry access before deployment.
