import { e as _classCallCheck, f as _createClass, g as _possibleConstructorReturn, h as _getPrototypeOf, i as _inherits } from './chunk-cfc9ba70.js';
import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '@base-cms/base4-nextjs-apollo';

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
          pageProps = _this$props.pageProps,
          apollo = _this$props.apollo;
      return React.createElement(Container, null, React.createElement(ApolloProvider, {
        client: apollo
      }, React.createElement(Component, pageProps)));
    }
  }]);

  return WebsiteApp;
}(App);

var _app = withApollo(WebsiteApp);

export { _app as WebsiteApp };
