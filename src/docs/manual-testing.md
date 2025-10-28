# Manual Testing Playbook

Date: 2024-05-15

This check-list complements automated coverage and should be executed before releases or after significant changes to the audio or export pipelines.

## Environment
- Browsers: latest Chrome, Firefox, Safari (macOS), plus Edge (Windows) when available.
- Hardware: at least one USB audio interface + built-in speakers/microphone, MIDI keyboard (optional but recommended).
- Network access to the production Faust service (`https://faustservice.inria.fr`).

## 1. Audio Graph & Device Routing
1. Load the IDE and accept any browser audio permissions.
2. Toggle `Run` on a simple Faust example (e.g. `osc`).
3. Switch output device between built-in output and USB interface; confirm audio plays and meters respond.
4. Attach an external microphone, arm the input, and verify input scope/meter activity.
5. Toggle DAC button to ensure audio mutes/unmutes without glitches.

## 2. Recorder Workflow
1. Arm the recorder (`Aim` button turns red), start playback, and record ≥10 seconds.
2. Stop recording, download the WAV file, and replay locally to confirm audio integrity.
3. Verify timer display resets correctly after download/clear.

## 3. Export Pipeline
1. Open the Export modal, choose a platform/arch combination, and submit.
2. Wait for export completion; ensure download link and QR code appear and point to valid assets.
3. Scan the QR code with a mobile device to confirm it resolves to the generated target.
4. Capture and note any server errors; include response payloads in release notes.

## 4. Share & Persistence
1. Modify DSP code and compile; confirm the share link encodes the changes.
2. Copy the share URL into a new tab/browser profile to verify code/options restore.
3. Reload the IDE and ensure project files persist across sessions (IndexedDB).

## 5. Popup & UI Synchronisation
1. Open the Faust UI pop-out window; adjust parameters and verify values sync with the embedded UI scopes.
2. Close the main window while the popup is open; ensure popup closes automatically.
3. Trigger documentation shortcuts and confirm tooltips/hotkeys respond.

## 6. Responsive Layout & Accessibility
1. Resize to tablet/mobile widths (<900px); verify left/right panels collapse and toggle buttons operate.
2. Use keyboard navigation to access toolbar buttons; check focus outlines and tooltip accessibility.
3. Test drag-and-drop for DSP and audio files; ensure overlays appear and files load.

## 7. Browser-Specific Checks
1. Safari: confirm AudioWorklet fallback behaviour (if applicable) and permission prompts.
2. Firefox: test WebMIDI availability and keyboard-to-MIDI fallback.
3. Chrome: verify service worker registration and offline caching (only for production builds).

## Reporting
- Log browser + OS versions, hardware setup, and any anomalies in release notes.
- Attach screenshots/recordings for regressions and file issues in the tracker.
