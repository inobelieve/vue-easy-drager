(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-dragmove"] = factory();
	else
		root["vue-dragmove"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/directive/drag.js
/**
 * 传参举例
 * {
 *  handler: handleDrag,
 *  limit: {y: [0, 1920]}
 * }
 */
// import { countScale } from '@/utils'
function registerDrag() {
  var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (!app) {
    return '未传入实例！';
  }

  var keyBoard = {
    Shift: false,
    Alt: false
  };

  function setVal(e) {
    keyBoard.Shift = e.shiftKey;
    keyBoard.Alt = e.altKey;
  }

  function clearVal() {
    keyBoard.Shift = false;
    keyBoard.Alt = false;
  }

  var doMove = function doMove(el, binding) {
    var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    document.addEventListener('keydown', setVal);
    document.addEventListener('keyup', clearVal);
    el.style.cursor = 'move';
    el.setAttribute('draggable', false);

    el.onmousedown = function (dom) {
      // 算出鼠标相对元素的位置
      var initLeft = el.offsetLeft;
      var initTop = el.offsetTop;
      var movStartLeft = dom.clientX;
      var movStartTop = dom.clientY; // let scal = countScale()

      var scal = 1;

      document.onmousemove = function (e) {
        if (keyBoard.Shift) {
          direction = 'x';
        } else if (keyBoard.Alt) {
          direction = 'y';
        } else {
          direction = '';
        } // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置


        var left = (e.clientX - movStartLeft) / scal;
        var top = (e.clientY - movStartTop) / scal;
        var positionLeft = initLeft;
        var positionTop = initTop; // 是否传入限制

        var limit = binding.value.limit || {};
        var limitX = limit.x || [];
        var limitY = limit.y || [];
        var x = initLeft + left;
        var y = initTop + top;
        var leftVal = limitX[0] || limitX[0] === 0 ? Math.max(x, limitX[0]) : x;
        leftVal = limitX[1] || limitX[1] === 0 ? Math.min(leftVal, limitX[1]) : leftVal;
        var topVal = limitY[0] || limitY[0] === 0 ? Math.max(y, limitY[0]) : y;
        topVal = limitY[1] || limitY[1] === 0 ? Math.min(topVal, limitY[1]) : topVal; // 是否是一维拖动

        if (direction === 'x') {
          positionLeft = leftVal;
        } else if (direction === 'y') {
          positionTop = topVal;
        } else {
          positionLeft = leftVal;
          positionTop = topVal;
        }

        el.style.left = positionLeft + 'px';
        el.style.top = positionTop + 'px';

        if (typeof binding.value === 'function') {
          binding.value({
            el: e,
            status: 'draging',
            left: positionLeft,
            top: positionTop
          });
        } else if (binding.value && typeof binding.value.handler === 'function') {
          binding.value.handler({
            el: e,
            status: 'draging',
            left: positionLeft,
            top: positionTop
          });
        }
      }; // 当鼠标松开，且未触发onmouseup时


      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;

        if (typeof binding.value === 'function') {
          binding.value({
            el: dom,
            status: 'dragend'
          });
        }
      };
    };
  };

  app.directive('drag', {
    // vue2.0
    bind: function bind(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding);
      }
    },
    update: function update(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding);
      } else {
        el.style.cursor = 'default';
        el.onmousedown = null;
      }
    },
    // vue3.0
    mounted: function mounted(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding);
      }
    },
    updated: function updated(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding);
      } else {
        el.style.cursor = 'default';
        el.onmousedown = null;
      }
    }
  });
  app.directive('drag-x', {
    bind: function bind(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding, 'x');
      }
    },
    update: function update(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding, 'x');
      } else {
        el.style.cursor = 'default';
        el.onmousedown = null;
      }
    },
    // vue3.0
    mounted: function mounted(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding, 'x');
      }
    },
    updated: function updated(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding, 'x');
      } else {
        el.style.cursor = 'default';
        el.onmousedown = null;
      }
    }
  });
  app.directive('drag-y', {
    bind: function bind(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding, 'y');
      }
    },
    update: function update(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding, 'y');
      } else {
        el.style.cursor = 'default';
        el.onmousedown = null;
      }
    },
    // vue3.0
    mounted: function mounted(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding, 'y');
      }
    },
    updated: function updated(el, binding) {
      if (binding.value) {
        el.style.position = 'absolute';
        doMove(el, binding, 'y');
      } else {
        el.style.cursor = 'default';
        el.onmousedown = null;
      }
    }
  });
  return app;
}

/* harmony default export */ var drag = (registerDrag);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (drag);



/***/ })

/******/ });
});
//# sourceMappingURL=vue-dragmove.umd.js.map