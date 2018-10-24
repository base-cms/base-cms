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

export {
  routes,
  redirect,
  Link,
  Router,
};
