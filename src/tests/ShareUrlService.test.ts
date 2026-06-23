import { beforeEach, describe, expect, it, vi } from "vitest";
import { ShareUrlService } from "../runtime/ShareUrlService";

// ShareUrlService keeps query-string compatibility isolated from the DOM-heavy
// bootstrap code. These tests document legacy normalization and precedence.
describe("ShareUrlService", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("builds a share URL with sanitized name and inline code", () => {
        const service = new ShareUrlService();

        const url = service.build({
            origin: "https://ide.example",
            pathname: "/index.html",
            autorun: true,
            voices: 4,
            name: "my patch!",
            code: "process = _;"
        });

        const params = new URL(url).searchParams;
        expect(url.startsWith("https://ide.example/index.html?")).toBe(true);
        expect(params.get("autorun")).toBe("1");
        expect(params.get("voices")).toBe("4");
        expect(params.get("name")).toBe("mypatch");
        expect(atob(params.get("inline").replace("-", "+").replace("_", "/"))).toBe("process = _;");
    });

    it("normalizes compile options from query params", async () => {
        const service = new ShareUrlService();

        await expect(service.load("?realtime_compile=1&voices=999&buffer_size=256&mode=amstram-pro"))
            .resolves.toEqual({
                realtimeCompile: true,
                voices: 0,
                bufferSize: 256,
                mode: "amstram-pro",
                autorun: false
            });
    });

    it("loads remote code and derives a sanitized file name", async () => {
        const fetch = vi.fn(async () => new Response("process = _;"));
        vi.stubGlobal("fetch", fetch);
        const service = new ShareUrlService();

        const result = await service.load("?code=https%3A%2F%2Fexample.test%2FMy-Patch.dsp&autorun=1");

        expect(result).toEqual({
            name: "MyPatch",
            code: "process = _;",
            autorun: true
        });
        expect(fetch).toHaveBeenCalledWith("https://example.test/My-Patch.dsp");
    });

    it("lets inline code and explicit name override remote code metadata", async () => {
        const fetch = vi.fn(async () => new Response("remote"));
        vi.stubGlobal("fetch", fetch);
        const service = new ShareUrlService();
        const inline = btoa("inline").replace("+", "-").replace("/", "_");

        const result = await service.load(`?code=https%3A%2F%2Fexample.test%2FRemote.dsp&inline=${inline}&name=Final!`);

        expect(result).toEqual({
            name: "Final",
            code: "inline",
            autorun: false
        });
    });
});
