import next from 'next';
import { resolve } from 'path';
import express from 'express';
import nextRoutes from 'next-routes';
import loadServices from './server/services';

const isFn = v => typeof v === 'function';
const { isArray } = Array;

/**
 *
 * @param {object} options The server options.
 * @param {string} options.dir The directory of the Next app.
 * @param {boolean} [options.dev] Whether to run Next is dev mode.
 * @param {array} options.routeDefs The route definitions.
 * @param {string} options.serviceUrl The BaseCMS services URL (for GraphQL, RSS, etc)
 * @param {number} [options.port=3005] The port to run the webserver on.
 * @param {function} [options.beforePrepare]
 * @param {function} [options.beforeListen]
 */
export default async ({
  dir = './site',
  dev = process.env.NODE_ENV !== 'production',
  routeDefs,
  serviceUrl,
  port = 3005,
  beforePrepare,
  beforeListen,
} = {}) => {
  // Load route definitions.
  if (!isArray(routeDefs)) throw new Error('No route definitions were provided!');
  const routes = nextRoutes();
  routeDefs.forEach(def => routes.add(def));

  // Create the NextJS app.
  const app = next({ dev, dir: resolve(dir) });

  // Call the `beforePrepare` hook, if specified.
  if (isFn(beforePrepare)) await beforePrepare(app);

  // Prep the app.
  await app.prepare();

  // Create the Express server (but do not listen).
  const webserver = express();

  // Call the `beforeListen` hook, if specified.
  if (isFn(beforeListen)) await beforeListen(webserver, app);

  // Load external BaseCMS services (must run before internal site routes).
  loadServices(serviceUrl, webserver);

  // Attach the website routing handler.
  webserver.use(routes.getRequestHandler(app));

  // Run the webserver.
  const server = await new Promise((res, rej) => {
    webserver.listen(port, function listen(err) {
      if (err) { rej(err); } else { res(this); }
    });
  });
  return { app, server };
};
