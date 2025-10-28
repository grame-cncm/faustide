import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./tests/setup/vitest.setup.ts"],
        include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
        coverage: {
            provider: "v8",
            reporter: ["text", "lcov"]
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@tests": path.resolve(__dirname, "tests"),
            "@types": path.resolve(__dirname, "types")
        }
    }
});
