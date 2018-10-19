'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_2 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var utils = require('./utils.js');
var createRoutes = _interopDefault(require('next-routes'));
require('moment');

var withExternalLink = (function (Link) {
  var WithExternalLink = function WithExternalLink(props) {
    var route = props.route,
        to = props.to,
        children = props.children,
        rest = __chunk_2._objectWithoutProperties(props, ["route", "to", "children"]);

    var value = String(route || to || '');

    if (!value || !value.match(/^http/i)) {
      // Internal link.
      return React__default.createElement(Link, props);
    } // External link.


    return React__default.createElement("a", __chunk_2._extends({
      href: value
    }, rest), children);
  };

  WithExternalLink.displayName = "WithExternalLink(".concat(utils.componentDisplayName(Link), ")");
  return WithExternalLink;
});

var routes = createRoutes();
var NextLink = routes.Link,
    Router = routes.Router;

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
}; // Add support for external URLs.


var Link = withExternalLink(NextLink);

exports.routes = routes;
exports.redirect = redirect;
exports.Link = Link;
exports.Router = Router;
