import { describe, it, expect, beforeEach } from "vitest";
import { OriginState } from "../runtime/state/OriginState";

describe("OriginState", () => {
    let state: OriginState;

    beforeEach(() => {
        state = new OriginState();
    });

    it("starts as null (no document open)", () => {
        expect(state.get()).toBeNull();
    });

    it("set() stores the origin", () => {
        state.set({ volumeId: "library", path: "reverb.dsp" });
        expect(state.get()).toEqual({ volumeId: "library", path: "reverb.dsp" });
    });

    it("set() overwrites a previous origin", () => {
        state.set({ volumeId: "library", path: "reverb.dsp" });
        state.set({ volumeId: "disk:abc123", path: "patches/kick.dsp" });
        expect(state.get()).toEqual({ volumeId: "disk:abc123", path: "patches/kick.dsp" });
    });

    it("reset() clears the origin to null", () => {
        state.set({ volumeId: "library", path: "reverb.dsp" });
        state.reset();
        expect(state.get()).toBeNull();
    });

    it("reset() on an already-null state is a no-op", () => {
        state.reset();
        expect(state.get()).toBeNull();
    });

    it("two instances share no state (each is independent)", () => {
        const other = new OriginState();
        state.set({ volumeId: "library", path: "a.dsp" });
        expect(other.get()).toBeNull();
    });
});
