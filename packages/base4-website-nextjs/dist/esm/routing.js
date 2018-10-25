import React, { Component } from 'react';
import { a as RoutingContext } from './chunk-e05239f9.js';
export { a as RoutingContext } from './chunk-e05239f9.js';
import { a as _regeneratorRuntime } from './chunk-fd635e66.js';
import { d as _asyncToGenerator, c as _objectSpread, e as _classCallCheck, f as _createClass, g as _possibleConstructorReturn, h as _getPrototypeOf, i as _inherits } from './chunk-cfc9ba70.js';
import hoistStatics from 'hoist-non-react-statics';
import { componentDisplayName } from './utils.js';
import 'moment';

var Link = function Link(props) {
  return React.createElement(RoutingContext.Consumer, null, function (_ref) {
    var NextLink = _ref.Link;
    return React.createElement(NextLink, props);
  });
};

var Router = function Router(props) {
  return React.createElement(RoutingContext.Consumer, null, function (_ref2) {
    var NextRouter = _ref2.Router;
    return React.createElement(NextRouter, props);
  });
};

var withRouter = (function (ComposedComponent) {
  var WithRouter =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithRouter, _Component);

    function WithRouter() {
      _classCallCheck(this, WithRouter);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithRouter).apply(this, arguments));
    }

    _createClass(WithRouter, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        var props = _objectSpread({
          router: Router
        }, this.props);

        return React.createElement(ComposedComponent, props);
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
          var composedInitialProps;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
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
  }(Component);

  WithRouter.displayName = "withRouter(".concat(componentDisplayName(ComposedComponent), ")");
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

export { Link, Router, redirect, withRouter };
