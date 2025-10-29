# Testing Implementation – Step 06

Date: 2025-10-29

## Goal
Resolve the MSW ↔︎ TypeScript compatibility gap so dependency installs remain predictable without upgrading the compiler yet.

## Findings
- MSW ≥2.0 requires TypeScript ≥4.8 as an optional peer dependency, which conflicts with the project’s current TypeScript 3.9 toolchain.
- Downgrading MSW to <0.50 would avoid the peer constraint but introduces API churn (e.g. `rest` handlers) and still expects TypeScript ≥4.4 for recent releases. Offline `npm uninstall` attempts stalled in this environment, making a temporary downgrade cumbersome.

## Decision
- Keep MSW 2.11 in the stack and document that npm installs must include `--legacy-peer-deps` until the project upgrades to TypeScript 4.x.
- Updated `docs/testing-strategy.md` Setup Steps to call out the flag so contributors avoid dependency resolution failures.
- Recorded the need to revisit a TypeScript upgrade (or MSW pin) in future backlog items.

## Validation
- `npm run test:unit`
  - 5 test files, 18 assertions passed.
