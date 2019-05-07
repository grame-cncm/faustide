enum TScopeType {
    Data = 0,
    Interleaved = 1,
    Oscilloscope = 2,
    Spectroscope = 3
}
type TOptions = {
    container: HTMLDivElement;
    type?: TScopeType;
};

export class StaticScope {
    raf: number;
    ctx: CanvasRenderingContext2D;
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    btnSwitch: HTMLButtonElement;
    iSwitch: HTMLElement;
    divData: HTMLDivElement;
    divDefault: HTMLDivElement;
    private _type = TScopeType.Interleaved;
    private _zoom = 1;
    private _zoomOffset = 0;
    plotted: Float32Array[];

    handleMouseMove = (e: MouseEvent) => {
        if (!this.plotted || !this.plotted.length || !this.plotted[0].length) return;
        if (this.type === TScopeType.Data) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
        const cursor = { x: e.offsetX, y: e.offsetY };
        if (this.type === TScopeType.Interleaved) StaticScope.drawInterleaved(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset, cursor);
        if (this.type === TScopeType.Oscilloscope) StaticScope.drawOscilloscope(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset, cursor);
    }
    handleMouseLeave = () => {
        if (!this.plotted || !this.plotted.length || !this.plotted[0].length) return;
        if (this.type === TScopeType.Data) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
        if (this.type === TScopeType.Interleaved) StaticScope.drawInterleaved(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset);
        if (this.type === TScopeType.Oscilloscope) StaticScope.drawOscilloscope(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset);
    }
    static drawInterleaved(ctx: CanvasRenderingContext2D, w: number, h: number, d: Float32Array[], zoom: number, zoomOffset: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        this.drawGrid(ctx, w, h, d.length);
        if (!d || !d.length || !d[0].length) return;
        const l = d[0].length;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const $0 = Math.round(l * zoomOffset);
        const $1 = Math.round(l / zoom + l * zoomOffset);
        const hCh = h / d.length;
        for (let i = 0; i < d.length; i++) {
            for (let j = $0; j < $1; j++) {
                const x = w * (j - $0) / ($1 - $0 - 1);
                const y = hCh * (i + 1) - (d[i][j] * 0.5 + 0.5) * hCh;
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        if (cursor) {
            const samps: number[] = [];
            const j = Math.round($0 + cursor.x / w * ($1 - $0 - 1));
            for (let i = 0; i < d.length; i++) {
                samps.push(d[i][j]);
            }
            this.drawStats(ctx, w, h, j, samps, zoom, $0, $1 - 1);
        }
    }
    static drawOscilloscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: Float32Array[], zoom: number, zoomOffset: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        this.drawGrid(ctx, w, h, 1);
        if (!d || !d.length || !d[0].length) return;
        const l = d[0].length;
        ctx.lineWidth = 2;
        const $0 = Math.round(l * zoomOffset);
        const $1 = Math.round(l / zoom + l * zoomOffset);
        for (let i = 0; i < d.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${i * 60}, 100%, 75%)`;
            for (let j = $0; j < $1; j++) {
                const x = w * (j - $0) / ($1 - $0 - 1);
                const y = h - (d[i][j] * 0.5 + 0.5) * h;
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        if (cursor) {
            const samps: number[] = [];
            const j = Math.round($0 + cursor.x / w * ($1 - $0 - 1));
            for (let i = 0; i < d.length; i++) {
                samps.push(d[i][j]);
            }
            this.drawStats(ctx, w, h, j, samps, zoom, $0, $1 - 1);
        }
    }
    static drawSpectroscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: Float32Array[], zoom: number, zoomOffset: number) {
        this.drawBackground(ctx, w, h);
        this.drawGrid(ctx, w, h, d.length);
        if (!d || !d.length || !d[0].length) return;
        const l = d[0].length;
        const $0 = Math.round(l * zoomOffset);
        const $1 = Math.round(l / zoom + l * zoomOffset);
        ctx.fillStyle = "#FFFFFF";
        const hCh = h / d.length;
        for (let i = 0; i < d.length; i++) {
            for (let j = $0; j < $1; j++) {
                const x = w * (j - $0) / ($1 - $0);
                const y = ((d[i][j] + 10) / 100 + 1) * hCh;
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
    static drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, channels: number) {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#404040";
        for (let j = 0.25; j < 1; j += 0.25) {
            ctx.moveTo(w * j, 0);
            ctx.lineTo(w * j, h);
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
    static fillDivData = (container: HTMLDivElement, d: Float32Array[]) => {
        container.innerHTML = "";
        for (let i = 0; i < d.length; i++) {
            const ch = d[i];
            const divCh = document.createElement("div");
            divCh.classList.add("plot-channel");
            for (let j = 0; j < ch.length; j++) {
                const divCell = document.createElement("div");
                divCell.classList.add("plot-cell");
                const spanIndex = document.createElement("span");
                spanIndex.innerText = j.toString();
                const spanSamp = document.createElement("span");
                spanSamp.innerText = ch[j].toFixed(3);
                divCell.appendChild(spanIndex);
                divCell.appendChild(spanSamp);
                divCh.appendChild(divCell);
            }
            container.appendChild(divCh);
        }
    }
    static getIconClassName(typeIn: TScopeType) {
        const prefix = "fas fa-sm ";
        if (typeIn === TScopeType.Data) return prefix + "fa-table";
        if (typeIn === TScopeType.Interleaved) return prefix + "fa-water";
        if (typeIn === TScopeType.Oscilloscope) return prefix + "fa-wave-square";
        if (typeIn === TScopeType.Spectroscope) return prefix + "fa-chart-bar";
        return prefix;
    }

    constructor(options: TOptions) {
        Object.assign(this, options);
        this.getChildren();
        this.bind();
        this.type = TScopeType.Interleaved;
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
            btn.setAttribute("title", "Scope / Data");
            ctrl.appendChild(btn);
            this.btnSwitch = btn;
        }
        for (let i = 0; i < this.btnSwitch.children.length; i++) {
            const e = this.btnSwitch.children[i];
            if (e.classList.contains("fas")) this.iSwitch = e as HTMLElement;
        }
        if (!this.iSwitch) {
            const i = document.createElement("i");
            i.className = "fas fa-sm fa-wave-square";
            this.btnSwitch.appendChild(i);
            this.iSwitch = i;
        }
    }
    bind() {
        this.btnSwitch.addEventListener("click", () => {
            this.type = (this.type + 1) % 3;
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
                this.zoomOffset = center - center / this.zoom;
            }
            if (e.deltaX !== 0) this.zoomOffset += (e.deltaX > 0 ? 1 : -1) * 0.1;
            this.handleMouseMove(e);
        });
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
    }
    draw = (plotted: Float32Array[]) => {
        this.plotted = plotted;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
        if (!this.plotted.length || !this.plotted[0].length) {
            this.divDefault.style.display = "block";
            return;
        }
        this.divDefault.style.display = "none";
        if (this.type === TScopeType.Data) StaticScope.fillDivData(this.divData, this.plotted);
        if (this.type === TScopeType.Interleaved) StaticScope.drawInterleaved(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset);
        if (this.type === TScopeType.Oscilloscope) StaticScope.drawOscilloscope(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset);
    }
    get zoom() {
        return this._zoom;
    }
    set zoom(zoomIn) {
        this._zoom = Math.min(16, Math.max(1, zoomIn));
        this.zoomOffset = this.zoomOffset;
    }
    get zoomOffset() {
        return this._zoomOffset;
    }
    set zoomOffset(zoomOffsetIn) {
        this._zoomOffset = Math.max(0, Math.min(1 - 1 / this._zoom, zoomOffsetIn));
    }
    get type() {
        return this._type;
    }
    set type(typeIn) {
        this.iSwitch.className = StaticScope.getIconClassName(typeIn);
        if (typeIn === TScopeType.Data) {
            this.divData.style.visibility = "visible";
            this.canvas.style.visibility = "hidden";
            if (this.plotted && this.plotted.length && this.plotted[0].length) StaticScope.fillDivData(this.divData, this.plotted);
        } else {
            this.divData.style.visibility = "hidden";
            this.canvas.style.visibility = "visible";
            if (this.plotted && this.plotted.length && this.plotted[0].length) {
                const w = this.container.clientWidth;
                const h = this.container.clientHeight;
                this.canvas.width = w;
                this.canvas.height = h;
                if (typeIn === TScopeType.Interleaved) StaticScope.drawInterleaved(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset);
                else if (typeIn === TScopeType.Oscilloscope) StaticScope.drawOscilloscope(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset);
                else if (typeIn === TScopeType.Spectroscope) StaticScope.drawSpectroscope(this.ctx, w, h, this.plotted, this.zoom, this.zoomOffset);
            }
        }
        this._type = typeIn;
    }
}
