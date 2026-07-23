import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

test.describe("Plot controls", () => {
    test("plot mode drives the plot button label and visibility", async ({ page }) => {
        await openApp(page);
        const btn = page.locator("#btn-plot");

        await page.locator("#select-plot-mode").selectOption("offline");
        await expect(btn).toBeVisible();
        await expect(btn.locator("span")).toHaveText("Plot First Samples");

        await page.locator("#select-plot-mode").selectOption("manual");
        await expect(btn).toBeVisible();
        await expect(btn.locator("span")).toHaveText("Plot (Snapshot)");

        await page.locator("#select-plot-mode").selectOption("continuous");
        await expect(btn).toBeHidden();
    });

    test("plot mode changes preserve the active visualization", async ({ page }) => {
        await openApp(page);
        await page.evaluate(() => {
            window.faustEnv.uiEnv.plotScope.mode = 3;
        });

        await page.locator("#select-plot-mode").selectOption("manual");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.plotScope.mode)).toBe(3);

        await page.locator("#select-plot-mode").selectOption("continuous");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.plotScope.mode)).toBe(3);
    });

    test("offline plot renders samples into the plot scope", async ({ page }) => {
        await openApp(page);
        await page.evaluate(() => window.faustEnv.editor.setValue("import(\"stdfaust.lib\");\nprocess = os.osc(440) <: _, _;"));
        await page.locator("#select-plot-mode").selectOption("offline");
        await page.locator("#btn-plot").click();

        // A successful offline plot renders the samples and activates the plot tab.
        await expect(page.locator("#tab-plot-ui")).toHaveClass(/active/, { timeout: 30000 });
    });

    test("FFT window selection defaults by plot mode and accepts explicit overrides", async ({ page }) => {
        await openApp(page);
        const windowSelect = page.locator("#select-plot-fftwindow");

        await expect(windowSelect).toHaveValue("auto");
        await page.locator("#select-plot-mode").selectOption("offline");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.analyser.resolvedFftWindow)).toBe("rectangular");

        await page.locator("#select-plot-mode").selectOption("continuous");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.analyser.resolvedFftWindow)).toBe("blackman");

        await windowSelect.selectOption("rectangular");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.analyser.resolvedFftWindow)).toBe("rectangular");

        await windowSelect.selectOption("hann");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.analyser.resolvedFftWindow)).toBe("hann");
    });

    test("frequency plots set dB limits, switch magnitude units, and expose phase", async ({ page }) => {
        await openApp(page);
        await page.evaluate(() => window.faustEnv.editor.setValue('import("stdfaust.lib");\nprocess = os.impulse;'));
        await page.locator("#select-plot-mode").selectOption("offline");
        await page.locator("#input-plot-samps").fill("1024");
        await page.locator("#input-plot-samps").dispatchEvent("change");
        await page.locator("#btn-plot").click();
        await expect(page.locator("#tab-plot-ui")).toHaveClass(/active/, { timeout: 30000 });

        const modeButton = page.locator("#plot-ui .static-scope-ui-switch");
        await modeButton.dispatchEvent("click");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.plotScope.mode)).toBe(3);
        const magnitudeDbMin = page.locator("#plot-ui .static-scope-ui-db-min");
        const magnitudeDbMax = page.locator("#plot-ui .static-scope-ui-db-max");
        await expect(magnitudeDbMin).toHaveValue("-100");
        await expect(magnitudeDbMax).toHaveValue("0");
        await magnitudeDbMin.fill("-72");
        await magnitudeDbMin.dispatchEvent("change");
        await magnitudeDbMax.fill("6");
        await magnitudeDbMax.dispatchEvent("change");
        await expect.poll(() => page.evaluate(() => ({
            min: window.faustEnv.uiEnv.plotScope.magnitudeDbMin,
            max: window.faustEnv.uiEnv.plotScope.magnitudeDbMax
        }))).toEqual({ min: -72, max: 6 });
        const magnitudeButton = page.locator("#plot-ui .static-scope-ui-magnitude");
        await expect(magnitudeButton).toHaveText("dB");
        await magnitudeButton.dispatchEvent("click");
        await expect(magnitudeButton).toHaveText("amp");
        await expect(magnitudeDbMin).toBeHidden();
        await expect(magnitudeDbMax).toBeHidden();

        await modeButton.dispatchEvent("click");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.plotScope.mode)).toBe(5);
        await expect(modeButton.locator("span")).toHaveText("Phase");
        await expect(magnitudeButton).toBeHidden();
        const alignedPhasePeak = await page.evaluate(() => {
            const analyser = window.faustEnv.uiEnv.analyser;
            const frameOffset = analyser.fftSize / 2 * (analyser.fftOverlap - 1);
            const phaseFrame = analyser.phaseDomainData[0].slice(frameOffset, frameOffset + analyser.fftSize / 2);
            return Math.max(...phaseFrame.map(Math.abs));
        });
        expect(alignedPhasePeak).toBeLessThan(1e-6);
    });

    test("waveform selection copies CSV, axes reset independently, and data flows down columns", async ({ page }) => {
        await openApp(page);
        await page.evaluate(() => window.faustEnv.editor.setValue('import("stdfaust.lib");\nprocess = os.osc(440);'));
        await page.locator("#select-plot-mode").selectOption("offline");
        await page.locator("#input-plot-samps").fill("1024");
        await page.locator("#input-plot-samps").dispatchEvent("change");
        await page.locator("#btn-plot").click();
        await expect(page.locator("#tab-plot-ui")).toHaveClass(/active/, { timeout: 30000 });

        const canvas = page.locator("#plot-ui .static-scope-canvas");
        await expect(canvas).toBeVisible();
        const bounds = await canvas.boundingBox();
        expect(bounds).not.toBeNull();
        await page.mouse.move(bounds.x + bounds.width * 0.25, bounds.y + bounds.height * 0.5);
        await page.mouse.down();
        await page.mouse.move(bounds.x + bounds.width * 0.6, bounds.y + bounds.height * 0.5);
        await page.mouse.up();

        const selectionLength = await page.evaluate(() => {
            const selection = window.faustEnv.uiEnv.plotScope.selection;
            return selection.endSampleIndex - selection.startSampleIndex;
        });
        expect(selectionLength).toBeGreaterThan(0);

        const copiedCsv = await page.evaluate(() => {
            const canvasElement = document.querySelector("#plot-ui .static-scope-canvas");
            const clipboardData = new DataTransfer();
            canvasElement.dispatchEvent(new ClipboardEvent("copy", {
                bubbles: true,
                cancelable: true,
                clipboardData
            }));
            return clipboardData.getData("text/plain");
        });
        expect(copiedCsv).toMatch(/^sample,time_seconds,channel1\n/);
        expect(copiedCsv.trim().split("\n")).toHaveLength(selectionLength + 1);

        await page.evaluate(() => {
            const scope = window.faustEnv.uiEnv.plotScope;
            scope.zoom = 4;
            scope.zoomOffset = 0.25;
            scope.vzoom = 4;
        });
        await canvas.dblclick({ position: { x: 20, y: bounds.height / 2 } });
        await expect.poll(() => page.evaluate(() => ({
            zoom: window.faustEnv.uiEnv.plotScope.zoom,
            verticalZoom: window.faustEnv.uiEnv.plotScope.vzoom
        }))).toEqual({ zoom: 4, verticalZoom: 1 });

        await canvas.dblclick({ position: { x: bounds.width / 2, y: bounds.height - 5 } });
        await expect.poll(() => page.evaluate(() => ({
            zoom: window.faustEnv.uiEnv.plotScope.zoom,
            offset: window.faustEnv.uiEnv.plotScope.zoomOffset
        }))).toEqual({ zoom: 1, offset: 0 });

        await page.evaluate(() => {
            window.faustEnv.uiEnv.plotScope.mode = 0;
            window.faustEnv.uiEnv.plotScope.draw();
        });
        const dataSurface = page.locator("#plot-ui .static-scope-data");
        await expect(dataSurface).toBeVisible();
        await expect(dataSurface.locator(".static-scope-channel")).toHaveCount(1);
        const dataLayout = await dataSurface.evaluate((element) => {
            const channel = element.querySelector(".static-scope-channel") as HTMLDivElement;
            const cells = Array.from(channel.querySelectorAll(".static-scope-cell")) as HTMLDivElement[];
            const rowCount = Number(channel.style.gridTemplateRows.match(/repeat\((\d+)/)?.[1]);
            const first = cells[0].getBoundingClientRect();
            const second = cells[1].getBoundingClientRect();
            const nextColumn = cells[rowCount].getBoundingClientRect();
            return {
                rowCount,
                first: { x: first.x, y: first.y },
                second: { x: second.x, y: second.y },
                nextColumn: { x: nextColumn.x, y: nextColumn.y }
            };
        });
        expect(dataLayout.rowCount).toBeGreaterThan(1);
        expect(dataLayout.second.x).toBeCloseTo(dataLayout.first.x, 0);
        expect(dataLayout.second.y).toBeGreaterThan(dataLayout.first.y);
        expect(dataLayout.nextColumn.x).toBeGreaterThan(dataLayout.first.x);
        expect(dataLayout.nextColumn.y).toBeCloseTo(dataLayout.first.y, 0);
    });
});
