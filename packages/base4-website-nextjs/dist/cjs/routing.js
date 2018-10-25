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

var redirect = function redirect(router, res, route) {
  var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 301;

  if (res) {
    // Server-side only.
    res.writeHead(code, {
      Location: route
    });
    res.end();
  } else {
    // Client-side.
    router.replaceRoute(route);
  }
};

exports.RoutingContext = __chunk_2.RoutingContext;
exports.redirect = redirect;
exports.Link = Link;
exports.Router = Router;
