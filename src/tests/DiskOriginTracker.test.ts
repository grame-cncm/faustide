import { describe, expect, it, vi } from "vitest";
import { DiskOriginTracker } from "../runtime/fs/DiskOriginTracker";
import type { DiskVolume } from "../runtime/fs/DiskVolume";

// Minimal DiskVolume fake: records write calls via a writable stream spy.
function makeFakeVol(writeSpy: (content: string) => void): DiskVolume {
    const writable = {
        write: vi.fn((content: string) => { writeSpy(content); return Promise.resolve(); }),
        close: vi.fn(() => Promise.resolve()),
    };
    return {
        kind: "disk",
        fileHandle: vi.fn(() => Promise.resolve({
            createWritable: vi.fn(() => Promise.resolve(writable)),
        })),
    } as unknown as DiskVolume;
}

describe("DiskOriginTracker", () => {
    describe("track / has / forget", () => {
        it("starts empty", () => {
            const tracker = new DiskOriginTracker();
            expect(tracker.has("foo.dsp")).toBe(false);
        });

        it("tracks a .dsp file", () => {
            const tracker = new DiskOriginTracker();
            const vol = makeFakeVol(vi.fn());
            tracker.track("kick.dsp", vol, "patches/kick.dsp");
            expect(tracker.has("kick.dsp")).toBe(true);
        });

        it("tracks a .lib file", () => {
            const tracker = new DiskOriginTracker();
            const vol = makeFakeVol(vi.fn());
            tracker.track("utils.lib", vol, "utils.lib");
            expect(tracker.has("utils.lib")).toBe(true);
        });

        it("does NOT track audio files (import-copy decision)", () => {
            const tracker = new DiskOriginTracker();
            const vol = makeFakeVol(vi.fn());
            tracker.track("sample.wav", vol, "sample.wav");
            expect(tracker.has("sample.wav")).toBe(false);
        });

        it("does NOT track unknown extensions", () => {
            const tracker = new DiskOriginTracker();
            const vol = makeFakeVol(vi.fn());
            tracker.track("README.txt", vol, "README.txt");
            expect(tracker.has("README.txt")).toBe(false);
        });

        it("forget removes a tracked file", () => {
            const tracker = new DiskOriginTracker();
            const vol = makeFakeVol(vi.fn());
            tracker.track("kick.dsp", vol, "kick.dsp");
            tracker.forget("kick.dsp");
            expect(tracker.has("kick.dsp")).toBe(false);
        });

        it("forget on an untracked name is a no-op", () => {
            const tracker = new DiskOriginTracker();
            expect(() => tracker.forget("ghost.dsp")).not.toThrow();
        });

        it("can track multiple files independently", () => {
            const tracker = new DiskOriginTracker();
            const vol = makeFakeVol(vi.fn());
            tracker.track("a.dsp", vol, "a.dsp");
            tracker.track("b.lib", vol, "b.lib");
            expect(tracker.has("a.dsp")).toBe(true);
            expect(tracker.has("b.lib")).toBe(true);
        });
    });

    describe("writeToDisk", () => {
        it("writes string content to the disk file handle", async () => {
            const written: string[] = [];
            const vol = makeFakeVol((c) => { written.push(c); });
            const tracker = new DiskOriginTracker();
            tracker.track("kick.dsp", vol, "patches/kick.dsp");

            await tracker.writeToDisk("kick.dsp", "process = _;");

            expect(written).toEqual(["process = _;"]);
        });

        it("calls fileHandle with the exact path", async () => {
            const vol = makeFakeVol(vi.fn());
            const tracker = new DiskOriginTracker();
            tracker.track("kick.dsp", vol, "patches/kick.dsp");

            await tracker.writeToDisk("kick.dsp", "process = _;");

            expect((vol.fileHandle as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe("patches/kick.dsp");
        });

        it("calls close() after write()", async () => {
            let closeCalled = false;
            const writable = {
                write: vi.fn(() => Promise.resolve()),
                close: vi.fn(() => { closeCalled = true; return Promise.resolve(); }),
            };
            const vol = {
                kind: "disk",
                fileHandle: vi.fn(() => Promise.resolve({
                    createWritable: vi.fn(() => Promise.resolve(writable)),
                })),
            } as unknown as DiskVolume;
            const tracker = new DiskOriginTracker();
            tracker.track("kick.dsp", vol, "kick.dsp");

            await tracker.writeToDisk("kick.dsp", "process = _;");

            expect(closeCalled).toBe(true);
        });

        it("is a no-op for untracked files", async () => {
            const tracker = new DiskOriginTracker();
            await expect(tracker.writeToDisk("ghost.dsp", "process = _;")).resolves.toBeUndefined();
        });

        it("is a no-op for binary content", async () => {
            const written: string[] = [];
            const vol = makeFakeVol((c) => { written.push(c); });
            const tracker = new DiskOriginTracker();
            tracker.track("kick.dsp", vol, "kick.dsp");

            await tracker.writeToDisk("kick.dsp", new Uint8Array([0, 1, 2]));

            expect(written).toHaveLength(0);
        });

        it("is a no-op after forget()", async () => {
            const written: string[] = [];
            const vol = makeFakeVol((c) => { written.push(c); });
            const tracker = new DiskOriginTracker();
            tracker.track("kick.dsp", vol, "kick.dsp");
            tracker.forget("kick.dsp");

            await tracker.writeToDisk("kick.dsp", "process = _;");

            expect(written).toHaveLength(0);
        });

        it("writes to the correct volume when multiple files are tracked", async () => {
            const writtenA: string[] = [];
            const writtenB: string[] = [];
            const volA = makeFakeVol((c) => { writtenA.push(c); });
            const volB = makeFakeVol((c) => { writtenB.push(c); });
            const tracker = new DiskOriginTracker();
            tracker.track("a.dsp", volA, "a.dsp");
            tracker.track("b.dsp", volB, "b.dsp");

            await tracker.writeToDisk("a.dsp", "A");
            await tracker.writeToDisk("b.dsp", "B");

            expect(writtenA).toEqual(["A"]);
            expect(writtenB).toEqual(["B"]);
        });
    });
});
