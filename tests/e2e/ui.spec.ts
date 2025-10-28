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

    await page.route(`${FAUST_SERVICE_HOST}/**`, async (route) => {
        if (route.request().method() === "OPTIONS") {
            await route.fulfill({
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
                    "Access-Control-Allow-Headers": "*"
                }
            });
            return;
        }
        await route.fallback();
    });
};

test.describe("IDE panels and share", () => {
    test.beforeEach(async ({ page }) => {
        await stubFaustRoutes(page);
    });

    test("switches diagram and plot tabs", async ({ page }) => {
        await page.goto("/");

        const diagramTab = page.locator("#tab-diagram");
        const plotTab = page.locator("#tab-plot-ui");

        await plotTab.click();
        await expect(plotTab).toHaveClass(/active/);
        await expect(page.locator("#plot-ui")).toHaveClass(/show/);

        await diagramTab.click();
        await expect(diagramTab).toHaveClass(/active/);
        await expect(page.locator("#diagram")).toHaveClass(/show/);
    });

    test("updates plot mode controls", async ({ page }) => {
        await page.goto("/");
        await page.waitForFunction(() => Boolean((window as any).faustEnv));

        const select = page.locator("#select-plot-mode");

        await select.selectOption("continuous");
        await expect(select).toHaveValue("continuous");
        await page.waitForFunction(() => {
            const el = document.getElementById("btn-plot");
            return el ? getComputedStyle(el).display === "none" : false;
        });

        await select.selectOption("manual");
        await expect(select).toHaveValue("manual");
        await page.waitForFunction(() => {
            const el = document.getElementById("btn-plot");
            return el ? getComputedStyle(el).display !== "none" : false;
        });

        await select.selectOption("offline");
        await expect(select).toHaveValue("offline");
        await page.waitForFunction(() => {
            const el = document.getElementById("btn-plot");
            return el ? getComputedStyle(el).display !== "none" : false;
        });
    });

    test("updates share URL when toggling autorun", async ({ page }) => {
        await page.goto("/");
        await page.waitForFunction(() => Boolean((window as any).faustEnv));

        await page.locator("#btn-share").click();
        const shareInput = page.locator("#share-url");
        await expect(shareInput).toBeVisible();

        const shareHandle = await shareInput.elementHandle();
        await page.waitForFunction((input) => input && (input as HTMLInputElement).value.includes("autorun="), shareHandle);

        const initialUrl = new URL(await shareInput.inputValue(), page.url());
        expect(initialUrl.searchParams.get("autorun")).toBe("1");

        await page.locator("#share-autorun").uncheck();

        await page.waitForFunction((input) => input && (input as HTMLInputElement).value.includes("autorun=0"), shareHandle);

        const updatedUrl = new URL(await shareInput.inputValue(), page.url());
        expect(updatedUrl.searchParams.get("autorun")).toBe("0");
    });
});

test.describe("Documentation shortcut", () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            const opened: string[] = [];
            (window as any).__openedDocs = opened;
            window.open = ((original) => ((url: string, target?: string | undefined) => {
                const record: any = {
                    url,
                    closed: false,
                    focus: () => undefined,
                    close: () => { record.closed = true; }
                };
                record.location = { href: url } as any;
                opened.push(url);
                return record;
            }))(window.open);
        });
        await stubFaustRoutes(page);
    });

    test("opens documentation via Docs button", async ({ page }) => {
        await page.goto("/");
        await page.waitForFunction(() => Boolean((window as any).faustEnv?.editor));

        await page.locator("#btn-docs").click();

        const opened = await page.evaluate(() => (window as any).__openedDocs);
        expect(opened).toContain("https://faustdoc.grame.fr/manual/syntax/");
        expect(opened.some((url: string) => url.startsWith("https://faustlibraries.grame.fr/libs"))).toBeTruthy();
    });
});
