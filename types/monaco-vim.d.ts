import * as monaco from "monaco-editor";

declare module "monaco-vim" {
    interface VimMode {
        attach(): void;
        on(eventName: string, callback: Function): void;
        setStatusBar(statusBar: StatusBar): void;
        dispose(): void;
    }

    interface StatusBar {
        setMode(mode: any): void;
        setKeyBuffer(keyBuffer: string): void;
        toggleVisibility(visible: boolean): void;
        closeInput(): void;
        clear(): void;
    }

    interface StatusBarConstructor {
        new(statusBarNode: HTMLElement, editor: monaco.editor.IStandaloneCodeEditor, sanitizer?: Sanitizer): StatusBar;
    }

    interface Sanitizer {
        sanitize(htmlString: string): string;
    }

    export function initVimMode(
        editor: monaco.editor.IStandaloneCodeEditor,
        statusbarNode?: HTMLElement | null,
        StatusBarClass?: StatusBarConstructor,
        sanitizer?: Sanitizer | null
    ): VimMode;
}
