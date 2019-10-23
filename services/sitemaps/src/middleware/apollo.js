const { createClient } = require('@base-cms/express-apollo');
const { passRequestHeaders } = require('@base-cms/tenant-context');
const { GRAPHQL_URI } = require('../env');
const pkg = require('../../package.json');

module.exports = () => (req, res, next) => {
  const headers = passRequestHeaders(req);
  if (!headers['x-site-id']) throw new Error('The required `x-site-id` header was not sent.');
  const apollo = createClient(GRAPHQL_URI, { name: pkg.name, version: pkg.version }, { headers });
  req.apollo = apollo;
  res.locals.apollo = apollo;
  next();
};
