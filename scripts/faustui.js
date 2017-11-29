/*
  TODO:
    - Implement [style: led]
    - Implement [unit: db]
    - Implement [unit: xxx]
    - Implement [tooltip: xxx]
    - It would be much more efficient to set parameters with their ID instead
    of full address at least for the electron version.
*/

/* const {ipcRenderer} = require('electron'); */

// This function/class takes a Faust DSP node as its main argument and
// returns a div containing the interface bound to the Faust DSP
function FaustUI(faustDSP){
  var defaultColor = [50,50,50]; // TODO: could be a property defined with a metadata
  var currentID = 0;
  var mainDiv = document.createElement("div");
  mainDiv.setAttribute("id","faustUI");
  if(faustDSP != null) {
    var faustJSONUI = JSON.parse(faustDSP.getJSON()).ui;
  }
  else {
    //var faustJSONUI = JSON.parse(ipcRenderer.sendSync('getJSON', '')).ui;
    /*
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("id","tst");
    mainDiv.innerHTML = ipcRenderer.sendSync('getJSON', ''); 
    document.body.appendChild(mainDiv);
    */
  }
  parseFaustUI(faustJSONUI,mainDiv);
  return mainDiv;

  function createUIElement(parent,child,localJSON){
    var elementDiv = document.createElement("div");
    elementDiv.setAttribute("class","uiElement");
    elementDiv.setAttribute("id",localJSON.type + "-" + localJSON.label.replace(" ","-"));
    elementDiv.style.backgroundColor = "rgb("+defaultColor[0]+","+defaultColor[1]+","+defaultColor[2]+")";
    elementDiv.appendChild(child);
    if(localJSON.label != "0x00"){
      var labelDiv = document.createElement("div");
      labelDiv.setAttribute("class","label");
      labelDiv.innerHTML = localJSON.label;
      elementDiv.appendChild(labelDiv);
    }
    parent.appendChild(elementDiv);
    return elementDiv;
  }

  function Vgroup(){
    var group = document.createElement("div");
    group.setAttribute("class","vgroup");
    return group;
  }

  function Hgroup(){
    var group = document.createElement("div");
    group.setAttribute("class","hgroup");
    return group;
  }

  // function essentially behaving like a class
  function Hslider(curJSON){
    // TODO: ignoring step for now
    var hslider = document.createElement("div");
    hslider.setAttribute("class","hslider");
    hslider.value = Number(curJSON.init);
    hslider.min = Number(curJSON.min);
    hslider.max = Number(curJSON.max);
    hslider.range = Math.abs(hslider.max - hslider.min);
    hslider.step = Number(curJSON.step);
    hslider.address = curJSON.address;
    hslider.faustID = currentID;
    currentID++;
    hslider.clicked = 0;

    var sliderValue = document.createElement("div");
    hslider.appendChild(sliderValue);
    sliderValue.setAttribute("class","value");
    sliderValue.setAttribute("id",curJSON.address+"-val");
    sliderValue.innerHTML += curJSON.init;

    var sliderBar = document.createElement("div");
    hslider.appendChild(sliderBar);
    sliderBar.setAttribute("class","bar");
    sliderBar.addEventListener("mousedown",sliderClickDown,false);
    // mouse move and mouse up on all page to catch drag events outside of div
    document.addEventListener("mousemove",sliderMove,false);
    document.addEventListener("mouseup",sliderClickUp,false);

    var sliderCursor = document.createElement("div");
    sliderBar.appendChild(sliderCursor);
    sliderCursor.setAttribute("class","cursor");

    hslider.setNormValue = function(v){
      if(v>=0 && v<=1){
        var cursorXPos = v*100 + "%";
        sliderCursor.style.left = cursorXPos;
        var paramValue = v*hslider.range + hslider.min;
        sliderValue.innerHTML = paramValue.toFixed(2);
        if(faustDSP != null) {
          faustDSP.setParamValue(hslider.address,paramValue);
        }
        else {
          //ipcRenderer.send('setParamValue', hslider.faustID + ":" + paramValue);
        }
      }
    }

    var cursorNormXPos = hslider.value/hslider.range - hslider.min/hslider.range;
    hslider.setNormValue(cursorNormXPos);

    function sliderClickDown(e){
      var cursorPos = (e.clientX - this.offsetLeft)/this.offsetWidth;
      hslider.clicked = 1;
      hslider.setNormValue(cursorPos);
    }

    function sliderClickUp(e){
      if(hslider.clicked == 1){
        hslider.clicked = 0;
      }
    }

    function sliderMove(e){
      if(hslider.clicked == 1){
        var cursorPos = (e.clientX - sliderBar.offsetLeft)/sliderBar.offsetWidth;
        hslider.setNormValue(cursorPos);
      }
    }

    return hslider;
  }

  // function essentially behaving like a class
  function Vslider(curJSON){
    // TODO: ignoring step for now
    var vslider = document.createElement("div");
    vslider.setAttribute("class","vslider");
    vslider.value = Number(curJSON.init);
    vslider.min = Number(curJSON.min);
    vslider.max = Number(curJSON.max);
    vslider.range = Math.abs(vslider.max - vslider.min);
    vslider.step = Number(curJSON.step);
    vslider.address = curJSON.address;
    vslider.faustID = currentID;
    currentID++;
    vslider.clicked = 0;

    var sliderValue = document.createElement("div");
    sliderValue.setAttribute("class","value");
    sliderValue.setAttribute("id",curJSON.address+"-val");
    sliderValue.innerHTML += curJSON.init;

    var sliderBar = document.createElement("div");
    vslider.appendChild(sliderBar);
    sliderBar.setAttribute("class","bar");
    sliderBar.addEventListener("mousedown",sliderClickDown,false);
    // mouse move and mouse up on all page to catch drag events outside of div
    document.addEventListener("mousemove",sliderMove,false);
    document.addEventListener("mouseup",sliderClickUp,false);

    vslider.appendChild(sliderValue);

    var sliderCursor = document.createElement("div");
    sliderBar.appendChild(sliderCursor);
    sliderCursor.setAttribute("class","cursor");

    vslider.setNormValue = function(v){
      if(v>=0 && v<=1){
        var cursorYPos = (1-v)*100 + "%";
        sliderCursor.style.top = cursorYPos;
        var paramValue = v*vslider.range + vslider.min;
        sliderValue.innerHTML = paramValue.toFixed(2);
        if(faustDSP != null) {
          faustDSP.setParamValue(vslider.address,paramValue);
        }
        else {
          //ipcRenderer.send('setParamValue', vslider.faustID + ":" + paramValue);
        }
      }
    }

    var cursorNormYPos = vslider.value/vslider.range - vslider.min/vslider.range;
    vslider.setNormValue(cursorNormYPos);

    function sliderClickDown(e){
      var cursorPos = 1 - (e.clientY - this.offsetTop)/this.offsetHeight;
      vslider.clicked = 1;
      vslider.setNormValue(cursorPos);
    }

    function sliderClickUp(e){
      if(vslider.clicked == 1){
        vslider.clicked = 0;
      }
    }

    function sliderMove(e){
      if(vslider.clicked == 1){
        var cursorPos = 1 - (e.clientY - sliderBar.offsetTop)/sliderBar.offsetHeight;
        vslider.setNormValue(cursorPos);
      }
    }

    return vslider;
  }

  // function essentially behaving like a class
  function Knob(curJSON){
    // TODO: ignoring step for now
    var knob = document.createElement("div");
    knob.setAttribute("class","knob");
    knob.value = Number(curJSON.init);
    knob.min = Number(curJSON.min);
    knob.max = Number(curJSON.max);
    knob.range = Math.abs(knob.max - knob.min);
    knob.step = Number(curJSON.step);
    knob.address = curJSON.address;
    knob.faustID = currentID;
    currentID++;
    knob.clicked = 0;
    knob.clickOriginY = 0;
    knob.clickOrigAngle = 0;
    knob.handleAngle = 0;
    
    /*
    if(curJSON.meta != null){
      for(x in curJSON.meta){
        var curJSONStr = JSON.stringify(curJSON.meta[x]);
        if(curJSONStr.charAt(2) == "_"){
          console.log(curJSONStr.replace("{\"_","{\""));
        }
      }
    }
    */

    var knobValue = document.createElement("div");
    knobValue.setAttribute("class","value");
    knobValue.setAttribute("id",curJSON.address+"-val");
    knobValue.innerHTML += curJSON.init;

    var knobBase = document.createElement("div");
    knob.appendChild(knobBase);
    knobBase.setAttribute("class","base");
    knobBase.addEventListener("mousedown",knobClickDown,false);
    // mouse move and mouse up on all page to catch drag events outside of div
    document.addEventListener("mousemove",knobMove,false);
    document.addEventListener("mouseup",knobClickUp,false);

    knob.appendChild(knobValue);

    var knobHandle = document.createElement("div");
    knobBase.appendChild(knobHandle);
    knobHandle.setAttribute("class","handle");
    var knobHandleTip = document.createElement("div");
    knobHandle.appendChild(knobHandleTip);
    knobHandleTip.setAttribute("class","tip");

    knob.setNormValue = function(v){
      if(v>=0 && v<=1){
        knob.handleAngle = v*360-90;
        knobHandle.style.transform = "rotate(" + knob.handleAngle + "deg)";
        var paramValue = v*knob.range + knob.min;
        knobValue.innerHTML = paramValue.toFixed(2);
        if(faustDSP != null) {
          faustDSP.setParamValue(knob.address,paramValue);
        }
        else {
          //ipcRenderer.send('setParamValue', knob.faustID + ":" + paramValue);
        }
      }
    }

    var handleNormYPos = knob.value/knob.range - knob.min/knob.range;
    knob.setNormValue(handleNormYPos);

    function knobClickDown(e){
      knob.clicked = 1;
      knob.clickOriginY = e.clientY;
      knob.clickOrigAngle = knob.handleAngle;
    }

    function knobClickUp(e){
      if(knob.clicked == 1){
        knob.clicked = 0;
      }
    }

    function knobMove(e){
      if(knob.clicked == 1){
        deltaY = knob.clickOriginY - e.clientY;
        knob.setNormValue((knob.clickOrigAngle+deltaY+90)/360);
      }
    }

    return knob;
  }

  function Nentry(curJSON){
    var nentry = document.createElement("input");
    nentry.setAttribute("type","number");
    nentry.setAttribute("class","nentry");
    nentry.setAttribute("min",curJSON.min);
    nentry.setAttribute("max",curJSON.max);
    nentry.setAttribute("step",curJSON.step);
    nentry.setAttribute("value",curJSON.init);
    nentry.address = curJSON.address;
    nentry.faustID = currentID;
    currentID++;
    nentry.addEventListener("change",onValueChanged,false);

    function onValueChanged(e){
      if(faustDSP != null) {
        faustDSP.setParamValue(nentry.address,Number(e.target.value));
      }
      else {
        //ipcRenderer.send('setParamValue',nentry.faustID + ":" + Number(e.target.value));
      }
    }

    return nentry;
  }

  function Button(curJSON){
    var button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("class","button");
    button.setAttribute("value",curJSON.label);
    button.address = curJSON.address;
    button.faustID = currentID;
    currentID++;
    button.addEventListener("mousedown",onMouseDown,false);
    button.addEventListener("mouseup",onMouseUp,false);

    function onMouseDown(e){
      if(faustDSP != null) {
        faustDSP.setParamValue(button.address,1);
      }
      else {
        //ipcRenderer.send('setParamValue',button.faustID + ":1");
      }
    }

    function onMouseUp(e){
      if(faustDSP != null) {
        faustDSP.setParamValue(button.address,0);
      }
      else {
        //ipcRenderer.send('setParamValue',button.faustID + ":0");
      }
    }

    return button;
  }

  function Checkbox(curJSON){
    var status = 0;
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type","button");
    checkbox.setAttribute("class","button");
    checkbox.setAttribute("value",curJSON.label);
    checkbox.address = curJSON.address;
    checkbox.faustID = currentID;
    currentID++;
    checkbox.addEventListener("mousedown",onMouseDown,false);

    function onMouseDown(e){
      if(status == 0){
        status = 1;
        checkbox.style.backgroundColor = "white";
      }
      else if(status == 1){
        status = 0;
        checkbox.style.backgroundColor = "rgb(220,220,220)";
      }
      if(faustDSP != null) {
        faustDSP.setParamValue(checkbox.address,status);
      }
      else {
        //ipcRenderer.send('setParamValue',checkbox.faustID + ":" + status);
      }
    }

    return checkbox;
  }

  function Hbargraph(curJSON){
    var hbargraph = document.createElement("div");
    hbargraph.setAttribute("class","hbargraph");
    hbargraph.min = Number(curJSON.min);
    hbargraph.max = Number(curJSON.max);
    hbargraph.range = Math.abs(hbargraph.max - hbargraph.min);
    hbargraph.address = curJSON.address;
    hbargraph.faustID = currentID;
    currentID++;
    hbargraph.updateRate = 50; // ms
    
    var barback = document.createElement("div");
    barback.setAttribute("class","barback");
    hbargraph.appendChild(barback);
    
    var bartop = document.createElement("div");
    bartop.setAttribute("class","bartop");
    barback.appendChild(bartop);
    
    function updateStatus(){
      if(faustDSP != null) {
        var barPosPC = (faustDSP.getParamValue(hbargraph.address)/hbargraph.range - hbargraph.min/hbargraph.range)*100;
      }
      else {
        /*
        var barPosPC = 
        (ipcRenderer.sendSync('getParamValue', hbargraph.faustID)/hbargraph.range - hbargraph.min/hbargraph.range)*100;*/
      }
      bartop.style.width = barPosPC + "%";
    }
    
    setInterval(updateStatus,hbargraph.updateRate);

    return hbargraph;
  }

  function Vbargraph(curJSON){
    var vbargraph = document.createElement("div");
    vbargraph.setAttribute("class","vbargraph");
    vbargraph.min = Number(curJSON.min);
    vbargraph.max = Number(curJSON.max);
    vbargraph.range = Math.abs(vbargraph.max - vbargraph.min);
    vbargraph.address = curJSON.address;
    vbargraph.faustID = currentID;
    currentID++;
    vbargraph.updateRate = 50; // ms
    
    var barback = document.createElement("div");
    barback.setAttribute("class","barback");
    vbargraph.appendChild(barback);
    
    var bartop = document.createElement("div");
    bartop.setAttribute("class","bartop");
    barback.appendChild(bartop);
    
    function updateStatus(){
      if(faustDSP != null) {
        var barPosPC = (faustDSP.getParamValue(vbargraph.address)/vbargraph.range - vbargraph.min/vbargraph.range)*100;
      }
      else {
        /*
        var barPosPC = 
        (ipcRenderer.sendSync('getParamValue', vbargraph.faustID)/vbargraph.range - vbargraph.min/vbargraph.range)*100;
        */
      }
      bartop.style.height = barPosPC + "%";
    }
    
    setInterval(updateStatus,vbargraph.updateRate);

    return vbargraph;
  }

  function parseFaustUI(curJSON,curDiv){
    for(i=0; i<3; i++){
      defaultColor[i] += 25;
    }
    for(x in curJSON){
      // for UI elements configured with metadata
      var foundMetaStyle = false;
      if(curJSON[x].meta != null){
        for(y in curJSON[x].meta){
          if(curJSON[x].meta[y].style == "knob"){
            var knob = Knob(curJSON[x]);
            createUIElement(curDiv,knob,curJSON[x]);
            foundMetaStyle = true;
          }
        }
      }
      // for UI elements configured with primitives
      if(!foundMetaStyle){
        if(curJSON[x].type == "hgroup"){
          var group = Hgroup();
          createUIElement(curDiv,group,curJSON[x]);
          parseFaustUI(curJSON[x].items,group);
        }
        else if(curJSON[x].type == "vgroup"){
          var group = Vgroup();
          createUIElement(curDiv,group,curJSON[x]);
          parseFaustUI(curJSON[x].items,group);
        }
        else if(curJSON[x].type == "hslider"){
          var hslider = Hslider(curJSON[x]);
          createUIElement(curDiv,hslider,curJSON[x]);
        }
        else if(curJSON[x].type == "vslider"){
          var vslider = Vslider(curJSON[x]);
          createUIElement(curDiv,vslider,curJSON[x]);
        }
        else if(curJSON[x].type == "nentry"){
          var nentry = Nentry(curJSON[x]);
          createUIElement(curDiv,nentry,curJSON[x]);
        }
        else if(curJSON[x].type == "knob"){
          var knob = Knob(curJSON[x]);
          createUIElement(curDiv,knob,curJSON[x]);
        }
        else if(curJSON[x].type == "button"){
          var button = Button(curJSON[x]);
          curDiv.appendChild(button);
        }
        else if(curJSON[x].type == "checkbox"){
          var checkbox = Checkbox(curJSON[x]);
          curDiv.appendChild(checkbox);
        }
        else if(curJSON[x].type == "hbargraph"){
          var hbargraph = Hbargraph(curJSON[x]);
          createUIElement(curDiv,hbargraph,curJSON[x]);
        }
        else if(curJSON[x].type == "vbargraph"){
          var vbargraph = Vbargraph(curJSON[x]);
          createUIElement(curDiv,vbargraph,curJSON[x]);
        }
      }
    }
    for(i=0; i<3; i++){
      defaultColor[i] -= 25;
    }
  }
  
}
