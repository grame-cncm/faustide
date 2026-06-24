type LayoutTarget = {
    layout: () => void;
};

type WaveSurferResizeTarget = {
    isReady: boolean;
    drawer: {
        containerWidth: number;
        container: { clientWidth: number };
    };
    drawBuffer: () => void;
};

/**
 * Owns drag resizing for the IDE panels.
 *
 * The controller is intentionally DOM-oriented: it keeps the legacy CSS class
 * contract (`resizable-left`, `resizable-right`, `resizable-top`,
 * `resizable-bottom`) and only calls injected layout hooks when dimensions
 * change.
 */
export class ResizablePanelsController {
    private readonly editor: LayoutTarget;
    private readonly getWavesurfer: () => WaveSurferResizeTarget | undefined;

    /**
     * @param editor relayout target invoked while dragging
     * @param getWavesurfer late-bound accessor for the WaveSurfer instance,
     *   which is created lazily when an audio input is first selected (so it is
     *   typically still undefined when this controller is constructed)
     */
    constructor(editor: LayoutTarget, getWavesurfer: () => WaveSurferResizeTarget | undefined) {
        this.editor = editor;
        this.getWavesurfer = getWavesurfer;
    }

    /**
     * Attaches drag handlers to every `.resizable` handle. While dragging it
     * resizes the parent panel along the directions encoded by the handle's
     * classes, re-lays out the editor, and rebuilds the WaveSurfer buffer when
     * the container width changes. Pointer events on the Faust UI iframe are
     * disabled for the duration of the drag.
     */
    bind() {
        $(".resizable").on("mousedown touchstart", (e: JQuery.TouchStartEvent | JQuery.MouseDownEvent) => {
            if (e.originalEvent instanceof MouseEvent) {
                e.preventDefault();
                e.stopPropagation();
            }
            $("#iframe-faust-ui").css("pointer-events", "none");
            const $div = $(e.currentTarget).parent();
            const x = e.pageX && typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
            const y = e.pageY && typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;
            const w = $div.width();
            const h = $div.height();
            const modes: string[] = [];
            if ($(e.currentTarget).hasClass("resizable-left")) modes.push("left");
            if ($(e.currentTarget).hasClass("resizable-right")) modes.push("right");
            if ($(e.currentTarget).hasClass("resizable-top")) modes.push("top");
            if ($(e.currentTarget).hasClass("resizable-bottom")) modes.push("bottom");
            const handleMouseMove = (e: JQuery.TouchMoveEvent | JQuery.MouseMoveEvent) => {
                if (e.originalEvent instanceof MouseEvent) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                const dX = (e.pageX && typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX) - x;
                const dY = (e.pageY && typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY) - y;
                if (modes.indexOf("left") !== -1) $div.width(w - dX);
                if (modes.indexOf("right") !== -1) $div.width(w + dX);
                if (modes.indexOf("top") !== -1) $div.height(h - dY);
                if (modes.indexOf("bottom") !== -1) $div.height(h + dY);
                this.editor.layout();
                const wavesurfer = this.getWavesurfer();
                if (wavesurfer?.isReady && wavesurfer.drawer.containerWidth !== wavesurfer.drawer.container.clientWidth) {
                    wavesurfer.drawer.containerWidth = wavesurfer.drawer.container.clientWidth;
                    wavesurfer.drawBuffer();
                }
            };
            const handleMouseUp = (e: JQuery.TouchEndEvent | JQuery.MouseUpEvent) => {
                if (e.originalEvent instanceof MouseEvent) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                $("#iframe-faust-ui").css("pointer-events", "");
                $(document).off("mousemove touchmove", handleMouseMove);
                $(document).off("mouseup", handleMouseUp);
            };
            $(document).on("mousemove touchmove", handleMouseMove);
            $(document).on("mouseup touchend", handleMouseUp);
        });
    }
}
