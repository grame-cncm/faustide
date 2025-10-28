# Testing Implementation – Step 11

Date: 2024-05-15

## Goal
Broaden Playwright coverage with low-effort IDE scenarios (tabs, plot options, share URL, documentation shortcut).

## Changes
- Added `tests/e2e/ui.spec.ts` containing:
  - Diagram/plot tab switching assertions.
  - Plot-mode selector checks that the plot button hides/shows appropriately via computed styles.
  - Share modal autorun toggle verification (updates query parameters).
  - A documentation button test that stubs `window.open` and asserts both docs URLs open when clicking `Docs`.
- Shared helper routine to stub Faust service responses in the new spec.

## Validation
- `npm run test:e2e`
  - Not executed in this environment (requires Playwright browsers); run locally to confirm.
