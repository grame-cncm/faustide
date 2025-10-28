import { describe, expect, it } from "vitest";
import { mod, wrap, sliceWrap, setWrap, getRms } from "../../src/utils";

describe("utils.ts helpers", () => {
    describe("mod", () => {
        it("wraps negative values correctly", () => {
            expect(mod(-1, 5)).toBe(4);
            expect(mod(-6, 5)).toBe(4);
        });

        it("returns the remainder for positive values", () => {
            expect(mod(7, 5)).toBe(2);
        });
    });

    describe("wrap", () => {
        it("wraps indices within bounds", () => {
            expect(wrap(3, 2, 5)).toBe(0);
            expect(wrap(-2, 0, 5)).toBe(3);
        });
    });

    describe("sliceWrap", () => {
        it("returns a wrapped slice from negative offsets", () => {
            const source = new Float32Array([0, 1, 2, 3, 4]);
            const result = sliceWrap(source, -2, 4);
            expect(Array.from(result)).toEqual([3, 4, 0, 1]);
        });
    });

    describe("setWrap", () => {
        it("writes into a circular buffer with wraparound", () => {
            const destination = new Float32Array([0, 0, 0, 0]);
            const source = new Float32Array([1, 2, 3]);
            const result = setWrap(destination, source, 3);
            expect(Array.from(result)).toEqual([2, 3, 0, 1]);
        });
    });

    describe("getRms", () => {
        it("computes the root mean square of a signal", () => {
            const input = new Float32Array([1, -1, 1, -1]);
            expect(getRms(input)).toBeCloseTo(1);
        });
    });
});
