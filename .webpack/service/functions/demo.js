module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./functions/demo.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./functions/demo.ts":
/*!***************************!*\
  !*** ./functions/demo.ts ***!
  \***************************/
/*! exports provided: generate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generate\", function() { return generate; });\n/* harmony import */ var pdf_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pdf-lib */ \"pdf-lib\");\n/* harmony import */ var pdf_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pdf_lib__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @middy/do-not-wait-for-empty-event-loop */ \"@middy/do-not-wait-for-empty-event-loop\");\n/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst generatePdf = async () => {\n    const pdfDoc = await pdf_lib__WEBPACK_IMPORTED_MODULE_0__[\"PDFDocument\"].create();\n    const timesRomanFont = await pdfDoc.embedFont(pdf_lib__WEBPACK_IMPORTED_MODULE_0__[\"StandardFonts\"].TimesRoman);\n    // Add a blank page to the document\n    const page = pdfDoc.addPage();\n    // Get the width and height of the page\n    const { width, height } = page.getSize();\n    // Draw a string of text toward the top of the page\n    const fontSize = 30;\n    page.drawText(\"Creating PDFs in Serverless is awesome!\", {\n        x: 50,\n        y: height - 4 * fontSize,\n        size: fontSize,\n        font: timesRomanFont,\n        color: Object(pdf_lib__WEBPACK_IMPORTED_MODULE_0__[\"rgb\"])(0, 0.53, 0.71)\n    });\n    // Serialize the PDFDocument to bytes (a Uint8Array)\n    const pdfBytes = await pdfDoc.save();\n    return pdfBytes;\n};\nconst handler = async (event) => {\n    const pdfBytes = await generatePdf();\n    const buffer = Buffer.from(pdfBytes);\n    //   console.log(event);\n    //   const stream = String.fromCharCode(...new Uint8Array(arrayBuffer));\n    return {\n        statusCode: 200,\n        headers: {\n            \"Content-type\": \"application/pdf\"\n        },\n        body: buffer.toString(\"base64\"),\n        isBase64Encoded: true\n    };\n};\nconst generate = _middy_core__WEBPACK_IMPORTED_MODULE_1___default()(handler).use(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_2___default()());\n\n\n//# sourceURL=webpack:///./functions/demo.ts?");

/***/ }),

/***/ "@middy/core":
/*!******************************!*\
  !*** external "@middy/core" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@middy/core\");\n\n//# sourceURL=webpack:///external_%22@middy/core%22?");

/***/ }),

/***/ "@middy/do-not-wait-for-empty-event-loop":
/*!**********************************************************!*\
  !*** external "@middy/do-not-wait-for-empty-event-loop" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@middy/do-not-wait-for-empty-event-loop\");\n\n//# sourceURL=webpack:///external_%22@middy/do-not-wait-for-empty-event-loop%22?");

/***/ }),

/***/ "pdf-lib":
/*!**************************!*\
  !*** external "pdf-lib" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pdf-lib\");\n\n//# sourceURL=webpack:///external_%22pdf-lib%22?");

/***/ })

/******/ });