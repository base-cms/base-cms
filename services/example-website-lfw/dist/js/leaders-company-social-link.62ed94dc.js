(window["webpackJsonpCMSBrowserComponents"] = window["webpackJsonpCMSBrowserComponents"] || []).push([["leaders-company-social-link"],{

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../packages/leaders/browser/company-social-link.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/babel-loader/lib??ref--1!/root/node_modules/vue-loader/lib??vue-loader-options!/root/packages/leaders/browser/company-social-link.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_cms_marko_web_icons_browser_facebook_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @base-cms/marko-web-icons/browser/facebook.vue */ "../../node_modules/@base-cms/marko-web-icons/browser/facebook.vue");
/* harmony import */ var _base_cms_marko_web_icons_browser_instagram_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @base-cms/marko-web-icons/browser/instagram.vue */ "../../node_modules/@base-cms/marko-web-icons/browser/instagram.vue");
/* harmony import */ var _base_cms_marko_web_icons_browser_linkedin_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @base-cms/marko-web-icons/browser/linkedin.vue */ "../../node_modules/@base-cms/marko-web-icons/browser/linkedin.vue");
/* harmony import */ var _base_cms_marko_web_icons_browser_pinterest_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @base-cms/marko-web-icons/browser/pinterest.vue */ "../../node_modules/@base-cms/marko-web-icons/browser/pinterest.vue");
/* harmony import */ var _base_cms_marko_web_icons_browser_twitter_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @base-cms/marko-web-icons/browser/twitter.vue */ "../../node_modules/@base-cms/marko-web-icons/browser/twitter.vue");
/* harmony import */ var _base_cms_marko_web_icons_browser_link_external_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @base-cms/marko-web-icons/browser/link-external.vue */ "../../node_modules/@base-cms/marko-web-icons/browser/link-external.vue");
/* harmony import */ var _base_cms_marko_web_icons_browser_youtube_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @base-cms/marko-web-icons/browser/youtube.vue */ "../../node_modules/@base-cms/marko-web-icons/browser/youtube.vue");
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
    IconFacebook: _base_cms_marko_web_icons_browser_facebook_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    IconInstagram: _base_cms_marko_web_icons_browser_instagram_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    IconLinkedin: _base_cms_marko_web_icons_browser_linkedin_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    IconOther: _base_cms_marko_web_icons_browser_link_external_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    IconPinterest: _base_cms_marko_web_icons_browser_pinterest_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    IconTwitter: _base_cms_marko_web_icons_browser_twitter_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    IconYoutube: _base_cms_marko_web_icons_browser_youtube_vue__WEBPACK_IMPORTED_MODULE_6__["default"]
  },
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
    },
    provider: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      modifiers: ['dark', 'lg']
    };
  },
  computed: {
    icon: function icon() {
      return "icon-".concat(this.provider);
    },
    title: function title() {
      return "Visit us on ".concat(this.provider.charAt(0).toUpperCase()).concat(this.provider.slice(1));
    }
  },
  methods: {
    emitAction: function emitAction() {
      var payload = {
        category: 'Leaders Company Profile',
        type: 'click',
        label: "Company Social - ".concat(this.provider)
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

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../packages/leaders/browser/company-social-link.vue?vue&type=template&id=84249fec&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /root/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/root/node_modules/vue-loader/lib??vue-loader-options!/root/packages/leaders/browser/company-social-link.vue?vue&type=template&id=84249fec& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
      staticClass: "social-icon-link",
      attrs: {
        href: _vm.href,
        target: "_blank",
        title: _vm.title,
        rel: "nofollow"
      },
      on: { click: _vm.emitAction }
    },
    [_c(_vm.icon, { tag: "component", attrs: { modifiers: _vm.modifiers } })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../packages/leaders/browser/company-social-link.vue":
/*!**************************************************************!*\
  !*** /root/packages/leaders/browser/company-social-link.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _company_social_link_vue_vue_type_template_id_84249fec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./company-social-link.vue?vue&type=template&id=84249fec& */ "../../packages/leaders/browser/company-social-link.vue?vue&type=template&id=84249fec&");
/* harmony import */ var _company_social_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./company-social-link.vue?vue&type=script&lang=js& */ "../../packages/leaders/browser/company-social-link.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _company_social_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _company_social_link_vue_vue_type_template_id_84249fec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _company_social_link_vue_vue_type_template_id_84249fec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/leaders/browser/company-social-link.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../packages/leaders/browser/company-social-link.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** /root/packages/leaders/browser/company-social-link.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_company_social_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--1!../../../node_modules/vue-loader/lib??vue-loader-options!./company-social-link.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../../packages/leaders/browser/company-social-link.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_company_social_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../../packages/leaders/browser/company-social-link.vue?vue&type=template&id=84249fec&":
/*!*********************************************************************************************!*\
  !*** /root/packages/leaders/browser/company-social-link.vue?vue&type=template&id=84249fec& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_company_social_link_vue_vue_type_template_id_84249fec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./company-social-link.vue?vue&type=template&id=84249fec& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../../packages/leaders/browser/company-social-link.vue?vue&type=template&id=84249fec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_company_social_link_vue_vue_type_template_id_84249fec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_company_social_link_vue_vue_type_template_id_84249fec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=leaders-company-social-link.62ed94dc.js.map