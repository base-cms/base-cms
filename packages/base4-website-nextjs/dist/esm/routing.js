import React from 'react';
import { a as RoutingContext } from './chunk-e05239f9.js';

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

export { redirect, Link, Router };
