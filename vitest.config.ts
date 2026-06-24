import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        setupFiles: ["src/tests/setup.ts"],
        include: ["src/**/*.test.ts"],
        restoreMocks: true,
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            include: ["src/**/*.ts"],
            exclude: ["src/**/*.test.ts", "src/tests/**", "src/**/*.d.ts"],
            // Anti-regression ratchet, not a target. Floors sit just below the
            // current measured coverage so the suite cannot silently backslide.
            // The whole src tree stays counted (incl. the untested
            // Scope/StaticScope/Analyser/MeterNode visualization modules), so
            // the remaining debt stays visible in the denominator. Raise these
            // as coverage for those modules is added.
            thresholds: {
                statements: 39,
                branches: 30,
                functions: 55,
                lines: 40
            }
        }
    }
});
