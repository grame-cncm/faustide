import { describe, expect, it, vi } from "vitest";
import { DiskCoherenceController } from "../ui/DiskCoherenceController";

const flush = async () => {
    await Promise.resolve();
    await Promise.resolve();
};

function makeController(overrides: any = {}) {
    const fileManager = {
        getValue: vi.fn(() => "local"),
        newFile: vi.fn(),
        replaceExternalText: vi.fn(async () => undefined),
        ...overrides.fileManager
    };
    const diskTracker = {
        trackedNames: vi.fn(() => ["main.dsp"]),
        writeToDisk: vi.fn(async () => undefined),
        ...overrides.diskTracker
    };
    const diskCoherence = {
        poll: vi.fn(async () => ({ status: "unchanged" })),
        acceptWrittenContent: vi.fn(),
        checkBeforeWrite: vi.fn(async () => undefined),
        ...overrides.diskCoherence
    };
    const alertController = {
        clear: vi.fn(),
        show: vi.fn(),
        ...overrides.alertController
    };
    const controller = new DiskCoherenceController({
        fileManager,
        diskTracker,
        diskCoherence,
        alertController
    } as any);
    return { alertController, controller, diskCoherence, diskTracker, fileManager };
}

describe("DiskCoherenceController", () => {
    it("reloads clean files when polling reports disk content changed", async () => {
        const { controller, diskCoherence, fileManager } = makeController({
            diskCoherence: {
                poll: vi.fn(async () => ({ status: "reload", content: "disk" }))
            }
        });

        await controller.pollAll();

        expect(diskCoherence.poll).toHaveBeenCalledWith("main.dsp", "local");
        expect(fileManager.replaceExternalText).toHaveBeenCalledWith("main.dsp", "disk");
    });

    it("shows an alert when polling reports a conflict", async () => {
        const { alertController, controller, fileManager } = makeController({
            diskCoherence: {
                poll: vi.fn(async () => ({ status: "conflict", diskContent: "disk" }))
            }
        });

        controller.bind();
        await controller.pollAll();

        expect(fileManager.replaceExternalText).not.toHaveBeenCalled();
        expect(alertController.show).toHaveBeenCalledWith(expect.stringContaining("main.dsp changed on disk"));
        expect(document.body.textContent).toContain("Mounted file changed");
    });

    it("shows an alert when polling cannot read a mounted file", async () => {
        const { alertController, controller } = makeController({
            diskCoherence: {
                poll: vi.fn(async () => ({ status: "unread", error: new Error("denied") }))
            }
        });

        await controller.pollAll();

        expect(alertController.show).toHaveBeenCalledWith(expect.stringContaining("could not be checked on disk"));
    });

    it("reloads from disk when the conflict modal reload action is clicked", async () => {
        const { alertController, controller, fileManager } = makeController({
            diskCoherence: {
                poll: vi.fn(async () => ({ status: "conflict", diskContent: "disk" }))
            }
        });
        controller.bind();
        await controller.pollAll();

        (document.querySelector("[data-action='reload']") as HTMLButtonElement).click();
        await flush();

        expect(fileManager.replaceExternalText).toHaveBeenCalledWith("main.dsp", "disk");
        expect(alertController.clear).toHaveBeenCalled();
    });

    it("overwrites disk when the conflict modal overwrite action is clicked", async () => {
        const { controller, diskCoherence, diskTracker } = makeController({
            diskCoherence: {
                poll: vi.fn(async () => ({ status: "conflict", diskContent: "disk" })),
                acceptWrittenContent: vi.fn(),
                checkBeforeWrite: vi.fn(async () => { throw new Error("conflict"); })
            }
        });
        controller.bind();
        await controller.pollAll();

        (document.querySelector("[data-action='overwrite']") as HTMLButtonElement).click();
        await flush();

        expect(diskTracker.writeToDisk).toHaveBeenCalledWith("main.dsp", "local");
        expect(diskCoherence.acceptWrittenContent).toHaveBeenCalledWith("main.dsp", "local");
    });

    it("keeps a local copy before reloading the disk version", async () => {
        const { controller, fileManager } = makeController({
            diskCoherence: {
                poll: vi.fn(async () => ({ status: "conflict", diskContent: "disk" }))
            }
        });
        controller.bind();
        await controller.pollAll();

        (document.querySelector("[data-action='keep-copy']") as HTMLButtonElement).click();
        await flush();

        expect(fileManager.newFile).toHaveBeenCalledWith("main_local.dsp", "local", { persist: "immediate" });
        expect(fileManager.replaceExternalText).toHaveBeenCalledWith("main.dsp", "disk");
    });

    it("binds window focus to polling", async () => {
        const { controller, diskCoherence } = makeController();
        controller.bind();

        window.dispatchEvent(new Event("focus"));
        await Promise.resolve();

        expect(diskCoherence.poll).toHaveBeenCalledWith("main.dsp", "local");
    });
});
