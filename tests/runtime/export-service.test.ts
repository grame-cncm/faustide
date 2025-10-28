import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { submitFaustExport, resolveExportTarget } from "@/runtime/exportService";
import { server } from "../setup/msw-server";

const API_ROOT = "https://faust.example";

describe("resolveExportTarget", () => {
    it("computes default binary target", () => {
        const result = resolveExportTarget(API_ROOT, "abc123", "linux", "x64");
        expect(result.href).toBe(`${API_ROOT}/abc123/linux/x64/binary.zip`);
    });

    it("computes platform-specific targets", () => {
        const pwa = resolveExportTarget(API_ROOT, "abc123", "web", "pwa");
        expect(pwa.href.endsWith("/index.html")).toBe(true);

        const android = resolveExportTarget(API_ROOT, "abc123", "android", "arm64");
        expect(android.href.endsWith("/binary.apk")).toBe(true);

        const chaos = resolveExportTarget(API_ROOT, "abc123", "chaos-stratus", "effect-installer");
        expect(chaos.href.endsWith("/installer.sh")).toBe(true);
    });
});

describe("submitFaustExport", () => {
    it("uploads project zip and returns download link when ready", async () => {
        server.use(
            http.post(`${API_ROOT}/filepost`, () => HttpResponse.text("abcdef")),
            http.get(`${API_ROOT}/abcdef/linux/x64/precompile`, () => HttpResponse.text("DONE", {
                headers: { Location: "https://downloads.example/app.zip" }
            }))
        );

        const result = await submitFaustExport({
            server: API_ROOT,
            fileName: "project",
            platform: "linux",
            arch: "x64",
            zipBlob: new Blob(["zip"])
        });

        expect(result.href).toBe(`${API_ROOT}/abcdef/linux/x64/binary.zip`);
        expect(result.path).toBe(`${API_ROOT}/abcdef/linux/x64`);
        expect(result.location).toBe("https://downloads.example/app.zip");
    });

    it("throws when precompile is not done", async () => {
        server.use(
            http.post(`${API_ROOT}/filepost`, () => HttpResponse.text("fedcba")),
            http.get(`${API_ROOT}/fedcba/linux/x64/precompile`, () => HttpResponse.text("PENDING"))
        );

        await expect(submitFaustExport({
            server: API_ROOT,
            fileName: "project",
            platform: "linux",
            arch: "x64",
            zipBlob: new Blob(["zip"])
        })).rejects.toThrow(/PENDING/);
    });
});
