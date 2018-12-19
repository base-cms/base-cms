'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-7917b9e8.js');
var __chunk_2 = require('./chunk-79f77106.js');
var React = _interopDefault(require('react'));
var nextRoutes = _interopDefault(require('next-routes'));
var __chunk_3 = require('./chunk-cd22912d.js');
var utils = require('./utils.js');
var App = require('next/app');
var App__default = _interopDefault(App);
var nextjsApollo = _interopDefault(require('@base-cms/nextjs-apollo'));

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
var WithRouting = (function (definitions) {
  return function (ComposedComponent) {
    if (!isArray(definitions)) {
      throw new Error('No route definitions were provided!');
    }

    var routes = createRoutes(definitions);

    var WithRouting =
    /*#__PURE__*/
    function (_React$Component) {
      __chunk_2._inherits(WithRouting, _React$Component);

      function WithRouting() {
        __chunk_2._classCallCheck(this, WithRouting);

        return __chunk_2._possibleConstructorReturn(this, __chunk_2._getPrototypeOf(WithRouting).apply(this, arguments));
      }

      __chunk_2._createClass(WithRouting, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          return React.createElement(__chunk_3.RoutingContext.Provider, {
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
          var _getInitialProps = __chunk_2._asyncToGenerator(
          /*#__PURE__*/
          __chunk_1._regeneratorRuntime.mark(function _callee(args) {
            var ctx, Router, composedInitialProps;
            return __chunk_1._regeneratorRuntime.wrap(function _callee$(_context) {
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
                    return _context.abrupt("return", __chunk_2._objectSpread({}, composedInitialProps));

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

    WithRouting.displayName = "WithRouting(".concat(utils.componentDisplayName(ComposedComponent), ")");
    return WithRouting;
  };
});

var WebsiteApp =
/*#__PURE__*/
function (_App) {
  __chunk_2._inherits(WebsiteApp, _App);

  function WebsiteApp() {
    __chunk_2._classCallCheck(this, WebsiteApp);

    return __chunk_2._possibleConstructorReturn(this, __chunk_2._getPrototypeOf(WebsiteApp).apply(this, arguments));
  }

  __chunk_2._createClass(WebsiteApp, [{
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
exports.WithRouting = WithRouting;
