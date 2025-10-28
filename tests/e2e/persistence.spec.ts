import { test, expect } from "@playwright/test";

const FAUST_SERVICE_HOST = "https://faustservice.inria.fr";

const stubFaustRoutes = async (page: import("@playwright/test").Page) => {
    await page.route(`${FAUST_SERVICE_HOST}/targets`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ linux: ["x64"], web: ["pwa"] })
        });
    });
    await page.route(`${FAUST_SERVICE_HOST}/**`, route => route.fallback());
};

test.describe("Persistence", () => {
    test.beforeEach(async ({ page }) => {
        await stubFaustRoutes(page);
    });

    test("restores editor content after reload", async ({ page, context }) => {
        await page.goto("/");
        await page.waitForFunction(() => Boolean((window as any).faustEnv?.editor && (window as any).faustEnv?.fileManager));

        const code = "process = _ : _;";
        await page.evaluate((newCode) => {
            (window as any).faustEnv.editor.setValue(newCode);
            (window as any).faustEnv.fileManager.setValue(newCode);
            (window as any).faustEnv.fileManager.save("untitled.dsp", newCode);
        }, code);

        await page.reload({ waitUntil: "load" });
        await page.waitForFunction(() => Boolean((window as any).faustEnv?.editor));

        const restored = await page.evaluate(() => (window as any).faustEnv.editor.getValue());
        expect(restored.trim()).toContain(code);
    });
});
