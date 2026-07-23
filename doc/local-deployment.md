# Local deployment

This guide explains how to build and serve Faust IDE from a local checkout. It
covers both the normal development loop and a production-equivalent bundle; it
does not publish files to a remote host.

## Prerequisites

- Git
- Node.js 20.12 or newer in the Node 20 release line, matching CI
- npm (included with Node.js)
- A current Chrome or Firefox browser

Check the active versions from the repository root:

```sh
node --version
npm --version
```

## First-time setup

From an existing checkout:

```sh
cd /path/to/faustide-llm
npm ci
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`.
Use `npm install` instead only when intentionally changing dependencies and the
lockfile.

## Development build

Create the development bundle:

```sh
npm run build
```

This generates the application in `dist/`. Start the repository's static HTTP
server in a separate terminal:

```sh
npm run serve
```

Open <http://127.0.0.1:8000/dist/> in the browser. The equivalent
`http://localhost:8000/dist/` address also works, but use one hostname
consistently because browser storage is scoped to the origin.

The server does not rebuild or hot-reload source files. After a source change,
run `npm run build` again and reload the browser. The server can remain running.
Stop it with `Ctrl-C` when finished.

## Production-equivalent local build

To exercise the optimized bundle used by the end-to-end test workflow:

```sh
npm run dist
npm run serve
```

Open <http://127.0.0.1:8000/dist/>. If the server is already running, it does
not need to be restarted after `npm run dist`; reload the page instead.

Do not change the version in `package.json` merely to run a local build. Version
changes belong to an intentional release or versioned product change.

## Validation before handoff

Every change must pass the minimum repository gate:

```sh
npm test
npm run test:unit
npm run build
```

`npm test` runs both ESLint and Stylelint. The current SCSS sources trigger
known failures in the CSS-oriented Stylelint configuration; Stylelint is
non-blocking in CI. Inspect its output, do not treat the known failures as a new
regression, and do not disable other lint rules to hide them. ESLint remains a
required gate.

For browser-visible or bundle-dependent changes, also build the production
bundle and run Playwright:

```sh
npm run dist
npx playwright install chromium
npm run test:e2e
```

The Playwright browser installation is normally needed only once per local
environment. The end-to-end tests serve `dist/` themselves, so `npm run serve`
does not need to be running while they execute.

## Browser and audio notes

- The local server uses plain HTTP. The README requires HTTPS when testing
  audio-input devices; use an HTTPS-capable local proxy or deployment for that
  manual check.
- Browser prompts still control microphone, MIDI, and audio-device permission.
- Playwright deliberately denies microphone permission; real input/output checks
  remain part of manual browser QA.
- Remote export features require network access to the external Faust service.
- The app installs a service worker. If a reload continues to show an old
  bundle, use the browser's developer tools to unregister the service worker
  for the local origin, clear its site data, and reload.

## Common problems

### Port 8000 is already in use

Stop the process already listening on port 8000, then run `npm run serve` again.
The packaged `serve` script is fixed to that port.

### The browser still shows an earlier change

Confirm that `npm run build` or `npm run dist` completed, reload the page, then
clear the local service worker and site data if the old bundle remains cached.

### Dependency installation or tests fail on Node 18

Switch to Node 20.12 or newer and run `npm ci` again. Vitest 4 and its build
tooling require Node APIs that are unavailable in Node 18.

### Real-time audio E2E tests report zero signal on macOS

Some headless Chromium/macOS combinations keep the Web Audio clock suspended,
which affects analyser-energy and recorder assertions even when graph wiring is
correct. Run the remaining browser tests normally, then verify speakers,
recording, and signal energy manually in a visible Chrome session. CI exercises
the automated real-time checks on its supported runner.
