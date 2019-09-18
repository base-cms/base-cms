const proxy = require('express-http-proxy');

const { OEMBED_URI } = process.env;
if (!OEMBED_URI) throw new Error('Missing required environment variable: OEMBED_URI.');

module.exports = (app) => {
  const { config } = app.locals;
  const mountPoint = config.oembedMountPoint();
  const opts = {
    proxyReqPathResolver: ({ originalUrl }) => originalUrl.replace(mountPoint, '/'),
    proxyReqOptDecorator: (reqOpts, req) => {
      const headers = { ...reqOpts.headers };
      headers['x-publication-name'] = app.locals.config.siteName();
      headers['x-forwarded-proto'] = req.protocol;
      headers['x-website-host'] = req.get('host');
      return { ...reqOpts, headers };
    },
  };
  app.use(mountPoint, proxy(OEMBED_URI, opts));
};
