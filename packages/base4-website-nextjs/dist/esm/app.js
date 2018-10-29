import { a as _classCallCheck, b as _createClass, c as _possibleConstructorReturn, d as _getPrototypeOf, e as _inherits } from './chunk-1a4eb17c.js';
import App, { Container } from 'next/app';
import React from 'react';
import base4NextjsApollo from '@base-cms/base4-nextjs-apollo';
export { default as withApollo } from '@base-cms/base4-nextjs-apollo';

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
