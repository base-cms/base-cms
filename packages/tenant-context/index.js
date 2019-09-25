const getFromRequest = (req) => {
  const tenant = req.get('x-tenant-key');
  const siteId = req.get('x-site-id');
  const imageHost = req.get('x-cdn-image-hostname');
  const assetHost = req.get('x-cdn-asset-hostname');
  if (!tenant) throw new Error('A required header `x-tenant-key` was not sent!');
  if (!siteId) throw new Error('A required header `x-site-id` was not sent!');
  if (!imageHost) throw new Error('A required header `x-cdn-image-hostname` was not sent!');
  if (!assetHost) throw new Error('A required header `x-cdn-asset-hostname` was not sent!');
  return {
    tenant,
    siteId,
    imageHost,
    assetHost,
  };
};

const buildRequestHeaders = (config = {}) => {
  const {
    tenantKey,
    siteId,
    cdnImageHostname,
    cdnAssetHostname,
  } = config;
  if (!tenantKey) throw new Error('A required configuration value `tenantKey` was not set!');
  if (!siteId) throw new Error('A required configuration value `siteId` was not set!');
  if (!cdnImageHostname) throw new Error('A required configuration value `cdnImageHostname` was not set!');
  if (!cdnAssetHostname) throw new Error('A required configuration value `cdnAssetHostname` was not set!');
  return {
    'x-tenant-key': tenantKey,
    'x-site-id': siteId,
    'x-cdn-image-hostname': cdnImageHostname,
    'x-cdn-asset-hostname': cdnAssetHostname,
  };
};

module.exports = {
  getFromRequest,
  buildRequestHeaders,
  passRequestHeaders: (req) => {
    const {
      tenant,
      siteId,
      imageHost,
      assetHost,
    } = getFromRequest(req);
    return buildRequestHeaders({
      tenantKey: tenant,
      siteId,
      cdnImageHostname: imageHost,
      cdnAssetHostname: assetHost,
    });
  },
};
