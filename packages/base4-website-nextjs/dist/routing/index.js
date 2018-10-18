'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var createRoutes = _interopDefault(require('next-routes'));

var routes = createRoutes();
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
    routes.Router.replaceRoute(route);
  }
};
var Link = routes.Link;
var Router = routes.Router;

exports.routes = routes;
exports.redirect = redirect;
exports.Link = Link;
exports.Router = Router;
//# sourceMappingURL=index.js.map
