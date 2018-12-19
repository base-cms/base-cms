'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-15d55d73.js');
var React = require('react');
var React__default = _interopDefault(React);
var __chunk_3 = require('./chunk-d1518d46.js');

var _jsxFileName = "/base-cms/packages/nextjs-web/src/routing/Link.jsx";
var Link = (function (props) {
  return React__default.createElement(__chunk_3.RoutingContext.Consumer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, function (_ref) {
    var NextLink = _ref.Link;
    return React__default.createElement(NextLink, __chunk_1._extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      },
      __self: this
    }));
  });
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

exports.RoutingContext = __chunk_3.RoutingContext;
exports.Link = Link;
exports.redirect = redirect;
