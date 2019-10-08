const { MongoDB } = require('@base-cms/db');
const SiteContext = require('./index');

const { ObjectID } = MongoDB;

module.exports = async ({ basedb, siteId, tenant }) => {
  if (!siteId) return new SiteContext();
  const projection = {
    name: 1,
    host: 1,
    decription: 1,
    language: 1,
    imageHost: 1,
    assetHost: 1,
    date: 1,
  };
  const site = await basedb.findOne('platform.Product', {
    status: 1,
    type: 'Site',
    _id: new ObjectID(siteId),
  }, { projection });
  if (!site) throw new Error(`No site was found for tenant '${tenant}' using ID '${siteId}'`);
  if (!site.host) throw new Error(`No site host is set for tenant '${tenant}' using ID '${siteId}'`);
  return new SiteContext(site);
};
