import { beforeEach, describe, expect, it, vi } from "vitest";
import { UrlParamsController } from "../ui/UrlParamsController";

const setupDom = () => {
    document.body.innerHTML = `
        <select id="export-server"><option value="https://faustservice-old.inria.fr"></option></select>
        <button id="btn-def-exp-content"></button>
        <div id="ide-params"></div>
        <form id="form-plot"></form>
        <button id="show-right-panel"></button>
        <div id="tab-faust-ui"></div>
    `;
    ($.fn as any).tab = vi.fn(function tab() {
        return this;
    });
};

const bindController = (loadedParams: any, overrides: any = {}) => {
    const compileOptions = {
        realtimeCompile: false,
        voices: 0,
        bufferSize: 1024,
        exportPlatform: "web",
        exportArch: "wap",
        ...overrides.compileOptions
    };
    const fileManager = {
        renameSelected: vi.fn(),
        setValue: vi.fn()
    };
    const options = {
        compileOptions,
        fileManager,
        shareUrlService: { load: vi.fn(async () => loadedParams) },
        runDsp: vi.fn(async () => ({ success: true })),
        saveEditorParams: vi.fn(),
        setServer: vi.fn()
    };
    const controller = new UrlParamsController(options as any);
    return { controller, options };
};

describe("UrlParamsController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("applies compile options and persists each legacy setting change", async () => {
        const { controller, options } = bindController({
            realtimeCompile: true,
            voices: 8,
            bufferSize: 512,
            autorun: false
        });

        await controller.load("?voices=8");

        expect(options.compileOptions.realtimeCompile).toBe(true);
        expect(options.compileOptions.voices).toBe(8);
        expect(options.compileOptions.bufferSize).toBe(512);
        expect(options.saveEditorParams).toHaveBeenCalledTimes(3);
    });

    it("applies amstram mode UI and export target settings", async () => {
        const { controller, options } = bindController({
            mode: "amstram",
            autorun: false
        });

        await controller.load("?mode=amstram");

        expect(options.setServer).toHaveBeenCalledWith("https://faustservice-old.inria.fr");
        expect(options.compileOptions.exportPlatform).toBe("esp32");
        expect(options.compileOptions.exportArch).toBe("gramophoneFlash");
        expect($("#export-server").val()).toBe("https://faustservice-old.inria.fr");
        expect($("#btn-def-exp-content").html()).toBe("Gramo");
        expect($("#ide-params").css("display")).toBe("none");
        expect($("#form-plot").css("display")).toBe("none");
    });

    it("renames and fills the selected file from loaded URL code", async () => {
        const { controller, options } = bindController({
            name: "shared_patch",
            code: "process = _;",
            autorun: false
        });

        await controller.load("?inline=...");

        expect(options.fileManager.renameSelected).toHaveBeenCalledWith("shared_patch.dsp");
        expect(options.fileManager.setValue).toHaveBeenCalledWith("process = _;");
        expect(options.runDsp).not.toHaveBeenCalled();
    });

    it("autoruns shared code and shows the Faust UI tab after successful compile", async () => {
        const { controller, options } = bindController({
            code: "process = _;",
            autorun: true
        });

        await controller.load("?autorun=1");

        expect(options.runDsp).toHaveBeenCalledWith("process = _;");
        expect(($.fn as any).tab).toHaveBeenCalledWith("show");
    });

    it("does not switch tabs when autorun compilation fails", async () => {
        const { controller, options } = bindController({
            code: "process = _;",
            autorun: true
        });
        options.runDsp.mockResolvedValueOnce({ success: false });

        await controller.load("?autorun=1");

        expect(options.runDsp).toHaveBeenCalledWith("process = _;");
        expect(($.fn as any).tab).not.toHaveBeenCalled();
    });
});
