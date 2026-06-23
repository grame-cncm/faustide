import { beforeEach, describe, expect, it, vi } from "vitest";
import { AudioOutputController } from "../ui/AudioOutputController";

// AudioOutputController tests use a minimal DOM and audio graph so the DAC
// button behavior can be covered without requiring real audio devices.
describe("AudioOutputController", () => {
    const setupDom = () => {
        document.body.innerHTML = `
            <select id="select-audio-output">
                <option value="-1">Default</option>
                <option value="speaker">Speaker</option>
            </select>
            <audio id="output-audio-stream"></audio>
            <button class="btn-dac btn-light"><i class="fa-volume-mute"></i><span>Output is Off</span></button>
        `;
        ($<HTMLAudioElement & { setSinkId: (sinkId: string) => Promise<void> }>("#output-audio-stream")[0]).setSinkId = vi.fn(async () => undefined);
    };

    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("does not initialize audio when output sink selection is unsupported", async () => {
        const initAudioCtx = vi.fn(async () => ({} as any));
        new AudioOutputController({
            audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            getSupportMediaStreamDestination: () => false,
            initAudioCtx,
            initAnalysersUI: vi.fn(),
            setRecorderSampleRate: vi.fn()
        }).bind();

        $("#select-audio-output").val("speaker").trigger("change");
        await Promise.resolve();

        expect(initAudioCtx).not.toHaveBeenCalled();
        expect(($<HTMLAudioElement & { setSinkId: ReturnType<typeof vi.fn> }>("#output-audio-stream")[0]).setSinkId).not.toHaveBeenCalled();
    });

    it("initializes audio and applies the selected sink id", async () => {
        const audioEnv = {
            audioCtx: { sampleRate: 48000 },
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const initAudioCtx = vi.fn(async () => audioEnv as any);
        const setRecorderSampleRate = vi.fn();
        new AudioOutputController({
            audioEnv: audioEnv as any,
            getSupportMediaStreamDestination: () => true,
            initAudioCtx,
            initAnalysersUI: vi.fn(),
            setRecorderSampleRate
        }).bind();

        $("#select-audio-output").val("speaker").trigger("change");
        await Promise.resolve();

        expect(initAudioCtx).toHaveBeenCalled();
        expect(setRecorderSampleRate).toHaveBeenCalledWith(48000);
        expect(($<HTMLAudioElement & { setSinkId: ReturnType<typeof vi.fn> }>("#output-audio-stream")[0]).setSinkId).toHaveBeenCalledWith("speaker");
    });

    it("disconnects the current DSP from output when DAC is active", async () => {
        const disconnect = vi.fn();
        const audioEnv = {
            dsp: { disconnect },
            destination: {},
            dspConnectedToInput: false,
            dspConnectedToOutput: true,
            inputEnabled: false,
            outputEnabled: true
        };
        new AudioOutputController({
            audioEnv: audioEnv as any,
            getSupportMediaStreamDestination: () => false,
            initAudioCtx: vi.fn(async () => audioEnv as any),
            initAnalysersUI: vi.fn(),
            setRecorderSampleRate: vi.fn()
        }).bind();

        $(".btn-dac").trigger("click");
        await Promise.resolve();

        expect(audioEnv.outputEnabled).toBe(false);
        expect(audioEnv.dspConnectedToOutput).toBe(false);
        expect(disconnect).toHaveBeenCalledWith(audioEnv.destination);
        expect($(".btn-dac").hasClass("btn-light")).toBe(true);
        expect($(".fa-volume-mute").length).toBe(1);
        expect($(".btn-dac span").html()).toBe("Output is Off");
    });

    it("connects an existing DSP when enabling DAC with an active context", async () => {
        const connect = vi.fn();
        const audioEnv = {
            audioCtx: {},
            dsp: { connect },
            destination: {},
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const initAudioCtx = vi.fn(async () => audioEnv as any);
        const initAnalysersUI = vi.fn();
        new AudioOutputController({
            audioEnv: audioEnv as any,
            getSupportMediaStreamDestination: () => false,
            initAudioCtx,
            initAnalysersUI,
            setRecorderSampleRate: vi.fn()
        }).bind();

        $(".btn-dac").trigger("click");
        await Promise.resolve();

        expect(audioEnv.outputEnabled).toBe(true);
        expect(audioEnv.dspConnectedToOutput).toBe(true);
        expect(connect).toHaveBeenCalledWith(audioEnv.destination);
        expect(initAudioCtx).not.toHaveBeenCalled();
        expect(initAnalysersUI).not.toHaveBeenCalled();
        expect($(".btn-dac").hasClass("btn-primary")).toBe(true);
        expect($(".fa-volume-up").length).toBe(1);
        expect($(".btn-dac span").html()).toBe("Output is On");
    });

    it("initializes audio and analysers when enabling DAC before the context exists", async () => {
        const audioEnv = {
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const initAudioCtx = vi.fn(async () => {
            audioEnv.audioCtx = {} as any;
            return audioEnv as any;
        });
        const initAnalysersUI = vi.fn();
        new AudioOutputController({
            audioEnv: audioEnv as any,
            getSupportMediaStreamDestination: () => false,
            initAudioCtx,
            initAnalysersUI,
            setRecorderSampleRate: vi.fn()
        }).bind();

        $(".btn-dac").trigger("click");
        await Promise.resolve();

        expect(audioEnv.outputEnabled).toBe(true);
        expect(initAudioCtx).toHaveBeenCalled();
        expect(initAnalysersUI).toHaveBeenCalled();
    });
});
