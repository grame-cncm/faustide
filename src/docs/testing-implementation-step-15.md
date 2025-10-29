# Testing Implementation – Step 15

Date: 2024-05-15

## Goal
Add coverage for the settings modal save-code toggle.

## Changes
- Created `tests/e2e/settings.spec.ts` to open the Extra Settings modal, flip the “Save Code” checkbox, and assert `faustEnv.compileOptions.saveCode` reflects the new value.

## Validation
- `npm run test:e2e`
  - Requires Playwright browsers; run locally to confirm.
