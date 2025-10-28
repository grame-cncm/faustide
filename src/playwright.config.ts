import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT) || 4173;
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;

export default defineConfig({
    testDir: "./tests/e2e",
    timeout: 60_000,
    expect: {
        timeout: 5_000
    },
    use: {
        baseURL: BASE_URL,
        trace: "on-first-retry",
        headless: true,
        viewport: { width: 1280, height: 720 }
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] }
        }
    ],
    webServer: {
        command: `npm run build && node scripts/e2e-server.mjs`,
        url: `${BASE_URL}/index.html`,
        timeout: 120_000,
        reuseExistingServer: !process.env.CI
    }
});
