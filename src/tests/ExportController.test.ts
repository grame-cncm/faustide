import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExportController } from "../ui/ExportController";

const setupDom = () => {
    document.body.innerHTML = `
        <input id="export-server" />
        <div id="modal-export"></div>
        <input id="export-name" />
        <select id="export-platform"></select>
        <select id="export-arch"></select>
        <button id="export-download"></button>
        <a id="a-export-download"></a>
        <button id="export-submit"></button>
        <button class="btn-def-exp" disabled></button>
        <span id="def-exp-icon"></span>
        <span id="def-exp-loading"></span>
        <span id="export-loading"></span>
        <canvas id="qr-code"></canvas>
        <div id="export-error"></div>
    `;
};

const createFileManager = () => ({
    _fileList: ["main.dsp", "lib.lib"],
    mainCode: "process = _;",
    mainFileNameWithoutSuffix: "main",
    getValue: vi.fn((fileName: string) => fileName)
});

const createExportService = () => ({
    fetchTargets: vi.fn(async () => ({
        android: ["binary"],
        source: ["cplusplus", "c"]
    })),
    buildProjectZip: vi.fn(async () => new File(["zip"], "main.zip")),
    uploadAndPrecompile: vi.fn(async () => ({ href: "https://service/hash/source/cplusplus/binary.zip" }))
});

const bindController = async (overrides: Partial<ConstructorParameters<typeof ExportController>[0]> = {}) => {
    let server = "https://service";
    const options = {
        compileOptions: { exportPlatform: "source", exportArch: "cplusplus" },
        fileManager: createFileManager(),
        exportService: createExportService(),
        qrCode: { toCanvas: vi.fn() },
        getServer: () => server,
        setServer: vi.fn((value: string) => { server = value; }),
        saveEditorParams: vi.fn(),
        onError: vi.fn(),
        ...overrides
    };
    await new ExportController(options as any).bind();
    return options;
};

describe("ExportController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("loads targets and binds export controls", async () => {
        const options = await bindController();

        expect(options.exportService.fetchTargets).toHaveBeenCalledWith("https://service");
        expect($("#export-platform option").map((i, e) => e.value).get()).toEqual(["android", "source"]);
        expect($("#export-platform").val()).toBe("source");
        expect($("#export-arch option").map((i, e) => e.value).get()).toEqual(["cplusplus", "c"]);
        expect($("#export-submit").prop("disabled")).toBe(false);
        expect($(".btn-def-exp").prop("disabled")).toBe(false);
    });

    it("updates architecture options when the platform changes", async () => {
        const options = await bindController();

        $("#export-platform").val("android").trigger("change");

        expect(options.compileOptions.exportPlatform).toBe("android");
        expect($("#export-arch option").map((i, e) => e.value).get()).toEqual(["binary"]);
        expect(options.saveEditorParams).toHaveBeenCalled();
    });

    it("exports the project and renders the QR code", async () => {
        const options = await bindController();
        const downloadClick = vi.fn();
        $("#a-export-download")[0].click = downloadClick;
        $("#export-name").val("bad name!");
        $("#export-platform").val("source");
        $("#export-arch").val("cplusplus");

        $("#export-submit").trigger("click");
        await Promise.resolve();
        await Promise.resolve();

        expect(options.exportService.buildProjectZip).toHaveBeenCalledWith({
            name: "badname",
            fileNames: ["main.dsp", "lib.lib"],
            getValue: expect.any(Function),
            mainCode: "process = _;"
        });
        expect(options.exportService.uploadAndPrecompile).toHaveBeenCalledWith({
            server: "https://service",
            file: expect.any(File),
            platform: "source",
            arch: "cplusplus"
        });
        expect($("#a-export-download").attr("href")).toBe("https://service/hash/source/cplusplus/binary.zip");
        expect(options.qrCode.toCanvas).toHaveBeenCalledWith($("#qr-code")[0], "https://service/hash/source/cplusplus/binary.zip");
    });

    it("clicks the generated download for default export", async () => {
        await bindController();
        const downloadClick = vi.fn();
        $("#a-export-download")[0].click = downloadClick;

        $(".btn-def-exp").trigger("click");
        await Promise.resolve();
        await Promise.resolve();

        expect(downloadClick).toHaveBeenCalled();
    });

    it("reloads targets when the server changes", async () => {
        const options = await bindController();

        $("#export-server").val("https://other").trigger("change");
        await Promise.resolve();

        expect(options.setServer).toHaveBeenCalledWith("https://other");
        expect(options.exportService.fetchTargets).toHaveBeenCalledWith("https://other");
    });
});
