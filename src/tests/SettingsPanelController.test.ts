import { beforeEach, describe, expect, it, vi } from "vitest";
import { SettingsPanelController } from "../ui/SettingsPanelController";

const createCompileOptions = () => ({
    useWorklet: true,
    useDouble: false,
    bufferSize: 1024,
    saveCode: true,
    saveParams: false,
    saveDsp: false,
    realtimeCompile: false,
    popup: false,
    voices: 0,
    plotMode: "offline" as const,
    plot: 256,
    plotSR: 48000,
    plotFFT: 256 as const,
    plotFFTOverlap: 2 as const,
    drawSpectrogram: false,
    args: [],
    enableGuiBuilder: true,
    guiBuilderUrl: "https://builder.example/",
    exportPlatform: "source",
    exportArch: "cplusplus",
    mainFile: "main.dsp"
});

const setupDom = () => {
    document.body.innerHTML = `
        <input id="enable-gui-editor" type="checkbox" />
        <input id="gui-builder-url" />
        <div id="nav-item-gui-builder"></div>
        <iframe id="iframe-gui-builder"></iframe>
        <select id="select-voices"><option value="0">0</option><option value="8">8</option></select>
        <select id="select-buffer-size"><option value="128">128</option><option value="1024">1024</option></select>
        <input id="check-double" type="checkbox" />
        <input id="check-save-code" type="checkbox" />
        <input id="check-save-params" type="checkbox" />
        <input id="check-save-dsp" type="checkbox" />
        <input id="check-realtime-compile" type="checkbox" />
        <input id="check-popup" type="checkbox" />
    `;
};

const bindController = (overrides: Partial<ConstructorParameters<typeof SettingsPanelController>[0]> = {}) => {
    const compileOptions = createCompileOptions();
    const options = {
        compileOptions: compileOptions as any,
        audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false },
        uiEnv: { fileManager: { mainCode: "process = _;" } },
        saveEditorParams: vi.fn(),
        saveEditorDspTable: vi.fn(),
        loadEditorDspTable: vi.fn(async () => undefined),
        runDsp: vi.fn(async () => ({ success: true })),
        updateDiagram: vi.fn(() => ({ success: true })),
        ...overrides
    };
    new SettingsPanelController(options as any).bind();
    return { compileOptions, options };
};

describe("SettingsPanelController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("initializes checkbox and URL state from compile options", () => {
        const { compileOptions } = bindController();

        expect($("#enable-gui-editor").prop("checked")).toBe(compileOptions.enableGuiBuilder);
        expect($("#gui-builder-url").val()).toBe("https://builder.example/");
        expect($("#check-double").prop("checked")).toBe(false);
        expect($("#check-save-code").prop("checked")).toBe(true);
        expect($("#check-popup").prop("checked")).toBe(false);
    });

    it("disables the GUI builder UI and persists the option", () => {
        const { compileOptions, options } = bindController();

        $("#enable-gui-editor").prop("checked", false).trigger("change");

        expect(compileOptions.enableGuiBuilder).toBe(false);
        expect($("#nav-item-gui-builder").css("display")).toBe("none");
        expect($("#iframe-gui-builder").css("visibility")).toBe("hidden");
        expect(options.saveEditorParams).toHaveBeenCalled();
    });

    it("uses the default GUI builder URL when the input is cleared", () => {
        const { compileOptions } = bindController();

        $("#gui-builder-url").val("").trigger("change");

        expect(compileOptions.guiBuilderUrl).toBe("https://mainline.i3s.unice.fr/fausteditorweb/dist/PedalEditor/Front-End/");
    });

    it("re-runs DSP when realtime voice and buffer settings change with an active DSP", () => {
        const { compileOptions, options } = bindController({
            audioEnv: { dsp: {}, dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any
        });
        compileOptions.realtimeCompile = true;

        $("#select-voices").val("8").trigger("change");
        $("#select-buffer-size").val("1024").trigger("change");

        expect(compileOptions.voices).toBe(8);
        expect(compileOptions.bufferSize).toBe(1024);
        expect(options.runDsp).toHaveBeenCalledTimes(2);
        expect(options.runDsp).toHaveBeenCalledWith("process = _;");
    });

    it("updates the diagram for realtime double precision when no DSP exists", () => {
        const { compileOptions, options } = bindController();
        compileOptions.realtimeCompile = true;

        $("#check-double").prop("checked", true).trigger("change");

        expect(compileOptions.useDouble).toBe(true);
        expect(options.updateDiagram).toHaveBeenCalledWith("process = _;");
        expect(options.runDsp).not.toHaveBeenCalled();
    });

    it("persists save flags and loads cached DSP data when enabled on startup", () => {
        const compileOptions = createCompileOptions();
        compileOptions.saveDsp = true;
        const loadEditorDspTable = vi.fn(async () => undefined);

        const { options } = bindController({
            compileOptions: compileOptions as any,
            loadEditorDspTable
        });
        $("#check-save-code").prop("checked", false).trigger("change");
        $("#check-save-params").prop("checked", true).trigger("change");
        $("#check-save-dsp").prop("checked", false).trigger("change");

        expect(compileOptions.saveCode).toBe(false);
        expect(compileOptions.saveParams).toBe(true);
        expect(compileOptions.saveDsp).toBe(false);
        expect(loadEditorDspTable).toHaveBeenCalled();
        expect(options.saveEditorDspTable).toHaveBeenCalled();
    });

    it("runs DSP when enabling realtime compile with an active DSP", () => {
        const { compileOptions, options } = bindController({
            audioEnv: { dsp: {}, dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any
        });

        $("#check-realtime-compile").prop("checked", true).trigger("change");

        expect(compileOptions.realtimeCompile).toBe(true);
        expect(options.runDsp).toHaveBeenCalledWith("process = _;");
    });

    it("persists the popup option", () => {
        const { compileOptions, options } = bindController();

        $("#check-popup").prop("checked", true).trigger("change");

        expect(compileOptions.popup).toBe(true);
        expect(options.saveEditorParams).toHaveBeenCalled();
    });
});
