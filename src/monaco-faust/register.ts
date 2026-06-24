import * as monaco from "monaco-editor";
import { LibFaust } from "@grame/faustwasm";

/**
 * Registers the Faust language with a Monaco instance: language id, bracket/
 * comment configuration, dark theme, and the hover/tokens/completion providers
 * (which need the Faust compiler to resolve library documentation).
 *
 * `FaustLang` is imported dynamically to keep its monaco-editor dependency out
 * of the static bootstrap graph.
 *
 * @param monacoEditor the loaded monaco-editor module
 * @param libFaust Faust compiler used to build documentation-backed providers
 * @returns the created providers and the loaded FaustLang module
 */
export const faustLangRegister = async (monacoEditor: typeof monaco, libFaust: LibFaust) => {
    const faustLang = await import("./FaustLang");
    monacoEditor.languages.register(faustLang.language);
    monacoEditor.languages.setLanguageConfiguration("faust", faustLang.config);
    monacoEditor.editor.defineTheme("vs-dark", faustLang.theme);
    const providers = await faustLang.getProviders(libFaust);
    monacoEditor.languages.registerHoverProvider("faust", providers.hoverProvider);
    monacoEditor.languages.setMonarchTokensProvider("faust", providers.tokensProvider);
    monacoEditor.languages.registerCompletionItemProvider("faust", providers.completionItemProvider);
    return { providers, faustLang };
};
