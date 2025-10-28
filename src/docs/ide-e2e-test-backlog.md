# IDE E2E Test Backlog

Date: 2024-05-15

This document captures candidate Playwright (or equivalent) scenarios to extend automated coverage of the FaustIDE UI.

## File Manager
- Delete DSP/lib/audio files and verify fallback behaviour (auto-creates `untitled.dsp` when empty, correct selection).
- Drag and drop local files (DSP + audio) into the explorer and ensure content loads.
- Download project ZIP via “Save As” and confirm a Blob URL triggers with the expected filename.

## Editor & Monaco Integration
- Toggle Monaco options (e.g., Vim mode) and assert editor state updates.
- Compile valid vs. invalid DSP code; check for diagram/plot visibility and error decorations.
- Invoke documentation shortcuts and validate the opened URL.

## Toolbar & Panels
- Switch plotting modes (offline/continuous/manual) and check UI state: labels, disabled controls, hidden buttons.
- Verify “Run” button state: disabled pre-compile, enabled post-edit, handles compile errors gracefully.
- Navigate Diagram/Plot/Examples/UI tabs and assert panel content swaps correctly.

## Audio & Recorder
- Mock audio context initialisation and assert run/stop toggles update analyser scopes.
- Exercise recorder workflow: arm, record (mock buffers), stop, and confirm timer + download link.

## Share & Export
- Generate share links after editing code and confirm the URL encodes updated code/options.
- (When re-enabled) exercise export success/error paths with mocked Faust service responses.

## MIDI & Keyboard Controls
- Change MIDI input dropdown, toggle “Keyboard” pseudo input, and synthesize key presses to validate on-screen indicators.

## Popup Windows
- Launch the Faust UI popup, mutate parameters there, and verify the main window reflects updates (requires multi-context handling).

## Responsive Layout
- Resize viewport below 900 px to ensure left/right panels auto-hide and toggle buttons update accordingly.

## Persistence
- Modify files/settings, reload the app, and check IndexedDB/BFS persistence restores state (may need reset hooks between tests).

Track progress by ticking off scenarios as they land in the Playwright suite or other automated stacks.
