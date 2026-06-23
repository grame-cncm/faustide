import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "tests/e2e",
    timeout: 60000,
    expect: {
        timeout: 15000
    },
    use: {
        baseURL: "http://127.0.0.1:4173",
        trace: "on-first-retry"
    },
    webServer: {
        command: "node tests/e2e/serve-dist.cjs",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: true,
        timeout: 30000
    }
});
