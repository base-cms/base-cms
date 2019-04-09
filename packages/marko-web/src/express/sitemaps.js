const proxy = require('express-http-proxy');

const SERVICE_URI = process.env.SITEMAP_SERVICE_URI;
if (!SERVICE_URI) throw new Error('Missing required environment variable: SITEMAP_SERVICE_URI.');

module.exports = (app) => {
  const opts = {
    preserveHostHdr: true,
    proxyReqPathResolver: ({ originalUrl }) => originalUrl,
    proxyReqOptDecorator: (reqOpts, req) => {
      const headers = { ...reqOpts.headers };
      headers['x-forwarded-proto'] = req.protocol;
      return { headers: { ...headers }, ...reqOpts };
    },
  };
  app.use('/sitemap*', proxy(SERVICE_URI, opts));
};
