/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Background/backgroud.ts":
/*!*************************************!*\
  !*** ./src/Background/backgroud.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Background\": () => (/* binding */ Background)\n/* harmony export */ });\n/* harmony import */ var _ComponentControl_ComponentConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ComponentControl/ComponentConstants */ \"./src/ComponentControl/ComponentConstants.ts\");\n\nvar Background = /** @class */ (function () {\n    function Background(xPos, yPos, imageElement) {\n        var _this = this;\n        this.draw = function (canvasCxt) {\n            canvasCxt.drawImage(_this.imageElement, _this.xPos, _this.yPos);\n        };\n        this.moveDown = function () {\n            if (_this.yPos != 0) {\n                _this.yPos += _ComponentControl_ComponentConstants__WEBPACK_IMPORTED_MODULE_0__.ComponentConstants.CANVAS_UNIT;\n                return true;\n            }\n            return false;\n        };\n        this.moveUp = function () {\n            if (_this.yPos + _this.imageElement.height !== _ComponentControl_ComponentConstants__WEBPACK_IMPORTED_MODULE_0__.ComponentConstants.CANVAS_HEIGHT_DEFAULT) {\n                _this.yPos -= _ComponentControl_ComponentConstants__WEBPACK_IMPORTED_MODULE_0__.ComponentConstants.CANVAS_UNIT;\n                return true;\n            }\n            return false;\n        };\n        this.moveLeft = function () {\n            if (_this.xPos + _this.imageElement.width !== _ComponentControl_ComponentConstants__WEBPACK_IMPORTED_MODULE_0__.ComponentConstants.CANVAS_WIDTH_DEFAULT) {\n                _this.xPos -= _ComponentControl_ComponentConstants__WEBPACK_IMPORTED_MODULE_0__.ComponentConstants.CANVAS_UNIT;\n                return true;\n            }\n            return false;\n        };\n        this.moveRight = function () {\n            if (_this.xPos != 0) {\n                _this.xPos += _ComponentControl_ComponentConstants__WEBPACK_IMPORTED_MODULE_0__.ComponentConstants.CANVAS_UNIT;\n                return true;\n            }\n            return false;\n        };\n        this.xPos = xPos;\n        this.yPos = yPos;\n        this.imageElement = imageElement;\n    }\n    return Background;\n}());\n\n\n\n//# sourceURL=webpack://PersonalWeb/./src/Background/backgroud.ts?");

/***/ }),

/***/ "./src/Character/Character.ts":
/*!************************************!*\
  !*** ./src/Character/Character.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Character\": () => (/* binding */ Character)\n/* harmony export */ });\n/* harmony import */ var _MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MotionControl/MotionConstants */ \"./src/MotionControl/MotionConstants.ts\");\n\nvar Character = /** @class */ (function () {\n    function Character(xPos, yPos, imageElement) {\n        var _this = this;\n        this.draw = function (canvasCxt) {\n            canvasCxt.drawImage(_this.imageElement, _this.xPos, _this.yPos);\n        };\n        this.changeDirection = function (direction) {\n            //please put them into constants\n            switch (direction) {\n                case (_MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Up):\n                    _this.imageElement.src = 'img/BackStand.png';\n                    break;\n                case (_MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Down):\n                    _this.imageElement.src = 'img/FrontStand.png';\n                    break;\n                case (_MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Left):\n                    _this.imageElement.src = 'img/LeftStand.png';\n                    break;\n                case (_MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Right):\n                    _this.imageElement.src = 'img/RightStand.png';\n                    break;\n            }\n        };\n        this.xEquiv = function () { return _this.xPos === _this.originX; };\n        this.yEquiv = function () { return _this.yPos === _this.originY; };\n        this.moveDown = function () {\n            _this.yPos += _MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_UNIT;\n            if (_this.yPos === _this.originY) {\n                return false;\n            }\n            return true;\n        };\n        this.moveUp = function () {\n            _this.yPos -= _MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_UNIT;\n            if (_this.yPos === _this.originY) {\n                return false;\n            }\n            return true;\n        };\n        this.moveLeft = function () {\n            _this.xPos -= _MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_UNIT;\n            if (_this.xPos === _this.originX) {\n                return false;\n            }\n            return true;\n        };\n        this.moveRight = function () {\n            _this.xPos += _MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_UNIT;\n            if (_this.xPos === _this.originX) {\n                return false;\n            }\n            return true;\n        };\n        this.xPos = xPos;\n        this.yPos = yPos;\n        this.imageElement = imageElement;\n        this.direction = _MotionControl_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Down;\n        this.originX = xPos;\n        this.originY = yPos;\n    }\n    return Character;\n}());\n\n\n\n//# sourceURL=webpack://PersonalWeb/./src/Character/Character.ts?");

/***/ }),

/***/ "./src/ComponentControl/ComponentConstants.ts":
/*!****************************************************!*\
  !*** ./src/ComponentControl/ComponentConstants.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ComponentConstants\": () => (/* binding */ ComponentConstants)\n/* harmony export */ });\nvar ComponentConstants = {\n    DEFAULT_BACKGROUND_IMG: 'img/PalletTown.png',\n    DEFAULT_CHARACTER_IMG: 'img/FrontStand.png',\n    PALLET_TOWN_RESOURCE: 'resources/PalletTown.json',\n    CANVAS_UNIT: 32,\n    CANVAS_WIDTH_DEFAULT: 1280,\n    CANVAS_HEIGHT_DEFAULT: 640,\n    INIT_PALLET_X: -6 * 32,\n    INIT_PALLET_Y: -10 * 32,\n    INIT_CHARACTER_X: 10 * 32,\n    INIT_CHARACTER_Y: 10 * 32\n};\n\n\n//# sourceURL=webpack://PersonalWeb/./src/ComponentControl/ComponentConstants.ts?");

/***/ }),

/***/ "./src/ComponentControl/ComponentControl.ts":
/*!**************************************************!*\
  !*** ./src/ComponentControl/ComponentControl.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ComponentController\": () => (/* binding */ ComponentController)\n/* harmony export */ });\n/* harmony import */ var _Background_backgroud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Background/backgroud */ \"./src/Background/backgroud.ts\");\n/* harmony import */ var _Character_Character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/Character */ \"./src/Character/Character.ts\");\n/* harmony import */ var _ComponentConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ComponentConstants */ \"./src/ComponentControl/ComponentConstants.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\nvar ComponentController = /** @class */ (function () {\n    function ComponentController() {\n        var _this = this;\n        this.initialize = function () { return __awaiter(_this, void 0, void 0, function () {\n            var _a, _b, _c, _d, _e, _f;\n            return __generator(this, function (_g) {\n                switch (_g.label) {\n                    case 0:\n                        _a = this;\n                        _b = _Background_backgroud__WEBPACK_IMPORTED_MODULE_0__.Background.bind;\n                        _c = [void 0, _ComponentConstants__WEBPACK_IMPORTED_MODULE_2__.ComponentConstants.INIT_PALLET_X,\n                            _ComponentConstants__WEBPACK_IMPORTED_MODULE_2__.ComponentConstants.INIT_PALLET_Y];\n                        return [4 /*yield*/, this.loadImage(_ComponentConstants__WEBPACK_IMPORTED_MODULE_2__.ComponentConstants.DEFAULT_BACKGROUND_IMG)];\n                    case 1:\n                        _a.background = new (_b.apply(_Background_backgroud__WEBPACK_IMPORTED_MODULE_0__.Background, _c.concat([_g.sent()])))();\n                        _d = this;\n                        _e = _Character_Character__WEBPACK_IMPORTED_MODULE_1__.Character.bind;\n                        _f = [void 0, _ComponentConstants__WEBPACK_IMPORTED_MODULE_2__.ComponentConstants.INIT_CHARACTER_X,\n                            _ComponentConstants__WEBPACK_IMPORTED_MODULE_2__.ComponentConstants.INIT_CHARACTER_Y];\n                        return [4 /*yield*/, this.loadImage(_ComponentConstants__WEBPACK_IMPORTED_MODULE_2__.ComponentConstants.DEFAULT_CHARACTER_IMG)];\n                    case 2:\n                        _d.character = new (_e.apply(_Character_Character__WEBPACK_IMPORTED_MODULE_1__.Character, _f.concat([_g.sent()])))();\n                        this.animate();\n                        return [2 /*return*/];\n                }\n            });\n        }); };\n        //rendering out the pictures\n        this.animate = function () {\n            window.requestAnimationFrame(_this.animate);\n            _this.background.draw(_this.canvasCxt);\n            _this.character.draw(_this.canvasCxt);\n        };\n        this.getCharacter = function () { return _this.character; };\n        this.getBackground = function () { return _this.background; };\n        console.log(\"COmponentConrtoller constructs\");\n        this.canvasCxt = document.querySelector('canvas').getContext('2d');\n        //this.blockInfo = require(constant.PALLET_TOWN_RESOURCE)\n    }\n    ComponentController.prototype.loadImage = function (imageUrl) {\n        return __awaiter(this, void 0, void 0, function () {\n            var img, imageLoadPromise;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        console.log(imageUrl + \" start loading\");\n                        img = new Image();\n                        imageLoadPromise = new Promise(function (resolve) {\n                            img = new Image();\n                            img.onload = resolve;\n                            img.src = imageUrl;\n                        });\n                        return [4 /*yield*/, imageLoadPromise];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, img];\n                }\n            });\n        });\n    };\n    return ComponentController;\n}());\n\n\n\n//# sourceURL=webpack://PersonalWeb/./src/ComponentControl/ComponentControl.ts?");

/***/ }),

/***/ "./src/MotionControl/MotionConstants.ts":
/*!**********************************************!*\
  !*** ./src/MotionControl/MotionConstants.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CANVAS_UNIT\": () => (/* binding */ CANVAS_UNIT),\n/* harmony export */   \"Direction\": () => (/* binding */ Direction)\n/* harmony export */ });\nvar Direction = {\n    Up: 'Up',\n    Down: 'Down',\n    Left: 'Left',\n    Right: 'Right'\n};\nvar CANVAS_UNIT = 32;\n\n\n//# sourceURL=webpack://PersonalWeb/./src/MotionControl/MotionConstants.ts?");

/***/ }),

/***/ "./src/MotionControl/MotionControl.ts":
/*!********************************************!*\
  !*** ./src/MotionControl/MotionControl.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MotionController\": () => (/* binding */ MotionController)\n/* harmony export */ });\n/* harmony import */ var _MotionConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MotionConstants */ \"./src/MotionControl/MotionConstants.ts\");\n\n//Motion controller module to control a character motion on a map\nvar MotionController = /** @class */ (function () {\n    function MotionController(character, background) {\n        var _this = this;\n        this.backgroundAction = {\n            up: true,\n            down: true,\n            left: true,\n            right: true\n        };\n        //vision control for moving character and background, from perspective of character\n        this.moveUp = function () {\n            _this.character.changeDirection(_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Up);\n            //check for collsion TDD\n            if (_this.character.yEquiv() && (_this.backgroundAction).up) {\n                //In this case backrgound is allowed to move down\n                if (!_this.background.moveDown()) {\n                    _this.backgroundAction.up = false;\n                    _this.character.moveUp();\n                }\n            }\n            else {\n                if (!_this.character.moveUp()) {\n                    _this.backgroundAction.down = true;\n                }\n            }\n        };\n        this.moveDown = function () {\n            _this.character.changeDirection(_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Down);\n            //check for collsion TDD\n            if (_this.character.yEquiv() && _this.backgroundAction.down) {\n                //In this case backrgound is allowed to move down\n                if (!_this.background.moveUp()) {\n                    _this.backgroundAction.down = false;\n                    _this.character.moveDown();\n                }\n            }\n            else {\n                if (!_this.character.moveDown()) {\n                    _this.backgroundAction.up = true;\n                }\n            }\n        };\n        this.moveLeft = function () {\n            _this.character.changeDirection(_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Left);\n            //check for collsion TDD\n            if (_this.character.xEquiv() && _this.backgroundAction.left) {\n                //In this case backrgound is allowed to move down\n                if (!_this.background.moveRight()) {\n                    _this.backgroundAction.left = false;\n                    _this.character.moveLeft();\n                }\n            }\n            else {\n                if (!_this.character.moveLeft()) {\n                    _this.backgroundAction.right = true;\n                }\n            }\n        };\n        this.moveRight = function () {\n            _this.character.changeDirection(_MotionConstants__WEBPACK_IMPORTED_MODULE_0__.Direction.Right);\n            //check for collsion TDD\n            if (_this.character.xEquiv() && _this.backgroundAction.right) {\n                //In this case backrgound is allowed to move down\n                if (!_this.background.moveLeft()) {\n                    _this.backgroundAction.right = false;\n                    _this.character.moveRight();\n                }\n            }\n            else {\n                if (!_this.character.moveRight()) {\n                    _this.backgroundAction.left = true;\n                }\n            }\n        };\n        console.log(character);\n        console.log(background);\n        //control the on/off\n        this.enable = true;\n        this.character = character;\n        this.background = background;\n        //start the eventlistener for keypressing\n        this.initializeListener();\n    }\n    //disable the motion capture and prevent the character from moving\n    MotionController.prototype.disable = function () {\n        this.enable = false;\n    };\n    MotionController.prototype.initializeListener = function () {\n        var _this = this;\n        window.addEventListener('keydown', function (event) {\n            if (!_this.enable)\n                return;\n            if (event.key === 'w' || event.key === 'ArrowUp') {\n                _this.moveUp();\n            }\n            else if (event.key === 's' || event.key === 'ArrowDown') {\n                _this.moveDown();\n            }\n            else if (event.key === 'a' || event.key === 'ArrowLeft') {\n                _this.moveLeft();\n            }\n            else if (event.key === 'd' || event.key === 'ArrowRight') {\n                _this.moveRight();\n            }\n            console.log(_this.backgroundAction, _this.character.xEquiv(), _this.character.yEquiv());\n        });\n    };\n    return MotionController;\n}());\n\n\n\n//# sourceURL=webpack://PersonalWeb/./src/MotionControl/MotionControl.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CANVAS_HEIGHT_DEFAULT\": () => (/* binding */ CANVAS_HEIGHT_DEFAULT),\n/* harmony export */   \"CANVAS_WIDTH_DEFAULT\": () => (/* binding */ CANVAS_WIDTH_DEFAULT)\n/* harmony export */ });\n//Here list some ts constants\nvar CANVAS_WIDTH_DEFAULT = 1280;\nvar CANVAS_HEIGHT_DEFAULT = 640;\n\n\n//# sourceURL=webpack://PersonalWeb/./src/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mainCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainCanvas */ \"./src/mainCanvas.ts\");\n\nwindow.onload = function () {\n    (0,_mainCanvas__WEBPACK_IMPORTED_MODULE_0__.canvasInit)();\n};\n\n\n//# sourceURL=webpack://PersonalWeb/./src/index.ts?");

/***/ }),

/***/ "./src/mainCanvas.ts":
/*!***************************!*\
  !*** ./src/mainCanvas.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProcessContent\": () => (/* binding */ ProcessContent),\n/* harmony export */   \"canvasInit\": () => (/* binding */ canvasInit)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n/* harmony import */ var _ComponentControl_ComponentControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComponentControl/ComponentControl */ \"./src/ComponentControl/ComponentControl.ts\");\n/* harmony import */ var _MotionControl_MotionControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MotionControl/MotionControl */ \"./src/MotionControl/MotionControl.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\nvar canvasInit = function () {\n    console.log(\"canvas init start\");\n    //get the canvas object\n    var canvas = document.querySelector('canvas');\n    if (canvas) {\n        canvas.width = _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH_DEFAULT;\n        canvas.height = _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT_DEFAULT;\n        ProcessContent();\n    }\n};\nvar ProcessContent = function () { return __awaiter(void 0, void 0, void 0, function () {\n    var componentController, motionController;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                console.log(\"content Process Start\");\n                componentController = new _ComponentControl_ComponentControl__WEBPACK_IMPORTED_MODULE_1__.ComponentController();\n                return [4 /*yield*/, componentController.initialize()];\n            case 1:\n                _a.sent();\n                motionController = new _MotionControl_MotionControl__WEBPACK_IMPORTED_MODULE_2__.MotionController(componentController.getCharacter(), componentController.getBackground());\n                return [2 /*return*/];\n        }\n    });\n}); };\n\n\n//# sourceURL=webpack://PersonalWeb/./src/mainCanvas.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;