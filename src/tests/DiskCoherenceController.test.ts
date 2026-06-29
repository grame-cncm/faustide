import { describe, expect, it, vi } from "vitest";
import { DiskCoherenceController } from "../ui/DiskCoherenceController";

function makeController(overrides: any = {}) {
    const fileManager = {
        getValue: vi.fn(() => "local"),
        replaceExternalText: vi.fn(async () => undefined),
        ...overrides.fileManager
    };
    const diskTracker = {
        trackedNames: vi.fn(() => ["main.dsp"]),
        ...overrides.diskTracker
    };
    const diskCoherence = {
        poll: vi.fn(async () => ({ status: "unchanged" })),
        ...overrides.diskCoherence
    };
    const alertController = {
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
                poll: vi.fn(async () => ({ status: "conflict" }))
            }
        });

        await controller.pollAll();

        expect(fileManager.replaceExternalText).not.toHaveBeenCalled();
        expect(alertController.show).toHaveBeenCalledWith(expect.stringContaining("main.dsp changed on disk"));
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

    it("binds window focus to polling", async () => {
        const { controller, diskCoherence } = makeController();
        controller.bind();

        window.dispatchEvent(new Event("focus"));
        await Promise.resolve();

        expect(diskCoherence.poll).toHaveBeenCalledWith("main.dsp", "local");
    });
});
