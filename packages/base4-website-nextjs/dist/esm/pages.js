import { a as _regeneratorRuntime } from './chunk-fd635e66.js';
import { c as _objectSpread, d as _asyncToGenerator, e as _classCallCheck, f as _createClass, g as _possibleConstructorReturn, h as _getPrototypeOf, i as _inherits } from './chunk-cfc9ba70.js';
import React from 'react';
import nextRoutes from 'next-routes';
import { a as RoutingContext } from './chunk-7976a9a0.js';
import { componentDisplayName } from './utils.js';
import App, { Container } from 'next/app';
import base4NextjsApollo from '@base-cms/base4-nextjs-apollo';
export { default as withApollo } from '@base-cms/base4-nextjs-apollo';
import 'moment';

var isArray = Array.isArray;

var once = function once(fn) {
  var called = false;
  var result;
  return function () {
    if (!called) {
      called = true;
      result = fn.apply(void 0, arguments);
    }

    return result;
  };
};

var createRoutes = once(function (definitions) {
  var routes = nextRoutes();
  definitions.forEach(function (def) {
    return routes.add(def);
  });
  return routes;
});
var withRouting = (function (definitions) {
  return function (ComposedComponent) {
    if (!isArray(definitions)) {
      throw new Error('No route definitions were provided!');
    }

    var routes = createRoutes(definitions);

    var WithRouting =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(WithRouting, _React$Component);

      function WithRouting() {
        _classCallCheck(this, WithRouting);

        return _possibleConstructorReturn(this, _getPrototypeOf(WithRouting).apply(this, arguments));
      }

      _createClass(WithRouting, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          return React.createElement(RoutingContext.Provider, {
            value: routes
          }, React.createElement(ComposedComponent, this.props));
        }
      }], [{
        key: "getInitialProps",

        /**
         *
         * @param {object} args
         */
        value: function () {
          var _getInitialProps = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee(args) {
            var ctx, Router, composedInitialProps;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    ctx = args.ctx;
                    Router = routes.Router; // Add the `next-routes` Router to the page context.

                    ctx.Router = Router;
                    composedInitialProps = {};

                    if (!ComposedComponent.getInitialProps) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 7;
                    return ComposedComponent.getInitialProps(args);

                  case 7:
                    composedInitialProps = _context.sent;

                  case 8:
                    return _context.abrupt("return", _objectSpread({}, composedInitialProps));

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          };
        }()
      }]);

      return WithRouting;
    }(React.Component);

    WithRouting.displayName = "withRouting(".concat(componentDisplayName(ComposedComponent), ")");
    return WithRouting;
  };
});

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

export { WebsiteApp, withRouting };
