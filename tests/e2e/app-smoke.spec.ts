import { expect, Page, test } from "@playwright/test";

const mockFaustService = async (page: Page) => {
    await page.route("https://faustservice.inria.fr/targets", route => route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
            source: ["cplusplus"],
            web: ["wasm", "wap"],
            linux: ["x64"]
        })
    }));
};

const openApp = async (page: Page) => {
    await mockFaustService(page);
    await page.goto("/");
    await page.waitForFunction(() => Boolean(window.faustEnv && window.faustEnv.uiEnv && window.faustEnv.uiEnv.fileManager));
};

test("app loads and exposes the compatibility Faust environment", async ({ page }) => {
    await openApp(page);

    await expect(page.locator("#filemanager .filemanager-filename")).toContainText("untitled.dsp");
    await expect.poll(() => page.evaluate(() => Boolean(window.faustEnv.faustCompiler))).toBe(true);
});

test("editing Monaco updates the selected file", async ({ page }) => {
    await openApp(page);

    await page.evaluate(() => window.faustEnv.editor.setValue("process = _;"));

    await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.fileManager.selectedCode)).toBe("process = _;");
});

test("deleting the last file recreates the default DSP", async ({ page }) => {
    await openApp(page);

    await page.locator("#filemanager .filemanager-file").hover();
    await page.locator("#filemanager .filemanager-btn-delete").click();

    await expect(page.locator("#filemanager .filemanager-filename")).toHaveText("untitled.dsp");
    await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.fileManager.mainCode)).toContain("stdfaust.lib");
});

test("Faust service target discovery is populated from mocked targets", async ({ page }) => {
    await openApp(page);

    await expect(page.locator("#export-platform option", { hasText: "source" })).toHaveCount(1);
    await expect(page.locator("#export-platform option", { hasText: "web" })).toHaveCount(1);
    await expect(page.locator("#export-arch option", { hasText: "cplusplus" })).toHaveCount(1);
});

test("examples menu is populated from the static examples index", async ({ page }) => {
    await openApp(page);

    await page.locator("#editor-top .dropdown-toggle", { hasText: "Examples" }).click();

    await expect(page.locator("#tab-examples .submenu-toggle").first()).toBeVisible();
    await expect(page.locator("#tab-examples .faust-example").first()).toHaveText(/\.dsp|\.lib/);
});

test("share URL contains the current project name, voices, autorun, and inline code", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => window.faustEnv.editor.setValue("process = _;"));
    await page.locator("#select-voices").selectOption("4");
    await page.locator("#btn-share").click();

    const shareUrl = page.locator("#share-url");
    await expect(shareUrl).toHaveValue(/autorun=1/);
    await expect(shareUrl).toHaveValue(/voices=4/);
    await expect(shareUrl).toHaveValue(/name=untitled/);
    await expect(shareUrl).toHaveValue(/inline=/);
});
