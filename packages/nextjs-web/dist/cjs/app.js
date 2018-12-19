'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-cc286d7f.js');
var App = require('next/app');
var App__default = _interopDefault(App);
var React = _interopDefault(require('react'));
var nextjsApollo = _interopDefault(require('@base-cms/nextjs-apollo'));

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
      return React.createElement(App.Container, null, React.createElement(Component, pageProps));
    }
  }]);

  return WebsiteApp;
}(App__default);

exports.WithApollo = nextjsApollo;
exports.WebsiteApp = WebsiteApp;
