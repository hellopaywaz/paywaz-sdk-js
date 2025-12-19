# Repository Health Report

## Score (0–100)
- Overall: 64/100
- CI/Build Reproducibility: 16/25 — Golden commands exist and CI runs them, but there is no committed lockfile to guarantee deterministic installs.
- Tests/Quality Gates: 12/20 — Lint/typecheck/test/build all wired into CI with a basic Vitest smoke test; coverage is still minimal.
- Security Baseline: 15/20 — SECURITY.md, CodeQL, gitleaks, npm audit, SBOM, and Dependabot are present; dependency installation could not be validated in this environment.
- Release/Packaging: 10/15 — Package metadata/exports/build scripts are defined and a smoke script exists; changelog/versioning and lockfile reproducibility are missing.
- Documentation/Onboarding: 7/10 — README now documents commands and accurate usage, but onboarding guides and examples are sparse.
- Ops/Runbooks/Observability: 4/10 — SDK-only project with no runtime checks or operational runbooks beyond basic error handling.

## P0 Blockers
- No valid `package-lock.json` is committed, so reproducible installs and `npm ci` are not available. Generate and commit a lockfile from a networked environment.

## P1 Risks
- Automated test coverage is very limited (one smoke-level Vitest suite); core flows and webhook utilities are not exercised.
- Release process lacks a changelog and versioning policy; publishing workflows exist but are not documented in README/CONTRIBUTING.
- Dependency installation is blocked in this sandbox due to upstream proxy 403 errors; confirm CI/production runners have registry access.

## P2 Hygiene
- Add more onboarding documentation (e.g., configuration matrix, webhook verification examples, error handling guidance).
- Expand observability guidance (logging expectations, sample instrumentation) for consumers embedding the SDK in services.
- Consider adding automated formatting and pre-commit guidance to reduce churn.

## CI Status Summary
- `node-ci`: Runs lint, typecheck, test, build, and smoke on PRs and pushes to `main`.
- `codeql`: Code scanning for JavaScript/TypeScript.
- `secret-scanning`: Gitleaks scan on pushes to `main`.
- `security-audit`: Weekly scheduled `npm audit --audit-level=high` plus manual trigger.
- `sbom`: Scheduled/manual CycloneDX SBOM generation.
- Additional workflows exist for docs (`docs`, `typedoc`), SDK sync (`openapi-sdk-sync-check`, `sdk-sync`), releases/publishing (`release`, `release-drafter`, `publish-npm`, `publish-sdk-to-npm`, `publish-sdk-docs`, `npm-publish`), and sync/publish helpers.

## Security Baseline Status
- SECURITY.md present with reporting instructions.
- Dependabot configured for GitHub Actions and npm updates.
- CodeQL, gitleaks, npm audit, and SBOM workflows provide layered scanning.
- LICENSE now checked in and referenced from `package.json`; no secret material present in the repo.

## Release Readiness
- Package metadata includes scoped name, exports, types, smoke script, and `prepack` build via `tsup`.
- No changelog or documented release/versioning policy; release workflows exist but publishing requirements are not described for contributors.
- Lockfile missing; regenerate `package-lock.json` before cutting a release to ensure deterministic dependency resolution.

## Ops Readiness
- SDK is client-side/server-side oriented; no runtime health endpoints. Error handling relies on `fetch` responses; consider documenting logging/timeout/retry expectations for consumers.

## Repo Hygiene
- Baseline files present: README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, CODEOWNERS, .editorconfig, .gitignore.
- README now includes accurate Quick Start and local command references; additional onboarding content still desirable.
