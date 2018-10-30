import React from 'react';
import { a as RoutingContext } from './chunk-7976a9a0.js';
export { a as RoutingContext } from './chunk-7976a9a0.js';

var Link = (function (props) {
  return React.createElement(RoutingContext.Consumer, null, function (_ref) {
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

export { Link, redirect };
