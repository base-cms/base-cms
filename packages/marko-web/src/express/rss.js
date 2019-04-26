const proxy = require('express-http-proxy');

const SERVICE_URI = process.env.RSS_URI;
if (!SERVICE_URI) throw new Error('Missing required environment variable: RSS_URI.');

module.exports = (app, tenantContext) => {
  const opts = {
    proxyReqPathResolver: ({ originalUrl }) => originalUrl,
    proxyReqOptDecorator: (reqOpts, req) => {
      const headers = { ...reqOpts.headers, ...tenantContext };
      headers['x-publication-name'] = app.locals.config.siteName();
      headers['x-forwarded-proto'] = req.protocol;
      headers['x-website-host'] = req.get('host');
      return { ...reqOpts, headers };
    },
  };
  app.use('/rss/:alias([a-z-_/]+).xml', proxy(SERVICE_URI, opts));
};
