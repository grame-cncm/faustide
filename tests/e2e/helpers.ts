import { expect, Page } from "@playwright/test";

/**
 * Intercepts the Faust remote service `/targets` discovery call with a fixed
 * payload so export-related UI can be exercised without network access.
 */
export const mockFaustService = async (page: Page) => {
    await page.route("https://faustservice.inria.fr/targets", route => route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
            source: ["cplusplus"],
            web: ["wasm", "wap"],
            linux: ["x64"]
        })
    }));
};

/**
 * Opens the IDE, waits until the runtime composition root has wired the
 * FileManager, and returns once the app is interactive.
 */
export const openApp = async (page: Page) => {
    await mockFaustService(page);
    await page.goto("/");
    await page.waitForFunction(() => Boolean(window.faustEnv && window.faustEnv.uiEnv && window.faustEnv.uiEnv.fileManager));
};

/** Replaces the editor content with the given Faust code. */
export const setEditorCode = (page: Page, code: string) =>
    page.evaluate(c => window.faustEnv.editor.setValue(c), code);

/**
 * Clicks Run and waits for a DSP node to be instantiated in the audio
 * environment, which is the observable result of a successful compile+run.
 */
export const runDsp = async (page: Page) => {
    await page.locator("#btn-run").click();
    await expect.poll(() => page.evaluate(() => Boolean(window.faustEnv.audioEnv.dsp)), { timeout: 30000 }).toBe(true);
};
