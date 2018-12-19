export { default as withApollo } from '@base-cms/nextjs-apollo';
import { a as _inherits, b as _classCallCheck, c as _possibleConstructorReturn, d as _getPrototypeOf, e as _createClass, f as _extends, g as _asyncToGenerator, h as _objectSpread } from './chunk-02337cfc.js';
import App, { Container } from 'next/app';
import React from 'react';
import { a as _regeneratorRuntime } from './chunk-cc3f9e68.js';
import nextRoutes from 'next-routes';
import { a as RoutingContext } from './chunk-fccae6e7.js';
import { componentDisplayName, get as _get, getAsArray as _getAsArray, getAsObject as _getAsObject, isObject } from './utils.js';
import 'object-path';
import { a as SiteConfigContext } from './chunk-a9505423.js';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/pages/_app.jsx";

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
      return React.createElement(Container, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: this
      }, React.createElement(Component, _extends({}, pageProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      })));
    }
  }]);

  return WebsiteApp;
}(App);

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/routing/withRouting.jsx";
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
            value: routes,
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 55
            },
            __self: this
          }, React.createElement(ComposedComponent, _extends({}, this.props, {
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 56
            },
            __self: this
          })));
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

          function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          }

          return getInitialProps;
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

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/config/withSiteConfig.jsx";
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
            value: config,
            __source: {
              fileName: _jsxFileName$2,
              lineNumber: 30
            },
            __self: this
          }, React.createElement(ComposedComponent, _extends({}, this.props, {
            __source: {
              fileName: _jsxFileName$2,
              lineNumber: 31
            },
            __self: this
          })));
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

          function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }]);

      return WithSiteConfig;
    }(React.Component);

    WithSiteConfig.displayName = "WithSiteConfig(".concat(componentDisplayName(ComposedComponent), ")");
    return WithSiteConfig;
  };
});

export { WebsiteApp, withRouting, withSiteConfig };
