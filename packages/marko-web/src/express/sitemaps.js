const proxy = require('express-http-proxy');

const SERVICE_URI = process.env.SITEMAPS_URI;
if (!SERVICE_URI) throw new Error('Missing required environment variable: SITEMAPS_URI.');

module.exports = (app) => {
  const opts = {
    preserveHostHdr: true,
    proxyReqPathResolver: ({ originalUrl }) => originalUrl,
    proxyReqOptDecorator: (reqOpts, req) => {
      const headers = { ...reqOpts.headers };
      headers['x-publication-name'] = app.locals.config.siteName();
      headers['x-forwarded-proto'] = req.protocol;
      return { ...reqOpts, headers };
    },
  };
  app.use('/sitemap*', proxy(SERVICE_URI, opts));
};
