import { describe, expect, it, vi } from "vitest";
import { DSP_FACTORY_CACHE_KEY, DSP_PARAMS_KEY, EDITOR_PARAMS_KEY, EDITOR_VERSION_KEY, EditorSettingsStore } from "../runtime/EditorSettingsStore";

class MemoryStorage {
    data = new Map<string, string>();

    setItem(key: string, value: string) {
        this.data.set(key, value);
    }

    getItem(key: string) {
        return this.data.get(key) || "";
    }
}

describe("EditorSettingsStore", () => {
    it("saves the editor version and compile options under the existing keys", () => {
        const storage = new MemoryStorage();
        const store = new EditorSettingsStore("1.0.0", storage);
        const compileOptions = { saveCode: true, voices: 4 } as any;

        store.saveVersion();
        store.saveCompileOptions(compileOptions);

        expect(storage.getItem(EDITOR_VERSION_KEY)).toBe("1.0.0");
        expect(JSON.parse(storage.getItem(EDITOR_PARAMS_KEY))).toEqual(compileOptions);
    });

    it("loads compile options only for the current version", () => {
        const storage = new MemoryStorage();
        const store = new EditorSettingsStore("1.0.0", storage);
        storage.setItem(EDITOR_PARAMS_KEY, JSON.stringify({ voices: 8 }));

        expect(store.loadCompileOptions()).toEqual({});
        storage.setItem(EDITOR_VERSION_KEY, "1.0.0");
        expect(store.loadCompileOptions()).toEqual({ voices: 8 });
    });

    it("returns empty compile options and DSP params for invalid JSON", () => {
        const storage = new MemoryStorage();
        const store = new EditorSettingsStore("1.0.0", storage);
        storage.setItem(EDITOR_VERSION_KEY, "1.0.0");
        storage.setItem(EDITOR_PARAMS_KEY, "{");
        storage.setItem(DSP_PARAMS_KEY, "{");

        expect(store.loadCompileOptions()).toEqual({});
        expect(store.loadDspParams()).toEqual({});
    });

    it("saves and loads DSP params", () => {
        const storage = new MemoryStorage();
        const store = new EditorSettingsStore("1.0.0", storage);

        store.saveDspParams({ "/gain": 0.5 });

        expect(storage.getItem(DSP_PARAMS_KEY)).toBe(JSON.stringify({ "/gain": 0.5 }));
        expect(store.loadDspParams()).toEqual({ "/gain": 0.5 });
    });

    it("saves and loads the DSP factory cache", async () => {
        const storage = new MemoryStorage();
        const store = new EditorSettingsStore("1.0.0", storage);
        const faustCompiler = {
            stringifyDSPFactories: vi.fn(() => "cache"),
            importDSPFactories: vi.fn()
        };

        store.saveDspFactoryCache(faustCompiler);
        await store.loadDspFactoryCache(faustCompiler);

        expect(storage.getItem(DSP_FACTORY_CACHE_KEY)).toBe("cache");
        expect(faustCompiler.importDSPFactories).toHaveBeenCalledWith("cache");
    });
});
