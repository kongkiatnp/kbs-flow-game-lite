# ALT-13 GitHub Actions Build Handoff

Workflow: `.github/workflows/alt13-production-build.yml`

It performs dependency install, unit tests, production Vite build, dist validation, SHA-256 manifest creation, release ZIP creation, and artifact upload.

ALT-13 closes only when evidence contains:

```text
ALT13_BUILD_COMPLETE=PASS
```

Deploy only the contents of `dist/` or the generated `KBS_FLOW_GAME_PRODUCTION_DIST.zip`.
