const getFromRequest = (req) => {
  const tenant = req.get('x-tenant-key');
  const siteId = req.get('x-site-id');
  if (!tenant) throw new Error('A required header `x-tenant-key` was not sent!');
  if (!siteId) throw new Error('A required header `x-site-id` was not sent!');
  return {
    tenant,
    siteId,
  };
};

const buildRequestHeaders = (config = {}) => {
  const {
    tenantKey,
    siteId,
  } = config;
  if (!tenantKey) throw new Error('A required configuration value `tenantKey` was not set!');
  if (!siteId) throw new Error('A required configuration value `siteId` was not set!');
  return {
    'x-tenant-key': tenantKey,
    'x-site-id': siteId,
  };
};

module.exports = {
  getFromRequest,
  buildRequestHeaders,
  passRequestHeaders: (req) => {
    const {
      tenant,
      siteId,
    } = getFromRequest(req);
    return buildRequestHeaders({
      tenantKey: tenant,
      siteId,
    });
  },
};
