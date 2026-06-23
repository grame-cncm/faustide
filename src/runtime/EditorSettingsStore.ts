import type { FaustEditorCompileOptions } from "./types";
import { safeStorage } from "../utils";

/**
 * Minimal storage contract used by the editor settings store.
 *
 * Tests pass an in-memory implementation; production uses `safeStorage`, which
 * wraps `localStorage` and degrades gracefully when browser storage is blocked.
 */
type StorageLike = {
    setItem: (key: string, value: string) => any;
    getItem: (key: string) => string;
};

/**
 * Subset of the Faust compiler static API used for factory cache persistence.
 */
type DspFactoryCache = {
    stringifyDSPFactories: () => string;
    importDSPFactories: (cache: string) => Promise<any> | any;
};

export const EDITOR_VERSION_KEY = "faust_editor_version";
export const EDITOR_PARAMS_KEY = "faust_editor_params";
export const DSP_PARAMS_KEY = "faust_editor_dsp_params";
export const DSP_FACTORY_CACHE_KEY = "faust_editor_dsp_table";

/**
 * Owns all localStorage-backed editor runtime settings.
 *
 * The key names are part of the app's compatibility surface with existing user
 * sessions, so they are exported constants and must not change during refactors.
 */
export class EditorSettingsStore {
    storage: StorageLike;
    version: string;

    constructor(version: string, storage: StorageLike = safeStorage) {
        this.version = version;
        this.storage = storage;
    }

    /**
     * Persists the running app version. Compile options are loaded only when
     * this value matches, preserving the legacy version-gated behavior.
     */
    saveVersion() {
        this.storage.setItem(EDITOR_VERSION_KEY, this.version);
    }

    /**
     * Returns saved compile options for the current version, or an empty object
     * when the saved data is absent, stale, or malformed.
     */
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

    /**
     * Saves compile options exactly as the previous inline implementation did.
     */
    saveCompileOptions(compileOptions: FaustEditorCompileOptions) {
        this.storage.setItem(EDITOR_PARAMS_KEY, JSON.stringify(compileOptions));
    }

    /**
     * Loads persisted Faust DSP parameter values keyed by parameter path.
     */
    loadDspParams(): { [path: string]: number } {
        const str = this.storage.getItem(DSP_PARAMS_KEY);
        if (!str) return {};
        try {
            return JSON.parse(str) as { [path: string]: number };
        } catch (e) {
            return {};
        }
    }

    /**
     * Saves current Faust DSP parameter values keyed by parameter path.
     */
    saveDspParams(dspParams: { [path: string]: number }) {
        this.storage.setItem(DSP_PARAMS_KEY, JSON.stringify(dspParams));
    }

    /**
     * Restores serialized Faust factory cache data when present.
     */
    async loadDspFactoryCache(faustCompiler: DspFactoryCache) {
        const str = this.storage.getItem(DSP_FACTORY_CACHE_KEY);
        if (str) await faustCompiler.importDSPFactories(str);
    }

    /**
     * Serializes Faust factory cache data under the legacy storage key.
     */
    saveDspFactoryCache(faustCompiler: DspFactoryCache) {
        this.storage.setItem(DSP_FACTORY_CACHE_KEY, faustCompiler.stringifyDSPFactories());
    }
}
