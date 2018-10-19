import createRoutes from 'next-routes';
import withExternalLink from './routing/withExternalLink';

const routes = createRoutes();
const { Link: NextLink, Router } = routes;

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

// Add support for external URLs.
const Link = withExternalLink(NextLink);

export {
  routes,
  redirect,
  Link,
  Router,
};
