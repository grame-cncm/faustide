import { beforeEach, describe, expect, it, vi } from "vitest";
import { DspControlsController } from "../ui/DspControlsController";

const setupDom = () => {
    document.body.innerHTML = `
        <div id="dsp-ui-default" class="switch"></div>
        <select id="select-buffer-size">
            <option value="128">128</option>
            <option value="256">256</option>
            <option value="512">512</option>
            <option value="1024">1024</option>
            <option value="2048">2048</option>
            <option value="4096">4096</option>
        </select>
        <input id="input-plot-samps" />
        <button class="btn-run" disabled></button>
        <div id="tab-diagram" class="active"></div>
        <div id="tab-faust-ui"></div>
    `;
    ($.fn as any).tooltip = vi.fn(function tooltip() {
        return this;
    });
    ($.fn as any).tab = vi.fn(function tab() {
        return this;
    });
};

const createCompileOptions = () => ({
    useWorklet: true,
    bufferSize: 1024,
    realtimeCompile: false,
    plotMode: "offline"
});

const bindController = (overrides: Partial<ConstructorParameters<typeof DspControlsController>[0]> = {}) => {
    const compileOptions = createCompileOptions();
    const options = {
        compileOptions,
        audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false },
        fileManager: { mainCode: "process = _;" },
        supportAudioWorklet: true,
        saveEditorParams: vi.fn(),
        runDsp: vi.fn(async () => ({ success: true })),
        ...overrides
    };
    const controller = new DspControlsController(options as any);
    controller.bind();
    return { controller, options, compileOptions };
};

describe("DspControlsController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("runs the DSP and switches to Faust UI on success", async () => {
        const { options } = bindController();

        $(".btn-run").trigger("click");
        await Promise.resolve();

        expect(options.runDsp).toHaveBeenCalledWith("process = _;");
        expect(($.fn as any).tab).toHaveBeenCalledWith("show");
    });

    it("does not switch tabs when compilation fails", async () => {
        bindController({ runDsp: vi.fn(async () => ({ success: false })) } as any);

        $(".btn-run").trigger("click");
        await Promise.resolve();

        expect(($.fn as any).tab).not.toHaveBeenCalled();
    });

    it("applies ScriptProcessor mode and restores selected buffer size", () => {
        const { controller, compileOptions, options } = bindController();

        controller.applyUseWorkletMode(false);

        expect(compileOptions.useWorklet).toBe(false);
        expect($("#select-buffer-size").prop("disabled")).toBe(false);
        expect($("#select-buffer-size option").eq(3).prop("selected")).toBe(true);
        expect(options.saveEditorParams).toHaveBeenCalled();
    });

    it("runs DSP after toggling the badge when realtime compile is off", () => {
        const { options } = bindController();

        $("#dsp-ui-default").trigger("click");

        expect(options.runDsp).toHaveBeenCalledWith("process = _;");
    });

    it("disables the badge when AudioWorklet is unsupported", () => {
        bindController({ supportAudioWorklet: false } as any);

        expect(($.fn as any).tooltip).toHaveBeenCalledWith("disable");
        expect($("#dsp-ui-default").css("pointer-events")).toBe("none");
    });
});
