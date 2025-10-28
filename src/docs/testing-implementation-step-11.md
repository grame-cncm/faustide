# Testing Implementation – Step 11

Date: 2024-05-15

## Goal
Broaden Playwright coverage with low-effort IDE scenarios (tabs, plot options, share URL, documentation shortcut).

## Changes
- Added `tests/e2e/ui.spec.ts` containing:
  - Diagram/plot tab switching assertions.
  - Plot-mode selector checks for manual/offline visibility of the plot button.
  - Share modal URL verification after updating the editor contents.
  - A documentation shortcut test that stubs `window.open` and asserts both docs URLs open on Ctrl/⌘ + D.
- Shared helper routine to stub Faust service responses in the new spec.

## Validation
- `npm run test:e2e`
  - Not executed in this environment (requires Playwright browsers); run locally to confirm.
