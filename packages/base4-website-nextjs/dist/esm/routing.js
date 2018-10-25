import React from 'react';
import { a as RoutingContext } from './chunk-e05239f9.js';
export { a as RoutingContext } from './chunk-e05239f9.js';

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

export { Link, Router, redirect };
