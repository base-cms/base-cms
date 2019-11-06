const proxy = require('express-http-proxy');

module.exports = (app, { graphqlUri, headers }) => {
  const mountPoint = '/__graphql';
  const opts = {
    proxyReqPathResolver: ({ originalUrl }) => originalUrl.replace(mountPoint, ''),
    proxyReqOptDecorator: (reqOpts, req) => {
      const proxyHeaders = {
        ...reqOpts.headers,
        ...headers,
        'x-forwarded-proto': req.protocol,
      };
      return { ...reqOpts, headers: proxyHeaders };
    },
  };
  app.use(mountPoint, proxy(graphqlUri, opts));
};
