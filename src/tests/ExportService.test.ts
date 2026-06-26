import JSZip from "jszip";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExportService } from "../runtime/ExportService";

// ExportService is the network boundary for faustservice. Tests keep fetch
// mocked and inspect the generated files so UI code can stay thin.
const response = (body: string, init: ResponseInit = {}) => new Response(body, {
    status: 200,
    ...init
});

const readFileAsArrayBuffer = (file: File) => new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
});

const readFileAsText = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
});

describe("ExportService", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    // Golden updated by P7 commit 7.2: only the computed closure is bundled,
    // not "all .lib + all audio".  mainCode "process = _;" has no imports, so
    // the closure = { demo.dsp } only.  Unreferenced libs and audio are excluded.
    it("builds a project ZIP with only the computed closure of the main DSP", async () => {
        const service = new ExportService();
        const file = await service.buildProjectZip({
            name: "demo",
            fileNames: ["lib.lib", "kick.wav", "voice.flac", "ignored.dsp"],
            getValue: fileName => fileName === "kick.wav" ? new Uint8Array([1, 2, 3]) : `${fileName} content`,
            mainCode: "process = _;"
        });

        const zip = await JSZip.loadAsync(await readFileAsArrayBuffer(file));

        expect(file.name).toBe("demo.zip");
        // Generated main is always present
        expect(await zip.file("demo.dsp").async("string")).toBe("declare filename \"demo.dsp\";\ndeclare name \"demo\";\nprocess = _;");
        // Unreferenced files are excluded (tighter than the old "all .lib + all audio")
        expect(zip.file("lib.lib")).toBeNull();
        expect(zip.file("kick.wav")).toBeNull();
        expect(zip.file("voice.flac")).toBeNull();
        expect(zip.file("ignored.dsp")).toBeNull();
    });

    it("builds a project ZIP that includes a referenced library", async () => {
        const service = new ExportService();
        const file = await service.buildProjectZip({
            name: "reverb",
            fileNames: ["filters.lib", "unreferenced.lib"],
            getValue: fileName => `${fileName} content`,
            mainCode: 'import("filters.lib"); process = _;'
        });

        const zip = await JSZip.loadAsync(await readFileAsArrayBuffer(file));

        expect(await zip.file("filters.lib").async("string")).toBe("filters.lib content");
        expect(zip.file("unreferenced.lib")).toBeNull();
    });

    it("builds the expanded source file used by GUI Builder exports", async () => {
        const service = new ExportService();
        const file = service.buildSourceFile({
            fileName: "main.dsp",
            name: "main",
            code: "process = _;"
        });

        expect(file.name).toBe("main.dsp");
        expect(await readFileAsText(file)).toBe("declare filename \"main.dsp\"; declare name \"main\"; process = _;");
    });

    it("fetches targets from faustservice", async () => {
        const fetch = vi.fn(async () => response(JSON.stringify({ web: ["wasm"], android: ["apk"] })));
        vi.stubGlobal("fetch", fetch);
        const service = new ExportService();

        await expect(service.fetchTargets("https://faust.example")).resolves.toEqual({ web: ["wasm"], android: ["apk"] });
        expect(fetch).toHaveBeenCalledWith("https://faust.example/targets");
    });

    it("uploads a file and returns the precompiled download URL", async () => {
        const headers = new Headers({ Location: "https://mirror.example/file.zip" });
        const fetch = vi.fn()
            .mockResolvedValueOnce(response("A1B2C3"))
            .mockResolvedValueOnce(response("DONE", { headers }));
        vi.stubGlobal("fetch", fetch);
        const service = new ExportService();

        const result = await service.uploadAndPrecompile({
            server: "https://faust.example",
            file: new File(["content"], "main.zip"),
            platform: "web",
            arch: "wasm"
        });

        expect(result).toEqual({
            shaKey: "A1B2C3",
            href: "https://faust.example/A1B2C3/web/wasm/binary.zip",
            location: "https://mirror.example/file.zip"
        });
        expect(fetch).toHaveBeenNthCalledWith(1, "https://faust.example/filepost", expect.objectContaining({ method: "POST" }));
        expect(fetch).toHaveBeenNthCalledWith(2, "https://faust.example/A1B2C3/web/wasm/precompile");
    });

    it("keeps legacy target filename rules", () => {
        const service = new ExportService();

        expect(service.resolveTarget("web", "pwa")).toBe("index.html");
        expect(service.resolveTarget("chaos-stratus", "effect-installer")).toBe("installer.sh");
        expect(service.resolveTarget("chaos-stratus", "wap", true)).toBe("installer.sh");
        expect(service.resolveTarget("android", "apk")).toBe("binary.apk");
        expect(service.resolveTarget("web", "wasm")).toBe("binary.zip");
    });
});
