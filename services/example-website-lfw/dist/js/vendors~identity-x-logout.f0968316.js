(window["webpackJsonpCMSBrowserComponents"] = window["webpackJsonpCMSBrowserComponents"] || []).push([["vendors~identity-x-logout"],{

/***/ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!*******************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/construct.js":
/*!**************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/construct.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/inherits.js":
/*!*************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/inherits.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!*********************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!********************************************************************!*\
  !*** /root/node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeFunction = __webpack_require__(/*! ./isNativeFunction */ "../../node_modules/@babel/runtime/helpers/isNativeFunction.js");

var construct = __webpack_require__(/*! ./construct */ "../../node_modules/@babel/runtime/helpers/construct.js");

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/errors/feature.js":
/*!***********************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/errors/feature.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FeatureError; });
/* harmony import */ var _root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/wrapNativeSuper */ "../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__);






var FeatureError =
/*#__PURE__*/
function (_Error) {
  _root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(FeatureError, _Error);

  function FeatureError(message) {
    var _this;

    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;

    _root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FeatureError);

    _this = _root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(FeatureError).call(this, message));
    _this.name = 'FeatureError';
    _this.code = code;
    return _this;
  }

  return FeatureError;
}(_root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));



/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/errors/logout.js":
/*!**********************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/errors/logout.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogoutError; });
/* harmony import */ var _root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/wrapNativeSuper */ "../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__);






var LogoutError =
/*#__PURE__*/
function (_Error) {
  _root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(LogoutError, _Error);

  function LogoutError(message) {
    var _this;

    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    _root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LogoutError);

    _this = _root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(LogoutError).call(this, message));
    _this.name = 'LogoutError';
    _this.code = code;
    return _this;
  }

  return LogoutError;
}(_root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));



/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue":
/*!****************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/logout.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logout_vue_vue_type_template_id_238c6c0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logout.vue?vue&type=template&id=238c6c0c& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=template&id=238c6c0c&");
/* harmony import */ var _logout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logout.vue?vue&type=script&lang=js& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _logout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _logout_vue_vue_type_template_id_238c6c0c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _logout_vue_vue_type_template_id_238c6c0c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/@base-cms/marko-web-identity-x/browser/logout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_logout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../babel-loader/lib??ref--1!../../../vue-loader/lib??vue-loader-options!./logout.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_logout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=template&id=238c6c0c&":
/*!***********************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=template&id=238c6c0c& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_logout_vue_vue_type_template_id_238c6c0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../vue-loader/lib??vue-loader-options!./logout.vue?vue&type=template&id=238c6c0c& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=template&id=238c6c0c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_logout_vue_vue_type_template_id_238c6c0c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_logout_vue_vue_type_template_id_238c6c0c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/clean-path.js":
/*!*************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/utils/clean-path.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (value) {
  return value.replace(/^\/+/, '');
});

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/cookies-enabled.js":
/*!******************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/utils/cookies-enabled.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  try {
    document.cookie = 'cookietest=1';
    var created = document.cookie.indexOf('cookietest=') !== -1;
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return created;
  } catch (e) {
    return false;
  }
});

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/get-referring-page.js":
/*!*********************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/utils/get-referring-page.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  var _document = document,
      referrer = _document.referrer;
  var _window = window,
      origin = _window.origin;
  if (!referrer) return '/'; // no referrer

  if (referrer.indexOf(origin) !== 0) return '/'; // off-site referrer

  return referrer.replace(origin, '');
};

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/post.js":
/*!*******************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/utils/post.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (path, body) {
  var endpoint = path.replace(/^\/+/, '');
  var uri = "/__idx/".concat(endpoint);
  return fetch(uri, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
});

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/redirect.js":
/*!***********************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/utils/redirect.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clean_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clean-path */ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/clean-path.js");

/* harmony default export */ __webpack_exports__["default"] = (function (to) {
  var path = Object(_clean_path__WEBPACK_IMPORTED_MODULE_0__["default"])(to);
  var url = "".concat(window.location.origin, "/").concat(path);
  window.location.replace(url);
});

/***/ }),

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/babel-loader/lib??ref--1!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_redirect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/redirect */ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/redirect.js");
/* harmony import */ var _utils_get_referring_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/get-referring-page */ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/get-referring-page.js");
/* harmony import */ var _utils_get_referring_page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_get_referring_page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_cookies_enabled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/cookies-enabled */ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/cookies-enabled.js");
/* harmony import */ var _utils_post__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/post */ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/post.js");
/* harmony import */ var _errors_logout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./errors/logout */ "../../node_modules/@base-cms/marko-web-identity-x/browser/errors/logout.js");
/* harmony import */ var _errors_feature__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./errors/feature */ "../../node_modules/@base-cms/marko-web-identity-x/browser/errors/feature.js");


//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    redirectTo: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      error: null
    };
  },
  mounted: function mounted() {
    if (Object(_utils_cookies_enabled__WEBPACK_IMPORTED_MODULE_4__["default"])()) {
      this.logout();
    } else {
      var error = new _errors_feature__WEBPACK_IMPORTED_MODULE_7__["default"]('Your browser does not support cookies. Please enable cookies to use this feature.');
      this.error = error.message;
    }
  },
  methods: {
    /**
     *
     */
    logout: function () {
      var _logout = _root_node_modules_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var res, data;
        return _root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.error = null;
                _context.prev = 1;
                _context.next = 4;
                return Object(_utils_post__WEBPACK_IMPORTED_MODULE_5__["default"])('/logout');

              case 4:
                res = _context.sent;
                _context.next = 7;
                return res.json();

              case 7:
                data = _context.sent;

                if (res.ok) {
                  _context.next = 10;
                  break;
                }

                throw new _errors_logout__WEBPACK_IMPORTED_MODULE_6__["default"](data.message, res.status);

              case 10:
                this.$emit('logout');
                this.redirect();
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                this.error = "Unable to logout: ".concat(_context.t0.message);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 14]]);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }(),
    redirect: function redirect() {
      var to = this.redirectTo ? this.redirectTo : _utils_get_referring_page__WEBPACK_IMPORTED_MODULE_3___default()();

      Object(_utils_redirect__WEBPACK_IMPORTED_MODULE_2__["default"])(to);
    }
  }
});

/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=template&id=238c6c0c&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/logout.vue?vue&type=template&id=238c6c0c& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.error
    ? _c("div", [_c("p", [_vm._v(_vm._s(_vm.error))])])
    : _c("div", [_c("p", [_vm._v("Logging out...")])])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=vendors~identity-x-logout.f0968316.js.map