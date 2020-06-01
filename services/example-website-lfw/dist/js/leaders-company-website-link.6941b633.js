(window["webpackJsonpCMSBrowserComponents"] = window["webpackJsonpCMSBrowserComponents"] || []).push([["leaders-company-website-link"],{

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../packages/leaders/browser/company-website-link.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/babel-loader/lib??ref--1!/root/node_modules/vue-loader/lib??vue-loader-options!/root/packages/leaders/browser/company-website-link.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    companyId: {
      type: Number,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  },
  methods: {
    emitAction: function emitAction() {
      var payload = {
        category: 'Leaders Company Profile',
        type: 'click',
        label: 'Company Website'
      };
      var data = {
        companyId: this.companyId,
        companyName: this.companyName
      };
      this.$emit('action', payload, data);
    }
  }
});

/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../packages/leaders/browser/company-website-link.vue?vue&type=template&id=fbafd528&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/root/node_modules/vue-loader/lib??vue-loader-options!/root/packages/leaders/browser/company-website-link.vue?vue&type=template&id=fbafd528& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
    "a",
    {
      staticClass: "btn btn-sm btn-primary btn-block",
      attrs: {
        href: _vm.href,
        target: "_blank",
        title: "Visit Site",
        rel: "nofollow"
      },
      on: { click: _vm.emitAction }
    },
    [_vm._v("\n  Visit Site\n")]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../packages/leaders/browser/company-website-link.vue":
/*!***************************************************************!*\
  !*** /root/packages/leaders/browser/company-website-link.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _company_website_link_vue_vue_type_template_id_fbafd528___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./company-website-link.vue?vue&type=template&id=fbafd528& */ "../../packages/leaders/browser/company-website-link.vue?vue&type=template&id=fbafd528&");
/* harmony import */ var _company_website_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./company-website-link.vue?vue&type=script&lang=js& */ "../../packages/leaders/browser/company-website-link.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _company_website_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _company_website_link_vue_vue_type_template_id_fbafd528___WEBPACK_IMPORTED_MODULE_0__["render"],
  _company_website_link_vue_vue_type_template_id_fbafd528___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/leaders/browser/company-website-link.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../packages/leaders/browser/company-website-link.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** /root/packages/leaders/browser/company-website-link.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_company_website_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--1!../../../node_modules/vue-loader/lib??vue-loader-options!./company-website-link.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../packages/leaders/browser/company-website-link.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_company_website_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../packages/leaders/browser/company-website-link.vue?vue&type=template&id=fbafd528&":
/*!**********************************************************************************************!*\
  !*** /root/packages/leaders/browser/company-website-link.vue?vue&type=template&id=fbafd528& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_company_website_link_vue_vue_type_template_id_fbafd528___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./company-website-link.vue?vue&type=template&id=fbafd528& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../packages/leaders/browser/company-website-link.vue?vue&type=template&id=fbafd528&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_company_website_link_vue_vue_type_template_id_fbafd528___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_company_website_link_vue_vue_type_template_id_fbafd528___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=leaders-company-website-link.6941b633.js.map