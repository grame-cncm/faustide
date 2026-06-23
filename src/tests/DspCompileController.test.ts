import { beforeEach, describe, expect, it, vi } from "vitest";
import { DspCompileController } from "../ui/DspCompileController";

const setupDom = () => {
    document.body.innerHTML = `
        <span id="recorder-time"></span>
        <div id="tab-diagram"></div>
        <div id="gui-builder-default"></div>
        <div id="nav-item-gui-builder"></div>
        <iframe id="iframe-gui-builder"></iframe>
    `;
};

const createNode = () => ({
    getUI: vi.fn(() => [{ type: "vslider" }])
});

const bindController = (overrides: any = {}) => {
    const node = createNode();
    const audioEnv = {
        audioCtx: {},
        analyserOutput: {},
        ...overrides.audioEnv
    };
    const uiEnv = {
        outputScope: { splitter: null, channels: 1, channel: 0 },
        analyser: { plotHandler: vi.fn() },
        fileManager: {
            mainFileName: "main.dsp",
            mainFileNameWithoutSuffix: "main",
            mainCode: "process = _;"
        },
        ...overrides.uiEnv
    };
    const compileOptions = {
        args: ["-I", "/usr/share/project/"],
        useDouble: false,
        useWorklet: true,
        bufferSize: 1024,
        voices: 0,
        saveParams: false,
        enableGuiBuilder: false,
        guiBuilderUrl: "https://builder",
        ...overrides.compileOptions
    };
    const options = {
        audioEnv,
        uiEnv,
        compileOptions,
        dspParams: { "/gain": 0.5 },
        recorder: { enabled: false, append: vi.fn(() => 1.25) },
        dspRunner: { run: vi.fn(async () => ({ success: true, node })) },
        faustUiController: { showCompiledDsp: vi.fn() },
        alertController: { show: vi.fn(), clear: vi.fn() },
        initAudioCtx: vi.fn(async () => undefined),
        initAnalysersUI: vi.fn(),
        updateDiagram: vi.fn(() => ({ success: true })),
        saveEditorDspTable: vi.fn(),
        ...overrides.options
    };
    const controller = new DspCompileController(options as any);
    return { controller, options, node };
};

describe("DspCompileController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("runs DspRunner with generated filename declarations and shows the compiled UI", async () => {
        const { controller, options, node } = bindController();

        await expect(controller.run("process = _;")).resolves.toEqual({ success: true });

        expect(options.dspRunner.run).toHaveBeenCalledWith(expect.objectContaining({
            code: 'declare filename "main.dsp"; declare name "main"; process = _;',
            compilerArgs: ["-I", "/usr/share/project/"],
            useWorklet: true,
            dspParams: { "/gain": 0.5 }
        }));
        expect(options.alertController.clear).toHaveBeenCalled();
        expect(options.faustUiController.showCompiledDsp).toHaveBeenCalledWith(node);
        expect(options.saveEditorDspTable).toHaveBeenCalled();
    });

    it("initializes audio and analyser UI when audio context is not ready", async () => {
        const { controller, options } = bindController({ audioEnv: { audioCtx: undefined } });

        await controller.run("process = _;");

        expect(options.initAudioCtx).toHaveBeenCalled();
        expect(options.initAnalysersUI).toHaveBeenCalled();
    });

    it("reports compile failures through the alert controller", async () => {
        const error = new Error("compile failed");
        const { controller, options } = bindController({
            options: {
                dspRunner: { run: vi.fn(async () => ({ success: false, error })) }
            }
        });

        await expect(controller.run("bad")).resolves.toEqual({ success: false, error });

        expect(options.alertController.show).toHaveBeenCalledWith(error);
        expect(options.faustUiController.showCompiledDsp).not.toHaveBeenCalled();
    });

    it("rejects concurrent compile runs until the active run finishes", async () => {
        let resolveRun!: (value: any) => void;
        const pending = new Promise(resolve => { resolveRun = resolve; });
        const { controller, node } = bindController({
            options: {
                dspRunner: { run: vi.fn(() => pending) }
            }
        });

        const first = controller.run("process = _;");
        await expect(controller.run("process = _;")).resolves.toEqual({
            success: false,
            error: expect.any(Error)
        });
        resolveRun({ success: true, node });
        await expect(first).resolves.toEqual({ success: true });
    });

    it("passes plotted buffers to analyser and recorder when recording is enabled", async () => {
        const { controller, options } = bindController({
            options: {
                recorder: { enabled: true, append: vi.fn(() => 1.25) }
            }
        });

        await controller.run("process = _;");
        const plotHandler = options.dspRunner.run.mock.calls[0][0].plotHandler;
        plotHandler([new Float32Array([1])], 4);

        expect(options.uiEnv.analyser.plotHandler).toHaveBeenCalledWith([new Float32Array([1])], 4, undefined);
        expect(options.recorder.append).toHaveBeenCalledWith([new Float32Array([1])], 4);
    });
});
