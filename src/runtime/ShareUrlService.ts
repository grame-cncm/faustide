import type { FaustEditorCompileOptions } from "./types";

const VALID_VOICES = [1, 2, 4, 8, 16, 32, 64, 128];
const VALID_BUFFER_SIZES = [128, 256, 512, 1024, 2048, 4096] as const;

export type ShareUrlBuildOptions = {
    origin: string;
    pathname: string;
    autorun: boolean;
    voices: number;
    name: string;
    code: string;
};

export type ShareUrlLoadResult = {
    realtimeCompile?: boolean;
    voices?: number;
    bufferSize?: FaustEditorCompileOptions["bufferSize"];
    mode?: "amstram" | "amstram-pro";
    name?: string;
    code?: string;
    autorun: boolean;
};

/**
 * Encodes and decodes Faust IDE share URLs.
 *
 * The service is intentionally free of DOM writes: it normalizes query
 * parameters, fetches remote `code=` payloads when requested, and returns
 * decisions for the composition root to apply to editor state and controls.
 */
export class ShareUrlService {
    build(options: ShareUrlBuildOptions) {
        const base = options.origin + options.pathname;
        const urlParams = new URLSearchParams();
        urlParams.set("autorun", options.autorun ? "1" : "0");
        urlParams.set("voices", options.voices.toString());
        urlParams.set("name", this.sanitizeName(options.name));
        urlParams.set("inline", btoa(options.code).replace("+", "-").replace("/", "_"));
        return `${base}?${urlParams.toString()}`;
    }

    async load(search: string): Promise<ShareUrlLoadResult> {
        const urlParams = new URLSearchParams(search);
        const result: ShareUrlLoadResult = {
            autorun: urlParams.has("autorun") && !!urlParams.get("autorun")
        };
        if (urlParams.has("realtime_compile")) result.realtimeCompile = !!+urlParams.get("realtime_compile");
        if (urlParams.has("voices")) result.voices = this.normalizeVoices(+urlParams.get("voices"));
        if (urlParams.has("buffer_size")) result.bufferSize = this.normalizeBufferSize(+urlParams.get("buffer_size"));
        if (urlParams.get("mode") === "amstram" || urlParams.get("mode") === "amstram-pro") {
            result.mode = urlParams.get("mode") as "amstram" | "amstram-pro";
        }
        if (urlParams.has("code")) {
            const codeURL = urlParams.get("code");
            result.name = this.nameFromCodeUrl(codeURL);
            try {
                const response = await fetch(codeURL);
                result.code = await response.text();
            } catch (e) {
                // Keep legacy behavior: ignore failed remote code loads.
            }
        }
        if (urlParams.has("code_string")) result.code = urlParams.get("code_string");
        if (urlParams.has("inline")) {
            const b64Code = urlParams.get("inline").replace("-", "+").replace("_", "/");
            result.code = atob(b64Code);
        }
        if (urlParams.has("name")) result.name = this.sanitizeName(urlParams.get("name"));
        return result;
    }

    sanitizeName(name: string) {
        return name.replace(/[^a-zA-Z0-9_]/g, "") || "untitled";
    }

    private normalizeVoices(voices: number) {
        return VALID_VOICES.indexOf(voices) === -1 ? 0 : voices;
    }

    private normalizeBufferSize(bufferSize: number): FaustEditorCompileOptions["bufferSize"] {
        return VALID_BUFFER_SIZES.indexOf(bufferSize as any) === -1 ? 1024 : bufferSize as FaustEditorCompileOptions["bufferSize"];
    }

    private nameFromCodeUrl(codeURL: string) {
        return codeURL.split("/").slice(-1)[0].split(".").slice(0, -1).join(".").replace(/[^a-zA-Z0-9_]/g, "") || "untitled";
    }
}
