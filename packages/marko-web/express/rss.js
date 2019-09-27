const proxy = require('express-http-proxy');

const SERVICE_URI = process.env.RSS_URI;
if (!SERVICE_URI) throw new Error('Missing required environment variable: RSS_URI.');

module.exports = (app, tenantContext) => {
  const { config } = app.locals;
  const mountPoint = config.rssMountPoint();
  const opts = {
    proxyReqPathResolver: ({ originalUrl }) => originalUrl.replace(mountPoint, ''),
    proxyReqOptDecorator: (reqOpts, req) => {
      const headers = { ...reqOpts.headers, ...tenantContext };
      headers['x-forwarded-proto'] = req.protocol;
      headers['x-mount-point'] = mountPoint;
      return { ...reqOpts, headers };
    },
  };
  app.use(`${mountPoint}/:query([a-z-]+).xml`, proxy(SERVICE_URI, opts));
};
