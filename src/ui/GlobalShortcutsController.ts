type ShortcutAction = {
    docs: () => void;
    run: () => void;
};

/**
 * Binds document-level shortcuts that dispatch to existing UI actions.
 *
 * The controller does not know how documentation or DSP compilation works; it
 * only preserves the legacy Ctrl+D and Ctrl+R keyboard routing.
 */
export class GlobalShortcutsController {
    private readonly actions: ShortcutAction;

    constructor(actions: ShortcutAction) {
        this.actions = actions;
    }

    bind() {
        $(document).on("keydown", (e) => {
            if (!e.ctrlKey) return;
            if (e.key === "d") {
                e.preventDefault();
                e.stopPropagation();
                this.actions.docs();
                return;
            }
            if (e.key === "r") {
                e.preventDefault();
                e.stopPropagation();
                this.actions.run();
            }
        });
    }
}
