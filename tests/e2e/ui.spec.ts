import { test, expect, Page } from "@playwright/test";

const FAUST_SERVICE_HOST = "https://faustservice.inria.fr";

const stubFaustRoutes = async (page: Page) => {
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

        const select = page.locator("#select-plot-mode");
        const plotButton = page.locator("#btn-plot");

        await select.selectOption("continuous");
        await expect(select).toHaveValue("continuous");
        await expect(plotButton).toBeHidden();

        await select.selectOption("manual");
        await expect(select).toHaveValue("manual");
        await expect(plotButton).toBeVisible();

        await select.selectOption("offline");
        await expect(select).toHaveValue("offline");
        await expect(plotButton).toBeVisible();
    });

    test("generates share URL for updated code", async ({ page }) => {
        await page.goto("/");
        await page.waitForFunction(() => Boolean((window as any).faustEnv?.editor && (window as any).faustEnv?.fileManager));

        const newCode = 'process = _ : _;';
        await page.evaluate((code) => {
            (window as any).faustEnv.editor.setValue(code);
            (window as any).faustEnv.fileManager.setValue(code);
        }, newCode);

        await page.locator("#btn-share").click();
        const shareInput = page.locator("#share-url");
        await expect(shareInput).toBeVisible();

        const shareValue = await shareInput.inputValue();
        const expected = await page.evaluate((code) => ({
            inline: btoa(code).replace("+", "-").replace("/", "_"),
            name: (window as any).faustEnv.fileManager.mainFileNameWithoutSuffix
        }), newCode);

        const url = new URL(shareValue);
        expect(url.searchParams.get("inline")).toBe(expected.inline);
        expect(url.searchParams.get("name")).toBe(expected.name);
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
                record.location = { href: url };
                opened.push(url);
                return record;
            }))(window.open);
        });
        await stubFaustRoutes(page);
    });

    test("opens documentation with Ctrl+D", async ({ page }) => {
        await page.goto("/");
        await page.waitForFunction(() => Boolean((window as any).faustEnv?.editor));

        await page.locator(".monaco-editor").first().click();

        const shortcut = process.platform === "darwin" ? "Meta+D" : "Control+D";
        await page.keyboard.press(shortcut);

        const opened = await page.evaluate(() => (window as any).__openedDocs);
        expect(opened).toContain("https://faustdoc.grame.fr/manual/syntax/");
        expect(opened.some((url: string) => url.startsWith("https://faustlibraries.grame.fr/libs"))).toBeTruthy();
    });
});
