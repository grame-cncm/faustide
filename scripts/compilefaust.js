"use strict";

var isWebKitAudio = (typeof(webkitAudioContext) !== "undefined");
var isWasm = (typeof(WebAssembly) !== "undefined");
var isPoly = false;

if (!isWasm) {
	alert("WebAssembly is not supported in this browser, the page will not work !")
}

var audio_context = (isWebKitAudio) ? new webkitAudioContext() : new AudioContext();
var buffer_size = 256;
var audio_input = null;
var midi_input = [];
var factory = null;
var DSP = null;
var dsp_code = null;
var faust_svg = null;
var poly_flag = "OFF";
var ftz_flag = "2";
var poly_nvoices = 16;
var rendering_mode = "ScriptProcessor";
var output_handler = null;

// compute libraries URL relative to current page
var wurl =  window.location.href;
var qm = wurl.indexOf('?');
if (qm > 0) {
    wurl = wurl.substr(0, qm);  // remove options from the URL
}
var libraries_url = wurl.substr(0, wurl.lastIndexOf('/')) + "/libraries/";
console.log("URL:", libraries_url);

function workletAvailable()
{
    if (typeof (OfflineAudioContext) === "undefined") return false;
    var context = new OfflineAudioContext(1, 1, 44100);
    return context.audioWorklet && typeof context.audioWorklet.addModule === 'function';
}

function deleteDSP()
{
	if (DSP) {
		if (audio_input) {
			audio_input.disconnect(DSP);
		}
		DSP.disconnect(audio_context.destination);
		if (isPoly) {
			faust.deletePolyDSPInstance(DSP);
		} else {
			faust.deleteDSPInstance(DSP);
		}
		_f4u$t.hard_delete(faust_svg);

		DSP = null;
		faust_svg = null;
	}
}

function activateDSP(dsp)
{
    if (dsp) {
        DSP = dsp;
        if (DSP.getNumInputs() > 0) {
            activateAudioInput();
        } else {
            audio_input = null;
        }

        // Setup UI
        faust_svg = $('#faustui');
        output_handler = _f4u$t.main(DSP.getJSON(), $(faust_svg), function(path, val) { DSP.setParamValue(path, val); });
        DSP.setOutputParamHandler(output_handler);
        DSP.connect(audio_context.destination);

        console.log(DSP.getNumInputs());
        console.log(DSP.getNumOutputs());

        loadDSPState();
    } else {
      	alert(faust.getErrorMessage());
        // Fix me
        document.getElementById('faustuiwrapper').style.display = 'none';
    }
}

function activateMonoDSP(dsp)
{
    activateDSP(dsp);
}

function activatePolyDSP(dsp)
{
	activateDSP(dsp);
    checkPolyphonicDSP(dsp.getJSON());
}

function compileMonoDSP(factory)
{
    if (!factory) {
        alert(faust.getErrorMessage());
        // Fix me
        document.getElementById('faustuiwrapper').style.display = 'none';
    } else if (rendering_mode === "ScriptProcessor") {
        console.log("ScriptProcessor createDSPInstance");
        faust.createDSPInstance(factory, audio_context, buffer_size, activateMonoDSP);
    } else {
        console.log("Worklet createDSPWorkletInstance");
        faust.createDSPWorkletInstance(factory, audio_context, activateMonoDSP);
    }
}

function compilePolyDSP(factory)
{
    if (!factory) {
        alert(faust.getErrorMessage());
        // Fix me
        document.getElementById('faustuiwrapper').style.display = 'none';
    } else if (rendering_mode === "ScriptProcessor") {
        console.log("ScriptProcessor createPolyDSPInstance");
        faust.createPolyDSPInstance(factory, audio_context, buffer_size, poly_nvoices, activatePolyDSP);
    } else {
        console.log("Worklet createPolyDSPWorkletInstance");
        faust.createPolyDSPWorkletInstance(factory, audio_context, poly_nvoices, activatePolyDSP);
    }
}

function compileDSP()
{
	deleteDSP();

	// Prepare argv list
	var argv = [];
	argv.push("-ftz");
	argv.push(ftz_flag);
	argv.push("-I");
	argv.push(libraries_url);
	/*
	// TODO : support for multiple library directories
	argv.push("-I");
	argv.push(base_url);
	*/
	console.log(argv);

	if (poly_flag === "ON") {
		isPoly = true;
		console.log("Poly DSP");
		// Create a poly DSP factory from the dsp code
		faust.createPolyDSPFactory(dsp_code, argv, function(factory) { compilePolyDSP(factory); });
    } else {
		isPoly = false;
		console.log("Mono DSP");
		// Create a mono DSP factory from the dsp code
		faust.createDSPFactory(dsp_code, argv, function(factory) { compileMonoDSP(factory); });
	}
}

function expandDSP(dsp_code)
{
	// Prepare argv list
	var argv = [];
	argv.push("-ftz");
	argv.push(ftz_flag);
	argv.push("-I");
	argv.push(libraries_url);
	/*
	// TODO : support for multiple library directories
	argv.push("-I");
	argv.push(base_url);
	*/
	console.log(argv);

	return faust.expandDSP(dsp_code, argv);
}
