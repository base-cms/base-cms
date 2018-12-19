'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var nextjsApollo = _interopDefault(require('@base-cms/nextjs-apollo'));
var __chunk_1 = require('./chunk-15d55d73.js');
var App = require('next/app');
var App__default = _interopDefault(App);
var React = require('react');
var React__default = _interopDefault(React);
var __chunk_2 = require('./chunk-7917b9e8.js');
var nextRoutes = _interopDefault(require('next-routes'));
var __chunk_3 = require('./chunk-d1518d46.js');
var utils = require('./utils.js');
require('inflected');
require('escape-string-regexp');
require('moment');
require('object-path');
require('next/config');
var __chunk_4 = require('./chunk-6748c5a0.js');

var _jsxFileName = "/base-cms/packages/nextjs-web/src/pages/_app.jsx";

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
      return React__default.createElement(App.Container, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: this
      }, React__default.createElement(Component, __chunk_1._extends({}, pageProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      })));
    }
  }]);

  return WebsiteApp;
}(App__default);

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
      __chunk_1._inherits(WithRouting, _React$Component);

      function WithRouting() {
        __chunk_1._classCallCheck(this, WithRouting);

        return __chunk_1._possibleConstructorReturn(this, __chunk_1._getPrototypeOf(WithRouting).apply(this, arguments));
      }

      __chunk_1._createClass(WithRouting, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          return React__default.createElement(__chunk_3.RoutingContext.Provider, {
            value: routes,
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 55
            },
            __self: this
          }, React__default.createElement(ComposedComponent, __chunk_1._extends({}, this.props, {
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
          var _getInitialProps = __chunk_1._asyncToGenerator(
          /*#__PURE__*/
          __chunk_2._regeneratorRuntime.mark(function _callee(args) {
            var ctx, Router, composedInitialProps;
            return __chunk_2._regeneratorRuntime.wrap(function _callee$(_context) {
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
                    return _context.abrupt("return", __chunk_1._objectSpread({}, composedInitialProps));

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
    }(React__default.Component);

    WithRouting.displayName = "WithRouting(".concat(utils.componentDisplayName(ComposedComponent), ")");
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
    __chunk_1._classCallCheck(this, SiteConfig);

    this.config = utils.isObject(config) ? config : {};
  }
  /**
   *
   * @param {string} path
   * @param {*} def
   */


  __chunk_1._createClass(SiteConfig, [{
    key: "get",
    value: function get(path, def) {
      return utils.get(this.config, path, def);
    }
    /**
     *
     * @param {string} path
     */

  }, {
    key: "getAsArray",
    value: function getAsArray(path) {
      return utils.getAsArray(this.config, path);
    }
    /**
     *
     * @param {string} path
     */

  }, {
    key: "getAsObject",
    value: function getAsObject(path) {
      return utils.getAsObject(this.config, path);
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
      __chunk_1._inherits(WithSiteConfig, _React$Component);

      function WithSiteConfig() {
        __chunk_1._classCallCheck(this, WithSiteConfig);

        return __chunk_1._possibleConstructorReturn(this, __chunk_1._getPrototypeOf(WithSiteConfig).apply(this, arguments));
      }

      __chunk_1._createClass(WithSiteConfig, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          return React__default.createElement(__chunk_4.SiteConfigContext.Provider, {
            value: config,
            __source: {
              fileName: _jsxFileName$2,
              lineNumber: 30
            },
            __self: this
          }, React__default.createElement(ComposedComponent, __chunk_1._extends({}, this.props, {
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
          var _getInitialProps = __chunk_1._asyncToGenerator(
          /*#__PURE__*/
          __chunk_2._regeneratorRuntime.mark(function _callee(args) {
            var ctx, composedInitialProps;
            return __chunk_2._regeneratorRuntime.wrap(function _callee$(_context) {
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
                    return _context.abrupt("return", __chunk_1._objectSpread({}, composedInitialProps));

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
    }(React__default.Component);

    WithSiteConfig.displayName = "WithSiteConfig(".concat(utils.componentDisplayName(ComposedComponent), ")");
    return WithSiteConfig;
  };
});

exports.withApollo = nextjsApollo;
exports.WebsiteApp = WebsiteApp;
exports.withRouting = withRouting;
exports.withSiteConfig = withSiteConfig;
