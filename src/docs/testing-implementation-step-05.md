# Testing Implementation – Step 05

Date: 2024-05-15

## Goal
Decouple Faust service network logic from the jQuery-heavy runtime and make it testable with MSW-powered suites.

## Changes
- Added `runtime/exportService.ts` exposing `submitFaustExport` and `resolveExportTarget`, encapsulating the upload + precompile flow with standard `fetch`.
- Updated `index.ts` to reuse the new helper, simplifying DOM glue while keeping UI feedback intact.
- Introduced `tests/runtime/export-service.test.ts` that leverages MSW to assert happy-path and failure scenarios, plus target resolution edge cases.

## Validation
- `npm run test:unit`
  - 5 test files, 18 assertions passed.
