import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("wav-encoder", () => ({
    encode: vi.fn(async () => ({ mock: true }))
}));

const loadRecorder = async () => (await import("../../src/Recorder")).Recorder;
const loadWavEncoder = async () => await import("wav-encoder");

afterEach(() => {
    vi.clearAllMocks();
});

describe("Recorder", () => {
    it("does not accumulate data when disabled", async () => {
        const Recorder = await loadRecorder();
        const recorder = new Recorder(48000);
        const buffer = [new Float32Array(128)];
        expect(recorder.append(buffer, 0)).toBe(0);
        expect(recorder.totalSec).toBe(0);
    });

    it("tracks appended buffers and elapsed time", async () => {
        const Recorder = await loadRecorder();
        const recorder = new Recorder(48000);
        recorder.enabled = true;
        const buffer = [new Float32Array(240)]; // 240 samples -> 5ms at 48kHz

        const first = recorder.append(buffer, 0);
        const second = recorder.append(buffer, 1);

        expect(first).toBeCloseTo(0.005);
        expect(second).toBeCloseTo(0.01);
        expect(recorder.totalSec).toBeCloseTo(0.01);
    });

    it("resets when buffer index skips and re-accumulates", async () => {
        const Recorder = await loadRecorder();
        const recorder = new Recorder(48000);
        recorder.enabled = true;
        const buffer = [new Float32Array(480)];

        recorder.append(buffer, 0);
        recorder.append(buffer, 2); // triggers reset internally

        expect(recorder.totalSec).toBeCloseTo(0.01);
    });

    it("encodes recorded data through wav-encoder", async () => {
        const Recorder = await loadRecorder();
        const wavEncoder = await loadWavEncoder();

        const recorder = new Recorder(44100);
        recorder.enabled = true;
        recorder.append([new Float32Array(441)], 0);

        const result = await recorder.encode();
        expect(wavEncoder.encode).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ mock: true });
    });
});
