import * as monaco from "monaco-editor";
import { LibFaust } from "@grame/faustwasm";

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
