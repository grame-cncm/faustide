export type TKeyMap = { [key: string]: number | "PREV" | "NEXT" | "VELUP" | "VELDOWN" };
/**
 * Keyboard Events to Midi Messages
 *
 * @class Key2Midi
 */
class Key2Midi {
    /**
     * Default Key Map use for key2midi
     *
     * @type {TKeyMap}
     * @static
     * @memberof Key2Midi
     */
    static KEY_MAP: TKeyMap = {
        a: 0,
        w: 1,
        s: 2,
        e: 3,
        d: 4,
        f: 5,
        t: 6,
        g: 7,
        y: 8,
        h: 9,
        u: 10,
        j: 11,
        k: 12,
        o: 13,
        l: 14,
        p: 15,
        ";": 16,
        z: "PREV",
        x: "NEXT",
        c: "VELDOWN",
        v: "VELUP"
    };
    static KEY_MAP_FR: TKeyMap = {
        q: 0,
        z: 1,
        s: 2,
        e: 3,
        d: 4,
        f: 5,
        t: 6,
        g: 7,
        y: 8,
        h: 9,
        u: 10,
        j: 11,
        k: 12,
        o: 13,
        l: 14,
        p: 15,
        m: 16,
        w: "PREV",
        x: "NEXT",
        c: "VELDOWN",
        v: "VELUP"
    };
    /**
     * Current key map
     *
     * @type {TKeyMap}
     * @memberof Key2Midi
     */
    keyMap: TKeyMap;
    /**
     * Current offset
     *
     * @type {number}
     * @memberof Key2Midi
     */
    offset: number;
    /**
     * Current velocity
     *
     * @type {number}
     * @memberof Key2Midi
     */
    velocity: number;
    /**
     * Current velocity map
     *
     * @type {number[]}
     * @memberof Key2Midi
     */
    velMap: number[] = [];
    /**
     * Handler for midi message output
     *
     * @type {(msg: number[]) => any}
     * @memberof Key2Midi
     */
    handler: (msg: number[]) => any;
    /**
     * Enable State
     *
     * @type {boolean}
     * @memberof Key2Midi
     */
    enabled: boolean;
    /**
     * Creates an instance of Key2Midi.
     * @param {{ keyMap?: TKeyMap, offset?: number, velocity?: number, handler?: (msg: number[]) => any, enabled?: boolean }} [options]
     * @memberof Key2Midi
     */
    constructor(options?: { keyMap?: TKeyMap; offset?: number; velocity?: number; handler?: (msg: number[]) => any; enabled?: boolean }) {
        this.keyMap = options.keyMap || Key2Midi.KEY_MAP;
        this.offset = options.offset || 36;
        this.velocity = options.velocity || 60;
        this.handler = options.handler || (() => undefined);
        this.enabled = options.enabled || false && true;
    }
    /**
     * KeyDown Handler
     *
     * @param {string} str
     * @returns {void}
     * @memberof Key2Midi
     */
    handleKeyDown = (str: string): void => {
        if (!this.enabled) return;
        const converted = this.keyMap[str];
        if (typeof converted === "undefined") return;
        if (typeof converted === "number") {
            const note = converted + this.offset;
            if (this.velMap[note]) return;
            this.velMap[note] = this.velocity;
            this.handler([144, converted + this.offset, this.velocity]);
            return;
        }
        if (converted === "NEXT") {
            this.flush();
            this.offset = Math.min(120, this.offset + 12);
            return;
        }
        if (converted === "PREV") {
            this.flush();
            this.offset = Math.max(0, this.offset - 12);
            return;
        }
        if (converted === "VELUP") {
            this.velocity = Math.min(120, this.velocity + 20);
            return;
        }
        if (converted === "VELDOWN") {
            this.velocity = Math.max(20, this.velocity - 20);
        }
    }
    /**
     * KeyUp Handler
     *
     * @param {string} str
     * @returns {void}
     * @memberof Key2Midi
     */
    handleKeyUp = (str: string): void => {
        if (!this.enabled) return;
        const converted = this.keyMap[str];
        if (typeof converted === "undefined") return;
        if (typeof converted === "number") {
            const note = converted + this.offset;
            this.velMap[note] = 0;
            this.handler([144, converted + this.offset, 0]);
        }
    }
    /**
     * Mute All
     *
     * @returns {void}
     * @memberof Key2Midi
     */
    flush(): void {
        if (!this.enabled) return;
        for (let note = 0; note < 128; note++) {
            if (this.velMap[note]) this.handler([144, note, 0]);
        }
    }
}
export { Key2Midi };
