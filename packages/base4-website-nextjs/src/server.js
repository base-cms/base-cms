import next from 'next';
import baseWebsite from '@base-cms/base4-website-express';
import { resolve } from 'path';
import nextRoutes from 'next-routes';

const isFn = v => typeof v === 'function';
const { isArray } = Array;

/**
 *
 * @param {object} options The server options.
 * @param {string} options.dir The directory of the Next app.
 * @param {boolean} [options.dev] Whether to run Next is dev mode.
 * @param {array} [options.routeDefs] The route definitions.
 * @param {number} [options.port=3005] The port to run the webserver on.
 * @param {object} [options.webServerOpts] Additional options to send to the web server.
 * @param {function} [options.beforePrepare]
 * @param {function} [options.beforeListen]
 */
export default async ({
  dir,
  dev = process.env.NODE_ENV !== 'production',
  routeDefs,
  port = 3005,
  webServerOpts,
  beforePrepare,
  beforeListen,
} = {}) => {
  // Load route definitions.
  if (!isArray(routeDefs)) throw new Error('No route definitions were provided!');
  const routes = nextRoutes(routeDefs);

  // Create the NextJS app.
  const app = next({ dev, dir: resolve(dir) });

  // Call the `beforePrepare` hook, if specified.
  if (isFn(beforePrepare)) await beforePrepare(app);

  // Prep the app.
  await app.prepare();

  // Create the Base4 Express server (but do not listen).
  const webserver = baseWebsite(webServerOpts).use(routes.getRequestHandler(app));

  // Call the `beforeListen` hook, if specified.
  if (isFn(beforeListen)) await beforeListen(webserver, app);

  // Run the webserver.
  const server = await new Promise((res, rej) => {
    webserver.listen(port, function listen(err) {
      if (err) { rej(err); } else { res(this); }
    });
  });
  return { app, server };
};
