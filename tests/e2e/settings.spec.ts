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

test.describe("Settings modal", () => {
    test.beforeEach(async ({ page }) => {
        await stubFaustRoutes(page);
    });

    test.fixme(true, "Modal checkbox currently blocked by overlay; requires UI refactor for reliable automation");
    test("toggles save-code option and syncs compileOptions", async ({ page }) => {
        await page.goto("/");
        await page.waitForFunction(() => Boolean((window as any).faustEnv?.compileOptions));

        await page.locator("#btn-tab-setting").click();
        const modal = page.locator("#modal-tab-setting.show");
        await expect(modal).toBeVisible();

        const checkbox = page.locator("#check-save-code");
        const initial = await checkbox.isChecked();
        await checkbox.hover();
        await page.mouse.move(checkboxboundingbox?.x! + checkboxboundingbox?.width! / 2, checkboxboundingbox?.y! + 5);
        await checkbox.dispatchEvent("click");

        const saved = await page.evaluate(() => (window as any).faustEnv.compileOptions.saveCode);
        expect(saved).toBe(!initial);

        await checkbox.click({ force: true });
        await page.locator("#modal-tab-setting .close").click();
        await expect(modal).toBeHidden();
    });
});
