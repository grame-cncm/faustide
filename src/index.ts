// import { Faust } from "faust2webaudio";
import * as monaco from "monaco-editor";
import webmidi from "webmidi";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/tooltip";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
        AudioWorklet?: typeof AudioWorklet;
    }
}
$(async () => {
    $('[data-toggle="tooltip"]').tooltip();
    const editor = initEditor();
    // $(window).on("resize", console.log);
    const { Faust } = await import("faust2webaudio");
    const faust = new Faust();
    await faust.ready;
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

});
const initEditor = () => {
    const code =
`import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`;
    const polycode =
`import("stdfaust.lib");
process = ba.pulsen(1, ba.hz2midikey(freq) * 1000) : pm.marimba(freq, 0, 7000, 0.5, 0.8) * gate * gain with {
    freq = hslider("freq", 440, 40, 8000, 1);
    gain = hslider("gain", 0.5, 0, 1, 0.01);
    gate = button("gate");
};
effect = dm.freeverb_demo;`;
    monaco.languages.register({
        id: "faust",
        extensions: ["dsp", "lib"],
        mimetypes: ["application/faust"]
    });
    const faustKeywords = [
        "import", "component", "declare", "library", "environment", "int", "float",
        "letrec", "with", "class", "process", "effect", "inputs", "outputs",
    ];
    const faustFunctions = [
        "mem", "prefix", "rdtable", "rwtable",
        "select2", "select3", "ffunction", "fconstant", "fvariable",
        "button", "checkbox", "vslider", "hslider", "nentry",
        "vgroup", "hgroup", "tgroup", "vbargraph", "hbargraph", "attach",
        "acos", "asin", "atan", "atan2", "cos", "sin", "tan", "exp",
        "log", "log10", "pow", "sqrt", "abs", "min", "max", "fmod",
        "remainder", "floor", "ceil", "rint",
        "seq", "par", "sum", "prod"
    ];
    const faustLib = [
        "an.amp_follower", "an.amp_follower_ud", "an.mth_octave_analyzer", "an.mth_octave_spectral_level6e",
        "an.third_octave_analyzer", "an.third_octave_filterbank", "an.half_octave_analyzer", "an.half_octave_filterbank",
        "an.analyzer", "an.ifft", "an.amp_follower_ar",
        "ba.samp2sec", "ba.sec2samp", "ba.db2linear", "ba.linear2db", "ba.lin2LogGain", "ba.log2LinGain",
        "ba.tau2pole", "ba.pole2tau", "ba.midikey2hz", "ba.hz2midikey", "ba.pianokey2hz", "ba.hz2pianokey",
        "ba.countdown", "ba.countup", "ba.sweep", "ba.time", "ba.tempo", "ba.period", "ba.pulse", "ba.pulsen",
        "ba.cycle", "ba.beat", "ba.pulse_countup", "ba.pulse_countdown", "ba.pulse_countup_loop",
        "ba.resetCtr", "ba.pulse_countdown_loop", "ba.count", "ba.take", "ba.subseq",
        "ba.if", "ba.selector", "ba.selectn", "ba.select2stereo", "ba.latch", "ba.sAndH",
        "ba.downSample", "ba.peakhold", "ba.peakholder", "ba.impulsify", "ba.automat", "ba.bpf", "ba.listInterp",
        "ba.bypass1", "ba.bypass2", "ba.bypass1to2", "ba.toggle", "ba.on_and_off", "ba.selectoutn",
        "co.compressor_mono", "co.compressor_stereo", "co.limiter_1176_R4_mono", "co.limiter_1176_R4_stereo",
        "de.delay", "de.fdelay", "de.sdelay", "de.fdelay", "de.fdelayn", "de.fdelaya", "de.fdelayna",
        "dm.mth_octave_spectral_level_demo", "dm.parametric_eq_demo", "dm.spectral_tilt_demo",
        "dm.cubicnl_demo", "dm.gate_demo", "dm.compressor_demo", "dm.moog_vcf_demo", "dm.wah4_demo",
        "dm.crybaby_demo", "dm.flanger_demo", "dm.phaser2_demo", "dm.stereo_reverb_tester", "dm.fdnrev0_demo",
        "dm.zita_rev_fdn_demo", "dm.zita_rev1", "dm.sawtooth_demo", "dm.virtual_analog_oscillator_demo",
        "dm.exciter", "dm.vocoder_demo", "dm.freeverb_demo", "dx.dx7_ampf", "dx.dx7_egraterisef",
        "dx.dx7_egraterisepercf", "dx.dx7_egratedecayf", "dx.dx7_egratedecaypercf", "dx.dx7_eglv2peakf",
        "dx.dx7_velsensf", "dx.dx7_fdbkscalef", "dx.dx7_op", "dx.dx7_algo", "dx.dx7_ui",
        "en.smoothEnvelope", "en.ar", "en.arfe", "en.are", "en.asr", "en.adsr", "en.dx7envelope", "en.adsre",
        "fi.zero", "fi.pole", "fi.integrator", "fi.dcblockerat", "fi.dcblocker", "fi.ff_comb", "fi.ff_fcomb",
        "fi.ffcombfilter", "fi.fb_comb", "fi.fb_fcomb", "fi.rev1", "fi.allpass_comb", "fi.allpass_fcomb",
        "fi.rev2", "fi.iir", "fi.notchw", "fi.av2sv", "fi.bvav2nuv", "fi.iir_lat2", "fi.allpassnt", "fi.iir_kl",
        "fi.allpassnklt", "fi.iir_lat1", "fi.allpassn1mt", "fi.iir_nl", "fi.allpassnnlt", "fi.tf2np", "fi.wgr",
        "fi.nlf2", "fi.apnl", "fi.allpassn", "fi.allpassnn", "fi.allpasskl", "fi.allpass1m", "fi.tf3slf",
        "fi.tf1s", "fi.tf2sb", "fi.tf1sb", "fi.resonlp", "fi.resonhp", "fi.resonbp", "fi.lowpass", "fi.highpass",
        "fi.lowpass0_highpass1", "fi.lowpass3e", "fi.lowpass6e", "fi.highpass3e", "fi.highpass6e", "fi.bandpass",
        "fi.bandstop", "fi.bandpass6e", "fi.bandpass12e", "fi.low_shelf", "fi.high_shelf", "fi.peak_eq",
        "fi.peak_eq_cq", "fi.peak_eq_rm", "fi.spectral_tilt", "fi.levelfilter", "fi.levelfilterN",
        "fi.mth_octave_filterbank[n]", "fi.filterbank", "fi.filterbanki",
        "ho.encoder", "ho.decoder", "ho.decoderStereo", "ho.optimBasic", "ho.optimMaxRe", "ho.optimInPhase",
        "ho.wider", "ho.map", "ho.rotate", "ma.SR", "ma.BS", "ma.PI", "ma.FTZ", "ma.neg", "ma.sub", "ma.inv",
        "ma.cbrt", "ma.hypot", "ma.ldexp", "ma.scalb", "ma.log1p", "ma.logb", "ma.ilogb", "ma.log2", "ma.expm1",
        "ma.acosh", "ma.asinh", "ma.atanh", "ma.sinh", "ma.cosh", "ma.tanh", "ma.erf", "ma.erfc", "ma.gamma",
        "ma.lgamma", "ma.J0", "ma.J1", "ma.Jn", "ma.Y0", "ma.Y1", "ma.Yn", "ma.np2", "ma.frac", "ma.modulo",
        "ma.isnan", "ma.chebychev", "ma.chebychevpoly", "ma.diffn", "ma.signum",
        "ef.cubicnl", "ef.gate_mono", "ef.gate_stereo", "ef.speakerbp", "ef.piano_dispersion_filter",
        "ef.stereo_width", "ef.echo", "ef.transpose", "ef.mesh_square",
        "no.noise", "no.multirandom", "no.multinoise", "no.noises", "no.pink_noise", "no.pink_noise_vm",
        "no.sparse_noise_vm", "no.velvet_noise_vm", "no.gnoise",
        "os.sinwaveform", "os.coswaveform", "os.phasor", "os.hs_phasor", "os.oscsin", "os.hs_oscsin",
        "os.osccos", "os.oscp", "os.osci", "os.lf_imptrain", "os.lf_pulsetrainpos", "os.lf_pulsetrain",
        "os.lf_squarewavepos", "os.lf_squarewave", "os.lf_trianglepos", "os.lf_rawsaw", "os.lf_sawpos_phase",
        "os.sawNp", "os.saw2dpw", "os.saw3", "os.sawtooth", "os.saw2f2", "os.saw2f4", "os.pulsetrainN",
        "os.pulsetrain", "os.squareN", "os.square", "os.impulse", "os.imptrainN", "os.imptrain", "os.triangleN",
        "os.triangle", "os.oscb", "os.oscrq", "os.oscrs", "os.oscrc", "os.osc", "os.oscs", "os.oscw", "os.oscws",
        "os.oscwq", "os.oscw", "os.lf_sawpos", "os.lf_saw", "os.lf_triangle",
        "pf.flanger_mono", "pf.flanger_stereo", "pf.phaser2_mono", "pf.phaser2_stereo",
        "pm.speedOfSound", "pm.maxLength", "pm.f2l", "pm.l2f", "pm.l2s", "pm.basicBlock", "pm.chain",
        "pm.inLeftWave", "pm.inRightWave", "pm.in", "pm.outLeftWave", "pm.outRightWave", "pm.out",
        "pm.terminations", "pm.lTermination", "pm.rTermination", "pm.closeIns", "pm.closeOuts", "pm.endChain",
        "pm.waveguideN", "pm.waveguide", "pm.bridgeFilter", "pm.modeFilter", "pm.stringSegment", "pm.openString",
        "pm.nylonString", "pm.steelString", "pm.openStringPick", "pm.openStringPickUp", "pm.openStringPickDown",
        "pm.ksReflexionFilter", "pm.rStringRigidTermination", "pm.lStringRigidTermination", "pm.elecGuitarBridge",
        "pm.elecGuitarNuts", "pm.guitarBridge", "pm.guitarNuts", "pm.idealString", "pm.ks", "pm.ks_ui_MIDI",
        "pm.elecGuitarModel", "pm.elecGuitar", "pm.elecGuitar_ui_MIDI", "pm.guitarBody", "pm.guitarModel",
        "pm.guitar", "pm.guitar_ui_MIDI", "pm.nylonGuitarModel", "pm.nylonGuitar", "pm.nylonGuitar_ui_MIDI",
        "pm.bowTable", "pm.violinBowTable", "pm.bowInteraction", "pm.violinBow", "pm.violinBowedString",
        "pm.violinNuts", "pm.violinBridge", "pm.violinBody", "pm.violinModel", "pm.violin_ui", "pm.violin_ui_MIDI",
        "pm.openTube", "pm.reedTable", "pm.fluteJetTable", "pm.brassLipsTable", "pm.clarinetReed", "pm.clarinetMouthPiece",
        "pm.brassLips", "pm.fluteEmbouchure", "pm.wBell", "pm.fluteHead", "pm.fluteFoot", "pm.clarinetModel",
        "pm.clarinetModel_ui", "pm.clarinet_ui", "pm.clarinet_ui_MIDI", "pm.brassModel", "pm.brassModel_ui",
        "pm.brass_ui", "pm.brass_ui_MIDI", "pm.fluteModel", "pm.fluteModel_ui", "pm.flute_ui", "pm.flute_ui_MIDI",
        "pm.impulseExcitation", "pm.strikeModel", "pm.strike", "pm.pluckString", "pm.blower", "pm.blower_ui",
        "pm.djembeModel", "pm.djembe", "pm.djembe_ui_MIDI", "pm.marimbaBarModel", "pm.marimbaResTube",
        "pm.marimbaModel", "pm.marimba", "pm.marimba_ui_MIDI", "pm.churchBellModel", "pm.churchBell",
        "pm.churchBell_ui", "pm.englishBellModel", "pm.englishBell", "pm.englishBell_ui", "pm.frenchBellModel",
        "pm.frenchBell", "pm.frenchBell_ui", "pm.germanBellModel", "pm.germanBell", "pm.germanBell_ui",
        "pm.russianBellModel", "pm.russianBell", "pm.russianBell_ui", "pm.standardBellModel", "pm.standardBell",
        "pm.standardBell_ui", "pm.formantValues", "pm.voiceGender", "pm.skirtWidthMultiplier", "pm.autobendFreq",
        "pm.vocalEffort", "pm.fof", "pm.fofSH", "pm.fofCycle", "pm.fofSmooth", "pm.formantFilterFofCycle",
        "pm.formantFilterFofSmooth", "pm.formantFilterBP", "pm.formantFilterbank", "pm.formantFilterbankFofCycle",
        "pm.formantFilterbankFofSmooth", "pm.formantFilterbankBP", "pm.SFFormantModel", "pm.SFFormantModelFofCycle",
        "pm.SFFormantModelFofSmooth", "pm.SFFormantModelBP", "pm.SFFormantModelFofCycle_ui", "pm.SFFormantModelFofSmooth_ui",
        "pm.SFFormantModelBP_ui", "pm.SFFormantModelFofCycle_ui_MIDI", "pm.SFFormantModelFofSmooth_ui_MIDI",
        "pm.SFFormantModelBP_ui_MIDI", "pm.allpassNL",
        "re.jcrev", "re.satrev", "re.fdnrev0", "re.zita_rev_fdn", "re.zita_rev1_stereo", "re.zita_rev1_ambi",
        "re.mono_freeverb", "re.stereo_freeverb",
        "ro.cross", "ro.crossnn", "ro.crossn1", "ro.interleave", "ro.butterfly", "ro.hadamard", "ro.recursivize",
        "si.bus", "si.block", "si.interpolate", "si.smoo", "si.polySmooth", "si.smoothAndH", "si.bsmooth",
        "si.dot", "si.smooth", "si.cbus", "si.cmul", "si.lag_ud", "sp.panner", "sp.spat", "sp.stereoize",
        "sy.popFilterPerc", "sy.dubDub", "sy.sawTrombone", "sy.combString", "sy.additiveDrum", "sy.fm",
        "ve.moog_vcf", "ve.moog_vcf_2b[n]", "ve.wah4", "ve.autowah", "ve.crybaby", "ve.vocoder"
    ];

    monaco.languages.setMonarchTokensProvider("faust", {
        defaultToken: "invalid",
        tokenPostfix: ".dsp",
        keywords: faustKeywords,
        sysFunctions: faustFunctions,
        compOperators: [
            "~", ",", ":", "<:", ":>"
        ],
        operators: [
            "=",
            "+", "-", "*", "/", "%", "^",
            "&", "|", "xor", "<<", ">>",
            ">", "<", "==", "<=", ">=", "!=",
            "@", "'"
        ],
        // we include these common regular expressions
        symbols:  /[=><!~?:&|+\-*\/\^%]+/,
        // C# style strings
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // identifiers and keywords
                [/!|_/, "keyword"], // Wire
                [/[a-z_$][\w$]*/, { cases: {
                    "@sysFunctions": "constant",
                    "@keywords": "keyword",
                    "@default": "identifier"
                } }],
                [/[A-Z][\w\$]*/, "type.identifier"],  // to show class names nicely
                // whitespace
                { include: "@whitespace" },
                // delimiters and operators
                [/[{}()\[\]]/, "@brackets"],
                [/~|,|<:|:>|:/, "delimiter"],
                [/[<>](?!@symbols)/, "@brackets"],
                [/=|\+|\-|\*|\/|%|\^|&|\||xor|<<|>>|>|<|==|<=|>=|!=|@|'/, { cases: {
                    "@operators": "delimiter",
                    "@default"  : ""
                } }],
                // numbers
                [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
                [/0[xX][0-9a-fA-F]+/, "number.hex"],
                [/\d+/, "number"],
                // delimiter: after number because of .\d floats
                [/[;.]/, "delimiter"],
                // strings
                [/"([^"\\]|\\.)*$/, "string.invalid"],  // non-teminated string
                [/"/,  { token: "string.quote", bracket: "@open", next: "@string" }]
            ],

            comment: [
                [/[^\/*]+/, "comment"],
                [/\/\*/,    "comment", "@push"],    // nested comment
                ["\\*/",    "comment", "@pop"],
                [/[\/*]/,   "comment"]
            ],

            string: [
                [/[^\\"]+/,  "string"],
                [/@escapes/, "string.escape"],
                [/\\./,      "string.escape.invalid"],
                [/"/,        { token: "string.quote", bracket: "@close", next: "@pop" }]
            ],
            whitespace: [
                [/[ \t\r\n]+/, "white"],
                [/\/\*/,       "comment", "@comment"],
                [/\/\/.*$/,    "comment"]
            ]
        }
    } as any);
    monaco.languages.setLanguageConfiguration("faust", {
        comments: {
            lineComment: "//",
            blockComment: ["/*", "*/"]
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: '"', close: '"', notIn: ["string"] },
            { open: "/**", close: " */", notIn: ["string"] }
        ],
    });
    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider("faust", {
        provideCompletionItems: () => {
            const suggestions = [] as monaco.languages.CompletionItem[];
            [...faustKeywords, ...faustFunctions, ...faustLib].forEach((e) => {
                suggestions.push({
                    label: e,
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: e,
                    range: null
                });
            });
            return { suggestions };
        }
    });
    const editor = monaco.editor.create($("#editor")[0], {
        value: code,
        language: "faust",
        theme: "vs-dark",
        dragAndDrop: true,
        mouseWheelZoom: true,
        wordWrap: "on"
    });
    $(window).on("resize", () => editor.layout());
    return editor;
};
