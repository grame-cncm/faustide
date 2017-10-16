'use strict';

var isWebKitAudio = (typeof(webkitAudioContext) !== "undefined");
var isWasm = (typeof(WebAssembly) !== "undefined");
var isPoly = false;

if (!isWasm) {
	alert("WebAssembly is not supported in this browser, the page will not work !")
}

var audio_context = (isWebKitAudio) ? new webkitAudioContext() : new AudioContext();
var buffer_size = 1024;
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


function setBufferSize(bs_item) {
	buffer_size = bs_item.options[bs_item.selectedIndex].value;
	console.log("setBufferSize", buffer_size);
}

function setPoly(poly_item) {
	poly_flag = poly_item.options[poly_item.selectedIndex].value;
	console.log("setPoly", poly_flag);
}

function setPolyVoices(voices_item) {
	poly_nvoices = voices_item.options[voices_item.selectedIndex].value;
	console.log("setPolyVoices", poly_nvoices);
}

function setFTZ(ftz_item) {
	ftz_flag = ftz_item.options[ftz_item.selectedIndex].value;
}

// MIDI input handling
function keyOn(channel, pitch, velocity) {
	if (DSP && isPoly) {
		DSP.keyOn(channel, pitch, velocity);
	}
}

function keyOff(channel, pitch, velocity) {
	if (DSP && isPoly) {
		DSP.keyOff(channel, pitch, velocity);
	}
}

function pitchWheel(channel, bend) {
	if (DSP && isPoly) {
		DSP.pitchWheel(channel, bend);
	}
}

function ctrlChange(channel, ctrl, value) {
	if (DSP && isPoly) {
		DSP.ctrlChange(channel, ctrl, value);
	}
}

function midiMessageReceived(ev) {
	var cmd = ev.data[0] >> 4;
	var channel = ev.data[0] & 0xf;
	var data1 = ev.data[1];
	var data2 = ev.data[2];

	if (channel === 9) {
		return;
	} else if (cmd === 8 || ((cmd === 9) && (data2 === 0))) {
		keyOff(channel, data1, data2);
	} else if (cmd === 9) {
		keyOn(channel, data1, data2);
	} else if (cmd === 11) {
		ctrlChange(channel, data1, data2);
	} else if (cmd === 14) {
		pitchWheel(channel, ((data2 * 128.0 + data1) - 8192) / 8192.0);
	}
}

function onerrorcallback(error) {
	console.log(error);
}

function onsuccesscallbackJazz(access) {
	var inputs = access.getInputs();
	for (var i = 0; i < inputs.length; i++) {
		var input = access.getInput(inputs[i]);
		midi_input.push(input);
		input.onmessage = midiMessageReceived;
	}
}

function onsuccesscallbackStandard(access) {
	for (var input of access.inputs.values()) {
		midi_input.push(input);
		input.onmidimessage = midiMessageReceived;
		console.log(input.name);
	}
}

function activateMIDIInput() {
	console.log("activateMIDIInput");
	if (typeof(navigator.requestMIDIAccess) !== "undefined") {
		if (navigator.requestMIDIAccess() != undefined) {
			navigator.requestMIDIAccess().then(onsuccesscallbackStandard,
				onerrorcallback);
		} else {
			navigator.requestMIDIAccess(onsuccesscallbackJazz, onerrorcallback);
		}
	} else {
		alert(
			"MIDI input cannot be activated, either your browser still does't have it, or you need to explicitly activate it."
		);
	}
}

// Audio input handling
function activateAudioInput() {
	console.log("activateAudioInput");
	if (!navigator.getUserMedia) {
		navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	}

	if (navigator.getUserMedia) {
		navigator.getUserMedia({
			audio: {
				echoCancellation: false
			}
		}, getDevice, function(e) {
			alert('Error getting audio input');
			console.log(e);
		});
	} else {
		alert('Audio input API not available');
	}
}

function getDevice(device) {
	// Create an AudioNode from the stream.
	audio_input = audio_context.createMediaStreamSource(device);

	// Connect it to the destination.
	audio_input.connect(DSP);
}

function setLocalStorage(state) {
	console.log(state);
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("FaustLocalStorage", ((state) ? "on" : "off"));
	}
}

// Save/Load functions using local storage

function restoreMenu(id, value) {
	for (var i = 0; i < document.getElementById(id).length; i++) {
		if (document.getElementById(id).options[i].value === value) {
			document.getElementById(id).selectedIndex = i;
			break;
		}
	}
}

function saveDSPState() {
	if (typeof(Storage) !== "undefined" && localStorage.getItem(
			"FaustLocalStorage") === "on") {
		var params = DSP.getParams();
		for (var i = 0; i < params.length; i++) {
			localStorage.setItem(params[i], DSP.getParamValue(params[i]));
		}
	}
}

function savePageState() {
	if (typeof(Storage) !== "undefined" && localStorage.getItem(
			"FaustLocalStorage") === "on") {
		localStorage.setItem("buffer_size", buffer_size);
		localStorage.setItem("poly_flag", poly_flag);
		localStorage.setItem("ftz_flag", ftz_flag);
		localStorage.setItem("poly_nvoices", poly_nvoices);
	}
}

function loadDSPState() {
	if (typeof(Storage) !== "undefined" && localStorage.getItem(
			"FaustLocalStorage") === "on") {
		var params = DSP.getParams();
		for (var i = 0; i < params.length; i++) {
			if (localStorage.getItem(params[i])) {
				// Restore DSP state
				DSP.setParamValue(params[i], Number(localStorage.getItem(params[i])));
				// Restore GUI state
				output_handler(params[i], Number(localStorage.getItem(params[i])));
			}
		}
	}
}

function loadPageState() {
	if (typeof(Storage) !== "undefined" && localStorage.getItem(
			"FaustLocalStorage") === "on") {
		buffer_size = (localStorage.getItem("buffer_size") ? localStorage.getItem(
			"buffer_size") : 1024);
		poly_flag = (localStorage.getItem("poly_flag") ? localStorage.getItem(
			"poly_flag") : "OFF");
		poly_nvoices = (localStorage.getItem("poly_nvoices") ? localStorage.getItem(
			"poly_nvoices") : 16);
		ftz_flag = (localStorage.getItem("ftz_flag") ? localStorage.getItem(
			"ftz_flag") : 2);

		// Restore menus
		restoreMenu("selectedBuffer", buffer_size);
		restoreMenu("selectedPoly", poly_flag);
		restoreMenu("polyVoices", poly_nvoices);
		restoreMenu("selectedFTZ", ftz_flag);
	}
}

function fileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type === "dragover" ? "hover" : "");
}

function fileSelectHandler(e) {
	fileDragHover(e);
	var files = e.target.files || e.dataTransfer.files;
	f = files[0];
	uploadFile(f);
}

function uploadOn(e, callback) {
	if (!isWasm) {
		alert("WebAssembly is not supported in this browser !")
		return;
	}

	// CASE 1 : THE DROPPED OBJECT IS A URL TO SOME FAUST CODE
	if (e.dataTransfer.getData('URL') && e.dataTransfer.getData('URL').split(':').shift() !=
		"file") {
		var url = e.dataTransfer.getData('URL');
		var filename = url.toString().split('/').pop();
		filename = filename.toString().split('.').shift();
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				dsp_code = "process = vgroup(\"" + filename + "\", environment{" + xmlhttp
					.responseText + "}.process);";
				callback();
			}
		}

		try {
			xmlhttp.open("GET", url, false);
			// Avoid error "mal formé" on firefox
			xmlhttp.overrideMimeType('text/html');
			xmlhttp.send();
		} catch (err) {
			alert(err);
		}

	} else if (e.dataTransfer.getData('URL').split(':').shift() != "file") {
		dsp_code = e.dataTransfer.getData('text');

		// CASE 2 : THE DROPPED OBJECT IS SOME FAUST CODE
		if (dsp_code) {
			dsp_code = "process = vgroup(\"" + "TEXT" + "\", environment{" + dsp_code +
				"}.process);";
			callback();
		}
		// CASE 3 : THE DROPPED OBJECT IS A FILE CONTAINING SOME FAUST CODE
		else {
			var files = e.target.files || e.dataTransfer.files;
			var file = files[0];

			if (location.host.indexOf("sitepointstatic") >= 0) return;

			var request = new XMLHttpRequest();
			if (request.upload) {

				var reader = new FileReader();
				var ext = file.name.toString().split('.').pop();
				var filename = file.name.toString().split('.').shift();
				var type;

				if (ext === "dsp") {
					type = "dsp";
					reader.readAsText(file);
				} else if (ext === "json") {
					type = "json";
					reader.readAsText(file);
				}

				reader.onloadend = function(e) {
					dsp_code = "process = vgroup(\"" + filename + "\",environment{" + reader.result +
						"}.process);";
					callback();
				};
			}
		}
	}
	// CASE 4 : ANY OTHER STRANGE THING
	else {
		window.alert("This object is not Faust code...");
	}
}

function checkPolyphonicDSP(json) {
	if (!((json.indexOf("/freq") !== -1) && (json.indexOf("/gain") !== -1) && (
			json.indexOf("/gate") !== -1))) {
		alert(
			"Faust DSP code is not Polyphonic, it will probably not work correctly in this mode..."
		)
	}
}


function uploadFile(e) {
	fileDragHover(e);
	uploadOn(e, compileDSP);
}

function initPage() {
	// No polling from the server needed, so use an empty loop
	_f4u$t.main_loop = function() {}

	// Restore 'save' checkbox state
	document.getElementById("localstorage").checked = (localStorage.getItem("FaustLocalStorage") === "on");

	// Load page state
	loadPageState();
}

function init() {
	activateMIDIInput();

	var filedrag1 = document.getElementById("filedrag");
	filedrag1.addEventListener("dragover", fileDragHover, false);
	filedrag1.addEventListener("dragleave", fileDragHover, false);
	filedrag1.addEventListener("drop", uploadFile, false);
	filedrag1.textContent =
		"Drop a Faust .dsp file or URL here (compiled using libfaust version " +
		faust.getLibFaustVersion() + ")";
}

// Init page
initPage();

// Save DSP state to local storage
setInterval(function() {
	savePageState();
	if (DSP) {
		saveDSPState();
	}
}, 1000);

activateMIDIInput();
// 'faust_module' global is defined in webaudio-wasm-wrapper.js file, 'onRuntimeInitialized' will be called when code is ready
// (see https://kripken.github.io/emscripten-site/docs/getting_started/FAQ.html)

//faust_module['onRuntimeInitialized'] = init;
