import { beforeEach, describe, expect, it, vi } from "vitest";
import { ShareModalController } from "../ui/ShareModalController";

const setupDom = () => {
    document.body.innerHTML = `
        <div id="modal-share"></div>
        <input id="share-autorun" type="checkbox" />
        <input id="share-url" />
        <button id="share-btn-copy"></button>
    `;
};

const createController = (overrides: Partial<ConstructorParameters<typeof ShareModalController>[0]> = {}) => {
    const shareUrlService = {
        build: vi.fn(() => "https://faust.test/?inline=abc")
    };
    const options = {
        compileOptions: { voices: 8 },
        fileManager: {
            mainFileNameWithoutSuffix: "main",
            mainCode: "process = _;"
        },
        shareUrlService,
        locationProvider: () => ({ origin: "https://faust.test", pathname: "/editor/" }),
        clipboard: { writeText: vi.fn() },
        execCopy: vi.fn(),
        ...overrides
    };
    new ShareModalController(options as any).bind();
    return options;
};

describe("ShareModalController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("builds the share URL when the modal is shown", () => {
        const options = createController();
        $("#share-autorun").prop("checked", true);

        $("#modal-share").trigger("shown.bs.modal");

        expect(options.shareUrlService.build).toHaveBeenCalledWith({
            origin: "https://faust.test",
            pathname: "/editor/",
            autorun: true,
            voices: 8,
            name: "main",
            code: "process = _;"
        });
        expect($("#share-url").val()).toBe("https://faust.test/?inline=abc");
        expect($("#share-btn-copy").html()).toBe("Copy");
    });

    it("refreshes the URL when autorun changes", () => {
        createController();

        $("#share-autorun").prop("checked", false).trigger("change");

        expect($("#share-url").val()).toBe("https://faust.test/?inline=abc");
    });

    it("copies the URL using navigator clipboard when available", () => {
        const clipboard = { writeText: vi.fn() };
        createController({ clipboard } as any);
        $("#share-url").val("https://share.test/");

        $("#share-btn-copy").trigger("click");

        expect(clipboard.writeText).toHaveBeenCalledWith("https://share.test/");
        expect($("#share-btn-copy").html()).toBe('<i class="fas fa-check"></i>');
    });

    it("falls back to execCommand when clipboard is unavailable", () => {
        const execCopy = vi.fn();
        createController({ clipboard: undefined, execCopy } as any);
        $("#share-url").val("https://share.test/");

        $("#share-btn-copy").trigger("click");

        expect(execCopy).toHaveBeenCalled();
    });
});
