import createRoutes from 'next-routes';

export const routes = createRoutes();
export const redirect = (res, route, code = 301) => {
  if (res) {
    // Server-side only.
    res.writeHead(code, { Location: route });
    res.end();
  } else {
    // Client-side.
    routes.Router.replaceRoute(route);
  }
};
export const { Link } = routes;
export const { Router } = routes;

// import routes from 'nextjs/routes';
// import server from 'nextjs/server';
// import { redirect, cleanPath } from 'nextjs/utils';
// import { WebsiteApp, ContentPage } from 'nextjs/pages';
// import { withWebsiteContent } from 'nextjs/hoc';

// import { RelCanonical } from 'nextjs/components';
