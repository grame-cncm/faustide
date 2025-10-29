import { test, expect } from "@playwright/test";

const FAUST_SERVICE_HOST = "https://faustservice.inria.fr";

type Page = import("@playwright/test").Page;

const stubFaustRoutes = async (page: Page) => {
    await page.route(`${FAUST_SERVICE_HOST}/targets`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ linux: ["x64"], web: ["pwa"] })
        });
    });
    await page.route(`${FAUST_SERVICE_HOST}/**`, route => route.fallback());
};

test.describe("Examples dropdown", () => {
    test.beforeEach(async ({ page }) => {
        await stubFaustRoutes(page);
    });

    test.fixme(true, "Examples list requires deterministic content setup");
    test("loads an example and updates editor", async ({ page }) => {
        await page.goto("/");
        await page.locator("#editor-top .dropdown-toggle").click();
        const firstExample = page.locator("#tab-examples .dropdown-item").first();
        const name = await firstExample.textContent();
        await firstExample.click();
        const editorContent = await page.evaluate(() => (window as any).faustEnv.editor.getValue());
        expect(editorContent).toContain(name?.trim() || "");
    });
});
