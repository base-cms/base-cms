'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-9e05845b.js');
var App = require('next/app');
var App__default = _interopDefault(App);
var React = require('react');
var React__default = _interopDefault(React);
var base4NextjsApollo = _interopDefault(require('@base-cms/base4-nextjs-apollo'));

var WebsiteApp =
/*#__PURE__*/
function (_App) {
  __chunk_1._inherits(WebsiteApp, _App);

  function WebsiteApp() {
    __chunk_1._classCallCheck(this, WebsiteApp);

    return __chunk_1._possibleConstructorReturn(this, __chunk_1._getPrototypeOf(WebsiteApp).apply(this, arguments));
  }

  __chunk_1._createClass(WebsiteApp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps;
      return React__default.createElement(App.Container, null, React__default.createElement(Component, pageProps));
    }
  }]);

  return WebsiteApp;
}(App__default);

exports.withApollo = base4NextjsApollo;
exports.WebsiteApp = WebsiteApp;
