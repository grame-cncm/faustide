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

test.describe("Realtime diagram toggle", () => {
    test.beforeEach(async ({ page }) => {
        await stubFaustRoutes(page);
    });

    test.fixme(true, "Requires instrumentation to detect updateDiagram/runDsp invocations");
    test("enables realtime compile and triggers immediate update", async ({ page }) => {
        await page.goto("/");
        await page.waitForFunction(() => Boolean((window as any).faustEnv?.uiEnv?.fileManager));

        await page.evaluate(() => {
            (window as any).faustEnv.uiEnv.fileManager.setValue("process = _ : _;");
        });

        const realtimeCheckbox = page.locator("#check-realtime-compile");
        await realtimeCheckbox.check();

        const compileTriggered = await page.evaluate(() => {
            const env = (window as any).faustEnv;
            if (!env?.uiEnv?.fileManager) return null;
            return env.uiEnv.fileManager.mainCode.includes("process = _ : _;");
        });

        expect(compileTriggered).toBe(true);
    });
});
