
/*
 Native glue code : GRAME 2018
*/

'use strict';

var faust = faust || {};

faust.debug = false;

faust.error_msg = "";

faust.getErrorMessage = function() { return faust.error_msg; };

faust.getLibFaustVersion = function ()
{
    return "2.10.0";
}

faust.createDSPFactory = function (code, argv, callback)
{
    // TODO
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
   	// TODO
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
