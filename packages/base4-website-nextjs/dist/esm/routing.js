import React from 'react';
import { a as _regeneratorRuntime } from './chunk-fd635e66.js';
import { i as _objectSpread, j as _asyncToGenerator, a as _classCallCheck, b as _createClass, c as _possibleConstructorReturn, d as _getPrototypeOf, e as _inherits } from './chunk-1a4eb17c.js';
import nextRoutes from 'next-routes';
import { componentDisplayName } from './utils.js';
import 'inflected';
import 'moment';
import 'object-path';

var RoutingContext = React.createContext({});

var Link = (function (props) {
  return React.createElement(RoutingContext.Consumer, null, function (_ref) {
    var NextLink = _ref.Link;
    return React.createElement(NextLink, props);
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

export { Link, RoutingContext, redirect, withRouting };
