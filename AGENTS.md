# Contributing guide — for humans and AI agents

Faust IDE web (`fausteditorweb`): a browser TypeScript app bundled with webpack,
refactored from a monolithic `src/index.ts` into layered modules.

This file is the contract for changing code in this repository. It applies to
**every contributor** — and especially when you drive the work with an AI coding
agent (Claude Code, Cursor, Copilot, etc.). If you use an agent, **you remain the
author**: you are responsible for everything in your PR, exactly as if you had
typed it. An agent that cannot satisfy the rules below has not finished the job.

The goal is a codebase that stays **clean, well-tested, and well-documented**.
Three non-negotiables follow from that:

> 1. **Characterize first, then change in small reversible steps.** Add or
>    confirm a test that pins current behavior *before* moving or rewriting code.
> 2. **Keep the gate green at every commit** (lint + unit + build, e2e when
>    relevant) and **never fabricate or assume a result** — run it and read it.
> 3. **Touch only what the task needs.** Small, focused diffs; no drive-by
>    reformatting, no dead code, no scope creep.

## Definition of done (PR checklist)

A change is ready only when **all** of these hold:

- [ ] `npm test` (lint), `npm run test:unit`, and `npm run build` pass locally.
- [ ] `npm run test:e2e` passes when the change is browser-visible or
      bundle-dependent (see the Validation section for the trigger list).
- [ ] New/changed behavior has tests; a bug fix has a regression test that fails
      without the fix.
- [ ] Coverage thresholds still pass; if coverage rose, the ratchet was raised,
      not lowered.
- [ ] Public modules/methods touched are documented to the house standard.
- [ ] `doc/refactor-plan.md` is updated if structure or phase status changed.
- [ ] The diff is minimal and self-contained; commit(s) follow the conventions
      below; nothing unrelated is reformatted.
- [ ] No new `eslint-disable`, `@ts-ignore`, `any`, or skipped test without a
      one-line justification in the code.

## Working with an AI agent — guardrails

- **Verify, don't trust.** Agents hallucinate APIs. Before relying on a symbol,
  method, flag, or file, confirm it exists in this repo or its dependencies.
- **Real results only.** Paste actual command output. Never write "tests pass"
  without having run them; never invent coverage numbers or a green CI.
- **Small, reviewable diffs.** Ask the agent to change one thing at a time and to
  keep unrelated files untouched. Review every line before committing.
- **Tests and docs in the same change** as the code — not "later".
- **Behavior-preserving by default.** For refactors, the agent must keep the
  test suite green and must not change observable behavior unless the task says
  so. Large refactors are split into committed, individually-green steps.
- **Respect the architecture boundaries below.** An agent adding logic to
  `index.ts`, writing the DOM from a service, or mutating env fields directly is
  doing it wrong.
- **Autonomy stops at the remote.** Do not commit to the default branch, push,
  or open/merge a PR unless explicitly asked. Branch for changes.
- **When unsure, ask** rather than guessing — especially before deleting code,
  changing the `window.faustEnv` shape, or touching the audio graph.

## Architecture (where code goes)

`src/index.ts` is a **composition root only**: it loads browser dependencies,
constructs stores/services/controllers/views, wires them, runs startup, and
exposes the `window.faustEnv` compatibility bridge. **Do not add behavior here.**

New behavior belongs in one of:

- **model** (`src/model/`) — pure project/file decision rules (`ProjectModel`).
- **runtime services** (`src/runtime/`) — DOM-free logic: audio graph
  (`AudioEngine`), DSP run (`DspRunner`), diagram/export/share
  (`DiagramService`, `ExportService`, `ShareUrlService`), settings/persistence
  (`EditorSettingsStore`, `ProjectPersistence`), explicit types (`types.ts`),
  owned state (`state/AudioGraphState`, `state/ScopeState`), the action seam
  (`RuntimeActions`).
- **controllers/views** (`src/ui/`) — DOM binding; may use jQuery/selectors,
  but should call services/models rather than own runtime state.
- **scope widgets** (`src/scope/`) — analyser/plot rendering, controls, and
  interactions extracted from `Scope`/`StaticScope`.

Rules:

- Inject dependencies explicitly through an options object; do not import
  browser globals inside runtime services.
- Services must be DOM-free and jQuery-free; keep DOM in `src/ui/`.
- Mutable audio/scope state is owned by `AudioGraphState`/`ScopeState` (they wrap
  the same `FaustEditor*Env` record). Mutate that state through their methods,
  not by writing env fields directly.
- **Preserve the `window.faustEnv` shape and the `localStorage` keys**
  (`faust_editor_version|params|dsp_params|dsp_table`) — the e2e suite and
  returning users depend on them.

`doc/refactor-plan.md` is the living architecture + phase document. Consult it
for the module map and current phase status; update it when you change structure.

## Test setup (three-layer pyramid)

| Layer | Command | What it covers |
|-------|---------|----------------|
| Lint / style | `npm test` | ESLint (`test-eslint`) + Stylelint (`test-stylelint`) |
| Unit / jsdom | `npm run test:unit` (`:watch`, `test:coverage`) | `src/**/*.test.ts` |
| Browser e2e | `npm run test:e2e` | Playwright against the built `dist/` |

### Unit / integration (Vitest, jsdom)

- Config: `vitest.config.ts` (`jsdom`, `restoreMocks: true`, setup
  `src/tests/setup.ts` which provides jQuery, rAF, `URL.createObjectURL`, Web
  Audio mocks, and resets DOM/`localStorage`). `monaco-editor` is aliased to a
  stub (`src/tests/stubs/`) so modules importing it stay testable.
- One test file per module, `src/tests/*.test.ts`. Reusable canvas/audio/rAF
  mocks live in `src/tests/helpers/`.
- Mock with `vi.mock` (e.g. replace `@grame/faustwasm` with small factory
  doubles); reserve MSW for the few cases that need it. Use an in-memory fake FS
  implementing the `TFileSystem` contract, not real BrowserFS.
- **Coverage is a ratchet, not a target.** `vitest.config.ts` sets global
  thresholds just below current coverage so the suite cannot silently regress.
  When you add tested code, raise the floor — never lower it to pass.

### Browser e2e (Playwright)

- Config: `playwright.config.ts` serves the built `dist/` via
  `tests/e2e/serve-dist.cjs`, so **e2e runs the production bundle** — run
  `npm run dist` before/with it.
- Reuse the shared helpers in `tests/e2e/helpers.ts` (`openApp`, `runDsp`,
  `setEditorCode`, `mockFaustService`); don't duplicate them. Mock external Faust
  service calls with `page.route`.
- Conventions that keep e2e reliable:
  - assert via `expect.poll` / web-first assertions; avoid fixed `waitForTimeout`
    except when sampling a genuinely time-based signal;
  - drive hidden/overlay elements with `locator.dispatchEvent("click")` rather
    than forcing visibility;
  - read app state through `window.faustEnv` in `page.evaluate`;
  - for audio, **measure signal** (read `analyserOutput` energy, or decode the
    recorded WAV and check frequency/RMS) instead of trying to hear it.
- What e2e cannot cover stays in the manual checklist in `doc/refactor-plan.md`:
  real speakers/mic, output-device selection, popups, production Faust export.
  Flag these for a human to verify.

## Validation (run before every commit)

Minimum gate for any change:

```sh
npm test            # eslint (+ stylelint, non-blocking)
npm run test:unit
npm run build
```

Also run e2e when the change touches bootstrap, examples, files, audio, DSP
compilation, diagram, export/share URL, panels, scopes, recording, or startup
ordering — i.e. anything browser-visible or bundle-dependent:

```sh
npm run dist
npm run test:e2e
```

CI (`.github/workflows/ci.yml`) runs the full gate on push/PR — ESLint, Vitest
**with coverage thresholds**, build, and Playwright — on **Node 20**
(Vitest 4 / rolldown needs `node:util` `styleText`, absent on Node 18). Keep CI
green; do not merge red.

Note: **Stylelint currently fails** on the SCSS sources (the config is not
SCSS-aware) and runs **non-blocking** in CI. Don't treat its failure as a
regression you caused, and don't disable other lint to "fix" it.

## Documentation

- **Code:** TSDoc-style comments. Each module gets a file/class-level `/**`
  header: a one-line summary plus a short paragraph on the module's *role in the
  runtime* (its boundary and what it deliberately does not do). Document public
  methods (and non-obvious private ones) with a summary and `@param`/`@returns`.
  **Match the surrounding density and idiom** — don't add noise to trivial
  one-liners, don't leave a public API undocumented.
- **Architecture/process:** update `doc/refactor-plan.md` when you change
  structure or finish a planned step — keep the phase status table, the
  "current status" notes, and the test-strategy counts accurate. When you defer
  or skip a step, say why.
- **Testing:** `doc/testing.md` is the living reference for the test
  architecture. When you add a new test file, a new helper, a new stub, or a
  new E2E spec that introduces a pattern not yet described there, extend the
  relevant section. Keep the file accurate — don't let it drift from reality.
- Write `doc/refactor-plan.md` and journal-style entries in **English**.

## Commits

- One commit per testable unit (a characterization pass, one extraction, one
  state group, one fix). Keep each commit green.
- Conventional-commit style: `type(scope): summary` (e.g. `refactor(state):`,
  `fix(recorder):`, `test(e2e):`, `docs(refactor-plan):`). The body explains the
  *why* and states the verification result (e.g. "Vitest 286/286, Playwright
  68/68").
- If an AI agent co-authored the change, credit it with a trailer, e.g.:

  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```
- Branch for changes; do not commit to the default branch. Commit/push only when
  asked.
- **`master` history is always linear — no merge commits.** Integrate a branch
  with a fast-forward merge (`git merge --ff-only`, or plain `git merge` when
  the branch was cut from the current tip); rebase the branch onto `master`
  first if it would not fast-forward. Never `git merge --no-ff` into `master`.
  Delete the branch once it's merged in.

## Quick reference

```sh
npm run serve          # luvi dev server on :8000 (manual listening/QA)
npm run build          # webpack dev build -> dist/
npm run dist           # prebuild (examples index) + production build
npm test               # lint (eslint + stylelint)
npm run test:unit      # vitest (jsdom)
npm run test:coverage  # vitest + coverage thresholds
npm run test:e2e       # playwright against dist/
```
