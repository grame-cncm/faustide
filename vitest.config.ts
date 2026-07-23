import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        setupFiles: ["src/tests/setup.ts"],
        include: ["src/**/*.test.ts"],
        restoreMocks: true,
        // monaco-editor is a browser-only bundle Vite cannot resolve in node;
        // alias it to a tiny stub so modules that statically import it (e.g.
        // monaco-faust/FaustLang) are unit-testable.
        alias: {
            "monaco-editor": fileURLToPath(new URL("./src/tests/stubs/monaco-editor.ts", import.meta.url))
        },
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            include: ["src/**/*.ts"],
            exclude: ["src/**/*.test.ts", "src/tests/**", "src/**/*.d.ts"],
            // Anti-regression ratchet, not a target. Floors sit just below the
            // current measured coverage so the suite cannot silently backslide.
            // The whole src tree stays counted. Raise these whenever coverage
            // improves (e.g. after the scope, MeterNode, monaco-faust, and
            // magnitude/phase passes that lifted statements above 77%).
            thresholds: {
                statements: 78,
                branches: 64,
                functions: 77,
                lines: 81
            }
        }
    }
});
