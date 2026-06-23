import type { FaustEditorCompileOptions } from "./types";
import { safeStorage } from "../utils";

type StorageLike = {
    setItem: (key: string, value: string) => any;
    getItem: (key: string) => string;
};

type DspFactoryCache = {
    stringifyDSPFactories: () => string;
    importDSPFactories: (cache: string) => Promise<any> | any;
};

export const EDITOR_VERSION_KEY = "faust_editor_version";
export const EDITOR_PARAMS_KEY = "faust_editor_params";
export const DSP_PARAMS_KEY = "faust_editor_dsp_params";
export const DSP_FACTORY_CACHE_KEY = "faust_editor_dsp_table";

export class EditorSettingsStore {
    storage: StorageLike;
    version: string;

    constructor(version: string, storage: StorageLike = safeStorage) {
        this.version = version;
        this.storage = storage;
    }

    saveVersion() {
        this.storage.setItem(EDITOR_VERSION_KEY, this.version);
    }

    loadCompileOptions(): FaustEditorCompileOptions | {} {
        const clientVersion = this.storage.getItem(EDITOR_VERSION_KEY);
        if (clientVersion !== this.version) return {};
        const str = this.storage.getItem(EDITOR_PARAMS_KEY);
        if (!str) return {};
        try {
            return JSON.parse(str) as FaustEditorCompileOptions;
        } catch (e) {
            return {};
        }
    }

    saveCompileOptions(compileOptions: FaustEditorCompileOptions) {
        this.storage.setItem(EDITOR_PARAMS_KEY, JSON.stringify(compileOptions));
    }

    loadDspParams(): { [path: string]: number } {
        const str = this.storage.getItem(DSP_PARAMS_KEY);
        if (!str) return {};
        try {
            return JSON.parse(str) as { [path: string]: number };
        } catch (e) {
            return {};
        }
    }

    saveDspParams(dspParams: { [path: string]: number }) {
        this.storage.setItem(DSP_PARAMS_KEY, JSON.stringify(dspParams));
    }

    async loadDspFactoryCache(faustCompiler: DspFactoryCache) {
        const str = this.storage.getItem(DSP_FACTORY_CACHE_KEY);
        if (str) await faustCompiler.importDSPFactories(str);
    }

    saveDspFactoryCache(faustCompiler: DspFactoryCache) {
        this.storage.setItem(DSP_FACTORY_CACHE_KEY, faustCompiler.stringifyDSPFactories());
    }
}
