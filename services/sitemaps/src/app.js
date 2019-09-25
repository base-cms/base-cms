const express = require('express');
const helmet = require('helmet');
const { apolloClient } = require('@base-cms/express-apollo');
const { passRequestHeaders } = require('@base-cms/tenant-context');
const { GRAPHQL_URI } = require('./env');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

app.use((req, res, next) => {
  const headers = passRequestHeaders(req);
  app.use(apolloClient(GRAPHQL_URI, { name: 'Sitemaps', link: { headers } }));
  next();
});

routes(app);

module.exports = app;
