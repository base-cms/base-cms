'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var __chunk_2 = require('./chunk-5ea90bae.js');

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

exports.Link = Link;
exports.Router = Router;
exports.redirect = redirect;
