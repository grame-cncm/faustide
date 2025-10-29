# Index Refactor Prompt Playbook

Date: 2025-10-29

This playbook translates the refactor roadmap into ready-to-send Codex prompts. Each step stays small, produces documentation, and keeps the testing workflow aligned with the plan in `docs/module-refactor-plans.md`.

## Milestone 1 — Environment Extraction

**Goal**: Introduce strongly-typed `FaustEnvironment` scaffolding, move `faustEnv` creation out of `index.ts`, and ensure bootstrap consumers use the new abstractions.

- **Implementation prompt**
  > My request for Codex: Extract the environment types and initialization from `index.ts` into `src/environment/FaustEnvironment.ts`. Update `index.ts` to instantiate and export a `FaustEnvironment` instance. Keep the runtime working by adjusting existing imports.

- **Testing prompt**
  > My request for Codex: Run `npm run test:unit` and the Playwright smoke suite, then summarize the results.

- **Documentation prompt**
  > My request for Codex: Document the environment extraction in a new `docs/refactor-step-01.md` (date 2025-10-29) describing the changes and tests.

- **Commit prompt**
  > My request for Codex: Commit the environment extraction work with an appropriate message.

## Milestone 2 — Service Layer Foundation

**Goal**: Create `CompilationService`, `ExportWorkflow`, and `AudioGraphService`, moving logic out of `index.ts` and reusing the shared environment.

- **Implementation prompt**
  > My request for Codex: Create `src/services/CompilationService.ts`, `src/services/AudioGraphService.ts`, and `src/services/ExportWorkflow.ts` by moving the corresponding logic from `index.ts` and `runtime/exportService.ts`. Wire `index.ts` to use these services instead of direct functions.

- **Testing prompt**
  > My request for Codex: Add Vitest suites under `tests/unit/services/` for the new services and run `npm run test:unit`.

- **Documentation prompt**
  > My request for Codex: Add `docs/refactor-step-02.md` (date 2025-10-29) summarizing the new services, test coverage, and integration notes.

- **Commit prompt**
  > My request for Codex: Commit the service layer extraction.

## Milestone 3 — UI Controller Cleanup

**Goal**: Align File Manager, Share, Settings, and Recorder controllers with the new services, using dependency injection and cleanup hooks.

- **Implementation prompt**
  > My request for Codex: Refactor the UI controllers in `src/controller` to consume the new services via constructor injection, provide cleanup/dispose methods, and update `index.ts` initialization.

- **Testing prompt**
  > My request for Codex: Extend jsdom integration tests for the controllers (under `tests/integration/ui/`) and run `npm run test:unit`.

- **Documentation prompt**
  > My request for Codex: Record the controller refactor in `docs/refactor-step-03.md` with notes on wiring changes and tests executed.

- **Commit prompt**
  > My request for Codex: Commit the controller refactor.

## Milestone 4 — Panel Toggle and Responsive Views

**Goal**: Consolidate `PanelToggleView`, remove duplicates, and use injected elements plus responsive helpers.

- **Implementation prompt**
  > My request for Codex: Replace the legacy `PanelToggleView` implementations with a single controller module, update selectors in `index.ts`, and add tests for resize behaviour.

- **Testing prompt**
  > My request for Codex: Update Playwright `responsive.spec.ts` to cover the new hooks and run `npm run test:e2e`.

- **Documentation prompt**
  > My request for Codex: Capture the panel toggle consolidation in `docs/refactor-step-04.md`.

- **Commit prompt**
  > My request for Codex: Commit the panel toggle refactor.

## Milestone 5 — Monaco Language Module Split

**Goal**: Decompose `monaco-faust/FaustLang.ts`, `Faust2Doc.ts`, `Faust2MD.ts`, and `register.ts` into maintainable modules with caching and disposables.

- **Implementation prompt**
  > My request for Codex: Split the Monaco language files according to `docs/module-refactor-plans.md`, introducing constants, repositories, and registration disposables. Update imports in `index.ts`.

- **Testing prompt**
  > My request for Codex: Add unit tests for the new language utilities and run `npm run test:unit`.

- **Documentation prompt**
  > My request for Codex: Write `docs/refactor-step-05.md` covering the Monaco language refactor and test outcomes.

- **Commit prompt**
  > My request for Codex: Commit the Monaco language refactor.

## Milestone 6 — Bootstrap Simplification

**Goal**: Create `bootstrap/appBootstrap.ts`, slim down `index.ts` to a tiny entry point, and ensure tests cover the startup path.

- **Implementation prompt**
  > My request for Codex: Move the startup sequence from `index.ts` into `src/bootstrap/appBootstrap.ts`, leaving `index.ts` to call `runApp()`. Ensure services and controllers are registered through the bootstrap module.

- **Testing prompt**
  > My request for Codex: Run the full test suite (`npm run test:unit` and `npm run test:e2e`) and report results.

- **Documentation prompt**
  > My request for Codex: Produce `docs/refactor-step-06.md` summarizing the bootstrap simplification.

- **Commit prompt**
  > My request for Codex: Commit the bootstrap simplification.

## Milestone 7 — Cleanup and Legacy Removal

**Goal**: Archive or remove `FileManager-new.ts`, `StaticScope-new.ts`, `old-StaticScope.ts`, and other duplicates once replacements are live.

- **Implementation prompt**
  > My request for Codex: Remove or archive the legacy prototype modules now superseded by the refactor, ensuring imports no longer reference them.

- **Testing prompt**
  > My request for Codex: Run `npm run lint` and `npm run test:unit` to confirm the cleanup.

- **Documentation prompt**
  > My request for Codex: Document the cleanup in `docs/refactor-step-07.md`, noting any files archived or deleted.

- **Commit prompt**
  > My request for Codex: Commit the cleanup work.

---

**Usage reminder**: After each milestone, update `docs/testing-strategy.md` and the relevant testing implementation step to keep the test matrix current. When in doubt, prefer smaller prompts and additional documentation commits rather than combining large changes.
