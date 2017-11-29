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
var output_handler = null;

// compute libraries URL relative to current page
var wurl =  window.location.href;
var libraries_url = wurl.substr(0, wurl.lastIndexOf('/')) + "/libraries/";

console.log("URL:", libraries_url);

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

		DSP = null;
	}

}

function compileDSP() 
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
		DSP = null;
	}

	if (!dsp_code) {
		return;
	}

	// Prepare argv list
	var argv = [];
	argv.push("-ftz");
	argv.push(ftz_flag);
	argv.push("-I");
	argv.push(libraries_url);

	console.log(argv);

	if (poly_flag === "ON") {

		isPoly = true;
		console.log("Poly DSP");

		// Create a poly DSP factory from the dsp code
		faust.createPolyDSPFactory(dsp_code,
			argv,
			function(factory) {

				if (!factory) {
					alert(faust.getErrorMessage());
					// Fix me
					//document.getElementById('faustuiwrapper').style.display = 'none';
					return;
				}

				faust.createPolyDSPInstance(factory,
					audio_context,
					buffer_size,
					poly_nvoices,
					function(dsp) {

						if (!dsp) {
							alert(faust.getErrorMessage());
							// Fix me
							//document.getElementById('faustuiwrapper').style.display = 'none';
							return;
						}
						checkPolyphonicDSP(dsp.getJSON());
						DSP = dsp;

						if (DSP.getNumInputs() > 0) {
							activateAudioInput();
						} else {
							audio_input = null;
						}

						// Setup UI
						/* faust_svg = $('<div />');
						$('body').append(faust_svg);
						output_handler = _f4u$t.main(DSP.getJSON(), $(faust_svg), DSP.setParamValue); */
						faust_svg = $('#faustui');
						//output_handler = _f4u$t.main(DSP.getJSON(), faust_svg, DSP.setParamValue);
						DSP.setOutputParamHandler(output_handler);
						console.log(DSP.getNumInputs());
						console.log(DSP.getNumOutputs());
						DSP.metadata({
							declare: function(key, value) {
								console.log("key = " + key + " value = " + value);
							}
						});
						DSP.connect(audio_context.destination);

						// Load previous state is deactivated for now
						//loadDSPState();
						
						var faustUI = FaustUI(DSP);
						document.getElementById("fUI").innerHTML = "";
					  document.getElementById("fUI").appendChild(faustUI);
						
						setInterval(function() { if (DSP) saveDSPState(); }, 1000);
					});
			});

	} else {

		isPoly = false;
		console.log("Mono DSP");

		// Create a mono DSP factory from the dsp code
		faust.createDSPFactory(dsp_code,
			argv,
			function(factory) {

				if (!factory) {
					alert(faust.getErrorMessage());
					// Fix me
					//document.getElementById('faustuiwrapper').style.display = 'none';
					return;
				}

				faust.createDSPInstance(factory,
					audio_context,
					buffer_size,
					function(dsp) {

						if (!dsp) {
							alert(faust.getErrorMessage());
							// Fix me
							//document.getElementById('faustuiwrapper').style.display = 'none';
							return;
						}

						DSP = dsp;
						if (DSP.getNumInputs() > 0) {
							activateAudioInput();
						} else {
							audio_input = null;
						}

						// Setup UI
						/* faust_svg = $('<div />');
						$('body').append(faust_svg);
						output_handler = _f4u$t.main(DSP.getJSON(), $(faust_svg), DSP.setParamValue); */
						//faust_svg = $('#faustui');
						//output_handler = _f4u$t.main(DSP.getJSON(), faust_svg, DSP.setParamValue);
						//DSP.setOutputParamHandler(output_handler);
						//console.log(DSP.getNumInputs());
						//console.log(DSP.getNumOutputs());
						DSP.metadata({
							declare: function(key, value) {
								console.log("key = " + key + " value = " + value);
							}
						});
						DSP.connect(audio_context.destination);
						
						// Load previous state is deactivated for now
						//loadDSPState();
						
						var faustUI = FaustUI(DSP);
						document.getElementById("fUI").innerHTML = "";
					  document.getElementById("fUI").appendChild(faustUI);
						
						setInterval(function() { if (DSP) saveDSPState(); }, 1000);
					});
			});
	}
}
