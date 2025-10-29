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

test.describe("Share modal copy button", () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            Object.defineProperty(navigator, "clipboard", {
                configurable: true,
                value: { writeText: () => Promise.resolve() }
            });
        });
        await stubFaustRoutes(page);
    });

test.fixme(true, "Copy button currently only updates icon text indirectly");
test("copies share URL and resets state on option change", async ({ page }) => {
        await page.goto("/");
        await page.locator("#btn-share").click();

        const shareInput = page.locator("#share-url");
        await expect(shareInput).toBeVisible();

        const copyButton = page.locator("#share-btn-copy");
        await expect(copyButton).toHaveText(/Copy/);

        await copyButton.click();
        await expect(copyButton).not.toHaveText(/Copy/);

        await page.locator("#share-autorun").click();
        await expect(copyButton).toHaveText(/Copy/);
    });
});
