import type { LibFaust } from "@grame/faustwasm";
import type { VimMode } from "monaco-vim";
import { docSections, faustDocURL, faustSyntaxURL } from "../documentation";
import { faustLangRegister } from "../monaco-faust/register";
import { safeStorage } from "../utils";

/**
 * Creates and wires the Monaco Faust editor.
 *
 * The factory owns editor-specific dynamic imports, Faust language
 * registration, the optional Vim mode action, documentation lookup shortcuts,
 * and resize relayout. Keeping this outside the composition root avoids
 * mixing Monaco setup details with runtime service construction.
 */
export const initEditor = async (libFaust: LibFaust) => {
    const code = `import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const polycode = `import("stdfaust.lib");
process = ba.pulsen(1, ba.hz2midikey(freq) * 1000) : pm.marimba(freq, 0, 7000, 0.5, 0.8) * gate * gain with {
    freq = hslider("freq", 440, 40, 8000, 1);
    gain = hslider("gain", 0.5, 0, 1, 0.01);
    gate = button("gate");
};
effect = dm.freeverb_demo;`;
    const monaco = await import("monaco-editor");
    const { initVimMode } = await import("monaco-vim");
    const { faustLang, providers } = await faustLangRegister(monaco, libFaust);
    let saveCode = false;
    try {
        saveCode = JSON.parse(safeStorage.getItem("faust_editor_params")).saveCode;
    } catch { } // eslint-disable-line no-empty
    const editor = monaco.editor.create($("#editor")[0], {
        value: saveCode ? (safeStorage.getItem("faust_editor_code") || code) : code,
        language: "faust",
        theme: "vs-dark",
        dragAndDrop: true,
        mouseWheelZoom: true,
        wordWrap: "on"
    });
    let vimMode: VimMode = null;
    editor.addAction({
        id: "monaco-vim",
        label: "Toggle Vim Mode",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyV],
        run: () => {
            if (vimMode) {
                vimMode.dispose();
                vimMode = null;
            } else {
                vimMode = initVimMode(editor, null);
            }
        }
    });
    editor.onKeyDown((e) => {
        if (e.ctrlKey && e.browserEvent.key === "d") {
            e.stopPropagation();
            e.preventDefault();
            showDoc();
        }
    });

    let docWindow: Window | null = null;
    let syntaxWindow: Window | null = null;

    /**
     * Opens or refreshes Faust documentation windows for the symbol under the
     * editor cursor.
     */
    const showDoc = () => {
        const matched = faustLang.matchDocKey(providers.docs, editor.getModel(), editor.getPosition());
        let docUrl = faustDocURL;
        let syntaxUrl = faustSyntaxURL;

        if (matched) {
            const prefix = matched.nameArray.slice();
            prefix.pop();
            const doc = matched.doc;
            docUrl = `${faustDocURL}/${docSections[prefix.toString().slice(0, 2) as keyof typeof docSections]}/#${prefix.join(".")}${doc.name.replace(/[[\]|]/g, "").toLowerCase()}`;
        }

        if (!syntaxWindow || syntaxWindow.closed) {
            syntaxWindow = window.open(syntaxUrl, "_blank");
        } else {
            syntaxWindow.location.href = syntaxUrl;
            syntaxWindow.focus();
        }

        if (!docWindow || docWindow.closed) {
            docWindow = window.open(docUrl, "_blank");
        } else {
            docWindow.location.href = docUrl;
            docWindow.focus();
        }
    };

    $("#btn-docs").off("click").on("click", showDoc);
    $(window).on("resize", () => editor.layout());
    return { editor, monaco };
};
