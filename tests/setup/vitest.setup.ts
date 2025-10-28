import "@testing-library/jest-dom/vitest";
import "whatwg-fetch";
import "fake-indexeddb/auto";
import { AudioContext as WebAudioContext, OfflineAudioContext as WebOfflineAudioContext } from "web-audio-test-api";
import { TextDecoder, TextEncoder } from "util";
import "./msw-server";

declare global {
    // eslint-disable-next-line no-var
    var AudioContext: typeof WebAudioContext;
    // eslint-disable-next-line no-var
    var OfflineAudioContext: typeof WebOfflineAudioContext;
}

if (!globalThis.TextEncoder) {
    globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
}

if (!globalThis.TextDecoder) {
    globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}

globalThis.AudioContext = WebAudioContext as unknown as typeof globalThis.AudioContext;
globalThis.OfflineAudioContext = WebOfflineAudioContext as unknown as typeof globalThis.OfflineAudioContext;
