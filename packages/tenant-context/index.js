const getFromRequest = (req) => {
  const tenant = req.get('x-tenant-key');
  const siteId = req.get('x-site-id');
  if (!tenant) throw new Error('A required header `x-tenant-key` was not sent!');
  return {
    tenant,
    siteId: siteId || undefined,
  };
};

const buildRequestHeaders = (config = {}) => {
  const {
    tenantKey,
    siteId,
  } = config;
  if (!tenantKey) throw new Error('A required configuration value `tenantKey` was not set!');
  return {
    'x-tenant-key': tenantKey,
    ...(siteId && { 'x-site-id': siteId }),
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
