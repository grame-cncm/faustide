import { describe, expect, it, vi } from "vitest";
import { DiskCoherenceConflictError, DiskCoherenceService } from "../runtime/fs/DiskCoherenceService";
import type { DiskVolume } from "../runtime/fs/DiskVolume";
import type { DiskOriginRef } from "../runtime/fs/DiskOriginTracker";

function makeOrigin(initialText: string): { origin: DiskOriginRef; setText: (text: string) => void } {
    let text = initialText;
    let tick = 1;
    const fileHandle = {
        getFile: vi.fn(async () => ({
            lastModified: tick++,
            size: text.length,
            text: vi.fn(async () => text)
        }))
    };
    const vol = {
        fileHandle: vi.fn(async () => fileHandle)
    } as unknown as DiskVolume;
    return {
        origin: { vol, path: "main.dsp" },
        setText: (nextText: string) => { text = nextText; }
    };
}

function makeService(origin?: DiskOriginRef) {
    return new DiskCoherenceService({
        getOrigin: vi.fn(() => origin)
    });
}

describe("DiskCoherenceService", () => {
    it("allows writes when the disk text still matches the accepted snapshot", async () => {
        const { origin } = makeOrigin("process = _;");
        const service = makeService(origin);

        await service.captureDiskSnapshot("main.dsp");

        await expect(service.checkBeforeWrite("main.dsp", "process = _;")).resolves.toBeUndefined();
    });

    it("rejects writes when the disk file changed outside Faust IDE", async () => {
        const { origin, setText } = makeOrigin("process = _;");
        const service = makeService(origin);
        await service.captureDiskSnapshot("main.dsp");

        setText("process = 1;");

        await expect(service.checkBeforeWrite("main.dsp", "process = 2;"))
            .rejects.toBeInstanceOf(DiskCoherenceConflictError);
    });

    it("accepts a write when Faust IDE content already matches the changed disk text", async () => {
        const { origin, setText } = makeOrigin("process = _;");
        const service = makeService(origin);
        await service.captureDiskSnapshot("main.dsp");

        setText("process = 1;");

        await expect(service.checkBeforeWrite("main.dsp", "process = 1;")).resolves.toBeUndefined();
    });

    it("detects startup divergence between BrowserFS content and the mounted disk file", async () => {
        const { origin } = makeOrigin("external = _;");
        const service = makeService(origin);

        await service.acceptKnownContent("main.dsp", "browserfs = _;");

        await expect(service.checkBeforeWrite("main.dsp", "edited = _;"))
            .rejects.toBeInstanceOf(DiskCoherenceConflictError);
    });

    it("uses successful Faust IDE writes as the next accepted base", async () => {
        const { origin, setText } = makeOrigin("process = _;");
        const service = makeService(origin);
        await service.captureDiskSnapshot("main.dsp");

        service.acceptWrittenContent("main.dsp", "process = 1;");
        setText("process = 1;");

        await expect(service.checkBeforeWrite("main.dsp", "process = 2;")).resolves.toBeUndefined();
    });

    it("ignores untracked files and binary content", async () => {
        const service = makeService();

        await expect(service.checkBeforeWrite("ghost.dsp", "process = _;")).resolves.toBeUndefined();
        await expect(service.checkBeforeWrite("sample.wav", new Uint8Array([0, 1]))).resolves.toBeUndefined();
    });

    it("polls reload when disk changed and local content is still clean", async () => {
        const { origin, setText } = makeOrigin("process = _;");
        const service = makeService(origin);
        await service.captureDiskSnapshot("main.dsp");

        setText("process = 1;");

        await expect(service.poll("main.dsp", "process = _;")).resolves.toEqual({
            status: "reload",
            content: "process = 1;"
        });
    });

    it("polls conflict when disk and local content both changed", async () => {
        const { origin, setText } = makeOrigin("process = _;");
        const service = makeService(origin);
        await service.captureDiskSnapshot("main.dsp");

        setText("disk = _;");

        await expect(service.poll("main.dsp", "local = _;")).resolves.toEqual({ status: "conflict" });
    });

    it("polls unchanged when local content already matches disk", async () => {
        const { origin, setText } = makeOrigin("process = _;");
        const service = makeService(origin);
        await service.captureDiskSnapshot("main.dsp");

        setText("process = 1;");

        await expect(service.poll("main.dsp", "process = 1;")).resolves.toEqual({ status: "unchanged" });
    });
});
