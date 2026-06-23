import { describe, expect, it, vi } from "vitest";
import { Key2Midi } from "../Key2Midi";

describe("Key2Midi", () => {
    it("emits note on and note off messages", () => {
        const handler = vi.fn();
        const key2midi = new Key2Midi({ enabled: true, handler, offset: 36, velocity: 60 });

        key2midi.handleKeyDown("a");
        key2midi.handleKeyUp("a");

        expect(handler.mock.calls).toEqual([[[144, 36, 60]], [[144, 36, 0]]]);
    });

    it("does not retrigger repeated keydown for an active note", () => {
        const handler = vi.fn();
        const key2midi = new Key2Midi({ enabled: true, handler });

        key2midi.handleKeyDown("a");
        key2midi.handleKeyDown("a");

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("flushes active notes when changing octave", () => {
        const handler = vi.fn();
        const key2midi = new Key2Midi({ enabled: true, handler, offset: 36 });

        key2midi.handleKeyDown("a");
        key2midi.handleKeyDown("x");
        key2midi.handleKeyDown("a");
        key2midi.handleKeyDown("z");

        expect(handler.mock.calls).toEqual([
            [[144, 36, 60]],
            [[144, 36, 0]],
            [[144, 48, 60]],
            [[144, 36, 0]],
            [[144, 48, 0]]
        ]);
    });

    it("clamps velocity changes", () => {
        const key2midi = new Key2Midi({ enabled: true, velocity: 110 });

        key2midi.handleKeyDown("v");
        key2midi.handleKeyDown("v");
        expect(key2midi.velocity).toBe(120);

        for (let i = 0; i < 10; i++) key2midi.handleKeyDown("c");
        expect(key2midi.velocity).toBe(20);
    });

    it("emits nothing when disabled", () => {
        const handler = vi.fn();
        const key2midi = new Key2Midi({ enabled: false, handler });

        key2midi.handleKeyDown("a");
        key2midi.handleKeyUp("a");
        key2midi.flush();

        expect(handler).not.toHaveBeenCalled();
    });
});
