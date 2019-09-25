const { createClient } = require('@base-cms/express-apollo');
const { passRequestHeaders } = require('@base-cms/tenant-context');
const { GRAPHQL_URI } = require('../env');

module.exports = () => (req, res, next) => {
  const headers = passRequestHeaders(req);
  const apollo = createClient(GRAPHQL_URI, { name: 'Sitemaps' }, { headers });
  req.apollo = apollo;
  res.locals.apollo = apollo;
  next();
};
