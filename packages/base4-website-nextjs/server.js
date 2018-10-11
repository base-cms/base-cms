const next = require('next');
const express = require('@base-cms/base4-website-express');
const { resolve } = require('path');
const routes = require('./routes');

const { log } = console;
const isFn = v => typeof v === 'function';

module.exports = async ({
  dir,
  dev = process.env.NODE_ENV !== 'production',
  port = 3033,
  beforePrepare,
  beforeListen,
} = {}) => {
  // Create the NextJS app.
  const app = next({ dev, dir: resolve(dir) });

  // Call the `beforePrepare` hook, if specified.
  if (isFn(beforePrepare)) await beforePrepare(app);

  // Prep the app.
  await app.prepare();

  // Create the Express webserver (but do not listen).
  const webserver = express().use(routes.getRequestHandler(app));

  // Call the `beforeListen` hook, if specified.
  if (isFn(beforeListen)) await beforeListen(webserver, app);

  // Run the webserver.
  const server = await new Promise((res, rej) => {
    webserver.listen(port, function listen(err) {
      if (err) { rej(err); } else { res(this); }
    });
  });
  log(`> Ready on http://localhost:${port}`);
  return { app, server };
};
