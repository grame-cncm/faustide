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

test.describe("Project downloads", () => {
    test.beforeEach(async ({ page }) => {
        await stubFaustRoutes(page);
    });

test.fixme(true, "Requires download interception support in CI environment");
test("downloads project zip from Save As", async ({ page }) => {
        await page.goto("/");

        await page.locator("#btn-save").click();

        const metaHandle = await page.waitForFunction(() => {
            const anchor = document.getElementById("a-save") as HTMLAnchorElement;
            if (!anchor) return null;
            const download = anchor.getAttribute("download");
            const href = anchor.getAttribute("href");
            if (!download || !href || !href.startsWith("blob:")) return null;
            return { download, href };
        });

        const meta = await metaHandle.jsonValue();
        expect(meta?.download).toBe("untitled.zip");
        expect(meta?.href).toContain("blob:");
    });
});
