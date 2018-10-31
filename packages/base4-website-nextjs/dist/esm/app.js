import { a as _classCallCheck, b as _createClass, c as _possibleConstructorReturn, d as _getPrototypeOf, e as _inherits, f as _objectSpread, g as _asyncToGenerator } from './chunk-1a4eb17c.js';
import App, { Container } from 'next/app';
import React from 'react';
import base4NextjsApollo from '@base-cms/base4-nextjs-apollo';
export { default as withApollo } from '@base-cms/base4-nextjs-apollo';
import { a as _regeneratorRuntime } from './chunk-fd635e66.js';
import nextRoutes from 'next-routes';
import { a as RoutingContext } from './chunk-7976a9a0.js';
import { componentDisplayName, get as _get, getAsArray as _getAsArray, getAsObject as _getAsObject, isObject } from './utils.js';
import { a as SiteConfigContext } from './chunk-b0ac8f34.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';

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

    WithRouting.displayName = "WithRouting(".concat(componentDisplayName(ComposedComponent), ")");
    return WithRouting;
  };
});

var SiteConfig =
/*#__PURE__*/
function () {
  /**
   *
   * @param {object} config
   */
  function SiteConfig(config) {
    _classCallCheck(this, SiteConfig);

    this.config = isObject(config) ? config : {};
  }
  /**
   *
   * @param {string} path
   * @param {*} def
   */


  _createClass(SiteConfig, [{
    key: "get",
    value: function get(path, def) {
      return _get(this.config, path, def);
    }
    /**
     *
     * @param {string} path
     */

  }, {
    key: "getAsArray",
    value: function getAsArray(path) {
      return _getAsArray(this.config, path);
    }
    /**
     *
     * @param {string} path
     */

  }, {
    key: "getAsObject",
    value: function getAsObject(path) {
      return _getAsObject(this.config, path);
    }
  }]);

  return SiteConfig;
}();

var withSiteConfig = (function (siteConfig) {
  return function (ComposedComponent) {
    var config = new SiteConfig(siteConfig);

    var WithSiteConfig =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(WithSiteConfig, _React$Component);

      function WithSiteConfig() {
        _classCallCheck(this, WithSiteConfig);

        return _possibleConstructorReturn(this, _getPrototypeOf(WithSiteConfig).apply(this, arguments));
      }

      _createClass(WithSiteConfig, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          return React.createElement(SiteConfigContext.Provider, {
            value: config
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
            var ctx, composedInitialProps;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    ctx = args.ctx; // Add the config to the page context.

                    ctx.siteConfig = config;
                    composedInitialProps = {};

                    if (!ComposedComponent.getInitialProps) {
                      _context.next = 7;
                      break;
                    }

                    _context.next = 6;
                    return ComposedComponent.getInitialProps(args);

                  case 6:
                    composedInitialProps = _context.sent;

                  case 7:
                    return _context.abrupt("return", _objectSpread({}, composedInitialProps));

                  case 8:
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

      return WithSiteConfig;
    }(React.Component);

    WithSiteConfig.displayName = "WithSiteConfig(".concat(componentDisplayName(ComposedComponent), ")");
    return WithSiteConfig;
  };
});

export { WebsiteApp, withRouting, withSiteConfig };
