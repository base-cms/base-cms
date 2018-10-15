import { Router } from '../../routes';

/**
 * @param {?object} res The Express response object.
 * @param {string} route The route name (or href) to redirect to
 * @param {number} [code=301] The redirect response code.
 */
export default (res, route, code = 301) => {
  if (res) {
    // Server-side only.
    res.writeHead(code, { Location: route });
    res.end();
  } else {
    // Client-side.
    Router.replaceRoute(route);
  }
};
