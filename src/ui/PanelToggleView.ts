type LayoutTarget = {
    layout: () => void;
};

/**
 * Handles left/right panel visibility buttons and responsive collapse state.
 *
 * This view keeps the existing Bootstrap class toggles centralized so the
 * composition root only decides when to bind panel behavior.
 */
export class PanelToggleView {
    private readonly editor: LayoutTarget;

    constructor(editor: LayoutTarget) {
        this.editor = editor;
    }

    /**
     * Wires the left/right panel toggle buttons and a window-resize handler
     * that auto-collapses both panels below 900px. Re-lays out the editor after
     * each manual toggle.
     */
    bind() {
        $(".btn-show-left").on("click", (e) => {
            if ($(e.currentTarget).hasClass("active")) {
                $("#left").hide();
                $(".btn-show-left").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
            } else {
                $("#left").show();
                $(".btn-show-left").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
            }
            this.editor.layout();
        });
        $(".btn-show-right").on("click", (e) => {
            if ($(e.currentTarget).hasClass("active")) {
                $("#right").hide();
                $(".btn-show-right").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
            } else {
                $("#right").show();
                $(".btn-show-right").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
            }
            this.editor.layout();
        });
        $(window).on("resize", () => {
            if (window.innerWidth <= 900) {
                $("#right").add("#left").hide();
                $(".btn-show-right").add(".btn-show-left").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
            } else {
                $("#right").add("#left").show();
                $(".btn-show-right").add(".btn-show-left").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
            }
        }).resize();
    }
}
