const { createClient } = require('@base-cms/express-apollo');
const { buildRequestHeaders } = require('@base-cms/tenant-context');

module.exports = ({
  uri,
  name,
  tenantKey,
  siteId,
}) => (req, res, next) => {
  const headers = buildRequestHeaders({ tenantKey, siteId });
  const apollo = createClient(uri, { name }, { headers });
  req.apollo = apollo;
  res.locals.apollo = apollo;
  next();
};
