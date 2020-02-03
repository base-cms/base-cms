const fetch = require('node-fetch');
const { createClient } = require('@base-cms/express-apollo');
const { buildRequestHeaders } = require('@base-cms/tenant-context');

module.exports = ({
  uri,
  name,
  tenantKey,
}) => (req, res, next) => {
  const fetchWithSite = (url, options) => {
    const { website } = res.locals;
    if (!website) return fetch(url, options);
    const headers = { ...options.headers, 'x-site-id': website.get('id') };
    return fetch(url, { ...options, headers });
  };

  const headers = buildRequestHeaders({ tenantKey });
  const apollo = createClient(uri, { name }, { headers, fetch: fetchWithSite });
  req.apollo = apollo;
  res.locals.apollo = apollo;
  next();
};
