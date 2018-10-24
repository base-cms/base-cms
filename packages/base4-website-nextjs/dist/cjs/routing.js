'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_3 = require('./chunk-163d7d62.js');
require('next-routes');

var Link = __chunk_3.routes.Link,
    Router = __chunk_3.routes.Router;

var redirect = function redirect(res, route) {
  var code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 301;

  if (res) {
    // Server-side only.
    res.writeHead(code, {
      Location: route
    });
    res.end();
  } else {
    // Client-side.
    Router.replaceRoute(route);
  }
};

exports.routes = __chunk_3.routes;
exports.redirect = redirect;
exports.Link = Link;
exports.Router = Router;
