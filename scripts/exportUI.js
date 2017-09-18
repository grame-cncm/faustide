"use strict";

function onEnterKey(e) {
	if (!e) {
		var e = window.event;
	}

	if (e.keyCode === 13) {
		e.preventDefault();
		updateFWTargets();
	}
}

function openExport() {
	document.getElementById("plusImg").style.visibility = "hidden";
	document.getElementById("moinsImg").style.visibility = "visible";
	document.getElementById("export").style.visibility = "visible";
}

function closeExport(event) {
	if (!event) {
		event = window.event;
	}

	var target = event.target;
	while (target && target != document.getElementById("export") && target !=
		document.getElementById("plusImg"))
		target = target.parentNode;

	if (!target) {
		document.getElementById("plusImg").style.visibility = "visible";
		document.getElementById("moinsImg").style.visibility = "hidden";
		document.getElementById("export").style.visibility = "hidden";
	}
}

function deleteQrCode()
{
	// Empty Div before adding new qrcode
	var toEmpty = document.getElementById("qrDiv");
	
	for (var i = toEmpty.children.length - 1; i >= 0; i--) {
		if (toEmpty.children[i].id != "loader") {
			toEmpty.removeChild(toEmpty.children[i]);
		}
	}
	
}

function forgeURL()
{
	const plateform = document.getElementById("Platform").options[document.getElementById("Platform").selectedIndex].value;
	const architecture = document.getElementById("Architecture").options[document.getElementById("Architecture").selectedIndex].value;
	const output = (plateform === "android") ? "binary.apk" : "binary.zip";

	return document.getElementById("exportUrl").value + "/" + sha + "/" + plateform + "/" + architecture + "/" + output;
}

function updateQrCode(sha) 
{
	deleteQrCode();

	var plateform = document.getElementById("Platform").options[document.getElementById("Platform").selectedIndex].value;
	var architecture = document.getElementById("Architecture").options[document.getElementById("Architecture").selectedIndex].value;
	var output = "binary.zip";

	if (plateform === "android") {
		output = "binary.apk";
	}

	var link = document.createElement('a');
	link.href = document.getElementById("exportUrl").value + "/" + sha + "/" +
		plateform + "/" + architecture + "/" + output;

	// 	Delete existing content if existing
	var qrcodeSpan = document.getElementById('qrcodeDiv');
	if (qrcodeSpan) {
		qrcodeSpan.parentNode.removeChild(qrcodeSpan);
	}

	var myWhiteDiv = getQrCode(document.getElementById("exportUrl").value, sha, plateform, architecture, output, 130);

	document.getElementById("qrDiv").appendChild(link);
	link.appendChild(myWhiteDiv);
}

function cancelLoader() {
	document.getElementById("loader").style.visibility = "hidden";
}

function cleanComboBox(id) {
	while (document.getElementById(id).childNodes.length > 0) {
		document.getElementById(id).removeChild(document.getElementById(id).childNodes[0]);
	}
}

function changeArchs() {
	// CLEAN COMBOBOX BEFORE ADDING NEW OPTIONS
	cleanComboBox("Architecture");
	deleteQrCode();

	var plat = document.getElementById("Platform").options[document.getElementById(
		"Platform").selectedIndex].value;
	var archs = getArchitectures(window.json, plat);

	for (var j = 0; j < archs.length; j++) {
		var a = document.createElement('option');
		a.text = archs[j];
		document.getElementById("Architecture").options.add(a);
	}
}

function updateFWTargets() {
	// CLEAN COMBOBOX BEFORE ADDING NEW OPTIONS
	cleanComboBox("Platform");
	cleanComboBox("Architecture");

	getTargets(document.getElementById("exportUrl").value, function(json) {
		window.json = json;
		var plats = getPlatforms(json);

		for (var i = 0; i < plats.length; i++) {
			var o = document.createElement('option');
			o.text = plats[i];
			document.getElementById("Platform").options.add(o);
		}

		changeArchs();
	}, function() {});
}

updateFWTargets();

/* document.getElementById("refreshButton").onclick = updateFWTargets;
document.getElementById("plusImg").onclick = openExport;
document.getElementById("moinsImg").onclick = closeExport;
document.body.addEventListener("click", closeExport, false);
 */