import { beforeEach, describe, expect, it, vi } from "vitest";

const encode = vi.fn(async (payload: any) => payload);

vi.mock("wav-encoder", () => ({ encode }));

describe("Recorder", () => {
    beforeEach(() => {
        encode.mockClear();
    });

    it("does not append when disabled", async () => {
        const { Recorder } = await import("../Recorder");
        const recorder = new Recorder(48000);

        expect(recorder.append([new Float32Array([1, 2])], 1)).toBe(0);
        expect(recorder.totalSec).toBe(0);
    });

    it("appends continuous buffer indices", async () => {
        const { Recorder } = await import("../Recorder");
        const recorder = new Recorder(4);
        recorder.enabled = true;

        recorder.append([new Float32Array([1, 2])], 1);
        recorder.append([new Float32Array([3, 4])], 2);

        expect(recorder.data).toHaveLength(2);
        expect(recorder.totalSec).toBe(1);
    });

    it("resets on discontinuous indices", async () => {
        const { Recorder } = await import("../Recorder");
        const recorder = new Recorder(4);
        recorder.enabled = true;

        recorder.append([new Float32Array([1, 2])], 1);
        recorder.append([new Float32Array([3, 4])], 3);

        expect(recorder.data).toHaveLength(1);
        expect(Array.from(recorder.data[0][0])).toEqual([3, 4]);
        expect(recorder.totalSec).toBe(0.5);
    });

    it("uses sample rate, buffer count, and buffer size for total seconds", async () => {
        const { Recorder } = await import("../Recorder");
        const recorder = new Recorder(8);
        recorder.enabled = true;

        recorder.append([new Float32Array(4)], 1);
        recorder.append([new Float32Array(4)], 2);
        recorder.append([new Float32Array(4)], 3);

        expect(recorder.totalSec).toBe(1.5);
    });

    it("copies appended buffers so reused source arrays do not corrupt the recording", async () => {
        const { Recorder } = await import("../Recorder");
        const recorder = new Recorder(4);
        recorder.enabled = true;

        // Simulate a node that reuses the same output buffer across blocks.
        const reused = [new Float32Array([1, 2])];
        recorder.append(reused, 1);
        reused[0][0] = 99;
        reused[0][1] = 98;
        recorder.append(reused, 2);

        // Each stored block keeps its own values, independent of later mutation.
        expect(Array.from(recorder.data[0][0])).toEqual([1, 2]);
        expect(Array.from(recorder.data[1][0])).toEqual([99, 98]);
        expect(recorder.data[0][0]).not.toBe(reused[0]);
    });

    it("passes multi-channel data to the WAV encoder", async () => {
        const { Recorder } = await import("../Recorder");
        const recorder = new Recorder(44100);
        recorder.enabled = true;

        recorder.append([new Float32Array([1, 2]), new Float32Array([3, 4])], 1);
        recorder.append([new Float32Array([5, 6]), new Float32Array([7, 8])], 2);

        const payload = await recorder.encode();

        expect(encode).toHaveBeenCalledTimes(1);
        expect(payload.sampleRate).toBe(44100);
        expect(payload.channelData.map((channel: Float32Array) => Array.from(channel))).toEqual([
            [1, 2, 5, 6],
            [3, 4, 7, 8]
        ]);
    });
});
