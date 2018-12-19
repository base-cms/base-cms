'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var __chunk_3 = require('./chunk-cd22912d.js');

var Link = (function (props) {
  return React.createElement(__chunk_3.RoutingContext.Consumer, null, function (_ref) {
    var NextLink = _ref.Link;
    return React.createElement(NextLink, props);
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
