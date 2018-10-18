import createRoutes from 'next-routes';

const routes = createRoutes();
const { Link, Router } = routes;

const redirect = (res, route, code = 301) => {
  if (res) {
    // Server-side only.
    res.writeHead(code, { Location: route });
    res.end();
  } else {
    // Client-side.
    Router.replaceRoute(route);
  }
};

// @todo Override the normal Link component to support external links.
export {
  routes,
  redirect,
  Link,
  Router,
};
