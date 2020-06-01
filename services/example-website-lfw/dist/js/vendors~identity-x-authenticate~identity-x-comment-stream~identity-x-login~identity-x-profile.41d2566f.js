(window["webpackJsonpCMSBrowserComponents"] = window["webpackJsonpCMSBrowserComponents"] || []).push([["vendors~identity-x-authenticate~identity-x-comment-stream~identity-x-login~identity-x-profile"],{

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

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/errors/form.js":
/*!********************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/errors/form.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormError; });
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






var FormError =
/*#__PURE__*/
function (_Error) {
  _root_node_modules_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(FormError, _Error);

  function FormError(message) {
    var _this;

    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    _root_node_modules_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FormError);

    _this = _root_node_modules_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _root_node_modules_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(FormError).call(this, message));
    _this.name = 'FormError';
    _this.code = code;
    return _this;
  }

  return FormError;
}(_root_node_modules_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));



/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue":
/*!********************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_group_vue_vue_type_template_id_22f06782___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-group.vue?vue&type=template&id=22f06782& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=template&id=22f06782&");
/* harmony import */ var _form_group_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-group.vue?vue&type=script&lang=js& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_group_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_group_vue_vue_type_template_id_22f06782___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_group_vue_vue_type_template_id_22f06782___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_form_group_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../babel-loader/lib??ref--1!../../../../../vue-loader/lib??vue-loader-options!./form-group.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_form_group_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=template&id=22f06782&":
/*!***************************************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=template&id=22f06782& ***!
  \***************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_form_group_vue_vue_type_template_id_22f06782___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../vue-loader/lib??vue-loader-options!./form-group.vue?vue&type=template&id=22f06782& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=template&id=22f06782&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_form_group_vue_vue_type_template_id_22f06782___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_form_group_vue_vue_type_template_id_22f06782___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue":
/*!********************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_label_vue_vue_type_template_id_22b31234___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-label.vue?vue&type=template&id=22b31234& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=template&id=22b31234&");
/* harmony import */ var _form_label_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-label.vue?vue&type=script&lang=js& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_label_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_label_vue_vue_type_template_id_22b31234___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_label_vue_vue_type_template_id_22b31234___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_form_label_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../babel-loader/lib??ref--1!../../../../../vue-loader/lib??vue-loader-options!./form-label.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_form_label_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=template&id=22b31234&":
/*!***************************************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=template&id=22b31234& ***!
  \***************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_form_label_vue_vue_type_template_id_22b31234___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../vue-loader/lib??vue-loader-options!./form-label.vue?vue&type=template&id=22b31234& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=template&id=22b31234&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_form_label_vue_vue_type_template_id_22b31234___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_form_label_vue_vue_type_template_id_22b31234___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue":
/*!***************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _email_vue_vue_type_template_id_45ba0871___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./email.vue?vue&type=template&id=45ba0871& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=template&id=45ba0871&");
/* harmony import */ var _email_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./email.vue?vue&type=script&lang=js& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _email_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _email_vue_vue_type_template_id_45ba0871___WEBPACK_IMPORTED_MODULE_0__["render"],
  _email_vue_vue_type_template_id_45ba0871___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_email_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../babel-loader/lib??ref--1!../../../../../vue-loader/lib??vue-loader-options!./email.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_email_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=template&id=45ba0871&":
/*!**********************************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=template&id=45ba0871& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_email_vue_vue_type_template_id_45ba0871___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../vue-loader/lib??vue-loader-options!./email.vue?vue&type=template&id=45ba0871& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=template&id=45ba0871&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_email_vue_vue_type_template_id_45ba0871___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_email_vue_vue_type_template_id_45ba0871___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue":
/*!***************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/login.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_708db3a9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=708db3a9& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=template&id=708db3a9&");
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ "../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_708db3a9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_vue_vue_type_template_id_708db3a9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/@base-cms/marko-web-identity-x/browser/login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../babel-loader/lib??ref--1!../../../vue-loader/lib??vue-loader-options!./login.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_babel_loader_lib_index_js_ref_1_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=template&id=708db3a9&":
/*!**********************************************************************************************************!*\
  !*** /root/node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=template&id=708db3a9& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_708db3a9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../vue-loader/lib??vue-loader-options!./login.vue?vue&type=template&id=708db3a9& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=template&id=708db3a9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_708db3a9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_708db3a9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/babel-loader/lib??ref--1!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    classNames: function classNames() {
      var classNames = ['form-group'];
      var className = this.className;
      if (className) classNames.push(className);
      return classNames;
    }
  }
});

/***/ }),

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/babel-loader/lib??ref--1!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    required: {
      type: Boolean,
      default: false
    }
  }
});

/***/ }),

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/babel-loader/lib??ref--1!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_form_group_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/form-group.vue */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue");
/* harmony import */ var _common_form_label_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/form-label.vue */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue");
//
//
//
//
//
//
//
//
//
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
  components: {
    FormGroup: _common_form_group_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    FormLabel: _common_form_label_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Email Address'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      id: 'sign-on-email'
    };
  },
  computed: {
    email: {
      get: function get() {
        return this.value || '';
      },
      set: function set(email) {
        this.$emit('input', email || null);
      }
    }
  }
});

/***/ }),

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/babel-loader/lib??ref--1!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_node_modules_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! /root/node_modules/@babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _root_node_modules_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_root_node_modules_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _form_fields_email_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form/fields/email.vue */ "../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue");
/* harmony import */ var _utils_clean_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/clean-path */ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/clean-path.js");
/* harmony import */ var _utils_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/post */ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/post.js");
/* harmony import */ var _utils_cookies_enabled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/cookies-enabled */ "../../node_modules/@base-cms/marko-web-identity-x/browser/utils/cookies-enabled.js");
/* harmony import */ var _errors_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./errors/form */ "../../node_modules/@base-cms/marko-web-identity-x/browser/errors/form.js");
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  /**
   *
   */
  components: {
    Email: _form_fields_email_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },

  /**
   *
   */
  props: {
    activeUser: {
      type: Object,
      default: function _default() {}
    },
    endpoints: {
      type: Object,
      required: true
    },
    buttonLabels: {
      type: Object,
      default: function _default() {
        return {
          submit: 'Login / Register',
          logout: 'Logout'
        };
      }
    },
    consentPolicy: {
      type: String,
      default: null
    },
    redirect: {
      type: String,
      default: null
    },
    appContextId: {
      type: String,
      default: null
    }
  },

  /**
   *
   */
  data: function data() {
    return {
      email: null,
      complete: false,
      error: null,
      loading: false
    };
  },

  /**
   *
   */
  computed: {
    /**
     *
     */
    authUrl: function authUrl() {
      return "".concat(window.location.origin, "/").concat(Object(_utils_clean_path__WEBPACK_IMPORTED_MODULE_3__["default"])(this.endpoints.authenticate));
    },

    /**
     *
     */
    hasActiveUser: function hasActiveUser() {
      return this.activeUser && this.activeUser.email;
    },

    /**
     *
     */
    redirectTo: function redirectTo() {
      var redirect = this.redirect;
      if (redirect) return redirect;
      var _window$location = window.location,
          pathname = _window$location.pathname,
          search = _window$location.search,
          hash = _window$location.hash;
      return "".concat(pathname).concat(search).concat(hash);
    }
  },

  /**
   *
   */
  mounted: function mounted() {
    if (!Object(_utils_cookies_enabled__WEBPACK_IMPORTED_MODULE_5__["default"])()) {
      this.error = new _errors_feature__WEBPACK_IMPORTED_MODULE_7__["default"]('Your browser does not support cookies. Please enable cookies to use this feature.');
    }
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    handleSubmit: function () {
      var _handleSubmit = _root_node_modules_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var email, redirectTo, authUrl, appContextId, res, data;
        return _root_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.error = null;
                this.loading = true;
                email = this.email, redirectTo = this.redirectTo, authUrl = this.authUrl, appContextId = this.appContextId;
                _context.prev = 3;
                _context.next = 6;
                return Object(_utils_post__WEBPACK_IMPORTED_MODULE_4__["default"])('/login', {
                  email: email,
                  redirectTo: redirectTo,
                  authUrl: authUrl,
                  appContextId: appContextId
                });

              case 6:
                res = _context.sent;
                _context.next = 9;
                return res.json();

              case 9:
                data = _context.sent;

                if (res.ok) {
                  _context.next = 12;
                  break;
                }

                throw new _errors_form__WEBPACK_IMPORTED_MODULE_6__["default"](data.message, res.status);

              case 12:
                if (data.ok) {
                  this.complete = true;
                  this.$emit('submit');
                }

                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](3);
                this.error = _context.t0;

              case 18:
                _context.prev = 18;
                this.loading = false;
                return _context.finish(18);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 15, 18, 21]]);
      }));

      function handleSubmit() {
        return _handleSubmit.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }
});

/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=template&id=22f06782&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-group.vue?vue&type=template&id=22f06782& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { class: _vm.classNames }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=template&id=22b31234&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/form/common/form-label.vue?vue&type=template&id=22b31234& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "label",
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm.required
        ? _c("strong", { staticClass: "text-danger" }, [_vm._v("*")])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=template&id=45ba0871&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/form/fields/email.vue?vue&type=template&id=45ba0871& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "form-group",
    [
      _c("form-label", { attrs: { for: _vm.id, required: true } }, [
        _vm._v("\n    " + _vm._s(_vm.label) + "\n  ")
      ]),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.email,
            expression: "email"
          }
        ],
        staticClass: "form-control",
        attrs: {
          id: _vm.id,
          type: "email",
          required: true,
          disabled: _vm.disabled,
          placeholder: _vm.placeholder,
          autocomplete: "email"
        },
        domProps: { value: _vm.email },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.email = $event.target.value
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=template&id=708db3a9&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/root/node_modules/vue-loader/lib??vue-loader-options!/root/node_modules/@base-cms/marko-web-identity-x/browser/login.vue?vue&type=template&id=708db3a9& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.hasActiveUser
    ? _c("div", [
        _c("p", [
          _vm._v(
            "You are currently logged in as " +
              _vm._s(_vm.activeUser.email) +
              "."
          )
        ]),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "btn btn-primary",
            attrs: { href: _vm.endpoints.logout, role: "button" }
          },
          [_vm._v("\n    " + _vm._s(_vm.buttonLabels.logout) + "\n  ")]
        )
      ])
    : _vm.complete
    ? _c("div", [
        _c("h4", [_vm._v("Almost Done!")]),
        _vm._v(" "),
        _c("p", [
          _vm._v("\n    We just sent an email to "),
          _c("em", [_vm._v(_vm._s(_vm.email))]),
          _vm._v(
            " with your one-time login link.\n    To finish logging in, open the email message and click the link within.\n  "
          )
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "\n    Note: please check your spam/junk folders.\n    If you do not receive this email, your firewall or ISP has likely blocked it.\n    Please add noreply@identity-x.io to your whitelist and try registering again.\n  "
          )
        ])
      ])
    : _c("div", [
        _c(
          "form",
          {
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.handleSubmit($event)
              }
            }
          },
          [
            _c(
              "fieldset",
              { attrs: { disabled: _vm.loading } },
              [
                _c("email", {
                  model: {
                    value: _vm.email,
                    callback: function($$v) {
                      _vm.email = $$v
                    },
                    expression: "email"
                  }
                }),
                _vm._v(" "),
                _vm.consentPolicy
                  ? _c("small", {
                      staticClass: "text-muted mb-3",
                      domProps: { innerHTML: _vm._s(_vm.consentPolicy) }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "button",
                  { staticClass: "btn btn-primary", attrs: { type: "submit" } },
                  [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm.buttonLabels.submit) +
                        "\n      "
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _vm.error
              ? _c("p", { staticClass: "mt-3 text-danger" }, [
                  _vm._v(
                    "\n      An error occurred: " +
                      _vm._s(_vm.error.message) +
                      "\n    "
                  )
                ])
              : _vm._e()
          ]
        )
      ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=vendors~identity-x-authenticate~identity-x-comment-stream~identity-x-login~identity-x-profile.41d2566f.js.map