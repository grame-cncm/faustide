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

test.describe("Panel resizers", () => {
    test.beforeEach(async ({ page }) => {
        await stubFaustRoutes(page);
    });

    test.fixme(true, "Requires reliable mouse drag assertions");
    test("resizes left panel via drag handle", async ({ page }) => {
        await page.goto("/");
        const resizer = page.locator("#left .resizable").first();
        const leftPanel = page.locator("#left");

        const initialWidth = await leftPanel.boundingBox();
        await resizer.hover();
        await page.mouse.down();
        await page.mouse.move(initialWidth?.x! + 200, initialWidth?.y! + 10);
        await page.mouse.up();

        const resizedWidth = await leftPanel.boundingBox();
        expect(resizedWidth?.width).not.toBe(initialWidth?.width);
    });
});
