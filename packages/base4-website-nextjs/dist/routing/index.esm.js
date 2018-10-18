import createRoutes from 'next-routes';

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
var Router = routes.Router; // import routes from 'nextjs/routes';

export { routes, redirect, Link, Router };
