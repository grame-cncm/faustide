export type ExportTarget = {
    targetFilename: string;
    path: string;
    href: string;
};

export type SubmitExportOptions = {
    server: string;
    fileName: string;
    platform: string;
    arch: string;
    zipBlob: Blob;
    fetchImpl?: typeof fetch;
};

export type SubmitExportResult = ExportTarget & {
    shaKey: string;
    location?: string;
};

const HEX_RE = /^[0-9A-Fa-f]+$/;

export const resolveExportTarget = (server: string, shaKey: string, platform: string, arch: string): ExportTarget => {
    let targetFilename: string;
    if (arch === "pwa" || arch === "pwa-poly") targetFilename = "index.html";
    else if (platform === "chaos-stratus" && arch === "effect-installer") targetFilename = "installer.sh";
    else if (platform === "android") targetFilename = "binary.apk";
    else targetFilename = "binary.zip";

    const basePath = `${server}/${shaKey}/${platform}/${arch}`;
    return {
        targetFilename,
        path: basePath,
        href: `${basePath}/${targetFilename}`
    };
};

export const submitFaustExport = async (options: SubmitExportOptions): Promise<SubmitExportResult> => {
    const { server, fileName, platform, arch, zipBlob, fetchImpl = fetch } = options;
    const form = new FormData();
    form.append("file", zipBlob, `${fileName}.zip`);

    const uploadResponse = await fetchImpl(`${server}/filepost`, {
        method: "POST",
        body: form
    });

    if (!uploadResponse.ok) {
        const text = await uploadResponse.text().catch(() => uploadResponse.statusText);
        throw new Error(`Upload failed: ${text || uploadResponse.statusText}`);
    }

    const shaKey = (await uploadResponse.text()).trim();
    if (!HEX_RE.test(shaKey)) throw new Error(`Unexpected upload response: ${shaKey}`);

    const target = resolveExportTarget(server, shaKey, platform, arch);

    const precompileResponse = await fetchImpl(`${target.path}/precompile`);
    if (!precompileResponse.ok) {
        const text = await precompileResponse.text().catch(() => precompileResponse.statusText);
        throw new Error(`Precompile request failed: ${text || precompileResponse.statusText}`);
    }

    const statusText = (await precompileResponse.text()).trim();
    if (statusText !== "DONE") throw new Error(statusText || "Precompile pending");

    return {
        ...target,
        shaKey,
        location: precompileResponse.headers.get("Location") || undefined
    };
};
