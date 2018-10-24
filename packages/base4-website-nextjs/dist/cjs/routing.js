'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var nextRoutes = _interopDefault(require('next-routes'));

var RoutingContext = React__default.createContext([]);

var once = function once(fn) {
  var called = false;
  var result;
  return function () {
    if (!called) {
      called = true;
      result = fn.apply(void 0, arguments);
    }

    return result;
  };
};

var createRoutes = once(function (defs) {
  var routes = nextRoutes();
  defs.forEach(function (def) {
    return routes.add(def);
  });
  return routes;
});

var Link = function Link(props) {
  return React__default.createElement(RoutingContext.Consumer, null, function (definitions) {
    var routes = createRoutes(definitions);
    var NextLink = routes.Link;
    return React__default.createElement(NextLink, props);
  });
};

var Router = function Router(props) {
  return React__default.createElement(RoutingContext.Consumer, null, function (definitions) {
    var routes = createRoutes(definitions);
    var NextRouter = routes.Router;
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

exports.RoutingContext = RoutingContext;
exports.redirect = redirect;
exports.Link = Link;
exports.Router = Router;
