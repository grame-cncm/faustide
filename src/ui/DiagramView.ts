type DiagramSource = {
    readGeneratedSvg: (fileName: string) => string;
};

/**
 * Handles interactions inside the generated SVG diagram pane.
 *
 * Diagram generation remains in `DiagramService`; this view only owns DOM
 * replacement when following Faust SVG links, drag-to-pan, and Ctrl+wheel zoom.
 */
export class DiagramView {
    private readonly diagramSource: DiagramSource;
    private svgDragged = false;

    constructor(diagramSource: DiagramSource) {
        this.diagramSource = diagramSource;
    }

    bind() {
        this.bindSvgLinks();
        this.bindDragPan();
        this.bindZoom();
    }

    private bindSvgLinks() {
        $<SVGAElement>("#diagram-svg").on("click", "a", (e) => {
            e.preventDefault();
            if (this.svgDragged) return;
            const fileName = e.currentTarget.href?.baseVal || e.currentTarget.getAttribute("href");
            const strSvg = this.diagramSource.readGeneratedSvg(fileName);
            const svg = $<SVGSVGElement>(strSvg).filter("svg")[0];
            const width = Math.min($("#diagram").width(), $("#diagram").height() / this.getSvgHeight(svg) * this.getSvgWidth(svg));
            $("#diagram-svg").empty().append(svg).children("svg").width(width);
        });
    }

    private bindDragPan() {
        $("#diagram-svg").on("mousedown", "svg", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.svgDragged = false;
            const $div = $(e.currentTarget).parent();
            const x = e.pageX;
            const y = e.pageY;
            const sL = $div.scrollLeft();
            const sT = $div.scrollTop();
            const handleMouseMove = (e: JQuery.MouseMoveEvent) => {
                if (!e.originalEvent.movementX && !e.originalEvent.movementY) return;
                this.svgDragged = true;
                const dX = e.pageX - x;
                const dY = e.pageY - y;
                $div.scrollLeft(sL - dX);
                $div.scrollTop(sT - dY);
                e.preventDefault();
                e.stopPropagation();
            };
            const handleMouseUp = (e: JQuery.MouseUpEvent) => {
                $(document).off("mousemove", handleMouseMove);
                $(document).off("mouseup", handleMouseUp);
                if (!this.svgDragged) return;
                e.preventDefault();
                e.stopPropagation();
            };
            $(document).on("mousemove", handleMouseMove);
            $(document).on("mouseup", handleMouseUp);
        });
    }

    private bindZoom() {
        $("#diagram").on("wheel", (e) => {
            if (!e.ctrlKey) return;
            const $svg = $(e.currentTarget).find("svg");
            if (!$svg.length) return;
            e.preventDefault();
            e.stopPropagation();
            const d = (e.originalEvent as WheelEvent).deltaY > 0 ? 1 : -1;
            const w = $svg.width();
            $svg.width(w * (1 - d * 0.25));
        });
    }

    private getSvgWidth(svg: SVGSVGElement) {
        return svg.width?.baseVal?.value || +svg.getAttribute("width") || 0;
    }

    private getSvgHeight(svg: SVGSVGElement) {
        return svg.height?.baseVal?.value || +svg.getAttribute("height") || 1;
    }
}
