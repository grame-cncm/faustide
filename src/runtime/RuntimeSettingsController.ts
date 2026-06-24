import type { FaustEditorCompileOptions } from "./types";
import type { EditorSettingsStore } from "./EditorSettingsStore";

type DspFactoryCache = {
    stringifyDSPFactories: () => string;
    importDSPFactories: (cache: string) => Promise<any> | any;
};

/**
 * Small facade that adapts EditorSettingsStore to runtime callback needs.
 *
 * EditorSettingsStore owns storage keys and serialization. This controller
 * keeps `index.ts` from defining one-off wrapper functions for compile options,
 * DSP parameter maps, app version storage, and Faust factory cache persistence.
 */
export class RuntimeSettingsController {
    private readonly settingsStore: EditorSettingsStore;
    private readonly faustCompilerFactory: DspFactoryCache;

    constructor(settingsStore: EditorSettingsStore, faustCompilerFactory: DspFactoryCache) {
        this.settingsStore = settingsStore;
        this.faustCompilerFactory = faustCompilerFactory;
    }

    /**
     * Persists the current editor application version.
     */
    saveVersion() {
        this.settingsStore.saveVersion();
    }

    /**
     * Loads version-compatible compile options.
     */
    loadCompileOptions(): FaustEditorCompileOptions | {} {
        return this.settingsStore.loadCompileOptions();
    }

    /**
     * Persists compile options using legacy localStorage keys.
     */
    saveCompileOptions(compileOptions: FaustEditorCompileOptions) {
        this.settingsStore.saveCompileOptions(compileOptions);
    }

    /**
     * Loads saved DSP parameter values keyed by Faust control path.
     */
    loadDspParams(): { [path: string]: number } {
        return this.settingsStore.loadDspParams();
    }

    /**
     * Persists current DSP parameter values.
     */
    saveDspParams(dspParams: { [path: string]: number }) {
        this.settingsStore.saveDspParams(dspParams);
    }

    /**
     * Loads cached Faust DSP factories into the compiler static cache.
     */
    async loadDspFactoryCache() {
        await this.settingsStore.loadDspFactoryCache(this.faustCompilerFactory);
    }

    /**
     * Persists the compiler static DSP factory cache.
     */
    saveDspFactoryCache() {
        this.settingsStore.saveDspFactoryCache(this.faustCompilerFactory);
    }
}
