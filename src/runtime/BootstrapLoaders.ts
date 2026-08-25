/**
 * Runtime-only loaders used by the application composition root.
 *
 * These helpers keep browser dynamic imports and static asset bootstrapping out
 * of `index.ts`, while preserving the same startup order and returned objects.
 */

/**
 * Loads Faust WASM, creates compiler services, and installs primitives.lib into
 * the Faust virtual filesystem.
 */
export async function loadFaustRuntime() {
    const { instantiateFaustModuleFromFile, LibFaust, FaustCompiler, FaustSvgDiagrams } = await import("@grame/faustwasm");
    const faustModule = await instantiateFaustModuleFromFile("faustwasm/libfaust-wasm.js");
    const libFaust = new LibFaust(faustModule);
    console.info(`libfaust version: ${libFaust.version()}`);
    const faustCompiler = new FaustCompiler(libFaust);
    const faustSvgDiagrams = new FaustSvgDiagrams(faustCompiler);
    const faustPrimitiveLibFile = await fetch("primitives.lib");
    const faustPrimitiveLib = await faustPrimitiveLibFile.text();
    libFaust.fs().writeFile("/usr/share/faust/primitives.lib", faustPrimitiveLib);

    return {
        FaustCompiler,
        libFaust,
        faustCompiler,
        faustSvgDiagrams
    };
}

/**
 * Configures the persistent browser filesystem used for project storage.
 */
export async function loadBrowserFileSystem() {
    const BrowserFS = await import("@zenfs/core");
    const { IndexedDB } = await import("@zenfs/dom");
    await BrowserFS.configureSingle({
        backend: IndexedDB,
        storeName: "FaustIDE" as any
    });
    return BrowserFS.promises;
}

/**
 * Loads browser-only libraries that are needed after the core runtime exists.
 */
export async function loadBrowserLibraries() {
    const JSZip = (await import("jszip") as any).default as import("jszip");
    const WaveSurfer = (await import("wavesurfer.js") as any).default as import("wavesurfer.js");
    const QRCode = await import("qrcode");

    return {
        JSZip,
        WaveSurfer,
        QRCode
    };
}
