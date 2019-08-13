const proxy = require('express-http-proxy');

const { OEMBED_URI, OEMBED_MOUNT_TO = '/__oembed' } = process.env;
if (!OEMBED_URI) throw new Error('Missing required environment variable: OEMBED_URI.');

module.exports = (app) => {
  const opts = {
    proxyReqPathResolver: ({ originalUrl }) => originalUrl.replace(OEMBED_MOUNT_TO, '/'),
    proxyReqOptDecorator: (reqOpts, req) => {
      const headers = { ...reqOpts.headers };
      headers['x-publication-name'] = app.locals.config.siteName();
      headers['x-forwarded-proto'] = req.protocol;
      headers['x-website-host'] = req.get('host');
      return { ...reqOpts, headers };
    },
  };
  app.use(OEMBED_MOUNT_TO, proxy(OEMBED_URI, opts));
};
