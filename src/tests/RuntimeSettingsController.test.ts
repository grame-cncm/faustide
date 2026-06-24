import { beforeEach, describe, expect, it, vi } from "vitest";
import { RuntimeSettingsController } from "../runtime/RuntimeSettingsController";

const bindController = () => {
    const settingsStore = {
        saveVersion: vi.fn(),
        loadCompileOptions: vi.fn(() => ({ voices: 4 })),
        saveCompileOptions: vi.fn(),
        loadDspParams: vi.fn(() => ({ "/gain": 0.5 })),
        saveDspParams: vi.fn(),
        loadDspFactoryCache: vi.fn(async () => undefined),
        saveDspFactoryCache: vi.fn()
    };
    const faustCompilerFactory = {
        stringifyDSPFactories: vi.fn(() => "{}"),
        importDSPFactories: vi.fn()
    };
    const controller = new RuntimeSettingsController(settingsStore as any, faustCompilerFactory);
    return { controller, settingsStore, faustCompilerFactory };
};

describe("RuntimeSettingsController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("delegates version and compile option persistence", () => {
        const { controller, settingsStore } = bindController();
        const compileOptions = { voices: 8 };

        controller.saveVersion();
        expect(controller.loadCompileOptions()).toEqual({ voices: 4 });
        controller.saveCompileOptions(compileOptions as any);

        expect(settingsStore.saveVersion).toHaveBeenCalled();
        expect(settingsStore.loadCompileOptions).toHaveBeenCalled();
        expect(settingsStore.saveCompileOptions).toHaveBeenCalledWith(compileOptions);
    });

    it("delegates DSP parameter persistence", () => {
        const { controller, settingsStore } = bindController();
        const dspParams = { "/freq": 440 };

        expect(controller.loadDspParams()).toEqual({ "/gain": 0.5 });
        controller.saveDspParams(dspParams);

        expect(settingsStore.loadDspParams).toHaveBeenCalled();
        expect(settingsStore.saveDspParams).toHaveBeenCalledWith(dspParams);
    });

    it("delegates DSP factory cache operations with the Faust compiler factory", async () => {
        const { controller, settingsStore, faustCompilerFactory } = bindController();

        await controller.loadDspFactoryCache();
        controller.saveDspFactoryCache();

        expect(settingsStore.loadDspFactoryCache).toHaveBeenCalledWith(faustCompilerFactory);
        expect(settingsStore.saveDspFactoryCache).toHaveBeenCalledWith(faustCompilerFactory);
    });
});
