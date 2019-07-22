export interface MeterNode extends ScriptProcessorNode {
    levelHandler: (levels: number[]) => any;
    gain: number;
    averaging: number;
}
declare interface PointerDownEvent {
    x: number;
    y: number;
    originalEvent: MouseEvent | TouchEvent;
}

declare interface PointerDragEvent {
    prevValue: number;
    x: number;
    y: number;
    fromX: number;
    fromY: number;
    movementX: number;
    movementY: number;
    originalEvent: MouseEvent | TouchEvent;
}

declare interface PointerUpEvent {
    x: number;
    y: number;
    originalEvent: MouseEvent | TouchEvent;
}
/**
 * Returns a ScriptProcessor that measures the RMSs of each channel in a buffer.
 * The processor calls a `levelHandler` callback after calculating each buffer.
 *
 * @param {AudioContext} audioCtx
 * @param {number} [gain]
 * @param {number} [averaging]
 * @param {(gains: number[]) => any} [gainHandler]
 * @returns {MeterNode}
 */
export const createMeterNode = (audioCtx: AudioContext, gain?: number, averaging?: number, gainHandler?: (gains: number[]) => any): MeterNode => {
    const node = audioCtx.createScriptProcessor(512, 8, 8) as MeterNode;
    node.levelHandler = gainHandler;
    node.averaging = averaging || 0.95;
    node.gain = gain || 1;
    node.onaudioprocess = (e) => {
        const levels = [];
        const input = e.inputBuffer;
        const output = e.outputBuffer;
        for (let i = 0; i < input.numberOfChannels; i++) {
            const inputBuffer = input.getChannelData(i);
            const outputBuffer = output.getChannelData(i);
            const l = inputBuffer.length;
            let sum = 0;
            for (let j = 0; j < l; j++) {
                const samp = inputBuffer[j];
                outputBuffer[j] = samp;
                sum += samp * samp;
            }
            levels.push((sum / l) ** 0.5);
        }
        if (node.levelHandler) node.levelHandler(levels);
    };
    return node;
};
declare interface GainUIProps {
    value: number;
    levels: number[];
    min: number;
    max: number;
    step: number;
    barwidth?: number;
    barbgcolor?: string;
    coldcolor?: string;
    warmcolor?: string;
    hotcolor?: string;
    overloadcolor?: string;
    textcolor?: string;
    tribordercolor?: string;
    tricolor?: string;
}
/**
 * A Live-like meter UI with a gain controller.
 * Range from -70dB to +10dB, linear in dB unit.
 * Needs a MeterNode described above
 * and a WebAudio GainNode to get the gain controller functional.
 *
 * @export
 * @class GainUI
 */
export class GainUI {
    state: GainUIProps;
    meterNode: MeterNode;
    gainNode: GainNode;
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    channels = 2;
    interactionRect: number[] = [0, 0, 0, 0];
    $raf: number;
    $frame = 0;
    frameReduce = 3;
    paintLevels: number[] = [-Infinity];
    maxLevels: number[] = [-Infinity];
    maxTimer: number;
    constructor(container: HTMLDivElement, meterNode: MeterNode, gainNode: GainNode, state?: GainUIProps) {
        this.container = container;
        this.meterNode = meterNode;
        this.gainNode = gainNode;
        this.state = {
            min: -70,
            max: 10,
            value: 0,
            step: 0.01,
            levels: [-Infinity],
            barwidth: 8,
            barbgcolor: "rgba(18, 18, 18, 1)",
            coldcolor: "rgba(12, 248, 100, 1)",
            warmcolor: "rgba(195, 248, 100, 1)",
            hotcolor: "rgba(255, 193, 10, 1)",
            overloadcolor: "rgba(255, 10, 10, 1)",
            textcolor: "rgba(255, 255, 255, 1)",
            tribordercolor: "rgba(80, 80, 80, 1)",
            tricolor: "rgba(165, 165, 165, 1)",
            ...(state || {})
        };
        this.getChildren();
        this.bind();
        this.paint();
    }
    getChildren() {
        this.container.innerHTML = "";
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.container.appendChild(this.canvas);
    }
    bind() {
        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("touchstart", this.handleTouchStart, { passive: false });
        this.canvas.addEventListener("dblclick", this.handleDblClick);
        this.meterNode.levelHandler = this.levelHandler;
    }
    handleTouchStart = (e: TouchEvent) => {
        e.preventDefault();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        let prevX = e.touches[0].pageX;
        let prevY = e.touches[0].pageY;
        const fromX = prevX - rect.left;
        const fromY = prevY - rect.top;
        const prevValue = this.value;
        this.handlePointerDown({ x: fromX, y: fromY, originalEvent: e });
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const pageX = e.changedTouches[0].pageX;
            const pageY = e.changedTouches[0].pageY;
            const movementX = pageX - prevX;
            const movementY = pageY - prevY;
            prevX = pageX;
            prevY = pageY;
            const x = pageX - rect.left;
            const y = pageY - rect.top;
            this.handlePointerDrag({ prevValue, x, y, fromX, fromY, movementX, movementY, originalEvent: e });
        };
        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            const x = e.changedTouches[0].pageX - rect.left;
            const y = e.changedTouches[0].pageY - rect.top;
            this.handlePointerUp({ x, y, originalEvent: e });
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleTouchEnd, { passive: false });
    };
    handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        (e.currentTarget as HTMLElement).focus();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const fromX = e.pageX - rect.left;
        const fromY = e.pageY - rect.top;
        const prevValue = this.value;
        this.handlePointerDown({ x: fromX, y: fromY, originalEvent: e });
        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            const x = e.pageX - rect.left;
            const y = e.pageY - rect.top;
            this.handlePointerDrag({ prevValue, x, y, fromX, fromY, movementX: e.movementX, movementY: e.movementY, originalEvent: e });
        };
        const handleMouseUp = (e: MouseEvent) => {
            e.preventDefault();
            const x = e.pageX - rect.left;
            const y = e.pageY - rect.top;
            this.handlePointerUp({ x, y, originalEvent: e });
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    handleDblClick = (e: MouseEvent) => {
        e.preventDefault();
        this.value = 0;
    }
    handlePointerUp = (e: PointerUpEvent) => {}; // eslint-disable-line @typescript-eslint/no-unused-vars
    get value() {
        return this.state.value;
    }
    set value(valueIn: number) {
        this.state.value = valueIn;
        this.gainNode.gain.setValueAtTime(valueIn <= -70 ? 0 : 10 ** (valueIn / 20), 0);
        this.paint();
    }
    get distance() {
        const { max, min, value } = this.state;
        return (value - min) / (max - min);
    }
    get trueSteps() {
        const { max, min, step } = this.state;
        const full = this.interactionRect[2];
        const maxSteps = full;
        if (step) return Math.min(Math.floor((max - min) / step), maxSteps);
        return maxSteps;
    }
    get stepRange() {
        const full = this.interactionRect[2];
        const trueSteps = this.trueSteps;
        return full / trueSteps;
    }
    paint() {
        window.cancelAnimationFrame(this.$raf);
        this.$raf = window.requestAnimationFrame(this.raf);
    }
    levelHandler = (levels: number[]) => {
        const levelsIn = levels.map(e => 20 * Math.log10(e));
        if (this.state.levels.length === levelsIn.length && this.state.levels.every((v, i) => v === levelsIn[i])) return;
        this.state.levels = levelsIn;
        this.paint();
    }
    raf = () => {
        this.$frame++;
        if (this.$frame % this.frameReduce !== 0) {
            window.cancelAnimationFrame(this.$raf);
            this.$raf = window.requestAnimationFrame(this.raf);
            return;
        }
        const { barwidth, barbgcolor, coldcolor, warmcolor, hotcolor, overloadcolor, tribordercolor, tricolor, textcolor } = this.state;
        const { min, max, value, levels } = this.state;
        const channels = Math.min(this.channels, levels.length);
        const ctx = this.ctx;
        const canvas = this.canvas;
        const distance = this.distance;
        const { width } = canvas.getBoundingClientRect();
        canvas.width = width;
        const height = barwidth * (channels * 1.5 + 2);
        canvas.height = height;

        const drawWidth = width;
        const left = 0;
        let top = 0;
        this.interactionRect = [0, top, width, height];
        this.paintLevels = [...levels];
        const paintLevels = [...this.paintLevels];
        if (paintLevels.find((v, i) => v > this.maxLevels[i])) {
            this.maxLevels = [...paintLevels];
            if (this.maxTimer) window.clearTimeout(this.maxTimer);
            this.maxTimer = window.setTimeout(() => {
                this.maxLevels = [...this.paintLevels];
                this.maxTimer = undefined;
                this.raf();
            }, 1000);
        }
        if (paintLevels.find((v, i) => v < this.maxLevels[i]) && typeof this.maxTimer === "undefined") {
            this.maxTimer = window.setTimeout(() => {
                this.maxLevels = [...this.paintLevels];
                this.maxTimer = undefined;
                this.raf();
            }, 1000);
        }
        const maxLevels = this.maxLevels;
        const coldStop = (-18 - min) / (max - min);
        const warmStop = (-6 - min) / (max - min);
        const hotStop = (-3 - min) / (max - min);
        const overloadStop = -min / (max - min);
        const gradient = ctx.createLinearGradient(left, 0, drawWidth, 0);
        if (coldStop <= 1 && coldStop >= 0) gradient.addColorStop(coldStop, coldcolor);
        else if (coldStop > 1) gradient.addColorStop(1, coldcolor);
        if (warmStop <= 1 && warmStop >= 0) gradient.addColorStop(warmStop, warmcolor);
        if (hotStop <= 1 && hotStop >= 0) gradient.addColorStop(hotStop, hotcolor);
        if (overloadStop <= 1 && overloadStop >= 0) gradient.addColorStop(overloadStop, overloadcolor);
        else if (overloadStop < 0) gradient.addColorStop(0, coldcolor);

        for (let i = 0; i < channels; i++) {
            const level = paintLevels[i];
            const maxLevel = maxLevels[i];
            ctx.fillStyle = barbgcolor;
            if (level < 0) ctx.fillRect(left, top, drawWidth * overloadStop, barwidth);
            if (level < max) ctx.fillRect(left + drawWidth * overloadStop + 1, top, drawWidth * (1 - overloadStop) - 1, barwidth);
            ctx.fillStyle = gradient;
            if (level > min) {
                const distance = (Math.min(0, level) - min) / (max - min);
                ctx.fillRect(left, top, distance * drawWidth, barwidth);
            }
            if (level > 0) {
                const distance = Math.min(max, level) / (max - min);
                ctx.fillRect(left + overloadStop * drawWidth + 1, top, distance * drawWidth - 1, barwidth);
            }
            if (maxLevel > level) {
                if (maxLevel <= 0) {
                    const distance = (Math.min(0, maxLevel) - min) / (max - min);
                    ctx.fillRect(left + distance * drawWidth - 1, top, 1, barwidth);
                }
                if (maxLevel > 0) {
                    const distance = Math.min(max, maxLevel) / (max - min);
                    ctx.fillRect(left + Math.min(drawWidth - 1, (overloadStop + distance) * drawWidth), top, 1, barwidth);
                }
            }
            top += 1.5 * barwidth;
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = tribordercolor;
        const triOrigin: [number, number] = [
            this.interactionRect[0] + this.interactionRect[2] * distance - 4,
            top - barwidth * 0.5
        ];
        ctx.beginPath();
        ctx.moveTo(triOrigin[0], triOrigin[1] + 8);
        ctx.lineTo(triOrigin[0] + 4, triOrigin[1]);
        ctx.lineTo(triOrigin[0] + 8, triOrigin[1] + 8);
        ctx.lineTo(triOrigin[0], triOrigin[1] + 8);
        ctx.stroke();

        ctx.fillStyle = tricolor;
        ctx.fill();

        ctx.font = "regular 10px Arial, sans-serif";
        ctx.fillStyle = textcolor;
        ctx.textAlign = "left";
        ctx.fillText(`${value.toFixed(2)} dB`, 4, height - 2, width);
    }
    getValueFromPos(e: { x: number; y: number }) {
        const { min, max } = this.state;
        const stepRange = this.stepRange;
        const trueSteps = this.trueSteps;
        const step = (max - min) / trueSteps;
        let steps = Math.round((e.x - this.interactionRect[0]) / stepRange);
        steps = Math.min(trueSteps, Math.max(0, steps));
        return steps * step + min;
    }
    handlePointerDown = (e: PointerDownEvent) => {
        const { value } = this.state;
        if (
            e.x < this.interactionRect[0]
            || e.x > this.interactionRect[0] + this.interactionRect[2]
            || e.y < this.interactionRect[1]
            || e.y > this.interactionRect[1] + this.interactionRect[3]
        ) return;
        const newValue = this.getValueFromPos(e);
        if (newValue !== value) this.value = this.getValueFromPos(e);
    }
    handlePointerDrag = (e: PointerDragEvent) => {
        const newValue = this.getValueFromPos(e);
        if (newValue !== this.state.value) this.value = newValue;
    }
}
