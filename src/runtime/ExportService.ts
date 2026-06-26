import JSZip from "jszip";
import type { FaustExportTargets } from "./types";
import { computeClosure } from "../model/Perimeter";

type ProjectZipOptions = {
    name: string;
    fileNames: string[];
    getValue: (fileName: string) => string | Uint8Array;
    mainCode: string;
};

type SourceFileOptions = {
    fileName: string;
    name: string;
    code: string;
};

type UploadOptions = {
    server: string;
    file: File;
    platform: string;
    arch: string;
    chaosStratusInstallerForAnyArch?: boolean;
};

export type ExportResult = {
    shaKey: string;
    href: string;
    location?: string;
};

/**
 * Handles Faust service export operations without touching the editor DOM.
 *
 * The UI layer still owns modal state, selected platform controls, QR code
 * rendering, and error placement. This service owns the stable export protocol:
 * target discovery, project ZIP creation, file upload, target path resolution,
 * and `/precompile` polling for the current single-request behavior.
 */
export class ExportService {
    /**
     * Fetches the available export targets (platform → architectures) from the
     * Faust service.
     *
     * @param server base URL of the Faust service
     * @throws if the service responds with a non-OK status
     */
    async fetchTargets(server: string): Promise<FaustExportTargets> {
        const response = await fetch(`${server}/targets`);
        if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
        return response.json();
    }

    /**
     * Builds the ZIP accepted by faustservice: the computed perimeter of the
     * main DSP (imported libraries and soundfiles) plus a generated main DSP
     * with sanitized export declarations.
     *
     * Uses computeClosure so only files actually referenced by the main DSP
     * (transitively) are bundled — not "all .lib + all audio" (plan §7/I6).
     */
    async buildProjectZip(options: ProjectZipOptions): Promise<File> {
        const mainVirtualName = `${options.name}.dsp`;
        const fileNameSet = new Set(options.fileNames);

        const readText = (name: string): string | null => {
            if (name === mainVirtualName) return options.mainCode;
            const val = options.getValue(name);
            return typeof val === "string" ? val : null;
        };
        const isProjectLocal = (name: string) => name === mainVirtualName || fileNameSet.has(name);

        const { files } = computeClosure(mainVirtualName, readText, isProjectLocal);

        const zip = new JSZip();
        files.forEach((fileName) => {
            if (fileName === mainVirtualName) return; // replaced by generated main below
            zip.file(fileName, options.getValue(fileName));
        });
        zip.file(mainVirtualName, `declare filename "${mainVirtualName}";\ndeclare name "${options.name}";\n${options.mainCode}`);
        const blob = await zip.generateAsync({ type: "blob" });
        return new File([blob], `${options.name}.zip`);
    }

    /**
     * Builds the single expanded DSP file used by GUI Builder exports.
     */
    buildSourceFile(options: SourceFileOptions): File {
        return new File([`declare filename "${options.fileName}"; declare name "${options.name}"; ${options.code}`], options.fileName);
    }

    /**
     * Uploads an export file and triggers the matching faustservice target.
     */
    async uploadAndPrecompile(options: UploadOptions): Promise<ExportResult> {
        const form = new FormData();
        form.append("file", options.file);
        const shaKey = await this.postFile(options.server, form);
        if (!shaKey.match(/^[0-9A-Fa-f]+$/)) throw new Error(shaKey);
        const target = this.resolveTarget(options.platform, options.arch, options.chaosStratusInstallerForAnyArch);
        const path = `${options.server}/${shaKey}/${options.platform}/${options.arch}`;
        const href = `${path}/${target}`;
        const precompile = await fetch(`${path}/precompile`);
        const result = await precompile.text();
        if (!precompile.ok) throw new Error(`${precompile.status}: ${result}`);
        if (result !== "DONE") throw new Error(result);
        return { shaKey, href, location: precompile.headers.get("Location") || undefined };
    }

    /**
     * Keeps legacy target filename rules in one place.
     */
    resolveTarget(platform: string, arch: string, chaosStratusInstallerForAnyArch = false) {
        if (arch === "pwa" || arch === "pwa-poly") return "index.html";
        if (platform === "chaos-stratus" && (chaosStratusInstallerForAnyArch || arch === "effect-installer")) return "installer.sh";
        if (platform === "android") return "binary.apk";
        return "binary.zip";
    }

    /** POSTs the project form to `/filepost` and returns the SHA key body, throwing on a non-OK status. */
    private async postFile(server: string, form: FormData) {
        const response = await fetch(`${server}/filepost`, { method: "POST", body: form });
        const text = await response.text();
        if (!response.ok) throw new Error(`${response.status}: ${text}`);
        return text;
    }
}
