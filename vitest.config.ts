import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        setupFiles: ["src/tests/setup.ts"],
        include: ["src/**/*.test.ts"],
        restoreMocks: true
    }
});
