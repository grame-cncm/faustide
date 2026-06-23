import "@testing-library/jest-dom/vitest";
import $ from "jquery";
import { beforeEach, vi } from "vitest";

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

beforeEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
});
