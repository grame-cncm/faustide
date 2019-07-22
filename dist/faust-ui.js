(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FaustUI"] = factory();
	else
		root["FaustUI"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Base.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Base.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component {\n  display: flex;\n  position: absolute;\n  flex-direction: column;\n  overflow: hidden; }\n  .faust-ui-component:focus {\n    outline: none; }\n  .faust-ui-component > .faust-ui-component-label {\n    position: relative;\n    margin-top: 4px;\n    max-width: 100%;\n    user-select: none; }\n    .faust-ui-component > .faust-ui-component-label > canvas {\n      position: relative;\n      display: block;\n      width: 100%;\n      height: 100%; }\n  .faust-ui-component input {\n    box-shadow: none; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Button.scss":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Button.scss ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-button > div {\n  display: flex;\n  position: relative;\n  cursor: pointer;\n  border-width: 1px;\n  text-align: center;\n  border-radius: 4px;\n  flex: 1 0 auto;\n  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);\n  border-style: solid; }\n  .faust-ui-component.faust-ui-component-button > div > span {\n    user-select: none;\n    margin: auto; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Checkbox.scss":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Checkbox.scss ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-checkbox > div {\n  display: flex;\n  position: relative;\n  cursor: pointer;\n  border-width: 1px;\n  text-align: center;\n  border-radius: 1px;\n  flex: 1 0 auto;\n  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);\n  border-style: solid; }\n  .faust-ui-component.faust-ui-component-checkbox > div > span {\n    margin: auto;\n    user-select: none; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Group.scss":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Group.scss ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-group {\n  position: absolute;\n  display: block;\n  background-color: rgba(80, 80, 80, 0.75);\n  border-radius: 4px;\n  border: 1px rgba(255, 255, 255, 0.25) solid; }\n  .faust-ui-group .faust-ui-group-label {\n    position: relative;\n    font-weight: bold;\n    margin: 4px;\n    font-size: 12px;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    max-width: 100%;\n    overflow: hidden;\n    user-select: none;\n    color: rgba(255, 255, 255, 0.7); }\n  .faust-ui-group .faust-ui-tgroup-tabs {\n    position: absolute;\n    display: inline-block; }\n    .faust-ui-group .faust-ui-tgroup-tabs .faust-ui-tgroup-tab {\n      position: relative;\n      display: inline-block;\n      border-radius: 5px;\n      cursor: pointer;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      user-select: none;\n      margin: 10px;\n      text-align: center;\n      background-color: rgba(255, 255, 255, 0.5); }\n      .faust-ui-group .faust-ui-tgroup-tabs .faust-ui-tgroup-tab:hover {\n        background-color: white; }\n      .faust-ui-group .faust-ui-tgroup-tabs .faust-ui-tgroup-tab.active {\n        background-color: #282828;\n        color: white; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/HBargraph.scss":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/HBargraph.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-hbargraph > .faust-ui-component-label {\n  flex: 0 0 auto; }\n\n.faust-ui-component.faust-ui-component-hbargraph > .faust-ui-component-hbargraph-flexdiv {\n  position: relative;\n  display: flex;\n  flex-direction: row-reverse;\n  flex: 1 1 auto;\n  width: 100%;\n  height: inherit; }\n  .faust-ui-component.faust-ui-component-hbargraph > .faust-ui-component-hbargraph-flexdiv > .faust-ui-component-hbargraph-canvasdiv {\n    position: relative;\n    display: block;\n    flex: 1 1 auto;\n    height: 100%;\n    margin: auto; }\n    .faust-ui-component.faust-ui-component-hbargraph > .faust-ui-component-hbargraph-flexdiv > .faust-ui-component-hbargraph-canvasdiv > canvas {\n      position: absolute;\n      display: block;\n      height: 100%;\n      width: 100%; }\n  .faust-ui-component.faust-ui-component-hbargraph > .faust-ui-component-hbargraph-flexdiv > input {\n    position: relative;\n    display: block;\n    flex: 0 1 auto;\n    text-align: center;\n    background-color: rgba(255, 255, 255, 0.25);\n    margin: auto 5px auto auto;\n    border-width: 0px;\n    border-radius: 4px;\n    width: calc(20% - 13px);\n    padding: 2px 4px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/HSlider.scss":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/HSlider.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-hslider > .faust-ui-component-label {\n  flex: 0 0 auto; }\n\n.faust-ui-component.faust-ui-component-hslider > .faust-ui-component-hslider-flexdiv {\n  position: relative;\n  display: flex;\n  flex-direction: row-reverse;\n  flex: 1 1 auto;\n  width: 100%;\n  height: auto; }\n  .faust-ui-component.faust-ui-component-hslider > .faust-ui-component-hslider-flexdiv > .faust-ui-component-hslider-canvasdiv {\n    position: relative;\n    display: block;\n    flex: 1 1 auto;\n    height: 100%;\n    margin: auto; }\n    .faust-ui-component.faust-ui-component-hslider > .faust-ui-component-hslider-flexdiv > .faust-ui-component-hslider-canvasdiv > canvas {\n      position: absolute;\n      display: block;\n      height: 100%;\n      width: 100%; }\n  .faust-ui-component.faust-ui-component-hslider > .faust-ui-component-hslider-flexdiv > input {\n    position: relative;\n    display: block;\n    flex: 0 1 auto;\n    text-align: center;\n    background-color: rgba(255, 255, 255, 0.25);\n    margin: auto 5px auto auto;\n    border-width: 0px;\n    border-radius: 4px;\n    width: calc(20% - 13px);\n    padding: 2px 4px;\n    -moz-appearance: textfield; }\n    .faust-ui-component.faust-ui-component-hslider > .faust-ui-component-hslider-flexdiv > input::-webkit-inner-spin-button, .faust-ui-component.faust-ui-component-hslider > .faust-ui-component-hslider-flexdiv > input::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n      margin: 0; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Knob.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Knob.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-knob {\n  align-items: center; }\n  .faust-ui-component.faust-ui-component-knob canvas {\n    position: relative;\n    display: block;\n    flex: 1 1 auto;\n    min-height: 50%;\n    width: 100%; }\n  .faust-ui-component.faust-ui-component-knob input {\n    position: relative;\n    display: block;\n    flex: 0 1 auto;\n    text-align: center;\n    background-color: rgba(255, 255, 255, 0.25);\n    margin: 0px;\n    border-width: 0px;\n    border-radius: 4px;\n    max-width: calc(100% - 8px);\n    padding: 2px 4px;\n    -moz-appearance: textfield; }\n    .faust-ui-component.faust-ui-component-knob input::-webkit-inner-spin-button, .faust-ui-component.faust-ui-component-knob input::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n      margin: 0; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Led.scss":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Led.scss ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-led {\n  align-items: center; }\n  .faust-ui-component.faust-ui-component-led > .faust-ui-component-label {\n    flex: 0 0 auto; }\n  .faust-ui-component.faust-ui-component-led > .faust-ui-component-led-canvasdiv {\n    position: relative;\n    display: block;\n    flex: 1 1 auto;\n    width: 100%; }\n    .faust-ui-component.faust-ui-component-led > .faust-ui-component-led-canvasdiv > canvas {\n      position: absolute;\n      display: block;\n      height: 100%;\n      width: 100%; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Menu.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Menu.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-menu {\n  align-items: center; }\n  .faust-ui-component.faust-ui-component-menu > select {\n    margin: 0px;\n    text-align: center;\n    border-width: 1px;\n    border-radius: 4px;\n    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);\n    padding: 2px 4px;\n    width: calc(100% - 8px); }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Nentry.scss":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Nentry.scss ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-nentry {\n  align-items: center; }\n  .faust-ui-component.faust-ui-component-nentry input {\n    margin: 0px;\n    text-align: center;\n    border-width: 1px;\n    border-radius: 4px;\n    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);\n    padding: 2px 4px;\n    width: calc(100% - 8px); }\n    .faust-ui-component.faust-ui-component-nentry input::-webkit-inner-spin-button, .faust-ui-component.faust-ui-component-nentry input::-webkit-outer-spin-button {\n      opacity: 1; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Numerical.scss":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Numerical.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-numerical {\n  align-items: center; }\n  .faust-ui-component.faust-ui-component-numerical > input {\n    position: relative;\n    display: block;\n    flex: 0 1 auto;\n    text-align: center;\n    background-color: rgba(255, 255, 255, 0.25);\n    margin: auto;\n    border-width: 0px;\n    border-radius: 4px;\n    width: calc(100% - 8px);\n    padding: 2px 4px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Radio.scss":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Radio.scss ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-radio {\n  align-items: center; }\n  .faust-ui-component.faust-ui-component-radio > .faust-ui-component-label {\n    flex: 0 0 auto;\n    margin-top: auto; }\n  .faust-ui-component.faust-ui-component-radio > .faust-ui-component-radio-group {\n    flex: 0 0 auto;\n    margin-bottom: auto;\n    border-width: 1px;\n    border-radius: 4px;\n    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);\n    padding: 2px 4px;\n    width: calc(100% - 8px); }\n    .faust-ui-component.faust-ui-component-radio > .faust-ui-component-radio-group > div {\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/VBargraph.scss":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/VBargraph.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-vbargraph {\n  align-items: center; }\n  .faust-ui-component.faust-ui-component-vbargraph > .faust-ui-component-label {\n    flex: 0 0 auto; }\n  .faust-ui-component.faust-ui-component-vbargraph > .faust-ui-component-vbargraph-flexdiv {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    flex: 1 1 auto;\n    width: 100%;\n    height: inherit; }\n    .faust-ui-component.faust-ui-component-vbargraph > .faust-ui-component-vbargraph-flexdiv > .faust-ui-component-vbargraph-canvasdiv {\n      position: relative;\n      display: block;\n      flex: 1 1 auto;\n      width: 100%; }\n      .faust-ui-component.faust-ui-component-vbargraph > .faust-ui-component-vbargraph-flexdiv > .faust-ui-component-vbargraph-canvasdiv > canvas {\n        position: absolute;\n        display: block;\n        height: 100%;\n        width: 100%; }\n    .faust-ui-component.faust-ui-component-vbargraph > .faust-ui-component-vbargraph-flexdiv > input {\n      position: relative;\n      display: block;\n      flex: 0 1 auto;\n      text-align: center;\n      background-color: rgba(255, 255, 255, 0.25);\n      margin: 5px auto auto auto;\n      border-width: 0px;\n      border-radius: 4px;\n      height: 5%;\n      width: calc(100% - 8px);\n      padding: 2px 4px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/VSlider.scss":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/VSlider.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-component.faust-ui-component-vslider {\n  align-items: center; }\n  .faust-ui-component.faust-ui-component-vslider > .faust-ui-component-label {\n    flex: 0 0 auto; }\n  .faust-ui-component.faust-ui-component-vslider > .faust-ui-component-vslider-flexdiv {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    flex: 1 1 auto;\n    width: 100%;\n    height: auto; }\n    .faust-ui-component.faust-ui-component-vslider > .faust-ui-component-vslider-flexdiv > .faust-ui-component-vslider-canvasdiv {\n      position: relative;\n      display: block;\n      flex: 1 1 auto;\n      width: 100%; }\n      .faust-ui-component.faust-ui-component-vslider > .faust-ui-component-vslider-flexdiv > .faust-ui-component-vslider-canvasdiv > canvas {\n        position: absolute;\n        display: block;\n        height: 100%;\n        width: 100%; }\n    .faust-ui-component.faust-ui-component-vslider > .faust-ui-component-vslider-flexdiv input {\n      position: relative;\n      display: block;\n      flex: 0 1 auto;\n      text-align: center;\n      background-color: rgba(255, 255, 255, 0.25);\n      margin: 5px auto auto auto;\n      border-width: 0px;\n      border-radius: 4px;\n      height: 5%;\n      max-width: calc(100% - 8px);\n      padding: 2px 4px;\n      -moz-appearance: textfield; }\n      .faust-ui-component.faust-ui-component-vslider > .faust-ui-component-vslider-flexdiv input::-webkit-inner-spin-button, .faust-ui-component.faust-ui-component-vslider > .faust-ui-component-vslider-flexdiv input::-webkit-outer-spin-button {\n        -webkit-appearance: none;\n        margin: 0; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/index.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/index.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".faust-ui-root {\n  margin: 0px auto;\n  flex: 1 0 auto;\n  position: relative !important;\n  background-color: transparent !important;\n  border: none !important;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/FaustUI.ts":
/*!************************!*\
  !*** ./src/FaustUI.ts ***!
  \************************/
/*! exports provided: FaustUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaustUI", function() { return FaustUI; });
/* harmony import */ var _layout_Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/Layout */ "./src/layout/Layout.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Group */ "./src/components/Group.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * The main class of UI constructor,
 * listening to `resize` window event to resize component,
 * listening to `message` window event to change UI or param value.
 * See readme.
 *
 * @export
 * @class FaustUI
 */
class FaustUI {
  /**
   * Calculate incoming UI's layout, bind window events
   * @param {TOptions} options
   * @memberof FaustUI
   */
  constructor(options) {
    _defineProperty(this, "componentMap", {});

    _defineProperty(this, "DOMroot", void 0);

    _defineProperty(this, "faustUIRoot", void 0);

    _defineProperty(this, "hostWindow", void 0);

    _defineProperty(this, "grid", void 0);

    _defineProperty(this, "_ui", void 0);

    _defineProperty(this, "_layout", void 0);

    _defineProperty(this, "paramChangeByUI", (path, value) => {
      if (!this.hostWindow) return;
      this.hostWindow.postMessage({
        path,
        value,
        type: "param"
      }, "*");
    });

    var root = options.root,
        uiIn = options.ui;
    this.DOMroot = root;
    this.ui = uiIn || [];
    window.addEventListener("resize", () => {
      this.resize();
    });
    window.addEventListener("message", e => {
      var data = e.data,
          source = e.source;
      this.hostWindow = source;
      var type = data.type;
      if (!type) return;

      if (type === "ui") {
        this.ui = data.ui;
      } else if (type === "param") {
        var _path = data.path,
            value = data.value;
        this.paramChangeByDSP(_path, value);
      }
    });
  }
  /**
   * Render the UI to DOM root
   *
   * @memberof FaustUI
   */


  mount() {
    this.componentMap = {};
    this.DOMroot.innerHTML = "";
    var props = {
      label: "",
      type: "vgroup",
      items: this.ui,
      style: {
        grid: this.grid,
        width: this.layout.width,
        height: this.layout.height,
        left: this.layout.offsetLeft,
        top: this.layout.offsetTop
      },
      isRoot: true,
      emitter: this
    };
    this.faustUIRoot = new _components_Group__WEBPACK_IMPORTED_MODULE_2__["Group"](props);
    this.faustUIRoot.componentWillMount();
    this.faustUIRoot.mount();
    this.DOMroot.appendChild(this.faustUIRoot.container);
    this.faustUIRoot.componentDidMount();
  }
  /**
   * This method should be called by components to register itself to map.
   *
   * @param {string} path
   * @param {AbstractItem<any>} item
   * @memberof FaustUI
   */


  register(path, item) {
    if (this.componentMap[path]) this.componentMap[path].push(item);else this.componentMap[path] = [item];
  }
  /**
   * Notify the component to change its value.
   *
   * @param {string} path
   * @param {number} value
   * @memberof FaustUI
   */


  paramChangeByDSP(path, value) {
    if (this.componentMap[path]) this.componentMap[path].forEach(item => item.setState({
      value
    }));
  }
  /**
   * Can be overriden, called by components when its value is changed by user.
   *
   * @memberof FaustUI
   */


  /**
   * Calculate UI layout in grid then calculate grid size.
   *
   * @memberof FaustUI
   */
  calc() {
    var _Layout$calc = _layout_Layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].calc(this.ui),
        items = _Layout$calc.items,
        layout = _Layout$calc.layout;

    this._ui = items;
    this._layout = layout;
    this.calcGrid();
  }
  /**
   * Calculate grid size by DOM root size and layout size in grids.
   *
   * @returns
   * @memberof FaustUI
   */


  calcGrid() {
    var _this$DOMroot$getBoun = this.DOMroot.getBoundingClientRect(),
        width = _this$DOMroot$getBoun.width,
        height = _this$DOMroot$getBoun.height;

    var grid = Math.max(40, Math.min(width / this._layout.width, height / this._layout.height));
    this.grid = grid;
    return grid;
  }
  /**
   * Force recalculate grid size and resize UI
   *
   * @returns
   * @memberof FaustUI
   */


  resize() {
    if (!this.faustUIRoot) return;
    this.calcGrid();
    this.faustUIRoot.setState({
      style: {
        grid: this.grid
      }
    });
  }

  get ui() {
    return this._ui;
  }

  set ui(uiIn) {
    this._ui = uiIn;
    this.calc();
    this.mount();
  }

  get layout() {
    return this._layout;
  }

}

/***/ }),

/***/ "./src/components/AbstractComponent.ts":
/*!*********************************************!*\
  !*** ./src/components/AbstractComponent.ts ***!
  \*********************************************/
/*! exports provided: AbstractComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractComponent", function() { return AbstractComponent; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class AbstractComponent extends events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] {
  on(type, listener) {
    return super.on(type, listener);
  }

  once(type, listener) {
    return super.once(type, listener);
  }

  off(type, listener) {
    return super.off(type, listener);
  }

  removeAllListeners(type) {
    return super.removeAllListeners(type);
  }

  emit(type, e) {
    return super.emit(type, e);
  }
  /**
   * The default state of the component.
   *
   * @static
   * @type {{ [key: string]: any }}
   * @memberof Component
   */


  get defaultProps() {
    return this.constructor.defaultProps;
  }
  /**
   * Here stores corrent state of component
   * change the state with `setState` method to fire state events
   * then UI parts will get notified and rerender
   *
   * @type {T}
   * @memberof Component
   */


  /**
   * Initiate default state with incoming state.
   * @param {T} [props]
   * @memberof AbstractItem
   */
  constructor(props) {
    super();

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "$frame", 0);

    _defineProperty(this, "frameReduce", 1);

    _defineProperty(this, "$raf", void 0);

    _defineProperty(this, "raf", () => {
      this.$frame++;

      if (this.$frame % this.frameReduce !== 0) {
        if (this.$raf) window.cancelAnimationFrame(this.$raf);
        this.$raf = window.requestAnimationFrame(this.raf);
        return;
      }

      this.tasks.forEach(f => f());
      this.tasks = [];
    });

    _defineProperty(this, "tasks", []);

    this.state = _objectSpread({}, this.defaultProps, {}, props);
    return this;
  }
  /**
   * set internal state and fire events for UI parts subscribed
   *
   * @param {{ [K in keyof T]?: T[K] }} newState
   * @returns
   * @memberof Component
   */


  setState(newState) {
    var shouldUpdate = false;

    for (var _key in newState) {
      var stateKey = _key;
      var stateValue = newState[stateKey];

      if (stateKey in this.state && this.state[stateKey] !== stateValue) {
        this.state[stateKey] = stateValue;
        shouldUpdate = true;
      } else return;

      if (shouldUpdate) this.emit(stateKey, this.state[stateKey]);
    }
  }
  /**
   * Use this method to request a new rendering
   * schedule what you need to do in next render tick in `raf` callback
   *
   * @returns
   * @memberof Component
   */


  schedule(func) {
    if (this.tasks.indexOf(func) === -1) this.tasks.push(func);
    if (this.$raf) window.cancelAnimationFrame(this.$raf);
    this.$raf = window.requestAnimationFrame(this.raf);
  }

}

_defineProperty(AbstractComponent, "defaultProps", {});

/***/ }),

/***/ "./src/components/AbstractItem.ts":
/*!****************************************!*\
  !*** ./src/components/AbstractItem.ts ***!
  \****************************************/
/*! exports provided: AbstractItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractItem", function() { return AbstractItem; });
/* harmony import */ var _Base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.scss */ "./src/components/Base.scss");
/* harmony import */ var _Base_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Base_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractComponent */ "./src/components/AbstractComponent.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/components/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-unused-vars */



/**
 * Abstract class that describes a FaustUI Component
 * this is an event emitter that emits every state change to inform UI renderer parts
 * Each UI parts could subscribe to a specific state such as `value`, `min`, `max` or `style`
 * when the event subscribed is fired, this part of ui updated using its own handler without updating the rest of UI parts
 * the types of events is restricted to the same as keys of `state` object:
 * `state` object is a `FaustUIItemProps` with a `style` object that contains `T` defined by child class.
 * Child class can override life cycle methods
 * `componentWillMount` prepare data before DOM get loads to page
 * `mount` get DOMs append to page
 * `componentDidMount` Now draw canvas etc.
 *
 * @export
 * @abstract
 * @class AbstractItem
 * @extends {EventEmitter}
 * @template T
 */

class AbstractItem extends _AbstractComponent__WEBPACK_IMPORTED_MODULE_1__["AbstractComponent"] {
  /**
   * The default state of the component.
   *
   * @static
   * @type {FaustUIItemProps<FaustUIItemStyle>}
   * @memberof AbstractItem
   */

  /**
   * DOM Div container of label canvas
   *
   * @type {HTMLDivElement}
   * @memberof AbstractItem
   */

  /**
   * Use canvas as label to fit full text in.
   *
   * @type {HTMLCanvasElement}
   * @memberof AbstractItem
   */

  /**
   * Override this to get css work
   *
   * @type {string}
   * @memberof AbstractItem
   */

  /**
   * Default DOM event listeners, unify mousedown and touchstart events
   * For mouse or touch events, please use `handlePointerDown` `handlePointerUp` `handlePointerDrag` callbacks
   */

  /**
   * Initiate default state with incoming state.
   * @param {FaustUIItemProps<T>} [props]
   * @memberof AbstractItem
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "label", void 0);

    _defineProperty(this, "labelCanvas", void 0);

    _defineProperty(this, "labelCtx", void 0);

    _defineProperty(this, "className", void 0);

    _defineProperty(this, "frameReduce", 3);

    _defineProperty(this, "handleKeyDown", e => {});

    _defineProperty(this, "handleKeyUp", e => {});

    _defineProperty(this, "handleTouchStart", e => {
      e.preventDefault();
      var rect = e.currentTarget.getBoundingClientRect();
      var prevX = e.touches[0].pageX;
      var prevY = e.touches[0].pageY;
      var fromX = prevX - rect.left;
      var fromY = prevY - rect.top;
      var prevValue = this.state.value;
      this.handlePointerDown({
        x: fromX,
        y: fromY,
        originalEvent: e
      });

      var handleTouchMove = e => {
        e.preventDefault();
        var pageX = e.changedTouches[0].pageX;
        var pageY = e.changedTouches[0].pageY;
        var movementX = pageX - prevX;
        var movementY = pageY - prevY;
        prevX = pageX;
        prevY = pageY;
        var x = pageX - rect.left;
        var y = pageY - rect.top;
        this.handlePointerDrag({
          prevValue,
          x,
          y,
          fromX,
          fromY,
          movementX,
          movementY,
          originalEvent: e
        });
      };

      var handleTouchEnd = e => {
        e.preventDefault();
        var x = e.changedTouches[0].pageX - rect.left;
        var y = e.changedTouches[0].pageY - rect.top;
        this.handlePointerUp({
          x,
          y,
          originalEvent: e
        });
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false
      });
      document.addEventListener("touchend", handleTouchEnd, {
        passive: false
      });
    });

    _defineProperty(this, "handleWheel", e => {});

    _defineProperty(this, "handleClick", e => {});

    _defineProperty(this, "handleMouseDown", e => {
      e.preventDefault();
      e.currentTarget.focus();
      var rect = e.currentTarget.getBoundingClientRect();
      var fromX = e.pageX - rect.left;
      var fromY = e.pageY - rect.top;
      var prevValue = this.state.value;
      this.handlePointerDown({
        x: fromX,
        y: fromY,
        originalEvent: e
      });

      var handleMouseMove = e => {
        e.preventDefault();
        var x = e.pageX - rect.left;
        var y = e.pageY - rect.top;
        this.handlePointerDrag({
          prevValue,
          x,
          y,
          fromX,
          fromY,
          movementX: e.movementX,
          movementY: e.movementY,
          originalEvent: e
        });
      };

      var handleMouseUp = e => {
        e.preventDefault();
        var x = e.pageX - rect.left;
        var y = e.pageY - rect.top;
        this.handlePointerUp({
          x,
          y,
          originalEvent: e
        });
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });

    _defineProperty(this, "handleMouseOver", e => {});

    _defineProperty(this, "handleMouseOut", e => {});

    _defineProperty(this, "handleContextMenu", e => {});

    _defineProperty(this, "handlePointerDown", e => {});

    _defineProperty(this, "handlePointerDrag", e => {});

    _defineProperty(this, "handlePointerUp", e => {});

    _defineProperty(this, "handleFocusIn", e => this.setState({
      focus: true
    }));

    _defineProperty(this, "handleFocusOut", e => this.setState({
      focus: false
    }));

    this.state.style = _objectSpread({}, this.defaultProps.style, {}, props.style);
    if (this.state.emitter) this.state.emitter.register(this.state.address, this);
    return this;
  }
  /**
   * Get a nearest valid number
   *
   * @param {number} value
   * @returns {number}
   * @memberof AbstractItem
   */


  toValidNumber(value) {
    var _this$state = this.state,
        min = _this$state.min,
        max = _this$state.max,
        step = _this$state.step;
    if (typeof min !== "number" || typeof max !== "number") return value;
    var v = Math.min(max, Math.max(min, value));
    if (!step) return v;
    return min + Math.round((v - min) / step) * step;
  }
  /**
   * Use this method if you want the emitter to send value to DSP
   *
   * @param {number} valueIn
   * @returns {boolean}
   * @memberof AbstractItem
   */


  setValue(valueIn) {
    var value = this.toValidNumber(valueIn);
    var changed = this.setState({
      value
    });
    if (changed) this.change(value);
    return changed;
  }
  /**
   * Send value to DSP
   *
   * @param {number} [valueIn]
   * @memberof AbstractItem
   */


  change(valueIn) {
    if (this.state.emitter) this.state.emitter.paramChangeByUI(this.state.address, typeof valueIn === "number" ? valueIn : this.state.value);
  }
  /**
   * set internal state and fire events for UI parts subscribed
   * This will not send anything to DSP
   *
   * @param {{ [key in keyof FaustUIItemProps<T>]?: FaustUIItemProps<T>[key] }} newState
   * @returns {boolean} - is state updated
   * @memberof AbstractItem
   */


  setState(newState) {
    var shouldUpdate = false;

    for (var _key in newState) {
      var stateKey = _key;
      var stateValue = newState[stateKey];

      if (stateKey === "style") {
        for (var styleKey in newState.style) {
          if (styleKey in this.state.style && this.state.style[styleKey] !== newState.style[styleKey]) {
            this.state.style[styleKey] = newState.style[styleKey];
            shouldUpdate = true;
          }
        }
      } else if (stateKey in this.state && this.state[stateKey] !== stateValue) {
        this.state[stateKey] = stateValue;
        shouldUpdate = true;
      } else return false;

      if (shouldUpdate) this.emit(stateKey, this.state[stateKey]);
    }

    return shouldUpdate;
  }
  /**
   * Create container with class name
   * override it with `super.componentWillMount();`
   *
   * @returns {this}
   * @memberof AbstractItem
   */


  componentWillMount() {
    this.container = document.createElement("div");
    this.container.className = ["faust-ui-component", "faust-ui-component-" + this.className].join(" ");
    this.container.tabIndex = 1;
    this.container.id = this.state.address;
    if (this.state.tooltip) this.container.title = this.state.tooltip;
    this.label = document.createElement("div");
    this.label.className = "faust-ui-component-label";
    this.labelCanvas = document.createElement("canvas");
    this.labelCtx = this.labelCanvas.getContext("2d");
    return this;
  }
  /**
   * Here append all child DOM to container
   *
   * @returns {this}
   * @memberof AbstractItem
   */


  mount() {
    this.label.appendChild(this.labelCanvas);
    return this;
  }

  paintLabel() {
    var label = this.state.label;
    var color = this.state.style.labelcolor;
    var ctx = this.labelCtx;
    var canvas = this.labelCanvas;

    var _this$label$getBoundi = this.label.getBoundingClientRect(),
        width = _this$label$getBoundi.width,
        height = _this$label$getBoundi.height;

    if (!width || !height) return this;
    width = Math.floor(width);
    height = Math.floor(height);
    canvas.height = height;
    canvas.width = width;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.font = "bold ".concat(height * 0.9, "px -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"");
    ctx.fillText(label, 0, height / 2, width);
    return this;
  }
  /**
   * will call this method when mounted
   *
   * @returns {this}
   * @memberof AbstractItem
   */


  componentDidMount() {
    var handleResize = () => {
      var _this$state$style = this.state.style,
          grid = _this$state$style.grid,
          left = _this$state$style.left,
          top = _this$state$style.top,
          width = _this$state$style.width,
          height = _this$state$style.height;
      this.container.style.width = "".concat(width * grid, "px");
      this.container.style.height = "".concat(height * grid, "px");
      this.container.style.left = "".concat(left * grid, "px");
      this.container.style.top = "".concat(top * grid, "px");
      this.label.style.height = "".concat(grid * 0.25, "px");
      this.paintLabel();
    };

    this.on("style", () => this.schedule(handleResize));
    handleResize();
    return this;
  }
  /**
   * Count steps in range min-max with step
   *
   * @readonly
   * @memberof AbstractItem
   */


  get stepsCount() {
    var _this$state2 = this.state,
        type = _this$state2.type,
        max = _this$state2.max,
        min = _this$state2.min,
        step = _this$state2.step,
        enums = _this$state2.enums;
    var maxSteps = type === "enum" ? enums.length : type === "int" ? max - min : (max - min) / step;

    if (step) {
      if (type === "enum") return enums.length;
      if (type === "int") return Math.min(Math.floor((max - min) / (Math.round(step) || 1)), maxSteps);
      return Math.floor((max - min) / step);
    }

    return maxSteps;
  }
  /**
   * Normalized value between 0 - 1.
   *
   * @readonly
   * @memberof AbstractItem
   */


  get distance() {
    var _this$state3 = this.state,
        type = _this$state3.type,
        max = _this$state3.max,
        min = _this$state3.min,
        value = _this$state3.value,
        enums = _this$state3.enums,
        scale = _this$state3.scale;
    return AbstractItem.getDistance({
      type,
      max,
      min,
      value,
      enums,
      scale
    });
  }

  static getDistance(state) {
    var type = state.type,
        max = state.max,
        min = state.min,
        value = state.value,
        enums = state.enums,
        scale = state.scale;
    var normalized = type === "enum" ? value / enums.length : (value - min) / (max - min);
    return scale === "exp" ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normLog"])(normalized) : scale === "log" ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normExp"])(normalized) : normalized;
  }
  /**
   * Mousemove pixels for each step
   *
   * @readonly
   * @memberof AbstractItem
   */


  get stepRange() {
    var full = 100;
    var stepsCount = this.stepsCount;
    return full / stepsCount;
  }

}

_defineProperty(AbstractItem, "defaultProps", {
  value: 0,
  active: true,
  focus: false,
  label: "",
  address: "",
  min: 0,
  max: 1,
  enums: {},
  type: "float",
  unit: "",
  scale: "linear",
  step: 0.01,
  style: {
    width: 45,
    height: 15,
    left: 0,
    top: 0,
    labelcolor: "rgba(226, 222, 255, 0.5)"
  }
  /**
   * DOM Div container of the component
   *
   * @type {HTMLDivElement}
   * @memberof AbstractItem
   */

});

/***/ }),

/***/ "./src/components/Base.scss":
/*!**********************************!*\
  !*** ./src/components/Base.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Base.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Base.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Button.scss":
/*!************************************!*\
  !*** ./src/components/Button.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Button.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Button.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Button.ts":
/*!**********************************!*\
  !*** ./src/components/Button.ts ***!
  \**********************************/
/*! exports provided: Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _Button_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button.scss */ "./src/components/Button.scss");
/* harmony import */ var _Button_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Button_scss__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Button extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "button");

    _defineProperty(this, "btn", void 0);

    _defineProperty(this, "span", void 0);

    _defineProperty(this, "setStyle", () => {
      var _this$state = this.state,
          value = _this$state.value,
          style = _this$state.style;
      var height = style.height,
          grid = style.grid,
          fontsize = style.fontsize,
          fontname = style.fontname,
          fontface = style.fontface,
          textcolor = style.textcolor,
          textoncolor = style.textoncolor,
          bgoncolor = style.bgoncolor,
          bgcolor = style.bgcolor,
          bordercolor = style.bordercolor,
          borderoncolor = style.borderoncolor;
      this.btn.style.backgroundColor = value ? bgoncolor : bgcolor;
      this.btn.style.borderColor = value ? borderoncolor : bordercolor;
      this.btn.style.color = value ? textoncolor : textcolor;
      this.btn.style.fontSize = "".concat(fontsize || height * grid / 4, "px");
      this.btn.style.fontFamily = "".concat(fontname, ", sans-serif");
      this.btn.style.fontStyle = fontface;
    });

    _defineProperty(this, "handlePointerDown", () => {
      this.setValue(1);
    });

    _defineProperty(this, "handlePointerUp", () => {
      this.setValue(0);
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "normal",
        bgcolor: "rgba(40, 40, 40, 1)",
        bgoncolor: "rgba(18, 18, 18, 1)",
        bordercolor: "rgba(80, 80, 80, 1)",
        borderoncolor: "rgba(255, 165, 0, 1)",
        textcolor: "rgba(226, 222, 255, 0.5)",
        textoncolor: "rgba(255, 165, 0, 1)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.btn = document.createElement("div");
    this.span = document.createElement("span");
    this.span.innerText = this.state.label;
    this.setStyle();
    return this;
  }

  mount() {
    this.btn.appendChild(this.span);
    this.container.appendChild(this.btn);
    return super.mount();
  }

  componentDidMount() {
    super.componentDidMount();
    this.btn.addEventListener("mousedown", this.handleMouseDown);
    this.btn.addEventListener("touchstart", this.handleTouchStart);
    this.on("style", () => this.schedule(this.setStyle));

    var labelChange = () => this.span.innerText = this.state.label;

    this.on("label", () => this.schedule(labelChange));
    this.on("value", () => this.schedule(this.setStyle));
    return this;
  }

}

/***/ }),

/***/ "./src/components/Checkbox.scss":
/*!**************************************!*\
  !*** ./src/components/Checkbox.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Checkbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Checkbox.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Checkbox.ts":
/*!************************************!*\
  !*** ./src/components/Checkbox.ts ***!
  \************************************/
/*! exports provided: Checkbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return Checkbox; });
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ "./src/components/Button.ts");
/* harmony import */ var _Checkbox_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Checkbox.scss */ "./src/components/Checkbox.scss");
/* harmony import */ var _Checkbox_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Checkbox_scss__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Checkbox extends _Button__WEBPACK_IMPORTED_MODULE_0__["Button"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "checkbox");

    _defineProperty(this, "handlePointerDown", () => {
      this.setValue(1 - this.state.value);
    });

    _defineProperty(this, "handlePointerUp", () => {});
  }

}

/***/ }),

/***/ "./src/components/Group.scss":
/*!***********************************!*\
  !*** ./src/components/Group.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Group.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Group.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Group.ts":
/*!*********************************!*\
  !*** ./src/components/Group.ts ***!
  \*********************************/
/*! exports provided: Group */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return Group; });
/* harmony import */ var _AbstractComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractComponent */ "./src/components/AbstractComponent.ts");
/* harmony import */ var _HSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HSlider */ "./src/components/HSlider.ts");
/* harmony import */ var _VSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VSlider */ "./src/components/VSlider.ts");
/* harmony import */ var _Nentry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Nentry */ "./src/components/Nentry.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button */ "./src/components/Button.ts");
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Checkbox */ "./src/components/Checkbox.ts");
/* harmony import */ var _Knob__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Knob */ "./src/components/Knob.ts");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Menu */ "./src/components/Menu.ts");
/* harmony import */ var _Radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Radio */ "./src/components/Radio.ts");
/* harmony import */ var _Led__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Led */ "./src/components/Led.ts");
/* harmony import */ var _Numerical__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Numerical */ "./src/components/Numerical.ts");
/* harmony import */ var _HBargraph__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./HBargraph */ "./src/components/HBargraph.ts");
/* harmony import */ var _VBargraph__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./VBargraph */ "./src/components/VBargraph.ts");
/* harmony import */ var _layout_Layout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../layout/Layout */ "./src/layout/Layout.ts");
/* harmony import */ var _Group_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Group.scss */ "./src/components/Group.scss");
/* harmony import */ var _Group_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_Group_scss__WEBPACK_IMPORTED_MODULE_14__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















class Group extends _AbstractComponent__WEBPACK_IMPORTED_MODULE_0__["AbstractComponent"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "label", void 0);

    _defineProperty(this, "tabs", void 0);

    _defineProperty(this, "children", void 0);

    _defineProperty(this, "layout", void 0);

    _defineProperty(this, "updateUI", () => {
      this.children = [];
      var _this$state = this.state,
          label = _this$state.label,
          style = _this$state.style,
          type = _this$state.type,
          items = _this$state.items,
          emitter = _this$state.emitter,
          isRoot = _this$state.isRoot;
      var grid = style.grid,
          left = style.left,
          top = style.top,
          width = style.width,
          height = style.height;
      this.label.innerText = label;
      this.label.title = label;
      this.label.style.fontSize = "".concat(0.25 * grid, "px");
      this.container.style.left = "".concat(left * grid, "px");
      this.container.style.top = "".concat(top * grid, "px");
      this.container.style.width = "".concat(width * grid, "px");
      this.container.style.height = "".concat(height * grid, "px");
      this.container.className = ["faust-ui-group", "faust-ui-".concat(type), "".concat(isRoot ? "faust-ui-root" : "")].join(" ");
      items.forEach(item => {
        if (item.type.endsWith("group")) {
          var component = Group.getComponent(item, emitter, grid);
          if (component) this.children.push(component);
        } else {
          var ioItem = item;
          var itemComponent = Group.getComponent(ioItem, this.state.emitter, grid);
          if (itemComponent) this.children.push(itemComponent);
        }
      });

      if (type === "tgroup") {
        this.tabs.innerHTML = "";
        this.tabs.style.height = "".concat(grid, "px");
        this.tabs.style.top = "".concat(0.25 * grid, "px");
        this.state.items.forEach((item, i) => {
          var label = item.label;
          var tab = document.createElement("span");
          tab.innerText = label;
          tab.className = "faust-ui-tgroup-tab";
          tab.style.fontSize = "".concat(0.25 * grid, "px");
          tab.style.width = "".concat(2 * grid - 10, "px");
          tab.style.height = "".concat(grid - 10, "px");
          tab.style.lineHeight = "".concat(grid - 10, "px");
          tab.addEventListener("click", () => {
            var groups = [];

            for (var j = 0; j < this.container.children.length; j++) {
              var element = this.container.children[j];
              if (element.classList.contains("faust-ui-group")) groups.push(element);
            }

            for (var _j = 0; _j < groups.length; _j++) {
              var _element = groups[_j];
              _element.style.visibility = i === _j ? "visible" : "hidden";
            }

            for (var _j2 = 0; _j2 < this.tabs.children.length; _j2++) {
              var e = this.tabs.children[_j2];

              if (i !== _j2) {
                if (e.classList.contains("active")) e.classList.remove("active");
              } else e.classList.add("active");
            }
          });
          this.tabs.appendChild(tab);
        });
      }
    });
  }

  static parseMeta(metaIn) {
    var metaObject = {};
    if (!metaIn) return {
      metaObject
    };
    metaIn.forEach(m => Object.assign(metaObject, m));

    if (metaObject.style) {
      var enumsRegex = /\{(?:(?:'|_)(.+?)(?:'|_):([-+]?[0-9]*\.?[0-9]+?);)+(?:(?:'|_)(.+?)(?:'|_):([-+]?[0-9]*\.?[0-9]+?))\}/;
      var matched = metaObject.style.match(enumsRegex);

      if (matched) {
        var enums = {};

        for (var i = 1; i < matched.length; i += 2) {
          enums[matched[i]] = +matched[i + 1];
        }

        return {
          metaObject,
          enums
        };
      }
    }

    return {
      metaObject
    };
  }

  static getComponent(item, emitter, grid) {
    var type = _layout_Layout__WEBPACK_IMPORTED_MODULE_13__["Layout"].predictType(item);

    if (type.endsWith("group")) {
      var _ref = item,
          _label = _ref.label,
          items = _ref.items,
          _type = _ref.type,
          _layout = _ref.layout;
      var _props = {
        label: _label,
        type: _type,
        items,
        style: {
          grid,
          width: _layout.width,
          height: _layout.height,
          left: _layout.offsetLeft,
          top: _layout.offsetTop
        },
        emitter
      };
      return new Group(_props);
    }

    var ioItem = item;

    var _this$parseMeta = this.parseMeta(ioItem.meta),
        metaObject = _this$parseMeta.metaObject,
        enums = _this$parseMeta.enums;

    var tooltip = metaObject.tooltip,
        unit = metaObject.unit,
        scale = metaObject.scale;
    var label = ioItem.label,
        min = ioItem.min,
        max = ioItem.max,
        address = ioItem.address,
        layout = ioItem.layout;
    var props = {
      label,
      address,
      tooltip,
      unit,
      scale: scale || "linear",
      emitter,
      enums,
      style: {
        grid,
        width: layout.width,
        height: layout.height,
        left: layout.offsetLeft,
        top: layout.offsetTop
      },
      type: "float",
      min: isFinite(+min) ? +min : Number.MIN_VALUE,
      max: isFinite(+max) ? +max : Number.MAX_VALUE,
      step: "step" in item ? +item.step : 1,
      value: "init" in item ? +item.init || 0 : 0
    };
    if (type === "button") return new _Button__WEBPACK_IMPORTED_MODULE_4__["Button"](props);
    if (type === "checkbox") return new _Checkbox__WEBPACK_IMPORTED_MODULE_5__["Checkbox"](props);
    if (type === "nentry") return new _Nentry__WEBPACK_IMPORTED_MODULE_3__["Nentry"](props);
    if (type === "knob") return new _Knob__WEBPACK_IMPORTED_MODULE_6__["Knob"](props);
    if (type === "menu") return new _Menu__WEBPACK_IMPORTED_MODULE_7__["Menu"](props);
    if (type === "radio") return new _Radio__WEBPACK_IMPORTED_MODULE_8__["Radio"](props);
    if (type === "hslider") return new _HSlider__WEBPACK_IMPORTED_MODULE_1__["HSlider"](props);
    if (type === "vslider") return new _VSlider__WEBPACK_IMPORTED_MODULE_2__["VSlider"](props);
    if (type === "hbargraph") return new _HBargraph__WEBPACK_IMPORTED_MODULE_11__["HBargraph"](props);
    if (type === "vbargraph") return new _VBargraph__WEBPACK_IMPORTED_MODULE_12__["VBargraph"](props);
    if (type === "numerical") return new _Numerical__WEBPACK_IMPORTED_MODULE_10__["Numerical"](props);
    if (type === "led") return new _Led__WEBPACK_IMPORTED_MODULE_9__["Led"](props);
    return null;
  }
  /**
   * DOM Div container of the group
   *
   * @type {HTMLDivElement}
   * @memberof AbstractItem
   */


  setState(newState) {
    var shouldUpdate = false;

    for (var _key in newState) {
      var stateKey = _key;
      var stateValue = newState[stateKey];

      if (stateKey === "style") {
        for (var _key2 in newState.style) {
          var styleKey = _key2;

          if (styleKey in this.state.style && this.state.style[styleKey] !== newState.style[styleKey]) {
            this.state.style[styleKey] = newState.style[styleKey];
            shouldUpdate = true;
          }
        }
      } else if (stateKey in this.state && this.state[stateKey] !== stateValue) {
        this.state[stateKey] = stateValue;
        shouldUpdate = true;
      } else return;

      if (shouldUpdate) this.emit(stateKey, this.state[stateKey]);
    }
  }

  componentWillMount() {
    this.container = document.createElement("div");
    this.tabs = document.createElement("div");
    this.tabs.className = "faust-ui-tgroup-tabs";
    this.label = document.createElement("div");
    this.label.className = "faust-ui-group-label";
    this.updateUI();
    this.children.forEach(item => item.componentWillMount());
    return this;
  }

  mount() {
    this.container.appendChild(this.label);
    if (this.tabs.children.length) this.container.appendChild(this.tabs);
    this.children.forEach(item => {
      item.mount();
      this.container.appendChild(item.container);
    });
    return this;
  }

  componentDidMount() {
    var handleResize = () => {
      var _this$state$style = this.state.style,
          grid = _this$state$style.grid,
          left = _this$state$style.left,
          top = _this$state$style.top,
          width = _this$state$style.width,
          height = _this$state$style.height;
      this.label.style.fontSize = "".concat(0.25 * grid, "px");
      this.container.style.width = "".concat(width * grid, "px");
      this.container.style.height = "".concat(height * grid, "px");
      this.container.style.left = "".concat(left * grid, "px");
      this.container.style.top = "".concat(top * grid, "px");

      if (this.state.type === "tgroup") {
        this.tabs.style.height = "".concat(grid, "px");
        this.tabs.style.top = "".concat(0.25 * grid, "px");

        for (var i = 0; i < this.tabs.children.length; i++) {
          var tab = this.tabs.children[i];
          tab.style.fontSize = "".concat(0.25 * grid, "px");
          tab.style.width = "".concat(2 * grid - 10, "px");
          tab.style.height = "".concat(grid - 10, "px");
          tab.style.lineHeight = "".concat(grid - 10, "px");
        }
      }

      this.children.forEach(item => item.setState({
        style: {
          grid
        }
      }));
    };

    this.on("style", () => this.schedule(handleResize));

    var itemsChange = () => {
      this.updateUI();
      this.children.forEach(item => item.componentWillMount());
    };

    this.on("items", () => this.schedule(itemsChange));

    var labelChange = () => {
      this.label.innerText = this.state.label;
      this.label.title = this.state.label;
    };

    this.on("label", () => this.schedule(labelChange));
    if (this.tabs && this.tabs.children.length) this.tabs.children[0].click();
    this.children.forEach(item => item.componentDidMount());
    return this;
  }

}

/***/ }),

/***/ "./src/components/HBargraph.scss":
/*!***************************************!*\
  !*** ./src/components/HBargraph.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./HBargraph.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/HBargraph.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/HBargraph.ts":
/*!*************************************!*\
  !*** ./src/components/HBargraph.ts ***!
  \*************************************/
/*! exports provided: HBargraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HBargraph", function() { return HBargraph; });
/* harmony import */ var _HBargraph_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HBargraph.scss */ "./src/components/HBargraph.scss");
/* harmony import */ var _HBargraph_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBargraph_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBargraph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBargraph */ "./src/components/VBargraph.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class HBargraph extends _VBargraph__WEBPACK_IMPORTED_MODULE_1__["VBargraph"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "hbargraph");

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          height = _this$state$style.height,
          grid = _this$state$style.grid,
          fontsize = _this$state$style.fontsize,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      this.input.style.fontSize = "".concat(fontsize || height * grid * 0.2, "px");
      this.input.style.color = textcolor;
      this.container.style.backgroundColor = bgcolor;
      this.container.style.borderColor = bordercolor;
    });

    _defineProperty(this, "paint", () => {
      var _this$state$style2 = this.state.style,
          barwidth = _this$state$style2.barwidth,
          barbgcolor = _this$state$style2.barbgcolor,
          coldcolor = _this$state$style2.coldcolor,
          warmcolor = _this$state$style2.warmcolor,
          hotcolor = _this$state$style2.hotcolor,
          overloadcolor = _this$state$style2.overloadcolor;
      var _this$state = this.state,
          min = _this$state.min,
          max = _this$state.max,
          value = _this$state.value;
      var ctx = this.ctx;
      var canvas = this.canvas;

      var _this$canvasDiv$getBo = this.canvasDiv.getBoundingClientRect(),
          width = _this$canvasDiv$getBo.width,
          height = _this$canvasDiv$getBo.height;

      width = Math.floor(width);
      height = Math.floor(height);
      canvas.width = width;
      canvas.height = height;
      var drawWidth = width * 0.9;
      var drawHeight = barwidth || Math.min(height / 3, drawWidth * 0.05);
      var left = width * 0.05;
      var top = (height - drawHeight) * 0.5;
      this.paintValue = value;
      var paintValue = this.paintValue;

      if (paintValue > this.maxValue) {
        this.maxValue = paintValue;
        if (this.maxTimer) window.clearTimeout(this.maxTimer);
        this.maxTimer = window.setTimeout(() => {
          this.maxValue = this.paintValue;
          this.maxTimer = undefined;
        }, 1000);
      }

      if (paintValue < this.maxValue && typeof this.maxTimer === "undefined") {
        this.maxTimer = window.setTimeout(() => {
          this.maxValue = this.paintValue;
          this.maxTimer = undefined;
        }, 1000);
      }

      var maxValue = this.maxValue;
      var coldStop = (-18 - min) / (max - min);
      var warmStop = (-6 - min) / (max - min);
      var hotStop = (-3 - min) / (max - min);
      var overloadStop = -min / (max - min);
      var gradient = ctx.createLinearGradient(left, 0, drawWidth, 0);
      if (coldStop <= 1 && coldStop >= 0) gradient.addColorStop(coldStop, coldcolor);else if (coldStop > 1) gradient.addColorStop(1, coldcolor);
      if (warmStop <= 1 && warmStop >= 0) gradient.addColorStop(warmStop, warmcolor);
      if (hotStop <= 1 && hotStop >= 0) gradient.addColorStop(hotStop, hotcolor);
      if (overloadStop <= 1 && overloadStop >= 0) gradient.addColorStop(overloadStop, overloadcolor);else if (overloadStop < 0) gradient.addColorStop(0, coldcolor);
      ctx.fillStyle = barbgcolor;
      if (paintValue < 0) ctx.fillRect(left, top, drawWidth * overloadStop, drawHeight);
      if (paintValue < max) ctx.fillRect(left + drawWidth * overloadStop + 1, top, drawWidth * (1 - overloadStop) - 1, drawHeight);
      ctx.fillStyle = gradient;

      if (paintValue > min) {
        var distance = (Math.min(0, paintValue) - min) / (max - min);
        ctx.fillRect(left, top, distance * drawWidth, drawHeight);
      }

      if (paintValue > 0) {
        var _distance = Math.min(max, paintValue) / (max - min);

        ctx.fillRect(left + overloadStop * drawWidth + 1, top, _distance * drawWidth - 1, drawHeight);
      }

      if (maxValue > paintValue) {
        if (maxValue <= 0) {
          var _distance2 = (Math.min(0, maxValue) - min) / (max - min);

          ctx.fillRect(left + _distance2 * drawWidth - 1, top, 1, drawHeight);
        }

        if (maxValue > 0) {
          var _distance3 = Math.min(max, maxValue) / (max - min);

          ctx.fillRect(left + Math.min(drawWidth - 1, (overloadStop + _distance3) * drawWidth), top, 1, drawHeight);
        }
      }
    });
  }

}

/***/ }),

/***/ "./src/components/HSlider.scss":
/*!*************************************!*\
  !*** ./src/components/HSlider.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./HSlider.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/HSlider.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/HSlider.ts":
/*!***********************************!*\
  !*** ./src/components/HSlider.ts ***!
  \***********************************/
/*! exports provided: HSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HSlider", function() { return HSlider; });
/* harmony import */ var _HSlider_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HSlider.scss */ "./src/components/HSlider.scss");
/* harmony import */ var _HSlider_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HSlider_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/components/utils.ts");
/* harmony import */ var _VSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VSlider */ "./src/components/VSlider.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class HSlider extends _VSlider__WEBPACK_IMPORTED_MODULE_2__["VSlider"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "hslider");

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          height = _this$state$style.height,
          grid = _this$state$style.grid,
          fontsize = _this$state$style.fontsize,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      this.input.style.fontSize = "".concat(fontsize || height * grid * 0.2, "px");
      this.input.style.color = textcolor;
      this.container.style.backgroundColor = bgcolor;
      this.container.style.borderColor = bordercolor;
    });

    _defineProperty(this, "paint", () => {
      var _this$state$style2 = this.state.style,
          sliderwidth = _this$state$style2.sliderwidth,
          sliderbgcolor = _this$state$style2.sliderbgcolor,
          sliderbgoncolor = _this$state$style2.sliderbgoncolor,
          slidercolor = _this$state$style2.slidercolor;
      var ctx = this.ctx;
      var canvas = this.canvas;
      var distance = this.distance;

      var _this$canvasDiv$getBo = this.canvasDiv.getBoundingClientRect(),
          width = _this$canvasDiv$getBo.width,
          height = _this$canvasDiv$getBo.height;

      width = Math.floor(width);
      height = Math.floor(height);
      canvas.width = width;
      canvas.height = height;
      var drawWidth = width * 0.9;
      var drawHeight = sliderwidth || Math.min(height / 3, drawWidth * 0.05);
      var left = width * 0.05;
      var top = (height - drawHeight) * 0.5;
      var borderRadius = drawHeight * 0.25;
      this.interactionRect = [left, 0, drawWidth, height];
      var grd = ctx.createLinearGradient(left, 0, left + drawWidth, 0);
      grd.addColorStop(Math.max(0, Math.min(1, distance)), sliderbgoncolor);
      grd.addColorStop(Math.max(0, Math.min(1, distance)), sliderbgcolor);
      ctx.fillStyle = grd;
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["fillRoundedRect"])(ctx, left, top, drawWidth, drawHeight, borderRadius); // draw slider

      ctx.fillStyle = slidercolor;
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["fillRoundedRect"])(ctx, left + drawWidth * distance - drawHeight, top - drawHeight, drawHeight * 2, drawHeight * 3, borderRadius);
    });
  }

}

/***/ }),

/***/ "./src/components/Knob.scss":
/*!**********************************!*\
  !*** ./src/components/Knob.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Knob.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Knob.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Knob.ts":
/*!********************************!*\
  !*** ./src/components/Knob.ts ***!
  \********************************/
/*! exports provided: Knob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Knob", function() { return Knob; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _Knob_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Knob.scss */ "./src/components/Knob.scss");
/* harmony import */ var _Knob_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Knob_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/components/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class Knob extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "knob");

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "inputNumber", void 0);

    _defineProperty(this, "input", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "handleChange", e => {
      var value = parseFloat(e.currentTarget.value);

      if (isFinite(value)) {
        var changed = this.setValue(+this.inputNumber.value);
        if (changed) return;
      }

      this.input.value = this.inputNumber.value + (this.state.unit || "");
    });

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          fontsize = _this$state$style.fontsize,
          height = _this$state$style.height,
          grid = _this$state$style.grid,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      this.input.style.fontSize = "".concat(fontsize || height * grid * 0.1, "px");
      this.input.style.color = textcolor;
      this.container.style.backgroundColor = bgcolor;
      this.container.style.borderColor = bordercolor;
    });

    _defineProperty(this, "paint", () => {
      var _this$state$style2 = this.state.style,
          knobwidth = _this$state$style2.knobwidth,
          knobcolor = _this$state$style2.knobcolor,
          knoboncolor = _this$state$style2.knoboncolor,
          needlecolor = _this$state$style2.needlecolor;
      var ctx = this.ctx;
      var canvas = this.canvas;
      var distance = this.distance;

      var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
          width = _canvas$getBoundingCl.width,
          height = _canvas$getBoundingCl.height;

      canvas.width = width;
      canvas.height = height;
      var start = 5 / 8 * Math.PI;
      var end = 19 / 8 * Math.PI;
      var valPos = start + Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toRad"])(distance * 315);
      var dialHeight = Math.min(width, height) * 0.75;
      var dialRadius = dialHeight * 0.5;
      var dialCenterX = width * 0.5;
      var dialCenterY = height * 0.5; // const arcStartX = dialCenterX + (dialHeight * 0.5 * Math.cos(start));
      // const arcStartY = dialCenterY + (dialHeight * 0.5 * Math.sin(start));
      // const arcEndX = dialCenterX + (dialHeight * 0.5 * Math.cos(end));
      // const arcEndY = dialCenterY + (dialHeight * 0.5 * Math.sin(end));

      var valuePosX = dialCenterX + dialHeight * 0.5 * Math.cos(valPos);
      var valuePosY = dialCenterY + dialHeight * 0.5 * Math.sin(valPos);
      var lineWidth = knobwidth || dialRadius * 0.2;
      ctx.strokeStyle = knobcolor;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round"; // draw background arc

      ctx.beginPath();
      ctx.arc(dialCenterX, dialCenterY, dialRadius, valPos, end);
      ctx.stroke(); // draw value arc

      if (distance) {
        ctx.strokeStyle = knoboncolor;
        ctx.beginPath();
        ctx.arc(dialCenterX, dialCenterY, dialRadius, start, valPos);
        ctx.stroke();
      } // draw dial needle


      ctx.strokeStyle = needlecolor;
      ctx.beginPath();
      ctx.moveTo(dialCenterX, dialCenterY);
      ctx.lineTo(valuePosX, valuePosY);
      ctx.stroke();
    });

    _defineProperty(this, "handlePointerDrag", e => {
      var newValue = this.getValueFromDelta(e);
      if (newValue !== this.state.value) this.setValue(newValue);
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "regular",
        bgcolor: "rgba(18, 18, 18, 0)",
        bordercolor: "rgba(80, 80, 80, 0)",
        labelcolor: "rgba(226, 222, 255, 0.5)",
        textcolor: "rgba(18, 18, 18, 1)",
        knobwidth: undefined,
        knobcolor: "rgba(18, 18, 18, 1)",
        knoboncolor: "rgba(255, 165, 0, 1)",
        needlecolor: "rgba(200, 200, 200, 0.75)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.canvas = document.createElement("canvas");
    this.canvas.width = 10;
    this.canvas.height = 10;
    this.ctx = this.canvas.getContext("2d");
    this.inputNumber = document.createElement("input");
    this.inputNumber.type = "number";
    this.inputNumber.value = (+this.state.value.toFixed(3)).toString();
    this.inputNumber.max = this.state.max.toString();
    this.inputNumber.min = this.state.min.toString();
    this.inputNumber.step = this.state.step.toString();
    this.input = document.createElement("input");
    this.input.value = this.inputNumber.value + (this.state.unit || "");
    this.input.spellcheck = false;
    this.setStyle();
    return this;
  }

  componentDidMount() {
    super.componentDidMount();
    this.input.addEventListener("change", this.handleChange);
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("touchstart", this.handleTouchStart, {
      passive: false
    });
    this.on("style", () => {
      this.schedule(this.setStyle);
      this.schedule(this.paint);
    });
    this.on("label", () => this.schedule(this.paintLabel));

    var valueChange = () => {
      this.inputNumber.value = (+this.state.value.toFixed(3)).toString();
      this.input.value = this.inputNumber.value + (this.state.unit || "");
    };

    this.on("value", () => {
      this.schedule(valueChange);
      this.schedule(this.paint);
    });

    var maxChange = () => this.inputNumber.max = this.state.max.toString();

    this.on("max", () => {
      this.schedule(maxChange);
      this.schedule(this.paint);
    });

    var minChange = () => this.inputNumber.min = this.state.min.toString();

    this.on("min", () => {
      this.schedule(minChange);
      this.schedule(this.paint);
    });

    var stepChange = () => this.inputNumber.step = this.state.step.toString();

    this.on("step", () => {
      this.schedule(stepChange);
      this.schedule(this.paint);
    });
    this.schedule(this.paint);
    return this;
  }

  mount() {
    this.container.appendChild(this.label);
    this.container.appendChild(this.canvas);
    this.container.appendChild(this.input);
    return super.mount();
  }

  getValueFromDelta(e) {
    var _this$state = this.state,
        type = _this$state.type,
        min = _this$state.min,
        max = _this$state.max,
        enums = _this$state.enums,
        scale = _this$state.scale;
    var stepRange = this.stepRange;
    var stepsCount = this.stepsCount;
    var step = type === "enum" ? 1 : (max - min) / stepsCount;
    var range = 100;
    var prevDistance = _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"].getDistance({
      value: e.prevValue,
      type,
      min,
      max,
      enums,
      scale
    }) * range;
    var distance = prevDistance + e.fromY - e.y;
    var steps = Math.round((scale === "exp" ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normExp"])(distance / range) : scale === "log" ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normLog"])(distance / range) : distance / range) * range / stepRange);
    steps = Math.min(stepsCount, Math.max(0, steps));
    if (type === "enum") return steps;
    if (type === "int") return Math.round(steps * step + min);
    return steps * step + min;
  }

}

/***/ }),

/***/ "./src/components/Led.scss":
/*!*********************************!*\
  !*** ./src/components/Led.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Led.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Led.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Led.ts":
/*!*******************************!*\
  !*** ./src/components/Led.ts ***!
  \*******************************/
/*! exports provided: Led */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Led", function() { return Led; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _Led_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Led.scss */ "./src/components/Led.scss");
/* harmony import */ var _Led_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Led_scss__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Led extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "led");

    _defineProperty(this, "canvasDiv", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "tempCanvas", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "tempCtx", void 0);

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      this.container.style.backgroundColor = bgcolor;
      this.container.style.borderColor = bordercolor;
    });

    _defineProperty(this, "paint", () => {
      var _this$state$style2 = this.state.style,
          shape = _this$state$style2.shape,
          ledbgcolor = _this$state$style2.ledbgcolor,
          coldcolor = _this$state$style2.coldcolor,
          warmcolor = _this$state$style2.warmcolor,
          hotcolor = _this$state$style2.hotcolor,
          overloadcolor = _this$state$style2.overloadcolor;
      var _this$state = this.state,
          min = _this$state.min,
          max = _this$state.max;
      var canvas = this.canvas,
          ctx = this.ctx,
          tempCanvas = this.tempCanvas,
          tempCtx = this.tempCtx,
          distance = this.distance;

      var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
          width = _canvas$getBoundingCl.width,
          height = _canvas$getBoundingCl.height;

      canvas.width = width;
      canvas.height = height;
      var drawHeight = Math.min(height, width) * 0.75;
      var drawWidth = drawHeight;
      var left = (width - drawWidth) * 0.5;
      var top = (height - drawHeight) * 0.5;
      var coldStop = (-18 - min) / (max - min);
      var warmStop = (-6 - min) / (max - min);
      var hotStop = (-3 - min) / (max - min);
      var overloadStop = -min / (max - min);
      var gradient = tempCtx.createLinearGradient(0, 0, tempCanvas.width, 0);
      if (coldStop <= 1 && coldStop >= 0) gradient.addColorStop(coldStop, coldcolor);else if (coldStop > 1) gradient.addColorStop(1, coldcolor);
      if (warmStop <= 1 && warmStop >= 0) gradient.addColorStop(warmStop, warmcolor);
      if (hotStop <= 1 && hotStop >= 0) gradient.addColorStop(hotStop, hotcolor);
      if (overloadStop <= 1 && overloadStop >= 0) gradient.addColorStop(overloadStop, overloadcolor);else if (overloadStop < 0) gradient.addColorStop(0, coldcolor);
      tempCtx.fillStyle = gradient;
      tempCtx.fillRect(0, 0, tempCanvas.width, 10);
      var d = tempCtx.getImageData(Math.min(tempCanvas.width - 1, distance * tempCanvas.width), 0, 1, 1).data;
      if (distance) ctx.fillStyle = "rgb(".concat(d[0], ", ").concat(d[1], ", ").concat(d[2], ")");else ctx.fillStyle = ledbgcolor;
      if (shape === "circle") ctx.arc(width / 2, height / 2, width / 2 - left, 0, 2 * Math.PI);else ctx.rect(left, top, drawWidth, drawHeight);
      ctx.fill();
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "regular",
        bgcolor: "rgba(18, 18, 18, 0)",
        bordercolor: "rgba(80, 80, 80, 0)",
        labelcolor: "rgba(226, 222, 255, 0.5)",
        textcolor: "rgba(18, 18, 18, 1)",
        shape: "circle",
        ledbgcolor: "rgba(18, 18, 18, 1)",
        coldcolor: "rgba(12, 248, 100, 1)",
        warmcolor: "rgba(195, 248, 100, 1)",
        hotcolor: "rgba(255, 193, 10, 1)",
        overloadcolor: "rgba(255, 10, 10, 1)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.canvasDiv = document.createElement("div");
    this.canvasDiv.className = "faust-ui-component-".concat(this.className, "-canvasdiv");
    this.canvas = document.createElement("canvas");
    this.canvas.width = 10;
    this.canvas.height = 10;
    this.ctx = this.canvas.getContext("2d");
    this.tempCanvas = document.createElement("canvas");
    this.tempCtx = this.tempCanvas.getContext("2d");
    this.tempCanvas.width = 128;
    this.tempCanvas.height = 1;
    this.setStyle();
    return this;
  }

  componentDidMount() {
    super.componentDidMount();
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("touchstart", this.handleTouchStart, {
      passive: false
    });
    this.on("style", () => this.schedule(this.setStyle));
    this.on("label", () => this.schedule(this.paintLabel));
    this.on("value", () => this.schedule(this.paint));
    this.on("max", () => this.schedule(this.paint));
    this.on("min", () => this.schedule(this.paint));
    this.on("step", () => this.schedule(this.paint));
    this.schedule(this.paint);
    return this;
  }

  mount() {
    this.canvasDiv.appendChild(this.canvas);
    this.container.appendChild(this.label);
    this.container.appendChild(this.canvasDiv);
    return super.mount();
  }

}

/***/ }),

/***/ "./src/components/Menu.scss":
/*!**********************************!*\
  !*** ./src/components/Menu.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Menu.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Menu.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Menu.ts":
/*!********************************!*\
  !*** ./src/components/Menu.ts ***!
  \********************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _Menu_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu.scss */ "./src/components/Menu.scss");
/* harmony import */ var _Menu_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Menu_scss__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Menu extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "menu");

    _defineProperty(this, "select", void 0);

    _defineProperty(this, "handleChange", e => {
      this.setValue(+e.currentTarget.value);
    });

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          height = _this$state$style.height,
          grid = _this$state$style.grid,
          fontsize = _this$state$style.fontsize,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      this.select.style.backgroundColor = bgcolor;
      this.select.style.borderColor = bordercolor;
      this.select.style.color = textcolor;
      this.select.style.fontSize = "".concat(fontsize || height * grid / 4, "px");
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "regular",
        bgcolor: "rgba(255, 255, 255, 0.25)",
        bordercolor: "rgba(80, 80, 80, 0)",
        labelcolor: "rgba(226, 222, 255, 0.5)",
        textcolor: "rgba(18, 18, 18, 1)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.select = document.createElement("select");
    this.getOptions();
    this.setStyle();
    return this;
  }

  getOptions() {
    var enums = this.state.enums;
    this.select.innerHTML = "";

    if (enums) {
      var i = 0;

      for (var key in enums) {
        var option = document.createElement("option");
        option.value = enums[key].toString();
        option.text = key;
        if (i === 0) option.selected = true;
        this.select.appendChild(option);
        i++;
      }
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.select.addEventListener("change", this.handleChange);
    this.on("style", () => this.schedule(this.setStyle));
    this.on("label", () => this.schedule(this.paintLabel));
    this.on("enums", () => this.schedule(this.getOptions));

    var valueChange = () => {
      for (var i = this.select.children.length - 1; i >= 0; i--) {
        var option = this.select.children[i];
        if (+option.value === this.state.value) this.select.selectedIndex = i;
      }
    };

    this.on("value", () => this.schedule(valueChange));
    return this;
  }

  mount() {
    this.container.appendChild(this.label);
    this.container.appendChild(this.select);
    return super.mount();
  }

}

/***/ }),

/***/ "./src/components/Nentry.scss":
/*!************************************!*\
  !*** ./src/components/Nentry.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Nentry.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Nentry.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Nentry.ts":
/*!**********************************!*\
  !*** ./src/components/Nentry.ts ***!
  \**********************************/
/*! exports provided: Nentry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nentry", function() { return Nentry; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _Nentry_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Nentry.scss */ "./src/components/Nentry.scss");
/* harmony import */ var _Nentry_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Nentry_scss__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Nentry extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "nentry");

    _defineProperty(this, "input", void 0);

    _defineProperty(this, "handleChange", e => {
      this.setValue(+e.currentTarget.value);
    });

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          height = _this$state$style.height,
          grid = _this$state$style.grid,
          fontsize = _this$state$style.fontsize,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      this.input.style.backgroundColor = bgcolor;
      this.input.style.borderColor = bordercolor;
      this.input.style.color = textcolor;
      this.input.style.fontSize = "".concat(fontsize || height * grid / 4, "px");
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "regular",
        bgcolor: "rgba(255, 255, 255, 0.25)",
        bordercolor: "rgba(80, 80, 80, 0)",
        labelcolor: "rgba(226, 222, 255, 0.5)",
        textcolor: "rgba(18, 18, 18, 1)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.input = document.createElement("input");
    this.input.type = "number";
    this.input.value = (+this.state.value.toFixed(3)).toString();
    this.input.max = this.state.max.toString();
    this.input.min = this.state.min.toString();
    this.input.step = this.state.step.toString();
    this.setStyle();
    return this;
  }

  componentDidMount() {
    super.componentDidMount();
    this.input.addEventListener("change", this.handleChange);
    this.on("style", () => this.schedule(this.setStyle));
    this.on("label", () => this.schedule(this.paintLabel));

    var valueChange = () => this.input.value = (+this.state.value.toFixed(3)).toString();

    this.on("value", () => this.schedule(valueChange));

    var maxChange = () => this.input.max = this.state.max.toString();

    this.on("max", () => this.schedule(maxChange));

    var minChange = () => this.input.min = this.state.min.toString();

    this.on("min", () => this.schedule(minChange));

    var stepChange = () => this.input.step = this.state.step.toString();

    this.on("step", () => this.schedule(stepChange));
    return this;
  }

  mount() {
    this.container.appendChild(this.label);
    this.container.appendChild(this.input);
    return super.mount();
  }

}

/***/ }),

/***/ "./src/components/Numerical.scss":
/*!***************************************!*\
  !*** ./src/components/Numerical.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Numerical.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Numerical.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Numerical.ts":
/*!*************************************!*\
  !*** ./src/components/Numerical.ts ***!
  \*************************************/
/*! exports provided: Numerical */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Numerical", function() { return Numerical; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _Numerical_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Numerical.scss */ "./src/components/Numerical.scss");
/* harmony import */ var _Numerical_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Numerical_scss__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Numerical extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "numerical");

    _defineProperty(this, "input", void 0);

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          height = _this$state$style.height,
          grid = _this$state$style.grid,
          fontsize = _this$state$style.fontsize,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      this.input.style.backgroundColor = bgcolor;
      this.input.style.borderColor = bordercolor;
      this.input.style.color = textcolor;
      this.input.style.fontSize = "".concat(fontsize || height * grid / 4, "px");
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "regular",
        bgcolor: "rgba(255, 255, 255, 0.25)",
        bordercolor: "rgba(80, 80, 80, 0)",
        labelcolor: "rgba(226, 222, 255, 0.5)",
        textcolor: "rgba(18, 18, 18, 1)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.input = document.createElement("input");
    this.input.disabled = true;
    this.input.value = (+this.state.value.toFixed(3)).toString() + (this.state.unit || "");
    this.setStyle();
    return this;
  }

  componentDidMount() {
    super.componentDidMount();
    this.on("style", () => this.schedule(this.setStyle));
    this.on("label", () => this.schedule(this.paintLabel));

    var valueChange = () => this.input.value = (+this.state.value.toFixed(3)).toString() + (this.state.unit || "");

    this.on("value", () => this.schedule(valueChange));
    return this;
  }

  mount() {
    this.container.appendChild(this.label);
    this.container.appendChild(this.input);
    return super.mount();
  }

}

/***/ }),

/***/ "./src/components/Radio.scss":
/*!***********************************!*\
  !*** ./src/components/Radio.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./Radio.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/Radio.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Radio.ts":
/*!*********************************!*\
  !*** ./src/components/Radio.ts ***!
  \*********************************/
/*! exports provided: Radio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Radio", function() { return Radio; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _Radio_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Radio.scss */ "./src/components/Radio.scss");
/* harmony import */ var _Radio_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Radio_scss__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Radio extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    _defineProperty(this, "className", "radio");

    _defineProperty(this, "group", void 0);

    _defineProperty(this, "getOptions", () => {
      var _this$state = this.state,
          enums = _this$state.enums,
          address = _this$state.address;
      this.group.innerHTML = "";

      if (enums) {
        var i = 0;

        var _loop = function _loop(key) {
          var input = document.createElement("input");
          var div = document.createElement("div");
          input.value = enums[key].toString();
          input.name = address;
          input.type = "radio";
          if (i === 0) input.checked = true;
          input.addEventListener("change", () => _this.setValue(enums[key]));
          div.appendChild(input);
          div.append(key);

          _this.group.appendChild(div);

          i++;
        };

        for (var key in enums) {
          _loop(key);
        }
      }
    });

    _defineProperty(this, "handleChange", e => {
      this.setValue(+e.currentTarget.value);
    });

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          height = _this$state$style.height,
          width = _this$state$style.width,
          grid = _this$state$style.grid,
          fontsize = _this$state$style.fontsize,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      var fontSize = Math.min(height * grid * 0.1, width * grid * 0.1);
      this.group.style.backgroundColor = bgcolor;
      this.group.style.borderColor = bordercolor;
      this.group.style.color = textcolor;
      this.group.style.fontSize = "".concat(fontsize || fontSize, "px");
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "regular",
        bgcolor: "rgba(255, 255, 255, 0.25)",
        bordercolor: "rgba(80, 80, 80, 0)",
        labelcolor: "rgba(226, 222, 255, 0.5)",
        textcolor: "rgba(18, 18, 18, 1)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.group = document.createElement("div");
    this.group.className = "faust-ui-component-radio-group";
    this.getOptions();
    this.setStyle();
    return this;
  }

  componentDidMount() {
    super.componentDidMount();
    this.on("style", () => this.schedule(this.setStyle));
    this.on("label", () => this.schedule(this.paintLabel));
    this.on("enums", () => this.schedule(this.getOptions));

    var valueChange = () => {
      for (var i = this.group.children.length - 1; i >= 0; i--) {
        var input = this.group.children[i].querySelector("input");
        if (+input.value === this.state.value) input.checked = true;
      }
    };

    this.on("value", () => this.schedule(valueChange));
    return this;
  }

  mount() {
    this.container.appendChild(this.label);
    this.container.appendChild(this.group);
    return super.mount();
  }

}

/***/ }),

/***/ "./src/components/VBargraph.scss":
/*!***************************************!*\
  !*** ./src/components/VBargraph.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./VBargraph.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/VBargraph.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/VBargraph.ts":
/*!*************************************!*\
  !*** ./src/components/VBargraph.ts ***!
  \*************************************/
/*! exports provided: VBargraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VBargraph", function() { return VBargraph; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _VBargraph_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBargraph.scss */ "./src/components/VBargraph.scss");
/* harmony import */ var _VBargraph_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_VBargraph_scss__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class VBargraph extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "vbargraph");

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "input", void 0);

    _defineProperty(this, "flexDiv", void 0);

    _defineProperty(this, "canvasDiv", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          height = _this$state$style.height,
          width = _this$state$style.width,
          grid = _this$state$style.grid,
          fontsize = _this$state$style.fontsize,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      var fontSize = Math.min(height * grid * 0.05, width * grid * 0.2);
      this.input.style.fontSize = "".concat(fontsize || fontSize, "px");
      this.input.style.color = textcolor;
      this.container.style.backgroundColor = bgcolor;
      this.container.style.borderColor = bordercolor;
    });

    _defineProperty(this, "paintValue", 0);

    _defineProperty(this, "maxValue", -Infinity);

    _defineProperty(this, "maxTimer", void 0);

    _defineProperty(this, "paint", () => {
      var _this$state$style2 = this.state.style,
          barwidth = _this$state$style2.barwidth,
          barbgcolor = _this$state$style2.barbgcolor,
          coldcolor = _this$state$style2.coldcolor,
          warmcolor = _this$state$style2.warmcolor,
          hotcolor = _this$state$style2.hotcolor,
          overloadcolor = _this$state$style2.overloadcolor;
      var _this$state = this.state,
          min = _this$state.min,
          max = _this$state.max,
          value = _this$state.value;
      var ctx = this.ctx;
      var canvas = this.canvas;

      var _this$canvasDiv$getBo = this.canvasDiv.getBoundingClientRect(),
          width = _this$canvasDiv$getBo.width,
          height = _this$canvasDiv$getBo.height;

      width = Math.floor(width);
      height = Math.floor(height);
      canvas.width = width;
      canvas.height = height;
      var drawHeight = height * 0.9;
      var drawWidth = barwidth || Math.min(width / 3, drawHeight * 0.05);
      var left = (width - drawWidth) * 0.5;
      var top = height * 0.05;
      this.paintValue = value;
      var paintValue = this.paintValue;

      if (paintValue > this.maxValue) {
        this.maxValue = paintValue;
        if (this.maxTimer) window.clearTimeout(this.maxTimer);
        this.maxTimer = window.setTimeout(() => {
          this.maxValue = this.paintValue;
          this.maxTimer = undefined;
          this.schedule(this.paint);
        }, 1000);
      }

      if (paintValue < this.maxValue && typeof this.maxTimer === "undefined") {
        this.maxTimer = window.setTimeout(() => {
          this.maxValue = this.paintValue;
          this.maxTimer = undefined;
          this.schedule(this.paint);
        }, 1000);
      }

      var maxValue = this.maxValue;
      var coldStop = (-18 - min) / (max - min);
      var warmStop = (-6 - min) / (max - min);
      var hotStop = (-3 - min) / (max - min);
      var overloadStop = -min / (max - min);
      var gradient = ctx.createLinearGradient(0, drawHeight, 0, top);
      if (coldStop <= 1 && coldStop >= 0) gradient.addColorStop(coldStop, coldcolor);else if (coldStop > 1) gradient.addColorStop(1, coldcolor);
      if (warmStop <= 1 && warmStop >= 0) gradient.addColorStop(warmStop, warmcolor);
      if (hotStop <= 1 && hotStop >= 0) gradient.addColorStop(hotStop, hotcolor);
      if (overloadStop <= 1 && overloadStop >= 0) gradient.addColorStop(overloadStop, overloadcolor);else if (overloadStop < 0) gradient.addColorStop(0, coldcolor);
      ctx.fillStyle = barbgcolor;
      if (paintValue < 0) ctx.fillRect(left, top + (1 - overloadStop) * drawHeight, drawWidth, drawHeight * overloadStop);
      if (paintValue < max) ctx.fillRect(left, top, drawWidth, (1 - overloadStop) * drawHeight - 1);
      ctx.fillStyle = gradient;

      if (paintValue > min) {
        var distance = (Math.min(0, paintValue) - min) / (max - min);
        ctx.fillRect(left, top + (1 - distance) * drawHeight, drawWidth, drawHeight * distance);
      }

      if (paintValue > 0) {
        var _distance = Math.min(max, paintValue) / (max - min);

        ctx.fillRect(left, top + (1 - overloadStop - _distance) * drawHeight, drawWidth, drawHeight * _distance - 1);
      }

      if (maxValue > paintValue) {
        if (maxValue <= 0) {
          var _distance2 = (Math.min(0, maxValue) - min) / (max - min);

          ctx.fillRect(left, top + (1 - _distance2) * drawHeight, drawWidth, 1);
        }

        if (maxValue > 0) {
          var _distance3 = Math.min(max, maxValue) / (max - min);

          ctx.fillRect(left, Math.max(top, top + (1 - overloadStop - _distance3) * drawHeight - 1), drawWidth, 1);
        }
      }
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "regular",
        bgcolor: "rgba(18, 18, 18, 0)",
        bordercolor: "rgba(80, 80, 80, 0)",
        labelcolor: "rgba(226, 222, 255, 0.5)",
        textcolor: "rgba(18, 18, 18, 1)",
        barwidth: undefined,
        barbgcolor: "rgba(18, 18, 18, 1)",
        coldcolor: "rgba(12, 248, 100, 1)",
        warmcolor: "rgba(195, 248, 100, 1)",
        hotcolor: "rgba(255, 193, 10, 1)",
        overloadcolor: "rgba(255, 10, 10, 1)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.flexDiv = document.createElement("div");
    this.flexDiv.className = "faust-ui-component-".concat(this.className, "-flexdiv");
    this.canvasDiv = document.createElement("div");
    this.canvasDiv.className = "faust-ui-component-".concat(this.className, "-canvasdiv");
    this.canvas = document.createElement("canvas");
    this.canvas.width = 10;
    this.canvas.height = 10;
    this.ctx = this.canvas.getContext("2d");
    this.input = document.createElement("input");
    this.input.disabled = true;
    this.input.value = (+this.state.value.toFixed(3)).toString() + (this.state.unit || "");
    this.setStyle();
    return this;
  }

  componentDidMount() {
    super.componentDidMount();
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("touchstart", this.handleTouchStart, {
      passive: false
    });
    this.on("style", () => {
      this.schedule(this.setStyle);
      this.schedule(this.paint);
    });
    this.on("label", () => this.schedule(this.paintLabel));

    var valueChange = () => this.input.value = (+this.state.value.toFixed(3)).toString() + (this.state.unit || "");

    this.on("value", () => {
      this.schedule(valueChange);
      this.schedule(this.paint);
    });
    this.on("max", () => this.schedule(this.paint));
    this.on("min", () => this.schedule(this.paint));
    this.on("step", () => this.schedule(this.paint));
    this.schedule(this.paint);
    return this;
  }

  mount() {
    this.canvasDiv.appendChild(this.canvas);
    this.flexDiv.appendChild(this.canvasDiv);
    this.flexDiv.appendChild(this.input);
    this.container.appendChild(this.label);
    this.container.appendChild(this.flexDiv);
    return super.mount();
  }

}

/***/ }),

/***/ "./src/components/VSlider.scss":
/*!*************************************!*\
  !*** ./src/components/VSlider.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./VSlider.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/components/VSlider.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/VSlider.ts":
/*!***********************************!*\
  !*** ./src/components/VSlider.ts ***!
  \***********************************/
/*! exports provided: VSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VSlider", function() { return VSlider; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/components/AbstractItem.ts");
/* harmony import */ var _VSlider_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VSlider.scss */ "./src/components/VSlider.scss");
/* harmony import */ var _VSlider_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_VSlider_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/components/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class VSlider extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "className", "vslider");

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "inputNumber", void 0);

    _defineProperty(this, "input", void 0);

    _defineProperty(this, "flexDiv", void 0);

    _defineProperty(this, "canvasDiv", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "interactionRect", [0, 0, 0, 0]);

    _defineProperty(this, "handleChange", e => {
      var value = parseFloat(e.currentTarget.value);

      if (isFinite(value)) {
        var changed = this.setValue(+value);
        if (changed) return;
      }

      this.input.value = this.inputNumber.value + (this.state.unit || "");
    });

    _defineProperty(this, "setStyle", () => {
      var _this$state$style = this.state.style,
          height = _this$state$style.height,
          width = _this$state$style.width,
          grid = _this$state$style.grid,
          fontsize = _this$state$style.fontsize,
          textcolor = _this$state$style.textcolor,
          bgcolor = _this$state$style.bgcolor,
          bordercolor = _this$state$style.bordercolor;
      var fontSize = Math.min(height * grid * 0.05, width * grid * 0.2);
      this.input.style.fontSize = "".concat(fontsize || fontSize, "px");
      this.input.style.color = textcolor;
      this.container.style.backgroundColor = bgcolor;
      this.container.style.borderColor = bordercolor;
    });

    _defineProperty(this, "paint", () => {
      var _this$state$style2 = this.state.style,
          sliderwidth = _this$state$style2.sliderwidth,
          sliderbgcolor = _this$state$style2.sliderbgcolor,
          sliderbgoncolor = _this$state$style2.sliderbgoncolor,
          slidercolor = _this$state$style2.slidercolor;
      var ctx = this.ctx;
      var canvas = this.canvas;
      var distance = this.distance;

      var _this$canvasDiv$getBo = this.canvasDiv.getBoundingClientRect(),
          width = _this$canvasDiv$getBo.width,
          height = _this$canvasDiv$getBo.height;

      width = Math.floor(width);
      height = Math.floor(height);
      canvas.width = width;
      canvas.height = height;
      var drawHeight = height * 0.9;
      var drawWidth = sliderwidth || Math.min(width / 3, drawHeight * 0.05);
      var left = (width - drawWidth) * 0.5;
      var top = height * 0.05;
      var borderRadius = drawWidth * 0.25;
      this.interactionRect = [0, top, width, drawHeight];
      var grd = ctx.createLinearGradient(0, top, 0, top + drawHeight);
      grd.addColorStop(Math.max(0, Math.min(1, 1 - distance)), sliderbgcolor);
      grd.addColorStop(Math.max(0, Math.min(1, 1 - distance)), sliderbgoncolor);
      ctx.fillStyle = grd;
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__["fillRoundedRect"])(ctx, left, top, drawWidth, drawHeight, borderRadius); // draw slider

      ctx.fillStyle = slidercolor;
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__["fillRoundedRect"])(ctx, left - drawWidth, top + drawHeight * (1 - distance) - drawWidth, drawWidth * 3, drawWidth * 2, borderRadius);
    });

    _defineProperty(this, "handlePointerDown", e => {
      var value = this.state.value;
      if (e.x < this.interactionRect[0] || e.x > this.interactionRect[0] + this.interactionRect[2] || e.y < this.interactionRect[1] || e.y > this.interactionRect[1] + this.interactionRect[3]) return;
      var newValue = this.getValueFromPos(e);
      if (newValue !== value) this.setValue(this.getValueFromPos(e));
    });

    _defineProperty(this, "handlePointerDrag", e => {
      var newValue = this.getValueFromPos(e);
      if (newValue !== this.state.value) this.setValue(newValue);
    });
  }

  static get defaultProps() {
    var inherited = super.defaultProps;
    return _objectSpread({}, inherited, {
      style: _objectSpread({}, inherited.style, {
        fontname: "Arial",
        fontsize: undefined,
        fontface: "regular",
        bgcolor: "rgba(18, 18, 18, 0)",
        bordercolor: "rgba(80, 80, 80, 0)",
        labelcolor: "rgba(226, 222, 255, 0.5)",
        textcolor: "rgba(18, 18, 18, 1)",
        sliderwidth: undefined,
        sliderbgcolor: "rgba(18, 18, 18, 1)",
        sliderbgoncolor: "rgba(255, 165, 0, 1)",
        slidercolor: "rgba(200, 200, 200, 0.75)"
      })
    });
  }

  componentWillMount() {
    super.componentWillMount();
    this.flexDiv = document.createElement("div");
    this.flexDiv.className = "faust-ui-component-".concat(this.className, "-flexdiv");
    this.canvasDiv = document.createElement("div");
    this.canvasDiv.className = "faust-ui-component-".concat(this.className, "-canvasdiv");
    this.canvas = document.createElement("canvas");
    this.canvas.width = 10;
    this.canvas.height = 10;
    this.ctx = this.canvas.getContext("2d");
    this.inputNumber = document.createElement("input");
    this.inputNumber.type = "number";
    this.inputNumber.value = (+this.state.value.toFixed(3)).toString();
    this.inputNumber.max = this.state.max.toString();
    this.inputNumber.min = this.state.min.toString();
    this.inputNumber.step = this.state.step.toString();
    this.input = document.createElement("input");
    this.input.value = this.inputNumber.value + (this.state.unit || "");
    this.input.spellcheck = false;
    this.setStyle();
    return this;
  }

  componentDidMount() {
    super.componentDidMount();
    this.input.addEventListener("change", this.handleChange);
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("touchstart", this.handleTouchStart, {
      passive: false
    });
    this.on("style", () => {
      this.schedule(this.setStyle);
      this.schedule(this.paint);
    });
    this.on("label", () => this.schedule(this.paintLabel));

    var valueChange = () => {
      this.inputNumber.value = (+this.state.value.toFixed(3)).toString();
      this.input.value = this.inputNumber.value + (this.state.unit || "");
    };

    this.on("value", () => {
      this.schedule(valueChange);
      this.schedule(this.paint);
    });

    var maxChange = () => this.inputNumber.max = this.state.max.toString();

    this.on("max", () => {
      this.schedule(maxChange);
      this.schedule(this.paint);
    });

    var minChange = () => this.inputNumber.min = this.state.min.toString();

    this.on("min", () => {
      this.schedule(minChange);
      this.schedule(this.paint);
    });

    var stepChange = () => this.inputNumber.step = this.state.step.toString();

    this.on("step", () => {
      this.schedule(stepChange);
      this.schedule(this.paint);
    });
    this.schedule(this.paint);
    return this;
  }

  mount() {
    this.canvasDiv.appendChild(this.canvas);
    this.flexDiv.appendChild(this.canvasDiv);
    this.flexDiv.appendChild(this.input);
    this.container.appendChild(this.label);
    this.container.appendChild(this.flexDiv);
    return super.mount();
  }

  get stepsCount() {
    var _this$state = this.state,
        type = _this$state.type,
        max = _this$state.max,
        min = _this$state.min,
        step = _this$state.step,
        enums = _this$state.enums;
    var maxSteps = type === "enum" ? enums.length : type === "int" ? max - min : (max - min) / step;

    if (step) {
      if (type === "enum") return enums.length;
      if (type === "int") return Math.min(Math.floor((max - min) / (Math.round(step) || 0)), maxSteps);
      return Math.floor((max - min) / step);
    }

    return maxSteps;
  }

  get stepRange() {
    var full = this.interactionRect[this.className === "vslider" ? 3 : 2];
    var stepsCount = this.stepsCount;
    return full / stepsCount;
  }

  getValueFromPos(e) {
    var _this$state2 = this.state,
        type = _this$state2.type,
        min = _this$state2.min,
        max = _this$state2.max,
        scale = _this$state2.scale;
    var stepRange = this.stepRange;
    var stepsCount = this.stepsCount;
    var step = type === "enum" ? 1 : (max - min) / stepsCount;
    var distance = this.className === "vslider" ? this.interactionRect[3] - (e.y - this.interactionRect[1]) : e.x - this.interactionRect[0];
    var range = this.className === "vslider" ? this.interactionRect[3] : this.interactionRect[2];
    var steps = Math.round((scale === "exp" ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normExp"])(distance / range) : scale === "log" ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normLog"])(distance / range) : distance / range) * range / stepRange);
    steps = Math.min(stepsCount, Math.max(0, steps));
    if (type === "enum") return steps;
    if (type === "int") return Math.round(steps * step + min);
    return steps * step + min;
  }

}

/***/ }),

/***/ "./src/components/utils.ts":
/*!*********************************!*\
  !*** ./src/components/utils.ts ***!
  \*********************************/
/*! exports provided: toMIDI, toRad, atodb, dbtoa, normLog, normExp, roundedRect, fillRoundedRect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toMIDI", function() { return toMIDI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRad", function() { return toRad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atodb", function() { return atodb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbtoa", function() { return dbtoa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normLog", function() { return normLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normExp", function() { return normExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundedRect", function() { return roundedRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillRoundedRect", function() { return fillRoundedRect; });
var toMIDI = f => ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(f % 12 + 12) % 12] + Math.round(f / 12 - 2);
var toRad = degrees => degrees * Math.PI / 180;
var atodb = a => 20 * Math.log10(a);
var dbtoa = db => Math.pow(10, db / 20);
var normLog = x => Math.log10(x * 99 + 1) / 2 || 0;
var normExp = x => (Math.pow(10, 2 * x) - 1) / 99;
var roundedRect = (ctx, x, y, width, height, radius) => {
  var radii = [0, 0, 0, 0];
  if (typeof radius === "number") radii.fill(radius);else radius.forEach((v, i) => radii[i] = v);
  ctx.beginPath();
  ctx.moveTo(x + radii[0], y);
  ctx.lineTo(x + width - radii[1], y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radii[1]);
  ctx.lineTo(x + width, y + height - radii[2]);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radii[2], y + height);
  ctx.lineTo(x + radii[3], y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radii[3]);
  ctx.lineTo(x, y + radii[0]);
  ctx.quadraticCurveTo(x, y, x + radii[0], y);
  ctx.closePath();
  ctx.stroke();
};
var fillRoundedRect = (ctx, x, y, width, height, radius) => {
  var radii = [0, 0, 0, 0];
  if (typeof radius === "number") radii.fill(radius);else radius.forEach((v, i) => radii[i] = v);
  ctx.beginPath();
  ctx.moveTo(x + radii[0], y);
  ctx.lineTo(x + width - radii[1], y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radii[1]);
  ctx.lineTo(x + width, y + height - radii[2]);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radii[2], y + height);
  ctx.lineTo(x + radii[3], y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radii[3]);
  ctx.lineTo(x, y + radii[0]);
  ctx.quadraticCurveTo(x, y, x + radii[0], y);
  ctx.closePath();
  ctx.fill();
};

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FaustUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FaustUI */ "./src/FaustUI.ts");

var faustUI = new _FaustUI__WEBPACK_IMPORTED_MODULE_0__["FaustUI"]({
  root: document.getElementById("root")
});
var host;
window.addEventListener("message", e => {
  var source = e.source;
  host = source;
});
window.addEventListener("keydown", e => {
  if (host) host.postMessage({
    type: "keydown",
    key: e.key
  }, "*");
});
window.addEventListener("keyup", e => {
  if (host) host.postMessage({
    type: "keyup",
    key: e.key
  }, "*");
});
window.faustUI = faustUI;

/***/ }),

/***/ "./src/layout/AbstractGroup.ts":
/*!*************************************!*\
  !*** ./src/layout/AbstractGroup.ts ***!
  \*************************************/
/*! exports provided: AbstractGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractGroup", function() { return AbstractGroup; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-unused-vars */
class AbstractGroup {
  constructor(group, isRoot) {
    _defineProperty(this, "isRoot", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "label", void 0);

    _defineProperty(this, "items", void 0);

    _defineProperty(this, "layout", void 0);

    this.isRoot = !!isRoot;
    Object.assign(this, group);
    var hasHSizingDesc = this.hasHSizingDesc,
        hasVSizingDesc = this.hasVSizingDesc;
    var sizing = hasHSizingDesc && hasVSizingDesc ? "both" : hasHSizingDesc ? "horizontal" : hasVSizingDesc ? "vertical" : "none";
    this.layout = {
      type: group.type,
      width: AbstractGroup.padding * 2,
      height: AbstractGroup.padding * 2 + AbstractGroup.labelHeight,
      sizing
    };
  }
  /**
   * Adjust group width and height by its items' dimensions
   *
   * @returns {this}
   * @memberof AbstractGroup
   */


  adjust() {
    return this;
  }
  /**
   * Expand flexible items within a group
   *
   * @param {number} dX - Extra horizontal spaces that this group could take
   * @param {number} dY - Extra vertical spaces that this group could take
   * @returns {this}
   * @memberof AbstractGroup
   */


  expand(dX, dY) {
    return this;
  }
  /**
   * calculate all the items' absolute coordination (in grids)
   *
   * @returns {this}
   * @memberof AbstractGroup
   */


  offset() {
    return this;
  }
  /**
   * find recursively if the group has horizontal-sizable item
   *
   * @readonly
   * @type {boolean}
   * @memberof AbstractGroup
   */


  get hasHSizingDesc() {
    return !!this.items.find(item => {
      if (item instanceof AbstractGroup) return item.hasHSizingDesc;
      return item.layout.sizing === "horizontal" || item.layout.sizing === "both";
    });
  }
  /**
   * find recursively if the group has vertical-sizable item
   *
   * @readonly
   * @type {boolean}
   * @memberof AbstractGroup
   */


  get hasVSizingDesc() {
    return !!this.items.find(item => {
      if (item instanceof AbstractGroup) return item.hasVSizingDesc;
      return item.layout.sizing === "vertical" || item.layout.sizing === "both";
    });
  }

}

_defineProperty(AbstractGroup, "padding", 0.2);

_defineProperty(AbstractGroup, "labelHeight", 0.25);

_defineProperty(AbstractGroup, "spaceBetween", 0.1);

/***/ }),

/***/ "./src/layout/AbstractInputItem.ts":
/*!*****************************************!*\
  !*** ./src/layout/AbstractInputItem.ts ***!
  \*****************************************/
/*! exports provided: AbstractOutputItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractOutputItem", function() { return AbstractOutputItem; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/layout/AbstractItem.ts");

class AbstractOutputItem extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor(item) {
    super(item);
  }

}

/***/ }),

/***/ "./src/layout/AbstractItem.ts":
/*!************************************!*\
  !*** ./src/layout/AbstractItem.ts ***!
  \************************************/
/*! exports provided: AbstractItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractItem", function() { return AbstractItem; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AbstractItem {
  constructor(item) {
    _defineProperty(this, "type", void 0);

    _defineProperty(this, "label", void 0);

    _defineProperty(this, "address", void 0);

    _defineProperty(this, "index", void 0);

    _defineProperty(this, "init", void 0);

    _defineProperty(this, "min", void 0);

    _defineProperty(this, "max", void 0);

    _defineProperty(this, "meta", void 0);

    _defineProperty(this, "layout", void 0);

    Object.assign(this, item);
    this.min = isFinite(+this.min) ? +this.min : 0;
    this.max = isFinite(+this.max) ? +this.max : 1;
  }

}

/***/ }),

/***/ "./src/layout/AbstractOutputItem.ts":
/*!******************************************!*\
  !*** ./src/layout/AbstractOutputItem.ts ***!
  \******************************************/
/*! exports provided: AbstractInputItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractInputItem", function() { return AbstractInputItem; });
/* harmony import */ var _AbstractItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractItem */ "./src/layout/AbstractItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class AbstractInputItem extends _AbstractItem__WEBPACK_IMPORTED_MODULE_0__["AbstractItem"] {
  constructor(item) {
    super(item);

    _defineProperty(this, "init", void 0);

    _defineProperty(this, "step", void 0);

    this.init = +item.init || 0;
    this.step = +item.step || 1;
  }

}

/***/ }),

/***/ "./src/layout/Button.ts":
/*!******************************!*\
  !*** ./src/layout/Button.ts ***!
  \******************************/
/*! exports provided: Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony import */ var _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOutputItem */ "./src/layout/AbstractOutputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Button extends _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractInputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "button",
      width: 2,
      height: 1,
      sizing: "horizontal"
    });
  }

}

/***/ }),

/***/ "./src/layout/Checkbox.ts":
/*!********************************!*\
  !*** ./src/layout/Checkbox.ts ***!
  \********************************/
/*! exports provided: Checkbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return Checkbox; });
/* harmony import */ var _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOutputItem */ "./src/layout/AbstractOutputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Checkbox extends _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractInputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "checkbox",
      width: 2,
      height: 1,
      sizing: "horizontal"
    });
  }

}

/***/ }),

/***/ "./src/layout/HBargraph.ts":
/*!*********************************!*\
  !*** ./src/layout/HBargraph.ts ***!
  \*********************************/
/*! exports provided: HBargraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HBargraph", function() { return HBargraph; });
/* harmony import */ var _AbstractInputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractInputItem */ "./src/layout/AbstractInputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class HBargraph extends _AbstractInputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractOutputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "hbargraph",
      width: 5,
      height: 1,
      sizing: "horizontal"
    });
  }

}

/***/ }),

/***/ "./src/layout/HGroup.ts":
/*!******************************!*\
  !*** ./src/layout/HGroup.ts ***!
  \******************************/
/*! exports provided: HGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HGroup", function() { return HGroup; });
/* harmony import */ var _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractGroup */ "./src/layout/AbstractGroup.ts");

class HGroup extends _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"] {
  adjust() {
    this.items.forEach(item => {
      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) item.adjust();
      this.layout.width += item.layout.width;
      this.layout.height = Math.max(this.layout.height, item.layout.height + 2 * _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding + _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].labelHeight);
    });
    this.layout.width += _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].spaceBetween * (this.items.length - 1);
    if (this.layout.width < 1) this.layout.width += 1;
    return this;
  }

  expand(dX) {
    var hExpandItems = 0;
    this.items.forEach(item => {
      // Count items that need to expand horizontally
      if (item.layout.sizing === "both" || item.layout.sizing === "horizontal") hExpandItems++;
    });
    this.items.forEach(item => {
      var dX$ = 0;
      var dY$ = 0; // Space available to expand for current item

      if (item.layout.sizing === "both" || item.layout.sizing === "horizontal") {
        dX$ = hExpandItems ? dX / hExpandItems : 0;
        item.layout.width += dX$;
      }

      if (item.layout.sizing === "both" || item.layout.sizing === "vertical") {
        dY$ = this.layout.height - 2 * _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding - _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].labelHeight - item.layout.height;
        item.layout.height += dY$;
      }

      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) item.expand(dX$, dY$);
    });
    return this;
  }

  offset() {
    var labelHeight = _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].labelHeight,
        padding = _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding,
        spaceBetween = _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].spaceBetween;
    var $left = padding;
    var $top = padding + labelHeight;
    var height = this.layout.height;
    this.items.forEach(item => {
      item.layout.offsetLeft = $left;
      item.layout.offsetTop = $top; // center the item

      item.layout.offsetTop += (height - labelHeight - item.layout.height) / 2 - padding;
      item.layout.left = (this.layout.left || 0) + item.layout.offsetLeft;
      item.layout.top = (this.layout.top || 0) + item.layout.offsetTop;
      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) item.offset();
      $left += item.layout.width + spaceBetween;
    });
    return this;
  }

}

/***/ }),

/***/ "./src/layout/HSlider.ts":
/*!*******************************!*\
  !*** ./src/layout/HSlider.ts ***!
  \*******************************/
/*! exports provided: HSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HSlider", function() { return HSlider; });
/* harmony import */ var _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOutputItem */ "./src/layout/AbstractOutputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class HSlider extends _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractInputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "hslider",
      width: 5,
      height: 1,
      sizing: "horizontal"
    });
  }

}

/***/ }),

/***/ "./src/layout/Knob.ts":
/*!****************************!*\
  !*** ./src/layout/Knob.ts ***!
  \****************************/
/*! exports provided: Knob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Knob", function() { return Knob; });
/* harmony import */ var _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOutputItem */ "./src/layout/AbstractOutputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Knob extends _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractInputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "knob",
      width: 1,
      height: 1.75,
      sizing: "none"
    });
  }

}

/***/ }),

/***/ "./src/layout/Layout.ts":
/*!******************************!*\
  !*** ./src/layout/Layout.ts ***!
  \******************************/
/*! exports provided: Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var _HSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HSlider */ "./src/layout/HSlider.ts");
/* harmony import */ var _VSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VSlider */ "./src/layout/VSlider.ts");
/* harmony import */ var _Nentry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Nentry */ "./src/layout/Nentry.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Button */ "./src/layout/Button.ts");
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Checkbox */ "./src/layout/Checkbox.ts");
/* harmony import */ var _Knob__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Knob */ "./src/layout/Knob.ts");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Menu */ "./src/layout/Menu.ts");
/* harmony import */ var _Radio__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Radio */ "./src/layout/Radio.ts");
/* harmony import */ var _Led__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Led */ "./src/layout/Led.ts");
/* harmony import */ var _Numerical__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Numerical */ "./src/layout/Numerical.ts");
/* harmony import */ var _HBargraph__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HBargraph */ "./src/layout/HBargraph.ts");
/* harmony import */ var _VBargraph__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./VBargraph */ "./src/layout/VBargraph.ts");
/* harmony import */ var _HGroup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./HGroup */ "./src/layout/HGroup.ts");
/* harmony import */ var _VGroup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./VGroup */ "./src/layout/VGroup.ts");
/* harmony import */ var _TGroup__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./TGroup */ "./src/layout/TGroup.ts");















class Layout {
  /**
   * Get the rendering type of an item by parsing its metadata
   *
   * @static
   * @param {TFaustUIItem} item
   * @returns {TLayoutType}
   * @memberof Layout
   */
  static predictType(item) {
    if (item.type === "vgroup" || item.type === "hgroup" || item.type === "tgroup" || item.type === "button" || item.type === "checkbox") return item.type;

    if (item.type === "hbargraph" || item.type === "vbargraph") {
      if (item.meta && item.meta.find(meta => meta.style && meta.style.startsWith("led"))) return "led";
      if (item.meta && item.meta.find(meta => meta.style && meta.style.startsWith("numerical"))) return "numerical";
      return item.type;
    }

    if (item.type === "hslider" || item.type === "nentry" || item.type === "vslider") {
      if (item.meta && item.meta.find(meta => meta.style && meta.style.startsWith("knob"))) return "knob";
      if (item.meta && item.meta.find(meta => meta.style && meta.style.startsWith("menu"))) return "menu";
      if (item.meta && item.meta.find(meta => meta.style && meta.style.startsWith("radio"))) return "radio";
    }

    return item.type;
  }
  /**
   * Get the Layout class constructor of an item
   *
   * @static
   * @param {TFaustUIItem} item
   * @returns {AbstractItem | AbstractGroup}
   * @memberof Layout
   */


  static getItem(item) {
    var ctor = {
      hslider: _HSlider__WEBPACK_IMPORTED_MODULE_0__["HSlider"],
      vslider: _VSlider__WEBPACK_IMPORTED_MODULE_1__["VSlider"],
      nentry: _Nentry__WEBPACK_IMPORTED_MODULE_2__["Nentry"],
      button: _Button__WEBPACK_IMPORTED_MODULE_3__["Button"],
      checkbox: _Checkbox__WEBPACK_IMPORTED_MODULE_4__["Checkbox"],
      knob: _Knob__WEBPACK_IMPORTED_MODULE_5__["Knob"],
      menu: _Menu__WEBPACK_IMPORTED_MODULE_6__["Menu"],
      radio: _Radio__WEBPACK_IMPORTED_MODULE_7__["Radio"],
      led: _Led__WEBPACK_IMPORTED_MODULE_8__["Led"],
      numerical: _Numerical__WEBPACK_IMPORTED_MODULE_9__["Numerical"],
      hbargraph: _HBargraph__WEBPACK_IMPORTED_MODULE_10__["HBargraph"],
      vbargraph: _VBargraph__WEBPACK_IMPORTED_MODULE_11__["VBargraph"],
      hgroup: _HGroup__WEBPACK_IMPORTED_MODULE_12__["HGroup"],
      vgroup: _VGroup__WEBPACK_IMPORTED_MODULE_13__["VGroup"],
      tgroup: _TGroup__WEBPACK_IMPORTED_MODULE_14__["TGroup"]
    };
    var layoutType = this.predictType(item);
    return new ctor[layoutType](item);
  }

  static getItems(items) {
    return items.map(item => {
      if ("items" in item) item.items = this.getItems(item.items);
      return this.getItem(item);
    });
  }

  static calc(ui) {
    var rootGroup = new _VGroup__WEBPACK_IMPORTED_MODULE_13__["VGroup"]({
      items: this.getItems(ui),
      type: "vgroup",
      label: ""
    }, true);
    rootGroup.adjust();
    rootGroup.expand(0, 0);
    rootGroup.offset();
    return rootGroup;
  }

}

/***/ }),

/***/ "./src/layout/Led.ts":
/*!***************************!*\
  !*** ./src/layout/Led.ts ***!
  \***************************/
/*! exports provided: Led */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Led", function() { return Led; });
/* harmony import */ var _AbstractInputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractInputItem */ "./src/layout/AbstractInputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Led extends _AbstractInputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractOutputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "led",
      width: 1,
      height: 1,
      sizing: "none"
    });
  }

}

/***/ }),

/***/ "./src/layout/Menu.ts":
/*!****************************!*\
  !*** ./src/layout/Menu.ts ***!
  \****************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
/* harmony import */ var _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOutputItem */ "./src/layout/AbstractOutputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Menu extends _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractInputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "menu",
      width: 2,
      height: 1,
      sizing: "horizontal"
    });
  }

}

/***/ }),

/***/ "./src/layout/Nentry.ts":
/*!******************************!*\
  !*** ./src/layout/Nentry.ts ***!
  \******************************/
/*! exports provided: Nentry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nentry", function() { return Nentry; });
/* harmony import */ var _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOutputItem */ "./src/layout/AbstractOutputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Nentry extends _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractInputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "nentry",
      width: 1,
      height: 1,
      sizing: "none"
    });
  }

}

/***/ }),

/***/ "./src/layout/Numerical.ts":
/*!*********************************!*\
  !*** ./src/layout/Numerical.ts ***!
  \*********************************/
/*! exports provided: Numerical */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Numerical", function() { return Numerical; });
/* harmony import */ var _AbstractInputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractInputItem */ "./src/layout/AbstractInputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Numerical extends _AbstractInputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractOutputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "numerical",
      width: 1,
      height: 1,
      sizing: "none"
    });
  }

}

/***/ }),

/***/ "./src/layout/Radio.ts":
/*!*****************************!*\
  !*** ./src/layout/Radio.ts ***!
  \*****************************/
/*! exports provided: Radio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Radio", function() { return Radio; });
/* harmony import */ var _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOutputItem */ "./src/layout/AbstractOutputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Radio extends _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractInputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "radio",
      width: 2,
      height: 2,
      // TODO: vradio and hradio
      sizing: "both"
    });
  }

}

/***/ }),

/***/ "./src/layout/TGroup.ts":
/*!******************************!*\
  !*** ./src/layout/TGroup.ts ***!
  \******************************/
/*! exports provided: TGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TGroup", function() { return TGroup; });
/* harmony import */ var _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractGroup */ "./src/layout/AbstractGroup.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class TGroup extends _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"] {
  adjust() {
    this.items.forEach(item => {
      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) item.adjust();
      this.layout.width = Math.max(this.layout.width, item.layout.width + 2 * _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding);
      this.layout.height = Math.max(this.layout.height, item.layout.height + 2 * _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding + TGroup.labelHeight);
    });
    var tabsCount = this.items.length;
    this.layout.width = Math.max(this.layout.width, tabsCount * TGroup.tabLayout.width + 2 * TGroup.padding);
    this.layout.height += TGroup.tabLayout.height;
    if (this.layout.width < 1) this.layout.width += 1;
    return this;
  }

  expand() {
    var tabsCount = this.items.length;
    this.items.forEach(item => {
      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) {
        var dY$ = 0; // Space available to expand for current item

        var dX$ = 0;
        if (item.layout.sizing === "both" || item.layout.sizing === "horizontal") dX$ = this.layout.width - 2 * _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding - item.layout.width;
        if (item.layout.sizing === "both" || item.layout.sizing === "vertical") dY$ = this.layout.height - 2 * _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding - _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].labelHeight - (tabsCount ? TGroup.tabLayout.height : 0) - item.layout.height;
        item.expand(dX$, dY$);
      }
    });
    return this;
  }

  offset() {
    var labelHeight = _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].labelHeight,
        padding = _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding;
    var $left = padding;
    var $top = padding + labelHeight + TGroup.tabLayout.height;
    this.items.forEach(item => {
      item.layout.offsetLeft = $left;
      item.layout.offsetTop = $top;
      item.layout.left = (this.layout.left || 0) + item.layout.offsetLeft;
      item.layout.top = (this.layout.top || 0) + item.layout.offsetTop;
      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) item.offset();
    });
    return this;
  }

}

_defineProperty(TGroup, "tabLayout", {
  width: 2,
  height: 1
});

/***/ }),

/***/ "./src/layout/VBargraph.ts":
/*!*********************************!*\
  !*** ./src/layout/VBargraph.ts ***!
  \*********************************/
/*! exports provided: VBargraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VBargraph", function() { return VBargraph; });
/* harmony import */ var _AbstractInputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractInputItem */ "./src/layout/AbstractInputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class VBargraph extends _AbstractInputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractOutputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "vbargraph",
      width: 1,
      height: 5,
      sizing: "vertical"
    });
  }

}

/***/ }),

/***/ "./src/layout/VGroup.ts":
/*!******************************!*\
  !*** ./src/layout/VGroup.ts ***!
  \******************************/
/*! exports provided: VGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VGroup", function() { return VGroup; });
/* harmony import */ var _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractGroup */ "./src/layout/AbstractGroup.ts");

class VGroup extends _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"] {
  adjust() {
    this.items.forEach(item => {
      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) item.adjust();
      this.layout.width = Math.max(this.layout.width, item.layout.width + 2 * _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding);
      this.layout.height += item.layout.height;
    });
    this.layout.height += _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].spaceBetween * (this.items.length - 1);
    if (this.layout.width < 1) this.layout.width += 1;
    return this;
  }

  expand(dX, dY) {
    var vExpandItems = 0;
    this.items.forEach(item => {
      if (item.layout.sizing === "both" || item.layout.sizing === "vertical") vExpandItems++;
    });
    this.items.forEach(item => {
      var dX$ = 0;
      var dY$ = 0; // Space available to expand for current item

      if (item.layout.sizing === "both" || item.layout.sizing === "horizontal") {
        dX$ = this.layout.width - 2 * _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding - item.layout.width;
        item.layout.width += dX$;
      }

      if (item.layout.sizing === "both" || item.layout.sizing === "vertical") {
        dY$ = vExpandItems ? dY / vExpandItems : 0;
        item.layout.height += dY$;
      }

      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) item.expand(dX$, dY$);
    });
    return this;
  }

  offset() {
    var labelHeight = _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].labelHeight,
        padding = _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].padding,
        spaceBetween = _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"].spaceBetween;
    var $left = padding;
    var $top = padding + labelHeight;
    var width = this.layout.width;
    this.items.forEach(item => {
      item.layout.offsetLeft = $left;
      item.layout.offsetTop = $top; // center the item

      item.layout.offsetLeft += (width - item.layout.width) / 2 - padding;
      item.layout.left = (this.layout.left || 0) + item.layout.offsetLeft;
      item.layout.top = (this.layout.top || 0) + item.layout.offsetTop;
      if (item instanceof _AbstractGroup__WEBPACK_IMPORTED_MODULE_0__["AbstractGroup"]) item.offset();
      $top += item.layout.height + spaceBetween;
    });
    return this;
  }

}

/***/ }),

/***/ "./src/layout/VSlider.ts":
/*!*******************************!*\
  !*** ./src/layout/VSlider.ts ***!
  \*******************************/
/*! exports provided: VSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VSlider", function() { return VSlider; });
/* harmony import */ var _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOutputItem */ "./src/layout/AbstractOutputItem.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class VSlider extends _AbstractOutputItem__WEBPACK_IMPORTED_MODULE_0__["AbstractInputItem"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "layout", {
      type: "vslider",
      width: 1,
      height: 5,
      sizing: "vertical"
    });
  }

}

/***/ })

/******/ });
});
//# sourceMappingURL=faust-ui.js.map