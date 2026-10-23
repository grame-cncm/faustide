/**
 * ESLint 9 flat config for the Faust IDE sources (`src/`).
 *
 * Migrated from the ESLint 6 `.eslintrc.json` (airbnb-base +
 * typescript-eslint 2). That setup only linted `.js` files, so the TypeScript
 * sources were never checked; this config lints `.ts` and `.js`.
 *
 * Rule set:
 * - ESLint and typescript-eslint `recommended`;
 * - every rule that was set explicitly in `.eslintrc.json`, with formatting
 *   rules moved to `@stylistic` (ESLint deprecated its own) and removed rules
 *   replaced by their successors;
 * - the airbnb-base rules that catch bugs or that the code already honours
 *   with `eslint-disable` comments.
 * airbnb-base's pure formatting rules and stylistic suggestions that the code
 * never followed (e.g. `no-void`, `prefer-arrow-callback`,
 * `newline-per-chained-call`, `implicit-arrow-linebreak`) are not carried
 * over: airbnb-base has no ESLint 9 release. Also dropped: the `for...of` ban
 * (its regenerator-runtime rationale does not apply to the ES2015 target) and
 * `consistent-return` (TypeScript checks return types).
 */
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist/", "node_modules/", "local/", "old/", "src/libfaust-wasm.js"]
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ["src/**/*.{ts,js}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.jquery
            }
        },
        plugins: {
            "@stylistic": stylistic,
            import: importPlugin
        },
        settings: {
            "import/resolver": {
                node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"] }
            }
        },
        rules: {
            // Explicit rules carried over from .eslintrc.json.
            "array-callback-return": "warn",
            curly: ["warn", "multi-line"],
            "default-case": ["warn", { commentPattern: "^no default$" }],
            eqeqeq: ["warn", "smart"],
            "no-caller": "warn",
            "no-cond-assign": ["warn", "except-parens"],
            "no-control-regex": "warn",
            "no-empty": "warn",
            "no-eval": "warn",
            "no-extend-native": "warn",
            "no-extra-bind": "warn",
            "no-extra-label": "warn",
            "no-fallthrough": "warn",
            "no-global-assign": "warn", // successor of no-native-reassign
            "no-implied-eval": "warn",
            "no-iterator": "warn",
            "no-label-var": "warn",
            "no-labels": ["warn", { allowLoop: true, allowSwitch: false }],
            "no-lone-blocks": "warn",
            "no-multi-str": "warn",
            "no-new-func": "warn",
            "no-new-native-nonconstructor": "warn", // successor of no-new-symbol
            "no-new-wrappers": "warn",
            "no-object-constructor": "warn", // successor of no-new-object
            "no-octal-escape": "warn",
            "no-param-reassign": ["error", { props: false }],
            "no-redeclare": "off", // superseded by TypeScript checks
            "no-restricted-properties": [
                "error",
                { object: "require", property: "ensure", message: "Please use import() instead." },
                { object: "System", property: "import", message: "Please use import() instead." }
            ],
            "no-restricted-syntax": [
                "error",
                { selector: "LabeledStatement", message: "Labels are a form of GOTO; avoid them." },
                { selector: "WithStatement", message: "`with` is disallowed in strict mode." }
            ],
            "no-script-url": "warn",
            "no-self-compare": "warn",
            "no-sequences": "warn",
            "no-template-curly-in-string": "warn",
            "no-throw-literal": "warn",
            "no-useless-computed-key": "warn",
            "no-useless-concat": "warn",
            "no-useless-escape": "warn",
            "no-useless-rename": "warn",
            strict: ["warn", "never"],
            "unicode-bom": ["warn", "never"],

            // airbnb-base rules that catch bugs, or that the code already
            // honours through eslint-disable comments.
            "block-scoped-var": "error",
            "no-alert": "warn",
            "no-await-in-loop": "error",
            "no-console": "warn",
            "no-new": "error",
            "no-proto": "error",
            "no-useless-catch": "error",
            "no-var": "error",
            // Allows the documented late binding of dspCompileController in index.ts.
            "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
            "prefer-promise-reject-errors": "error",
            "symbol-description": "error",

            // Formatting rules set explicitly in .eslintrc.json.
            "@stylistic/arrow-parens": ["warn", "as-needed", { requireForBlockBody: true }],
            "@stylistic/comma-dangle": ["error", "never"],
            "@stylistic/dot-location": ["warn", "property"],
            "@stylistic/indent": ["error", 4, { SwitchCase: 1 }],
            "@stylistic/jsx-quotes": ["error", "prefer-double"],
            "@stylistic/new-parens": "warn",
            "@stylistic/no-trailing-spaces": "warn",
            "@stylistic/no-whitespace-before-property": "warn",
            "@stylistic/object-curly-newline": ["error", {
                ObjectExpression: { multiline: true, consistent: true },
                ObjectPattern: { multiline: true, consistent: true },
                ImportDeclaration: { multiline: true, consistent: true },
                ExportDeclaration: { multiline: true, consistent: true }
            }],
            "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
            "@stylistic/rest-spread-spacing": ["warn", "never"],
            "@stylistic/semi": "warn",
            "@stylistic/spaced-comment": ["error", "always", { markers: ["/"] }],

            // Imports.
            "import/extensions": ["error", "never"],
            "import/first": "error",
            "import/newline-after-import": "warn",
            "import/no-absolute-path": "error",
            "import/no-amd": "error",
            "import/no-duplicates": "error",
            "import/no-self-import": "error",
            "import/no-webpack-loader-syntax": "error",

            // TypeScript.
            "@typescript-eslint/consistent-type-assertions": "warn",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": "error",
            "@typescript-eslint/no-unused-expressions": ["error", {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true
            }],
            "@typescript-eslint/no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
            "@typescript-eslint/no-use-before-define": ["warn", {
                functions: false,
                classes: false,
                variables: false,
                typedefs: false
            }],
            "@typescript-eslint/no-useless-constructor": "warn"
        }
    },
    {
        // CommonJS helpers loaded by webpack/Node.
        files: ["src/version.js", "src/listEx.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: globals.node
        },
        rules: {
            "@typescript-eslint/no-require-imports": "off"
        }
    }
);
