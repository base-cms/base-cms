module.exports = {
  getFromRequest: (req) => {
    const tenant = req.get('x-tenant-key');
    const imageHost = req.get('x-cdn-image-hostname');
    const assetHost = req.get('x-cdn-asset-hostname');
    if (!tenant) throw new Error('A required header `x-tenant-key` was not sent!');
    if (!imageHost) throw new Error('A required header `x-cdn-image-hostname` was not sent!');
    if (!assetHost) throw new Error('A required header `x-cdn-asset-hostname` was not sent!');
    return { tenant, imageHost, assetHost };
  },
  buildRequestHeaders: (config = {}) => {
    const { tenantKey, cdnImageHostname, cdnAssetHostname } = config;
    if (!tenantKey) throw new Error('A required configuration value `tenantKey` was not set!');
    if (!cdnImageHostname) throw new Error('A required configuration value `cdnImageHostname` was not set!');
    if (!cdnAssetHostname) throw new Error('A required configuration value `cdnAssetHostname` was not set!');
    return {
      'x-tenant-key': tenantKey,
      'x-cdn-image-hostname': cdnImageHostname,
      'x-cdn-asset-hostname': cdnAssetHostname,
    };
  },
};
