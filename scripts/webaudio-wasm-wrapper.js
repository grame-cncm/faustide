
/*
 Code for native FaustNode : GRAME 2018
*/

'use strict';

var faust = faust || {};

faust.debug = false;

faust.error_msg = "";

// JSON parsing functions
faust.parse_ui = function(ui, obj)
{
    for (var i = 0; i < ui.length; i++) {
        this.parse_group(ui[i], obj);
    }
}

faust.parse_group = function(group, obj)
{
    if (group.items) {
        this.parse_items(group.items, obj);
    }
}

faust.parse_items = function(items, obj)
{
    for (var i = 0; i < items.length; i++) {
        this.parse_item(items[i], obj);
    }
}

faust.parse_item = function(item, obj)
{
    if (item.type === "vgroup"
        || item.type === "hgroup"
        || item.type === "tgroup") {
        this.parse_items(item.items, obj);
    } else if (item.type === "hbargraph"
               || item.type === "vbargraph") {
        // Keep bargraph adresses
        obj.outputs_items.push(item.address);
    } else if (item.type === "vslider"
               || item.type === "hslider"
               || item.type === "button"
               || item.type === "checkbox"
               || item.type === "nentry") {
        // Keep inputs adresses
        obj.inputs_items.push(item.address);
    }
}

faust.getErrorMessage = function() { return faust.error_msg; };

faust.getLibFaustVersion = function ()
{
    return "2.10.0";
}

faust.createDSPFactory = function (code, argv, callback)
{
    console.log("createDSPFactory");
 	callback(code); // Simply returns code
}

faust.createPolyDSPFactory = function (code, argv, callback)
{
    alert("createPolyDSPFactory not supported for now");
}

faust.expandDSP = function (code, argv)
{
    return code;
}

faust.deleteDSPFactory = function (factory) {};

faust.createDSPInstance = function (factory, context, buffer_size, callback)
{
    // Resume audio context each time...
    context.resume();
    try {
        var faust_node = context.createFaustNode(factory);
        faust_node.inputs_items = [];
        faust_node.outputs_items = [];
        
        // API adaptation
        faust_node.getJSON = function ()
        {
            return faust_node.json();
        }
        faust_node.setParamValue = function (path, val)
        {
            faust_node.setAudioParamValue(path, val);
        }
        faust_node.getParamValue = function (path)
        {
            alert("getParamValue not supported for now");
        }
        faust_node.setOutputParamHandler = function (handler)
        {
            //alert("setOutputParamHandler not supported for now");
        }
        faust_node.getOutputParamHandler = function ()
        {
            alert("getOutputParamHandler not supported for now");
            return null;
        }
        faust_node.getNumInputs = function ()
        {
            return faust_node.numberOfInputs;
        }
        faust_node.getNumOutputs = function ()
        {
            return faust_node.numberOfOutputs;
        }
        faust_node.getParams = function ()
        {
            var json_object = JSON.parse(faust_node.json());
            faust.parse_ui(json_object.ui, faust_node);
            return faust_node.inputs_items;
        }
        
        // Call continuation
        callback(faust_node);
        
    } catch (e) {
        console.log(e);
        callback(null);
    }
}

faust.deleteDSPInstance = function (dsp) {}

faust.createDSPWorkletInstance = function(factory, context, callback)
{
    alert("createDSPWorkletInstance not supported for now");
}

faust.deleteDSPWorkletInstance = function (dsp) {}

faust.createPolyDSPInstance = function (factory, context, buffer_size, polyphony, callback) 
{
	alert("createPolyDSPInstance not supported for now");
}

faust.deletePolyDSPInstance = function (dsp) {}

faust.createPolyDSPWorkletInstance = function(factory, context, polyphony, callback)
{
	alert("createPolyDSPWorkletInstance not supported for now");
}

faust.deletePolyDSPWorkletInstance = function (dsp) {}
