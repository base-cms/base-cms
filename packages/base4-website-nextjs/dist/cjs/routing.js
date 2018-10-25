'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var __chunk_2 = require('./chunk-5ea90bae.js');
var __chunk_3 = require('./chunk-efb9fd9b.js');
var __chunk_1 = require('./chunk-2c19305a.js');
var hoistStatics = _interopDefault(require('hoist-non-react-statics'));
var utils = require('./utils.js');
require('moment');

var Link = function Link(props) {
  return React__default.createElement(__chunk_2.RoutingContext.Consumer, null, function (_ref) {
    var NextLink = _ref.Link;
    return React__default.createElement(NextLink, props);
  });
};

var Router = function Router(props) {
  return React__default.createElement(__chunk_2.RoutingContext.Consumer, null, function (_ref2) {
    var NextRouter = _ref2.Router;
    return React__default.createElement(NextRouter, props);
  });
};

var withRouter = (function (ComposedComponent) {
  var WithRouter =
  /*#__PURE__*/
  function (_Component) {
    __chunk_1._inherits(WithRouter, _Component);

    function WithRouter() {
      __chunk_1._classCallCheck(this, WithRouter);

      return __chunk_1._possibleConstructorReturn(this, __chunk_1._getPrototypeOf(WithRouter).apply(this, arguments));
    }

    __chunk_1._createClass(WithRouter, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        var props = __chunk_1._objectSpread({
          router: Router
        }, this.props);

        return React__default.createElement(ComposedComponent, props);
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
          var composedInitialProps;
          return __chunk_3._regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Add the router to initial props context, if applicable.
                  // eslint-disable-next-line no-param-reassign
                  if (args && args.ctx) args.ctx.router = Router;
                  composedInitialProps = {};

                  if (!ComposedComponent.getInitialProps) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 5;
                  return ComposedComponent.getInitialProps(args);

                case 5:
                  composedInitialProps = _context.sent;

                case 6:
                  return _context.abrupt("return", composedInitialProps);

                case 7:
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

    return WithRouter;
  }(React.Component);

  WithRouter.displayName = "withRouter(".concat(utils.componentDisplayName(ComposedComponent), ")");
  return hoistStatics(WithRouter, ComposedComponent);
});

var redirect = function redirect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      router = _ref.router,
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
  } else if (router) {
    // Client-side.
    router.replaceRoute(route);
  }
};

exports.RoutingContext = __chunk_2.RoutingContext;
exports.Link = Link;
exports.Router = Router;
exports.redirect = redirect;
exports.withRouter = withRouter;
