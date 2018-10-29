'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var __chunk_3 = require('./chunk-efb9fd9b.js');
var __chunk_1 = require('./chunk-9e05845b.js');
var nextRoutes = _interopDefault(require('next-routes'));
var utils = require('./utils.js');
require('inflected');
require('moment');
require('object-path');

var RoutingContext = React__default.createContext({});

var Link = (function (props) {
  return React__default.createElement(RoutingContext.Consumer, null, function (_ref) {
    var NextLink = _ref.Link;
    return React__default.createElement(NextLink, props);
  });
});

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
          return React__default.createElement(RoutingContext.Provider, {
            value: routes
          }, React__default.createElement(ComposedComponent, this.props));
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
          __chunk_3._regeneratorRuntime.mark(function _callee(args) {
            var ctx, Router, composedInitialProps;
            return __chunk_3._regeneratorRuntime.wrap(function _callee$(_context) {
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

          return function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          };
        }()
      }]);

      return WithRouting;
    }(React__default.Component);

    WithRouting.displayName = "WithRouting(".concat(utils.componentDisplayName(ComposedComponent), ")");
    return WithRouting;
  };
});

var redirect = function redirect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      Router = _ref.Router,
      res = _ref.res,
      route = _ref.route,
      _ref$code = _ref.code,
      code = _ref$code === void 0 ? 301 : _ref$code;

  if (res) {
    // Server-side.
    res.writeHead(code, {
      Location: route
    });
    res.end();
  } else if (Router) {
    // Client-side.
    Router.replaceRoute(route);
  }
};

exports.Link = Link;
exports.RoutingContext = RoutingContext;
exports.redirect = redirect;
exports.withRouting = withRouting;
