(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Scope"] = factory();
	else
		root["Scope"] = factory();
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/Scope.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/Scope.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "div.scope {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  background-color: #181818;\n  color: whitesmoke; }\n  div.scope > div {\n    position: absolute; }\n  div.scope > div.scope-data {\n    display: flex;\n    height: 100%;\n    width: 100%;\n    flex-direction: column;\n    font-size: 0.75em;\n    font-family: Consolas, monospace;\n    overflow-x: auto; }\n    div.scope > div.scope-data > .scope-channel {\n      display: grid;\n      position: relative;\n      width: 1px;\n      flex: 1 1 auto;\n      grid-template-columns: repeat(auto-fill, 80px);\n      grid-template-rows: repeat(auto-fill, 20px);\n      grid-auto-flow: column;\n      border-bottom: #505050 dashed 1px; }\n      div.scope > div.scope-data > .scope-channel > .scope-cell {\n        display: block;\n        width: 80px;\n        height: 20px;\n        background-color: inherit;\n        white-space: nowrap; }\n        div.scope > div.scope-data > .scope-channel > .scope-cell > span {\n          display: inline-block;\n          border: #606060 solid 1px;\n          text-align: right;\n          padding: 0px 1px;\n          height: 20px;\n          line-height: 20px; }\n          div.scope > div.scope-data > .scope-channel > .scope-cell > span:first-child {\n            width: 30px;\n            color: #ffffa0; }\n          div.scope > div.scope-data > .scope-channel > .scope-cell > span:last-child {\n            width: 50px; }\n        div.scope > div.scope-data > .scope-channel > .scope-cell.highlight > span {\n          border-color: #ff8800;\n          background-color: #552200; }\n  div.scope > canvas.scope-canvas {\n    position: absolute;\n    height: 100%;\n    width: 100%; }\n  div.scope > .scope-ui-controller {\n    display: flex;\n    opacity: 0.4;\n    transition: opacity 0.15s ease-in-out, background-color 0.15s ease-in-out;\n    z-index: 1; }\n  div.scope:hover > .scope-ui-controller {\n    opacity: 1;\n    background-color: rgba(0, 0, 0, 0.5); }\n  div.scope > .scope-default {\n    position: relative;\n    top: 20%;\n    color: #0c5460;\n    background-color: #d1ecf1;\n    border-color: #bee5eb;\n    padding: 0.75rem 1.25rem;\n    margin-bottom: 1rem;\n    border: 1px solid transparent;\n    border-radius: 0.25rem; }\n    div.scope > .scope-default > h5 {\n      font-size: 1.25rem;\n      margin-top: 0;\n      margin-bottom: 0.5rem;\n      font-weight: 500;\n      line-height: 1.2;\n      color: #0c5460; }\n  div.scope .btn-overlay {\n    font-size: 12px;\n    border-color: transparent;\n    border-radius: 0px;\n    padding: 0rem 0.1rem;\n    z-index: 3; }\n    div.scope .btn-overlay.active {\n      color: unset !important;\n      background-color: unset !important;\n      border-color: transparent transparent #f8f9fa transparent !important;\n      border-bottom-color: #f8f9fa !important; }\n      div.scope .btn-overlay.active:hover {\n        color: #212529 !important;\n        background-color: #f8f9fa !important;\n        border-color: #f8f9fa !important; }\n    div.scope .btn-overlay:focus {\n      box-shadow: none !important; }\n    div.scope .btn-overlay.btn-overlay-icon {\n      width: 20px; }\n  div.scope button:not(:disabled) {\n    cursor: pointer; }\n  div.scope .btn-outline-light {\n    color: #f8f9fa;\n    border-color: #f8f9fa; }\n    div.scope .btn-outline-light:hover {\n      color: #212529;\n      background-color: #f8f9fa;\n      border-color: #f8f9fa; }\n  div.scope .btn {\n    display: inline-block;\n    font-weight: 400;\n    text-align: center;\n    vertical-align: middle;\n    user-select: none;\n    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    background-color: transparent;\n    border: 1px solid transparent; }\n    div.scope .btn:focus {\n      outline: none; }\n", ""]);


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

/***/ "./src/Scope.scss":
/*!************************!*\
  !*** ./src/Scope.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./Scope.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/Scope.scss");

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

/***/ "./src/Scope.ts":
/*!**********************!*\
  !*** ./src/Scope.ts ***!
  \**********************/
/*! exports provided: Scope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scope", function() { return Scope; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Scope_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scope.scss */ "./src/Scope.scss");
/* harmony import */ var _Scope_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Scope_scss__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var EScopeMode;

(function (EScopeMode) {
  EScopeMode[EScopeMode["Data"] = 0] = "Data";
  EScopeMode[EScopeMode["Interleaved"] = 1] = "Interleaved";
  EScopeMode[EScopeMode["Oscilloscope"] = 2] = "Oscilloscope";
  EScopeMode[EScopeMode["Spectroscope"] = 3] = "Spectroscope";
  EScopeMode[EScopeMode["Spectrogram"] = 4] = "Spectrogram";
})(EScopeMode || (EScopeMode = {}));

class Scope {
  static drawInterleaved(ctx, w, h, d, zoom, zoomOffset, cursor) {
    this.drawBackground(ctx, w, h);
    if (!d) return;
    var $ = d.$,
        t = d.t,
        freqEstimated = d.freqEstimated,
        sampleRate = d.sampleRate,
        drawMode = d.drawMode;
    if (!t || !t.length || !t[0].length) return;
    var l = t[0].length; // Fastest way to get highest abs value in buffer

    var yFactor = 1;
    var i = t.length;

    while (i--) {
      var j = l;

      while (j--) {
        var abs = Math.abs(t[i][j]);
        if (abs > yFactor) yFactor = abs;
      }
    }

    var $0 = 0; // Draw start

    var $1 = l - 1; // Draw End

    if (drawMode === "continuous") {
      // Stablize
      var $zerox = 0;
      var thresh = 0.001;
      var period = sampleRate / freqEstimated;
      var times = Math.floor(l / period) - 1;

      while (t[0][Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($zerox++, $, l)] > thresh && $zerox < l) {
        ;
      }

      if ($zerox >= l - 1) {
        $zerox = 0;
      } else {
        while (t[0][Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($zerox++, $, l)] < thresh && $zerox < l) {
          ;
        }

        if ($zerox >= l - 1) {
          $zerox = 0;
        }
      }

      var drawL = times > 0 && isFinite(period) ? Math.min(period * times, l - $zerox) : l - $zerox;
      $0 = Math.round($zerox + drawL * zoomOffset);
      $1 = Math.round($zerox + drawL / zoom + drawL * zoomOffset);
    } else {
      $0 = Math.round(l * zoomOffset);
      $1 = Math.round(l / zoom + l * zoomOffset);
    }

    var left = 50;
    var bottom = 20;
    var hCh = (h - bottom) / t.length; // Height per channel

    var eventsToDraw = this.drawGrid(ctx, w, h, $0, $1, yFactor, d, EScopeMode.Interleaved);
    var gridX = (w - left) / ($1 - $0 - 1);
    var step = Math.max(1, Math.round(1 / gridX)); // horizontal draw step for optimization

    ctx.lineWidth = 2;

    for (var _i = 0; _i < t.length; _i++) {
      ctx.beginPath();
      ctx.strokeStyle = "hsl(".concat(_i * 60, ", 100%, 85%)");
      var maxInStep = void 0;
      var minInstep = void 0;

      for (var _j = $0; _j < $1; _j++) {
        var $j = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])(_j, $, l); // True index

        var samp = t[_i][$j];
        var $step = (_j - $0) % step;

        if ($step === 0) {
          maxInStep = samp;
          minInstep = samp;
        }

        if ($step !== step - 1) {
          if ($step !== 0) {
            if (samp > maxInStep) maxInStep = samp;
            if (samp < minInstep) minInstep = samp;
          }

          continue;
        }

        var x = (_j - $0) * gridX + left;
        var y = hCh * (_i + 0.5 - maxInStep / yFactor * 0.5);
        if (_j === $0) ctx.moveTo(x, y);else ctx.lineTo(x, y);

        if (minInstep !== maxInStep) {
          y = hCh * (_i + 0.5 - minInstep / yFactor * 0.5);
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    }

    eventsToDraw.forEach(params => this.drawEvent(...params));

    if (cursor && cursor.x > left && cursor.y < h - bottom) {
      var statsToDraw = {
        values: []
      };
      var $cursor = Math.round($0 + (cursor.x - left) / gridX);
      statsToDraw.values = [];
      statsToDraw.x = ($cursor - $0) * gridX + left;
      statsToDraw.xLabel = $cursor.toFixed(0);

      var _$j = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($cursor, $, l);

      for (var _i2 = 0; _i2 < t.length; _i2++) {
        var _samp = t[_i2][_$j];
        if (typeof _samp === "number") statsToDraw.values.push(_samp);
      }

      this.drawStats(ctx, w, h, statsToDraw);
    }
  }

  static drawOscilloscope(ctx, w, h, d, zoom, zoomOffset, cursor) {
    this.drawBackground(ctx, w, h);
    if (!d) return;
    var $ = d.$,
        t = d.t,
        freqEstimated = d.freqEstimated,
        sampleRate = d.sampleRate,
        drawMode = d.drawMode;
    if (!t || !t.length || !t[0].length) return;
    var l = t[0].length; // Fastest way to get highest abs value in buffer

    var yFactor = 1;
    var i = t.length;

    while (i--) {
      var j = l;

      while (j--) {
        var abs = Math.abs(t[i][j]);
        if (abs > yFactor) yFactor = abs;
      }
    }

    var $0 = 0; // Draw start

    var $1 = l - 1; // Draw End

    if (drawMode === "continuous") {
      // Stablize
      var $zerox = 0;
      var thresh = 0.001;
      var period = sampleRate / freqEstimated;
      var times = Math.floor(l / period) - 1;

      while (t[0][Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($zerox++, $, l)] > thresh && $zerox < l) {
        ;
      } // Find first raise


      if ($zerox >= l - 1) {
        // Found nothing, no stablization
        $zerox = 0;
      } else {
        while (t[0][Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($zerox++, $, l)] < thresh && $zerox < l) {
          ;
        } // Find first drop


        if ($zerox >= l - 1) {
          $zerox = 0;
        }
      }

      var drawL = times > 0 && isFinite(period) ? Math.min(period * times, l - $zerox) : l - $zerox; // length to draw

      $0 = Math.round($zerox + drawL * zoomOffset);
      $1 = Math.round($zerox + drawL / zoom + drawL * zoomOffset);
    } else {
      $0 = Math.round(l * zoomOffset);
      $1 = Math.round(l / zoom + l * zoomOffset);
    }

    var left = 50;
    var bottom = 20;
    var eventsToDraw = this.drawGrid(ctx, w, h, $0, $1, yFactor, d, EScopeMode.Oscilloscope);
    var gridX = (w - left) / ($1 - $0 - 1);
    var step = Math.max(1, Math.round(1 / gridX));
    ctx.lineWidth = 2;

    for (var _i3 = 0; _i3 < t.length; _i3++) {
      ctx.beginPath();
      ctx.strokeStyle = t.length === 1 ? "white" : "hsl(".concat(_i3 * 60, ", 100%, 85%)");
      var maxInStep = void 0;
      var minInStep = void 0;

      for (var _j2 = $0; _j2 < $1; _j2++) {
        var $j = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])(_j2, $, l);
        var samp = t[_i3][$j];
        var $step = (_j2 - $0) % step;

        if ($step === 0) {
          maxInStep = samp;
          minInStep = samp;
        }

        if ($step !== step - 1) {
          if ($step !== 0) {
            if (samp > maxInStep) maxInStep = samp;
            if (samp < minInStep) minInStep = samp;
          }

          continue;
        }

        var x = (_j2 - $0) * gridX + left;
        var y = (h - bottom) * (0.5 - maxInStep / yFactor * 0.5);
        if (_j2 === $0) ctx.moveTo(x, y);else ctx.lineTo(x, y);

        if (minInStep !== maxInStep) {
          y = (h - bottom) * (0.5 - minInStep / yFactor * 0.5);
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    }

    eventsToDraw.forEach(params => this.drawEvent(...params));

    if (cursor && cursor.x > left && cursor.y < h - bottom) {
      var statsToDraw = {
        values: []
      };
      var $cursor = Math.round($0 + (cursor.x - left) / gridX);
      statsToDraw.values = [];
      statsToDraw.x = ($cursor - $0) * gridX + left;
      statsToDraw.xLabel = $cursor.toFixed(0);

      var _$j2 = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($cursor, $, l);

      for (var _i4 = 0; _i4 < t.length; _i4++) {
        var _samp2 = t[_i4][_$j2];
        if (typeof _samp2 === "number") statsToDraw.values.push(_samp2);
      }

      this.drawStats(ctx, w, h, statsToDraw);
    }
  }

  static drawSpectroscope(ctx, w, h, d, zoom, zoomOffset, cursor) {
    this.drawBackground(ctx, w, h);
    if (!d) return;
    var $ = d.$,
        f = d.f,
        fftSize = d.fftSize,
        fftOverlap = d.fftOverlap;
    if (!f || !f.length || !f[0].length) return;
    var fftBins = fftSize / 2;
    var $f = $ * fftOverlap / 2;
    $f -= $f % fftBins;
    var l = f[0].length;
    var $0 = l - fftBins + Math.round(fftBins * zoomOffset);
    var $1 = l - fftBins + Math.round(fftBins / zoom + fftBins * zoomOffset);
    var left = 50;
    var bottom = 20;
    var hCh = (h - bottom) / f.length;
    var eventsToDraw = this.drawGrid(ctx, w, h, $0, $1, 1, d, EScopeMode.Spectroscope);
    var gridX = (w - left) / ($1 - $0 - 1);
    var step = Math.max(1, Math.round(1 / gridX));

    for (var i = 0; i < f.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = f.length === 1 ? "white" : "hsl(".concat(i * 60, ", 100%, 85%)");
      var maxInStep = void 0;

      for (var j = $0; j < $1; j++) {
        var $j = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])(j, $f, l);
        var samp = f[i][$j];
        var $step = (j - $0) % step;
        if ($step === 0) maxInStep = samp;

        if ($step !== step - 1) {
          if ($step !== 0 && samp > maxInStep) maxInStep = samp;
          continue;
        }

        var x = (j - $0) * gridX + left;
        var y = hCh * (i + 1 - Math.min(1, Math.max(0, (maxInStep + 10) / 100 + 1)));
        if (j === $0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
      }

      ctx.lineTo(w, hCh * (i + 1));
      ctx.lineTo(left, hCh * (i + 1));
      ctx.closePath();
      ctx.fill();
    }

    eventsToDraw.forEach(params => this.drawEvent(...params));

    if (cursor && cursor.x > left && cursor.y < h - bottom) {
      var statsToDraw = {
        values: []
      };
      var $cursor = $0 + Math.round((cursor.x - left) / gridX);
      statsToDraw.values = [];
      statsToDraw.x = ($cursor - $0) * gridX + left;
      statsToDraw.xLabel = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["indexToFreq"])($cursor, fftBins, d.sampleRate).toFixed(0);

      var _$j3 = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($cursor, $f, l);

      for (var _i5 = 0; _i5 < f.length; _i5++) {
        var _samp3 = f[_i5][_$j3];
        if (typeof _samp3 === "number") statsToDraw.values.push(_samp3);
      }

      this.drawStats(ctx, w, h, statsToDraw);
    }
  }

  static drawSpectrogram(ctx, tempCtx, w, h, d, zoom, zoomOffset, cursor) {
    this.drawBackground(ctx, w, h);
    if (!d) return;
    var $ = d.$,
        f = d.f,
        fftSize = d.fftSize,
        fftOverlap = d.fftOverlap;
    if (!f || !f.length || !f[0].length) return;
    var fftBins = fftSize / 2;
    var $f = $ * fftOverlap / 2;
    $f -= $f % fftBins;
    var l = f[0].length / fftBins;
    var $0fft = Math.floor(l * zoomOffset);
    var $1fft = Math.ceil(l / zoom + l * zoomOffset);
    var $0 = $0fft * fftBins;
    var $1 = $1fft * fftBins;
    var eventsToDraw = this.drawGrid(ctx, w, h, $0, $1, 1, d, EScopeMode.Spectrogram);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.imageSmoothingEnabled = false;
    var left = 50;
    var bottom = 20;
    var $0src = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($0fft, $f / fftBins, l);
    var $1src = $0src + $1fft - $0fft;

    if ($1src > l) {
      var split$ = l - $0src;
      ctx.drawImage(tempCtx.canvas, $0src, 0, split$, tempCtx.canvas.height, left, 0, split$ / ($1src - $0src) * (w - left), h - bottom);
      ctx.drawImage(tempCtx.canvas, 0, 0, $1src - l - 0.01, tempCtx.canvas.height, split$ / ($1src - $0src) * (w - left) + left, 0, (1 - split$ / ($1src - $0src)) * (w - left), h - bottom);
    } else {
      ctx.drawImage(tempCtx.canvas, $0src, 0, $1src - $0src, tempCtx.canvas.height, left, 0, w - left, h - bottom);
    }

    ctx.restore();
    eventsToDraw.forEach(params => this.drawEvent(...params));

    if (cursor && cursor.x > left && cursor.y < h - bottom) {
      var statsToDraw = {
        values: []
      };
      var gridX = (w - left) / ($1fft - $0fft);
      var gridY = (h - bottom) / f.length / fftBins;
      var $fft = $0fft + Math.floor((cursor.x - left) / gridX);
      var $ch = Math.floor(cursor.y / gridY / fftBins);
      var $bin = Math.floor((h - bottom - cursor.y) / gridY) % fftBins;
      var $cursor = $fft * fftBins + $bin;
      var $j = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($cursor, $f, f[0].length);
      var freq = $j % fftBins / fftBins * d.sampleRate / 2;
      var samp = f[$ch][$j];
      if (typeof samp === "number") statsToDraw.values = [samp];
      statsToDraw.x = ($fft - $0fft + 0.5) * gridX + left;
      statsToDraw.y = (($ch + 1) * fftBins - $bin) * gridY;
      statsToDraw.xLabel = $fft.toFixed(0);
      statsToDraw.yLabel = freq.toFixed(0);
      this.drawStats(ctx, w, h, statsToDraw);
    }
  }

  static drawOfflineSpectrogram(ctx, d, last$) {
    if (!d) return last$;
    var $ = d.$,
        f = d.f,
        fftSize = d.fftSize,
        fftOverlap = d.fftOverlap;
    if (!f || !f.length || !f[0].length) return last$;
    var fftBins = fftSize / 2;
    var $f = $ * fftOverlap / 2;
    $f -= $f % fftBins;
    var _ctx$canvas = ctx.canvas,
        canvasWidth = _ctx$canvas.width,
        h = _ctx$canvas.height;
    var l = f[0].length;
    var $0 = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])(last$, 0, l);
    var $1 = $0 >= $f ? $f + l : $f;
    if ($1 - $0 < 0) return last$;
    var $0fft = Math.floor($0 / fftBins);
    var $1fft = Math.ceil($1 / fftBins);
    var hCh = h / f.length;
    var w = l / fftBins;
    var $h = hCh / fftBins;
    if (canvasWidth !== w) ctx.canvas.width = w;
    var step = Math.max(1, Math.round(fftBins / hCh));

    for (var i = 0; i < f.length; i++) {
      for (var j = $0fft; j < $1fft; j++) {
        var maxInStep = void 0;
        ctx.fillStyle = "black";
        ctx.fillRect(j % w, i * hCh, 1, hCh);

        for (var k = 0; k < fftBins; k++) {
          var samp = f[i][Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])(k, j * fftBins, l)];
          var $step = k % step;
          if ($step === 0) maxInStep = samp;

          if ($step !== step - 1) {
            if ($step !== 0 && samp > maxInStep) maxInStep = samp;
            continue;
          }

          var normalized = Math.min(1, Math.max(0, (maxInStep + 10) / 100 + 1));
          if (normalized === 0) continue;
          var hue = (normalized * 180 + 240) % 360;
          var lum = normalized * 50;
          ctx.fillStyle = "hsl(".concat(hue, ", 100%, ").concat(lum, "%)");
          ctx.fillRect(j % w, (fftBins - k - 1) * $h + i * hCh, 1, Math.max(1, $h));
        }
      }
    }

    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])($1, 0, l);
  }

  static drawBackground(ctx, w, h) {
    ctx.save();
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  static drawGrid(ctx, w, h, $0, $1, yFactor, d, mode) {
    ctx.save();
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    var t = d.t,
        e = d.e,
        bufferSize = d.bufferSize,
        fftSize = d.fftSize,
        fftOverlap = d.fftOverlap,
        sampleRate = d.sampleRate;
    var inFreqDomain = mode === EScopeMode.Spectrogram || mode === EScopeMode.Spectroscope;
    var fftBins = fftSize / 2;
    var channels = mode === EScopeMode.Oscilloscope ? 1 : t.length;
    var unit = mode === EScopeMode.Spectrogram ? "Hz/frame" : mode === EScopeMode.Spectroscope ? "dB/Hz" : "lvl/samp";
    var eventsToDraw = [];
    var $0buffer = $0 / bufferSize / (inFreqDomain ? fftOverlap / 2 : 1);
    var $1buffer = $1 / bufferSize / (inFreqDomain ? fftOverlap / 2 : 1);
    var hStep = Math.pow(2, Math.ceil(Math.log2($1buffer - $0buffer))) / 8;
    $0buffer -= $0buffer % hStep;
    $1buffer -= $0buffer % hStep;
    var $buffer = d.$buffer || 0;
    if (inFreqDomain) $buffer -= $buffer % (fftBins / bufferSize / fftOverlap / 2);
    var left = 50;
    var bottom = 20;
    var eventStrokeStyle = "#ff8800";
    var bufferStrokeStyle = "#004000";
    var normalStrokeStyle = "#404040";
    ctx.fillStyle = "#DDDD99";
    ctx.font = "10px Consolas, monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(unit, 45, h - 10, 40);
    ctx.textAlign = "center";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(left, 0);
    ctx.lineTo(left, h - bottom);
    ctx.lineTo(w, h - bottom);
    ctx.stroke();
    ctx.strokeStyle = bufferStrokeStyle;

    for (var j = $0buffer; j < $1buffer; j += hStep) {
      var $fft = j / (fftBins / bufferSize) * fftOverlap / 2;
      var x = (j * bufferSize * (inFreqDomain ? fftOverlap / 2 : 1) - $0) / ($1 - $0 - 1) * (w - left) + left;
      if (x < left) continue;
      ctx.strokeStyle = j % 1 === 0 ? bufferStrokeStyle : normalStrokeStyle;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h - bottom);
      ctx.stroke();

      if (mode === EScopeMode.Spectrogram) {
        if ($fft % 1 === 0) ctx.fillText($fft.toFixed(), Math.min(x, w - 20), h - 10);
      } else if (mode === EScopeMode.Spectroscope) {
        ctx.fillText(($fft % 1 * sampleRate / 2).toFixed(), Math.min(x, w - 20), h - 10);
      } else {
        ctx.fillText((j * bufferSize).toFixed(), Math.min(x, w - 20), h - 10);
      }
    }

    if (e) {
      for (var _j3 = Math.ceil($0buffer); _j3 < $1buffer; _j3++) {
        if (e[$buffer + _j3] && e[$buffer + _j3].length) {
          var _x = (_j3 * bufferSize * (inFreqDomain ? fftOverlap / 2 : 1) - $0) / ($1 - $0 - 1) * (w - left) + left;

          ctx.strokeStyle = eventStrokeStyle;
          eventsToDraw.push([ctx, w, h, _x, e[$buffer + _j3]]);
          ctx.beginPath();
          ctx.moveTo(_x, 0);
          ctx.lineTo(_x, h - bottom);
          ctx.stroke();
        }
      }
    }

    ctx.strokeStyle = normalStrokeStyle;
    var hCh = (h - bottom) / channels;
    var vStep = 0.25;

    while (yFactor / vStep > 2) {
      vStep *= 2;
    } // Maximum horizontal grids in channel one side = 2


    ctx.beginPath();
    ctx.textAlign = "right";

    var drawHLine = (y, yLabel) => {
      ctx.moveTo(left, y);
      ctx.lineTo(w, y);
      ctx.fillText(yLabel, 45, Math.max(y, 10));
    };

    for (var i = 0; i < channels; i++) {
      var y = (i + 0.5) * hCh;
      var $ = 0.5;
      var yLabel = mode === EScopeMode.Spectrogram ? Object(_utils__WEBPACK_IMPORTED_MODULE_0__["indexToFreq"])(fftBins * $, fftBins, sampleRate).toFixed(0) : mode === EScopeMode.Spectroscope ? (-110 + 100 * $).toFixed(0) : (-yFactor + 2 * yFactor * $).toFixed(2);
      drawHLine(y, yLabel);

      for (var _j4 = vStep; _j4 < yFactor; _j4 += vStep) {
        $ = 0.5 - _j4 / yFactor / 2;
        y = (i + 0.5 + _j4 / yFactor / 2) * hCh;
        yLabel = mode === EScopeMode.Spectrogram ? Object(_utils__WEBPACK_IMPORTED_MODULE_0__["indexToFreq"])(fftBins * $, fftBins, sampleRate).toFixed(0) : mode === EScopeMode.Spectroscope ? (-110 + 100 * $).toFixed(0) : (-yFactor + 2 * yFactor * $).toFixed(2);
        drawHLine(y, yLabel);
        $ = 0.5 + _j4 / yFactor / 2;
        y = (i + 0.5 - _j4 / yFactor / 2) * hCh;
        yLabel = mode === EScopeMode.Spectrogram ? Object(_utils__WEBPACK_IMPORTED_MODULE_0__["indexToFreq"])(fftBins * $, fftBins, sampleRate).toFixed(0) : mode === EScopeMode.Spectroscope ? (-110 + 100 * $).toFixed(0) : (-yFactor + 2 * yFactor * $).toFixed(2);
        drawHLine(y, yLabel);
      }
    }

    ctx.stroke();
    ctx.beginPath();
    ctx.setLineDash([4, 2]);
    ctx.strokeStyle = "white";

    for (var _i6 = 1; _i6 < channels; _i6++) {
      ctx.moveTo(0, _i6 * hCh);
      ctx.lineTo(w, _i6 * hCh);
    }

    ctx.stroke();
    ctx.restore();
    return eventsToDraw;
  }

  static drawEvent(ctx, w, h, x, e) {
    ctx.save();
    ctx.font = "bold 12px Consolas, monospace";
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    var eStrings = e.map(event => event.data.path ? "".concat(event.data.path, ": ").concat(event.data.value) : "".concat(event.type, ": ").concat(event.data.join(",")));
    var textWidth = Math.max(...eStrings.map(s => ctx.measureText(s).width)) + 5;

    if (w - x >= textWidth) {
      ctx.fillRect(x, 0, textWidth, e.length * 15 + 2);
      ctx.textAlign = "left";
    } else {
      ctx.fillRect(x - textWidth, 0, textWidth, e.length * 15 + 2);
      ctx.textAlign = "right";
    }

    ctx.fillStyle = "#DDDD99";
    eStrings.forEach((s, i) => ctx.fillText(s, x, (i + 1) * 15, textWidth));
    ctx.restore();
  }

  static drawStats(ctx, w, h, statsToDraw) {
    var left = 50;
    var bottom = 20;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#b0b0b0";
    ctx.beginPath();
    var x = statsToDraw.x,
        y = statsToDraw.y,
        xLabel = statsToDraw.xLabel,
        yLabel = statsToDraw.yLabel,
        values = statsToDraw.values;

    if (x) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h - bottom);
    }

    if (y) {
      ctx.moveTo(left, y);
      ctx.lineTo(w, y);
    }

    ctx.stroke();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    if (xLabel) ctx.fillRect(Math.min(x - 20, w - 40), h - 18, 40, 16);
    if (yLabel) ctx.fillRect(5, Math.max(0, y - 8), 45, 16);
    ctx.fillStyle = "#DDDD99";
    ctx.font = "bold 12px Consolas, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (xLabel) ctx.fillText(xLabel, Math.min(x, w - 20), h - 10, 40);
    ctx.textAlign = "right";
    if (yLabel) ctx.fillText(yLabel, 40, Math.max(10, y), 40);
    ctx.textBaseline = "bottom";
    var right = [];
    values.forEach(v => right.push(v.toFixed(3)));
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(w - 50, 0, 60, right.length * 15 + 5);
    ctx.fillStyle = "#DDDD99";
    right.forEach((s, i) => ctx.fillText(s, w - 2, (i + 1) * 15, 50));
    ctx.restore();
  }

  static fillDivData(container, d) {
    container.innerHTML = "";
    if (!d) return;
    var $ = d.$,
        t = d.t,
        e = d.e;
    if (!t || !t.length || !t[0].length) return;
    var l = t[0].length;

    for (var i = 0; i < t.length; i++) {
      var ch = t[i];
      var divCh = document.createElement("div");
      divCh.classList.add("scope-channel");
      divCh.style.backgroundColor = t.length === 1 ? "#181818" : "hsl(".concat(i * 60, ", 100%, 10%)");

      for (var j = 0; j < Math.min(ch.length, 2048); j++) {
        var $j = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["wrap"])(j, $, l);
        var divCell = document.createElement("div");
        divCell.classList.add("scope-cell");
        var $buffer = (d.$buffer || 0) + Math.floor(j / d.bufferSize);
        if (e && e[$buffer] && e[$buffer].length && j % d.bufferSize === 0) divCell.classList.add("highlight");
        var spanIndex = document.createElement("span");
        spanIndex.innerText = j.toString();
        var spanSamp = document.createElement("span");
        spanSamp.innerText = ch[$j].toFixed(3);
        divCell.appendChild(spanIndex);
        divCell.appendChild(spanSamp);
        divCh.appendChild(divCell);
      }

      if (ch.length > 2048) {
        var _divCell = document.createElement("div");

        _divCell.classList.add("scope-cell");

        var _spanIndex = document.createElement("span");

        _spanIndex.innerText = "...";

        var _spanSamp = document.createElement("span");

        _spanSamp.innerText = "...";

        _divCell.appendChild(_spanIndex);

        _divCell.appendChild(_spanSamp);

        divCh.appendChild(_divCell);
      }

      container.appendChild(divCh);
    }
  }

  static getModeName(typeIn) {
    if (typeIn === EScopeMode.Data) return "Data";
    if (typeIn === EScopeMode.Interleaved) return "Interleaved";
    if (typeIn === EScopeMode.Oscilloscope) return "Oscilloscope";
    if (typeIn === EScopeMode.Spectroscope) return "Spectroscope";
    if (typeIn === EScopeMode.Spectrogram) return "Spectrogram";
    return "";
  }

  constructor(options) {
    _defineProperty(this, "raf", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "btnSwitch", void 0);

    _defineProperty(this, "btnZoomOut", void 0);

    _defineProperty(this, "btnZoom", void 0);

    _defineProperty(this, "btnZoomIn", void 0);

    _defineProperty(this, "spanSwitch", void 0);

    _defineProperty(this, "divData", void 0);

    _defineProperty(this, "divDefault", void 0);

    _defineProperty(this, "_mode", EScopeMode.Oscilloscope);

    _defineProperty(this, "_zoom", {
      oscilloscope: 1,
      spectroscope: 1,
      spectrogram: 1
    });

    _defineProperty(this, "_zoomOffset", {
      oscilloscope: 0,
      spectroscope: 0,
      spectrogram: 0
    });

    _defineProperty(this, "data", {
      drawMode: "manual",
      t: undefined,
      $: 0,
      $buffer: 0,
      bufferSize: 128,
      fftSize: 256,
      fftOverlap: 2
    });

    _defineProperty(this, "cursor", void 0);

    _defineProperty(this, "dragging", false);

    _defineProperty(this, "spectTempCtx", void 0);

    _defineProperty(this, "lastSpect$", 0);

    _defineProperty(this, "drawSpectrogram", false);

    _defineProperty(this, "handleMouseMove", e => {
      if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
      if (this.mode === EScopeMode.Data) return;
      var w = this.container.clientWidth;
      var h = this.container.clientHeight;
      var rect = this.canvas.getBoundingClientRect();
      var x = e instanceof MouseEvent ? e.offsetX : e.touches[0].pageX - rect.left;
      x = Math.max(0, Math.min(w, x));
      var y = e instanceof MouseEvent ? e.offsetY : e.touches[0].pageY - rect.top;
      y = Math.max(0, Math.min(h, y));
      this.cursor = {
        x,
        y
      }; // if (this.data.drawMode === "continuous") return;

      this.draw();
    });

    _defineProperty(this, "handleMouseDown", eDown => {
      if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
      if (this.mode === EScopeMode.Data) return;
      eDown.preventDefault();
      eDown.stopPropagation();
      this.dragging = true;
      this.canvas.style.cursor = "grab";
      var origZoom = this.zoom;
      var origOffset = this.zoomOffset;
      var prevX = eDown instanceof MouseEvent ? eDown.pageX : eDown.touches[0].pageX;
      var prevY = eDown instanceof MouseEvent ? eDown.pageY : eDown.touches[0].pageY;

      var handleMouseMove = eMove => {
        var x = eMove instanceof MouseEvent ? eMove.pageX : eMove.touches[0].pageX;
        var y = eMove instanceof MouseEvent ? eMove.pageY : eMove.touches[0].pageY;
        var dX = x - prevX;
        var dY = y - prevY;
        prevX = x;
        prevY = y;
        var multiplier = 1 / Math.pow(1.015, dY);
        var offset = -dX / this.zoom / this.canvas.width;
        if (multiplier !== 1) this.zoom *= multiplier;
        if (offset !== 0) this.zoomOffset += offset;
        if (this.zoom !== origZoom || this.zoomOffset !== origOffset) this.draw();
      };

      var handleMouseUp = () => {
        this.dragging = false;
        this.canvas.style.cursor = "";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("touchmove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchend", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleMouseUp);
    });

    _defineProperty(this, "handleMouseLeave", () => {
      if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
      if (this.mode === EScopeMode.Data) return;
      this.cursor = undefined;
      this.draw();
    });

    _defineProperty(this, "draw", data => {
      if (data) this.data = data;
      if (this.raf) cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => {
        if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) {
          if (this.divDefault.style.display === "none") {
            this.divDefault.style.display = "block";
            return;
          }
        } else if (this.divDefault.style.display !== "none") this.divDefault.style.display = "none";

        if (data && this.drawSpectrogram) this.lastSpect$ = Scope.drawOfflineSpectrogram(this.spectTempCtx, this.data, this.lastSpect$);
        if (this.data.drawMode === "continuous" && this.canvas.offsetParent === null) return; // not visible

        var w = this.container.clientWidth;
        var h = this.container.clientHeight;
        if (this.canvas.width !== w) this.canvas.width = w;
        if (this.canvas.height !== h) this.canvas.height = h;
        if (this.mode === EScopeMode.Data) Scope.fillDivData(this.divData, this.data);else if (this.mode === EScopeMode.Interleaved) Scope.drawInterleaved(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor);else if (this.mode === EScopeMode.Oscilloscope) Scope.drawOscilloscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor);else if (this.mode === EScopeMode.Spectroscope) Scope.drawSpectroscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor);else if (this.mode === EScopeMode.Spectrogram) Scope.drawSpectrogram(this.ctx, this.spectTempCtx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor);
      });
    });

    Object.assign(this, options);
    this.getChildren();
    this.bind();
    this.mode = EScopeMode.Oscilloscope;
  }

  getChildren() {
    this.spectTempCtx = document.createElement("canvas").getContext("2d");
    this.spectTempCtx.canvas.height = 1024;
    var ctrl;
    this.container.classList.add("scope");

    for (var i = 0; i < this.container.children.length; i++) {
      var e = this.container.children[i];
      if (e.classList.contains("scope-ui-controller")) ctrl = e;
      if (e.classList.contains("scope-canvas")) this.canvas = e;
      if (e.classList.contains("scope-data")) this.divData = e;
      if (e.classList.contains("scope-default")) this.divDefault = e;
    }

    if (!ctrl) {
      ctrl = document.createElement("div");
      ctrl.classList.add("scope-ui-controller");
      this.container.appendChild(ctrl);
    }

    if (!this.canvas) {
      var canvas = document.createElement("canvas");
      canvas.classList.add("scope-canvas");
      this.container.appendChild(canvas);
      this.canvas = canvas;
    }

    if (!this.divData) {
      var divData = document.createElement("div");
      divData.classList.add("scope-data");
      this.container.appendChild(divData);
      this.divData = divData;
    }

    if (!this.divDefault) {
      var divDefault = document.createElement("div");
      divDefault.classList.add("scope-default", "alert", "alert-info");
      divDefault.setAttribute("role", "alert");
      divDefault.innerHTML = "<h5>No Data</h5>";
      this.container.appendChild(divDefault);
      this.divDefault = divDefault;
    }

    this.ctx = this.canvas.getContext("2d");

    for (var _i7 = 0; _i7 < ctrl.children.length; _i7++) {
      var _e = ctrl.children[_i7];
      if (_e.classList.contains("scope-ui-switch")) this.btnSwitch = _e;
      if (_e.classList.contains("scope-ui-zoomout")) this.btnZoomOut = _e;
      if (_e.classList.contains("scope-ui-zoom")) this.btnZoom = _e;
      if (_e.classList.contains("scope-ui-zoomin")) this.btnZoomIn = _e;
    }

    if (!this.btnSwitch) {
      var btn = document.createElement("button");
      btn.className = "scope-ui-switch btn btn-outline-light btn-sm btn-overlay";
      btn.setAttribute("title", "Interleaved Scope / Stacked Scope / Data");
      ctrl.appendChild(btn);
      this.btnSwitch = btn;
    }

    if (!this.btnZoomOut) {
      var _btn = document.createElement("button");

      _btn.className = "scope-ui-zoomout btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";

      _btn.setAttribute("title", "Zoom Out");

      _btn.innerHTML = "-";
      ctrl.appendChild(_btn);
      this.btnZoomOut = _btn;
    }

    if (!this.btnZoom) {
      var _btn2 = document.createElement("button");

      _btn2.className = "scope-ui-zoom btn btn-outline-light btn-sm btn-overlay";

      _btn2.setAttribute("title", "Reset Zoom");

      _btn2.innerText = "1.0x";
      ctrl.appendChild(_btn2);
      this.btnZoom = _btn2;
    }

    if (!this.btnZoomIn) {
      var _btn3 = document.createElement("button");

      _btn3.className = "scope-ui-zoomin btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";

      _btn3.setAttribute("title", "Zoom In");

      _btn3.innerHTML = "+";
      ctrl.appendChild(_btn3);
      this.btnZoomIn = _btn3;
    }

    for (var _i8 = 0; _i8 < this.btnSwitch.children.length; _i8++) {
      var _e2 = this.btnSwitch.children[_i8];
      if (_e2 instanceof HTMLSpanElement) this.spanSwitch = _e2;
    }

    if (!this.spanSwitch) {
      var span = document.createElement("span");
      span.innerText = "Oscilloscope";
      this.btnSwitch.appendChild(span);
      this.spanSwitch = span;
    }
  }

  bind() {
    this.btnSwitch.addEventListener("click", () => {
      var newType = (this.mode + 1) % 5;
      if (newType === EScopeMode.Spectrogram && !this.drawSpectrogram) newType = (newType + 1) % 5;
      if (newType === EScopeMode.Data && this.data.drawMode === "continuous") newType = (newType + 1) % 5;
      if (newType === EScopeMode.Interleaved && this.data.t && this.data.t.length === 1) newType = (newType + 1) % 5;
      this.mode = newType;
    });
    this.canvas.addEventListener("click", () => {});
    this.canvas.addEventListener("wheel", e => {
      var multiplier = Math.pow(1.5, e.deltaY > 0 ? -1 : 1);
      if (multiplier !== 1) this.zoom *= Math.pow(1.5, e.deltaY > 0 ? -1 : 1);
      if (e.deltaX !== 0) this.zoomOffset += (e.deltaX > 0 ? 1 : -1) * 0.1;
      this.handleMouseMove(e);
    });
    this.btnZoomOut.addEventListener("click", () => {
      this.zoom /= 1.5;
      this.draw();
    });
    this.btnZoom.addEventListener("click", () => {
      this.zoom = 1;
      this.draw();
    });
    this.btnZoomIn.addEventListener("click", () => {
      this.zoom *= 1.5;
      this.draw();
    });
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("touchstart", this.handleMouseDown);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("touchmove", this.handleMouseMove);
    this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
    this.canvas.addEventListener("touchend", this.handleMouseLeave);
  }

  get zoomType() {
    return this.mode === EScopeMode.Spectroscope ? "spectroscope" : this.mode === EScopeMode.Spectrogram ? "spectrogram" : "oscilloscope";
  }

  get zoom() {
    return this._zoom[this.zoomType];
  }

  set zoom(zoomIn) {
    var maxZoom = this.data && this.data.t && this.data.t[0] ? Math.max(16, this.mode === EScopeMode.Spectroscope ? 16 : this.data.t[0].length / (this.inFreqDomain ? this.data.fftSize / 2 : this.data.bufferSize)) : 16;
    var w = this.canvas.width;
    var cursorIn = 0.5;
    var left = 50;
    if (this.cursor) cursorIn = Math.max(0, this.cursor.x - left) / (w - left);
    var cursor = this.zoomOffset + cursorIn / this.zoom;
    this._zoom[this.zoomType] = Math.min(maxZoom, Math.max(1, zoomIn));
    this.zoomOffset = cursor - cursorIn / this.zoom;
    this.btnZoom.innerHTML = this.zoom.toFixed(1) + "x";
  }

  get zoomOffset() {
    return this._zoomOffset[this.zoomType];
  }

  set zoomOffset(zoomOffsetIn) {
    this._zoomOffset[this.zoomType] = Math.max(0, Math.min(1 - 1 / this.zoom, zoomOffsetIn));
  }

  resetZoom() {
    this._zoom = {
      oscilloscope: 1,
      spectroscope: 1,
      spectrogram: 1
    };
    this._zoomOffset = {
      oscilloscope: 0,
      spectroscope: 0,
      spectrogram: 0
    };
  }

  get mode() {
    return this._mode;
  }

  set mode(modeIn) {
    this.spanSwitch.innerText = Scope.getModeName(modeIn);
    this._mode = modeIn;

    if (modeIn === EScopeMode.Data) {
      this.divData.style.display = "";
      this.canvas.style.display = "none";
      this.btnZoom.style.display = "none";
      this.btnZoomIn.style.display = "none";
      this.btnZoomOut.style.display = "none";
    } else {
      this.divData.style.display = "none";
      this.canvas.style.display = "";
      this.btnZoom.style.display = "";
      this.btnZoomIn.style.display = "";
      this.btnZoomOut.style.display = "";
    }

    this.draw();
  }

  get inFreqDomain() {
    return this.mode === EScopeMode.Spectrogram || this.mode === EScopeMode.Spectroscope;
  }

}

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scope */ "./src/Scope.ts");

var scope = new _Scope__WEBPACK_IMPORTED_MODULE_0__["Scope"]({
  container: document.getElementById("root")
});
var host;
window.addEventListener("message", e => {
  var data = e.data,
      source = e.source;
  host = source;
  var type = data.type;
  if (!type) return;
  if (type === "draw") scope.draw(data.data);
  if (type === "mode") scope.mode = data.mode;
  if (type === "drawSpectrogram") scope.drawSpectrogram = data.drawSpectrogram;
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
window.scope = scope;

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: mod, wrap, indexToFreq */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mod", function() { return mod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexToFreq", function() { return indexToFreq; });
/**
 * Mod support wrapping with negative numbers
 *
 * @param {number} x
 * @param {number} y
 */
var mod = (x, y) => (x % y + y) % y;
var wrap = (i, $, l) => mod(i + $, l);
var indexToFreq = (i, fftBins, sampleRate) => i % fftBins / fftBins * sampleRate / 2;

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map