import "@testing-library/jest-dom/vitest";
import "fake-indexeddb/auto";
import $ from "jquery";
import { beforeAll, beforeEach, vi } from "vitest";

Object.assign(window, { $, jQuery: $ });
Object.assign(globalThis, { $, jQuery: $ });

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 16);
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (handle: number) => window.clearTimeout(handle);
}

if (!URL.createObjectURL) {
    URL.createObjectURL = vi.fn(() => "blob:mock");
}

if (!URL.revokeObjectURL) {
    URL.revokeObjectURL = vi.fn();
}

class MockAudioNode {
    connect = vi.fn(() => this);
    disconnect = vi.fn();
}

class MockGainNode extends MockAudioNode {
    gain = { value: 1 };
}

class MockAudioContext {
    sampleRate = 44100;
    currentTime = 0;
    state = "running";
    destination = new MockAudioNode();
    createGain = vi.fn(() => new MockGainNode());
    createAnalyser = vi.fn(() => new MockAudioNode());
    createChannelSplitter = vi.fn(() => new MockAudioNode());
    createMediaStreamSource = vi.fn(() => new MockAudioNode());
    resume = vi.fn(async () => undefined);
    close = vi.fn(async () => undefined);
}

Object.assign(window, {
    AudioContext: window.AudioContext || MockAudioContext,
    webkitAudioContext: (window as any).webkitAudioContext || MockAudioContext
});

// WebCrypto: jsdom does not implement crypto.subtle; shim it from Node's
// built-in WebCrypto (globalThis.crypto on Node 20+).  Needed by MountRegistry
// (token store) and the git blob-sha helper in P8.
beforeAll(async () => {
    if (!window.crypto?.subtle) {
        const { webcrypto } = await import("node:crypto");
        Object.assign(window, { crypto: webcrypto });
    }
});

beforeEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
});
