import { a as _extends, b as _objectWithoutProperties } from './chunk-cfc9ba70.js';
import React from 'react';
import { componentDisplayName } from './utils.js';
import createRoutes from 'next-routes';
import 'moment';

var withExternalLink = (function (Link) {
  var WithExternalLink = function WithExternalLink(props) {
    var route = props.route,
        to = props.to,
        children = props.children,
        rest = _objectWithoutProperties(props, ["route", "to", "children"]);

    var value = String(route || to || '');

    if (!value || !value.match(/^http/i)) {
      // Internal link.
      return React.createElement(Link, props);
    } // External link.


    return React.createElement("a", _extends({
      href: value
    }, rest), children);
  };

  WithExternalLink.displayName = "WithExternalLink(".concat(componentDisplayName(Link), ")");
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

export { routes, redirect, Link, Router };
