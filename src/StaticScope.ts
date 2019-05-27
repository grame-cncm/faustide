enum EScopeMode {
    Data = 0,
    Interleaved = 1,
    Oscilloscope = 2,
    Spectroscope = 3,
    Spectrogram = 4
}
type TOptions = {
    container: HTMLDivElement;
    type?: EScopeMode;
};
export type TDrawOptions = {
    drawMode: "offline" | "continuous" | "onevent" | "manual";
    $: number; // start sample index
    $buffer?: number; // start buffer index
    t?: Float32Array[]; // Time domain data
    f?: Float32Array[]; // Freq domain data
    e?: { type: string; data: any }[][]; // events of each buffer
    bufferSize: number;
}

export class StaticScope {
    raf: number;
    ctx: CanvasRenderingContext2D;
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    btnSwitch: HTMLButtonElement;
    iSwitch: HTMLElement;
    spanSwitch: HTMLSpanElement;
    divData: HTMLDivElement;
    divDefault: HTMLDivElement;
    private _mode = EScopeMode.Oscilloscope;
    private _zoom = { oscilloscope: 1, spectroscope: 1, spectrogram: 1 };
    private _zoomOffset = { oscilloscope: 0, spectroscope: 0, spectrogram: 0 };
    data: TDrawOptions = { drawMode: "manual", t: undefined, $: 0, $buffer: 0, bufferSize: 128 };
    cursor: { x: number; y: number };

    handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
        if (this.mode === EScopeMode.Data) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
        const rect = this.canvas.getBoundingClientRect();
        let x = e instanceof MouseEvent ? e.offsetX : e.touches[0].pageX - rect.left;
        x = Math.max(0, Math.min(w, x));
        let y = e instanceof MouseEvent ? e.offsetY : e.touches[0].pageY - rect.top;
        y = Math.max(0, Math.min(h, y));
        this.cursor = { x, y };
        if (this.data.drawMode === "continuous") return;
        this.draw(this.data);
    }
    handleMouseLeave = () => {
        if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
        if (this.mode === EScopeMode.Data) return;
        this.cursor = undefined;
        this.draw(this.data);
    }
    static wrap(i: number, $: number, l: number) {
        return (i + $) % l;
    }
    static drawInterleaved(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, t, e } = d;
        if (!t || !t.length || !t[0].length) return;
        const l = t[0].length;
        let yFactor = 1;
        t.forEach(ch => ch.forEach((e) => {
            if (Math.abs(e) > yFactor) yFactor = Math.abs(e);
        }));
        ctx.lineWidth = 2;
        const $0 = Math.round(l * zoomOffset);
        const $1 = Math.round(l / zoom + l * zoomOffset);
        const hCh = h / t.length;
        this.drawGrid(ctx, w, h, $0, $1, d, EScopeMode.Interleaved);
        for (let i = 0; i < t.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${i * 60}, 100%, 85%)`;
            for (let j = $0; j < $1; j += Math.max(1, Math.round(($1 - $0) / w))) {
                const $j = this.wrap(j, $, l);
                const x = w * (j - $0) / ($1 - $0 - 1);
                const y = hCh * (i + 1) - (t[i][$j] / yFactor * 0.5 + 0.5) * hCh;
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        if (cursor) {
            const samps: number[] = [];
            const j = Math.round($0 + cursor.x / w * ($1 - $0 - 1));
            const $j = this.wrap(j, $, l);
            for (let i = 0; i < t.length; i++) {
                samps.push(t[i][$j]);
            }
            this.drawStats(ctx, w, h, j, samps, zoom, $0, $1 - 1);
        }
    }
    static drawOscilloscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, t, e } = d;
        if (!t || !t.length || !t[0].length) return;
        const l = t[0].length;
        let yFactor = 1;
        t.forEach(ch => ch.forEach((e) => {
            if (Math.abs(e) > yFactor) yFactor = Math.abs(e);
        }));
        ctx.lineWidth = 2;
        const $0 = Math.round(l * zoomOffset);
        const $1 = Math.round(l / zoom + l * zoomOffset);
        this.drawGrid(ctx, w, h, $0, $1, d, EScopeMode.Oscilloscope);
        for (let i = 0; i < t.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = t.length === 1 ? "white" : `hsl(${i * 60}, 100%, 85%)`;
            for (let j = $0; j < $1; j += Math.max(1, Math.round(($1 - $0) / w))) {
                const $j = this.wrap(j, $, l);
                const x = w * (j - $0) / ($1 - $0 - 1);
                const y = h - (t[i][$j] / yFactor * 0.5 + 0.5) * h;
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        if (cursor) {
            const samps: number[] = [];
            const j = Math.round($0 + cursor.x / w * ($1 - $0 - 1));
            const $j = this.wrap(j, $, l);
            for (let i = 0; i < t.length; i++) {
                samps.push(t[i][$j]);
            }
            this.drawStats(ctx, w, h, j, samps, zoom, $0, $1 - 1);
        }
    }
    static drawSpectroscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, f, e } = d;
        if (!f || !f.length || !f[0].length) return;
        const l = f[0].length;
        const $0 = Math.round(l * zoomOffset);
        const $1 = Math.round(l / zoom + l * zoomOffset);
        ctx.fillStyle = "#FFFFFF";
        const hCh = h / f.length;
        this.drawGrid(ctx, w, h, $0, $1, d, EScopeMode.Spectroscope);
        for (let i = 0; i < f.length; i++) {
            for (let j = $0; j < $1; j++) {
                const $j = this.wrap(j, $, l);
                const x = w * (j - $0) / ($1 - $0);
                const y = ((f[i][$j] + 10) / 100 + 1) * hCh;
                ctx.fillRect(x, hCh * (i + 1) - y, w / ($1 - $0), y);
            }
        }
    }
    static drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.save();
        ctx.fillStyle = "#181818";
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }
    static drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, $0: number, $1: number, d: TDrawOptions, mode: EScopeMode) {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#404040";
        const bufferSize = d.bufferSize;
        const channels = mode === EScopeMode.Interleaved ? d.t.length : 1;
        for (let j = Math.ceil($0 / bufferSize); j < Math.ceil($1 / bufferSize); j++) {
            const $buffer = (d.$buffer || 0) + j;
            const x = (j * bufferSize - $0) / ($1 - $0 - 1) * w;
            if (d.e && d.e[$buffer] && d.e[$buffer].length) {
                ctx.stroke();
                ctx.strokeStyle = "#ff8800";
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
                ctx.strokeStyle = "#404040";
                ctx.beginPath();
            } else {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            }
        }
        for (let i = 0; i < channels; i++) {
            for (let j = 0.25; j < 1; j += 0.25) {
                ctx.moveTo(0, h * (i + j) / channels);
                ctx.lineTo(w, h * (i + j) / channels);
            }
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.setLineDash([4, 2]);
        for (let i = 1; i < channels; i++) {
            ctx.moveTo(0, h * i / channels);
            ctx.lineTo(w, h * i / channels);
        }
        ctx.stroke();
        ctx.restore();
    }
    static drawStats(ctx: CanvasRenderingContext2D, w: number, h: number, i: number, d: number[], zoom?: number, zoomMin?: number, zoomMax?: number) {
        ctx.save();
        const x = (i - zoomMin) / (zoomMax - zoomMin) * w;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#b0b0b0";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(w - 50, 0, 50, d.length * 15 + 20);
        if (typeof zoomMin === "number") ctx.fillRect(0, h - 16, 40, 16);
        if (typeof zoomMax === "number") ctx.fillRect(w - 40, h - 16, 40, 16);
        if (typeof zoom === "number") ctx.fillRect(w / 2 - 20, h - 16, 40, 16);
        ctx.fillStyle = "#DDDD99";
        ctx.font = "bold 12px Consolas, monospace";
        if (typeof zoom === "number") {
            ctx.textAlign = "center";
            ctx.fillText(zoom.toFixed(1) + "x", w / 2, h - 2, 40);
        }
        if (typeof zoomMin === "number") {
            ctx.textAlign = "left";
            ctx.fillText(zoomMin.toFixed(0), 2, h - 2, 40);
        }
        ctx.textAlign = "right";
        if (typeof zoomMax === "number") ctx.fillText(zoomMax.toFixed(0), w - 2, h - 2, 40);
        ctx.fillText("@" + i.toString(), w - 2, 15, 50);
        for (let i = 0; i < d.length; i++) {
            ctx.fillText(d[i].toFixed(3), w - 2, 30 + i * 15, 50);
        }
        ctx.restore();
    }
    static fillDivData(container: HTMLDivElement, d: TDrawOptions) {
        container.innerHTML = "";
        if (!d) return;
        const { $, t, e } = d;
        if (!t || !t.length || !t[0].length) return;
        const l = t[0].length;
        for (let i = 0; i < t.length; i++) {
            const ch = t[i];
            const divCh = document.createElement("div");
            divCh.classList.add("plot-channel");
            divCh.style.backgroundColor = t.length === 1 ? "#181818" : `hsl(${i * 60}, 100%, 10%)`;
            for (let j = 0; j < Math.min(ch.length, 2048); j++) {
                const $j = this.wrap(j, $, l);
                const divCell = document.createElement("div");
                divCell.classList.add("plot-cell");
                const $buffer = (d.$buffer || 0) + Math.floor(j / d.bufferSize);
                if (e && e[$buffer] && e[$buffer].length && j % d.bufferSize === 0) divCell.classList.add("highlight");
                const spanIndex = document.createElement("span");
                spanIndex.innerText = j.toString();
                const spanSamp = document.createElement("span");
                spanSamp.innerText = ch[$j].toFixed(3);
                divCell.appendChild(spanIndex);
                divCell.appendChild(spanSamp);
                divCh.appendChild(divCell);
            }
            if (ch.length > 2048) {
                const divCell = document.createElement("div");
                divCell.classList.add("plot-cell");
                const spanIndex = document.createElement("span");
                spanIndex.innerText = "...";
                const spanSamp = document.createElement("span");
                spanSamp.innerText = "...";
                divCell.appendChild(spanIndex);
                divCell.appendChild(spanSamp);
                divCh.appendChild(divCell);
            }
            container.appendChild(divCh);
        }
    }
    static getIconClassName(typeIn: EScopeMode) {
        const prefix = "fas fa-sm ";
        if (typeIn === EScopeMode.Data) return prefix + "fa-table";
        if (typeIn === EScopeMode.Interleaved) return prefix + "fa-water";
        if (typeIn === EScopeMode.Oscilloscope) return prefix + "fa-wave-square";
        if (typeIn === EScopeMode.Spectroscope) return prefix + "fa-chart-bar";
        return prefix;
    }
    static getModeName(typeIn: EScopeMode) {
        if (typeIn === EScopeMode.Data) return "Data";
        if (typeIn === EScopeMode.Interleaved) return "Interleaved";
        if (typeIn === EScopeMode.Oscilloscope) return "Oscilloscope";
        if (typeIn === EScopeMode.Spectroscope) return "Spectroscope";
        if (typeIn === EScopeMode.Spectrogram) return "Spectrogram";
        return "";
    }

    constructor(options: TOptions) {
        Object.assign(this, options);
        this.getChildren();
        this.bind();
        this.mode = EScopeMode.Oscilloscope;
    }
    getChildren() {
        let ctrl: HTMLDivElement;
        for (let i = 0; i < this.container.children.length; i++) {
            const e = this.container.children[i];
            if (e.classList.contains("plot-ui-controller")) ctrl = e as HTMLDivElement;
            if (e.classList.contains("plot-scope")) this.canvas = e as HTMLCanvasElement;
            if (e.classList.contains("plot-data")) this.divData = e as HTMLDivElement;
            if (e.classList.contains("plot-default")) this.divDefault = e as HTMLDivElement;
        }
        if (!ctrl) {
            ctrl = document.createElement("div");
            ctrl.classList.add("plot-ui-controller");
            this.container.appendChild(ctrl);
        }
        if (!this.canvas) {
            const canvas = document.createElement("canvas");
            canvas.classList.add("plot-scope");
            this.container.appendChild(canvas);
            this.canvas = canvas;
        }
        if (!this.divData) {
            const divData = document.createElement("div");
            divData.classList.add("plot-data");
            this.container.appendChild(divData);
            this.divData = divData;
        }
        if (!this.divDefault) {
            const divDefault = document.createElement("div");
            divDefault.classList.add("plot-data", "alert", "alert-info");
            divDefault.setAttribute("role", "alert");
            divDefault.innerHTML = "<h5>No Data</h5>";
            this.container.appendChild(divDefault);
            this.divDefault = divDefault;
        }
        this.ctx = this.canvas.getContext("2d");
        for (let i = 0; i < ctrl.children.length; i++) {
            const e = ctrl.children[i];
            if (e.classList.contains("btn-plot-ui-switch")) this.btnSwitch = e as HTMLButtonElement;
        }
        if (!this.btnSwitch) {
            const btn = document.createElement("button");
            btn.className = "btn-plot-ui-switch btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Interleaved Scope / Stacked Scope / Data");
            ctrl.appendChild(btn);
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
            this.btnSwitch = btn;
        }
        for (let i = 0; i < this.btnSwitch.children.length; i++) {
            const e = this.btnSwitch.children[i];
            if (e.classList.contains("fas")) this.iSwitch = e as HTMLElement;
            if (e instanceof HTMLSpanElement) this.spanSwitch = e;
        }
        if (!this.iSwitch) {
            const i = document.createElement("i");
            i.className = "fas fa-sm fa-wave-square";
            this.btnSwitch.appendChild(i);
            this.iSwitch = i;
        }
        if (!this.spanSwitch) {
            const span = document.createElement("span");
            span.innerText = "Oscilloscope";
            this.btnSwitch.appendChild(span);
            this.spanSwitch = span;
        }
    }
    bind() {
        this.btnSwitch.addEventListener("click", () => {
            let newType = (this.mode + 1) % 3;
            if (newType === EScopeMode.Data && this.data.drawMode === "continuous") newType = (newType + 1) % 3;
            if (newType === EScopeMode.Interleaved && this.data.t && this.data.t.length === 1) newType = (newType + 1) % 3;
            this.mode = newType;
        });
        this.canvas.addEventListener("click", () => {
        });
        this.canvas.addEventListener("wheel", (e) => {
            const multiplier = 1.5 ** (e.deltaY > 0 ? -1 : 1);
            const zoom = this.zoom;
            const rect = this.canvas.getBoundingClientRect();
            const center = (e.pageX - rect.left) / rect.width / zoom + this.zoomOffset;
            if (e.deltaY !== 0) {
                this.zoom *= multiplier;
                if (zoom !== this.zoom) this.zoomOffset = center - center / this.zoom;
            }
            if (e.deltaX !== 0) this.zoomOffset += (e.deltaX > 0 ? 1 : -1) * 0.1;
            this.handleMouseMove(e);
        });
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("touchmove", this.handleMouseMove);
        this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
        this.canvas.addEventListener("touchend", this.handleMouseLeave);
    }
    draw = (data: TDrawOptions) => {
        requestAnimationFrame(() => {
            this.data = data;
            const w = this.container.clientWidth;
            const h = this.container.clientHeight;
            this.canvas.width = w;
            this.canvas.height = h;
            if (!this.data || !this.data.t.length || !this.data.t[0].length) {
                this.divDefault.style.display = "block";
                return;
            }
            this.divDefault.style.display = "none";
            if (this.mode === EScopeMode.Data) StaticScope.fillDivData(this.divData, this.data);
            if (this.mode === EScopeMode.Interleaved) StaticScope.drawInterleaved(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor);
            if (this.mode === EScopeMode.Oscilloscope) StaticScope.drawOscilloscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor);
        });
    }
    get zoomType() {
        return this.mode === EScopeMode.Spectroscope
            ? "spectroscope"
            : this.mode === EScopeMode.Spectrogram
                ? "spectrogram"
                : "oscilloscope";
    }
    get zoom() {
        return this._zoom[this.zoomType];
    }
    set zoom(zoomIn) {
        this._zoom[this.zoomType] = Math.min(16, Math.max(1, zoomIn));
        this.zoomOffset = this.zoomOffset;
    }
    get zoomOffset() {
        return this._zoomOffset[this.zoomType];
    }
    set zoomOffset(zoomOffsetIn) {
        this._zoomOffset[this.zoomType] = Math.max(0, Math.min(1 - 1 / this.zoom, zoomOffsetIn));
    }
    resetZoom() {
        this._zoom = { oscilloscope: 1, spectroscope: 1, spectrogram: 1 };
        this._zoomOffset = { oscilloscope: 0, spectroscope: 0, spectrogram: 0 };
    }
    get mode() {
        return this._mode;
    }
    set mode(modeIn) {
        this.iSwitch.className = StaticScope.getIconClassName(modeIn);
        this.spanSwitch.innerText = StaticScope.getModeName(modeIn);
        if (modeIn === EScopeMode.Data) {
            this.divData.style.display = "";
            this.canvas.style.display = "none";
            if (this.data && this.data.t && this.data.t.length && this.data.t[0].length) StaticScope.fillDivData(this.divData, this.data);
        } else {
            this.divData.style.display = "none";
            this.canvas.style.display = "";
            if (this.data && this.data.t && this.data.t.length && this.data.t[0].length) {
                const w = this.container.clientWidth;
                const h = this.container.clientHeight;
                this.canvas.width = w;
                this.canvas.height = h;
                if (modeIn === EScopeMode.Interleaved) StaticScope.drawInterleaved(this.ctx, w, h, this.data, this.zoom, this.zoomOffset);
                else if (modeIn === EScopeMode.Oscilloscope) StaticScope.drawOscilloscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset);
                else if (modeIn === EScopeMode.Spectroscope) StaticScope.drawSpectroscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset);
            }
        }
        this._mode = modeIn;
    }
}
