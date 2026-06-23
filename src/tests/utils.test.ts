import { describe, expect, it, vi } from "vitest";
import { getRms, mod, safeStorage, setWrap, sliceWrap, wrap } from "../utils";

describe("utils", () => {
    it("wraps modulo for positive and negative values", () => {
        expect(mod(7, 5)).toBe(2);
        expect(mod(-1, 5)).toBe(4);
        expect(mod(-6, 5)).toBe(4);
    });

    it("wraps an offset index", () => {
        expect(wrap(3, 4, 5)).toBe(2);
        expect(wrap(0, -1, 5)).toBe(4);
    });

    it("slices Float32Array data across wrapped boundaries", () => {
        expect(Array.from(sliceWrap(new Float32Array([1, 2, 3, 4]), 2, 5))).toEqual([3, 4, 1, 2, 0]);
        expect(Array.from(sliceWrap(new Float32Array([1, 2, 3, 4]), -1, 3))).toEqual([4, 1, 2]);
    });

    it("sets Float32Array data across wrapped boundaries", () => {
        const dest = new Float32Array([0, 0, 0, 0]);
        setWrap(dest, new Float32Array([1, 2, 3]), 2);
        expect(Array.from(dest)).toEqual([3, 0, 1, 2]);
    });

    it("computes RMS", () => {
        expect(getRms(new Float32Array([3, 4]))).toBeCloseTo(Math.sqrt(12.5));
    });

    it("uses localStorage when available", () => {
        safeStorage.setItem("key", "value");
        expect(safeStorage.getItem("key")).toBe("value");
        safeStorage.removeItem("key");
        expect(safeStorage.getItem("key")).toBeNull();
    });

    it("returns an empty string when localStorage throws", () => {
        const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            throw new Error("blocked");
        });
        const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
            throw new Error("blocked");
        });
        const removeItem = vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
            throw new Error("blocked");
        });

        expect(safeStorage.getItem("key")).toBe("");
        expect(safeStorage.setItem("key", "value")).toBe("");
        expect(safeStorage.removeItem("key")).toBe("");

        getItem.mockRestore();
        setItem.mockRestore();
        removeItem.mockRestore();
    });
});
