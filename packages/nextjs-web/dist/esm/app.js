import { a as _inherits, b as _classCallCheck, c as _possibleConstructorReturn, d as _getPrototypeOf, e as _createClass } from './chunk-8ffd44ec.js';
import App, { Container } from 'next/app';
import React from 'react';
export { default as WithApollo } from '@base-cms/nextjs-apollo';

var WebsiteApp =
/*#__PURE__*/
function (_App) {
  _inherits(WebsiteApp, _App);

  function WebsiteApp() {
    _classCallCheck(this, WebsiteApp);

    return _possibleConstructorReturn(this, _getPrototypeOf(WebsiteApp).apply(this, arguments));
  }

  _createClass(WebsiteApp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps;
      return React.createElement(Container, null, React.createElement(Component, pageProps));
    }
  }]);

  return WebsiteApp;
}(App);

export { WebsiteApp };
