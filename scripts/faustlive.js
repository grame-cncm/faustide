/*
	A Faustlive like web application.
*/
var dsp_code = "";

var codeEditor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true,
    mode: "application/faust",
    smartIndent: true,
    tabSize: 4,
    theme: "eclipse",
    lineWrapping: true,
    allowDropFileTypes: ["application/octet-stream"],
    indentWithTabs: true,
    matchBrackets: false
});

function fileSelectHandler(e) {
    fileDragHover(e);
    var files = e.target.files || e.dataTransfer.files;
    f = files[0];
    uploadFile(f);
}

function uploadOn(e, callback) {
    // CASE 1 : THE DROPPED OBJECT IS A URL TO SOME FAUST CODE
    if (e.dataTransfer.getData('URL') && e.dataTransfer.getData('URL').split(
            ':').shift() != "file") {
        var url = e.dataTransfer.getData('URL');
        var filename = url.toString().split('/').pop();
        filename = filename.toString().split('.').shift();
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log("CASE 1");
                dsp_code = xmlhttp.responseText;
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
            //console.log("CASE 2");
            //dsp_code = "process = vgroup(\"" + "TEXT" + "\", environment{" + dsp_code + "}.process);";
            callback();
        }
        // CASE 3 : THE DROPPED OBJECT IS A FILE CONTAINING SOME FAUST CODE
        else {
            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];

            if (location.host.indexOf("sitepointstatic") >= 0) return;

            var request = new XMLHttpRequest();
            if (request.upload) {

                console.log("CASE 3");

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
                    dsp_code = reader.result;
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

function uploadFile(e) {
    fileDragHover(e);
    uploadOn(e, updateDSPCode);
}

function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    /*e.target.className = (e.type === "dragover" ? "hover" : "");*/
}

function updateDSPCode() {
    codeEditor.setValue(dsp_code);
    //    console.log("FAUST CODE:", codeEditor.getValue());

}

function configureDropZone(zoneid) {
    var filedrag1 = document.getElementById(zoneid);
    filedrag1.addEventListener("dragover", fileDragHover, false);
    filedrag1.addEventListener("dragleave", fileDragHover, false);
    filedrag1.addEventListener("drop", uploadFile, false);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
        encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Download section
function saveFaustCode() {
    console.log("save faust code");
    download("foo.dsp", codeEditor.getValue());
}

//-----------------------------------------------------------------------
// Run the Faust code in the code editor
//-----------------------------------------------------------------------

function runFaustCode() {
    dsp_code = codeEditor.getValue();
    console.log("run faust code: ", dsp_code);
    let modal = document.getElementById('faustuiwrapper');
    modal.style.display = 'block';
    compileDSP();
}

// Stop the Faust code currently running
function stopFaustCode() {
    console.log("stop faust code");

    // Delete the UI content in the DOM
    deleteDSP();

    document.getElementById('faustuiwrapper').style.display = 'none';
    document.getElementById('faustui').classList.remove("hasSVG");
}

//-----------------------------------------------------------------------
// Open Faust documentation
//-----------------------------------------------------------------------

function faustDocumentation()
{
    console.log("open Faust documentation");
    let word = codeEditor.getSelection();
    if (word === "") {
        const pos = codeEditor.findWordAt(codeEditor.getCursor());
        word = codeEditor.getRange(pos.anchor, pos.head);
    }
    window.open("http://faust.grame.fr/libraries.html#" + word, 'documentation');
}

//-----------------------------------------------------------------------
// Export Dialog
//-----------------------------------------------------------------------

function openExportDialog()
{
    console.log("open Export Dialog");
    document.getElementById('exportwrapper').style.display = 'block';
    if (! codeEditor.isClean()) {
        deleteQrCode();
        codeEditor.markClean();
    }
}

function closeExportDialog()
{
    console.log("close Export Dialog");
    document.getElementById('exportwrapper').style.display = 'none';
}

function startWaitingQrCode()
{
    console.log("start Waiting QrCode");
    document.getElementById("loader").style.display = "block";
}

function stopWaitingQrCode()
{
    console.log("stop Waiting QrCode");
    document.getElementById("loader").style.display = "none";
}

function trigCompilation(key)
{
    console.log("trigCompilation " + key);
    var plateform = document.getElementById("Platform").options[document.getElementById("Platform").selectedIndex].value;
	var architecture = document.getElementById("Architecture").options[document.getElementById("Architecture").selectedIndex].value;

    startWaitingQrCode();

    sendPrecompileRequest(  document.getElementById("exportUrl").value,
                            key,
                            plateform,
                            architecture,
                            sha => { stopWaitingQrCode(); updateQrCode(sha); }
                         );
}

function exportFaustSource() {
    getSHAKey(  document.getElementById("exportUrl").value,
                "FaustDSP",
                codeEditor.getValue(),
                trigCompilation,
                cancelLoader
            );
}

//-----------------------------------------------------------------------
// Code Mirror configuration
//-----------------------------------------------------------------------


codeEditor.setOption("extraKeys", {
    'Ctrl-D':  faustDocumentation,
    'Ctrl-R':  runFaustCode
});

// We want to show possible completions only when we type a character
codeEditor.on('keyup', function(editor, event)
{
    if (event.key.length == 1) {
        const ch = event.key[0];
        if (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z") {
            CodeMirror.showHint(editor, null, {completeSingle: false});
        }
    }
});



configureDropZone("myDropZone");
