# ALT-13 — Integration QA + Production Build

## Result

`SOURCE / LOGIC QA = PASS`

`PRODUCTION BUILD = BLOCKED BY EXECUTION ENVIRONMENT`

This environment cannot resolve/reach the npm registry, so React/Vite/Vitest dependencies cannot be installed here. The source itself was still subjected to offline TypeScript syntax checks, a stub-assisted project type-check, CSS/HTML parsing, static hygiene checks, and 26 integration logic tests.

## Corrections applied during QA

1. `completeActivity()` now fails closed when code attempts to mutate a chapter that is still locked.
2. `completeFinal()` now refuses to grant `MASTER CORE` unless Chapters 1–4 are complete and Chapter 5 activities 1–2 are complete (`chapterProgress[5] >= 2`).

These are QA hardening corrections only; no Academic, UX, Visual, Database, Auth, or project-scope change was introduced.

## Native build blocker

Registry probe timed out. Because dependencies are absent:

- `npm test` cannot find `vitest`.
- `npm run build` cannot resolve React / React JSX runtime.

This is an environment/dependency-acquisition blocker, not a confirmed source defect.

## How to close ALT-13

Run:

```bash
bash qa/ALT13_BUILD_HARNESS.sh
```

on a Node.js environment that can access the npm registry. The harness installs dependencies, runs tests, builds Vite production `dist/`, validates the artifact, and creates a SHA-256 manifest.

Do not deploy to hosting until the evidence ends with:

```text
ALT13_BUILD_COMPLETE=PASS
```
