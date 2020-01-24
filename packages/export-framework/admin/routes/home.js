const { asyncRoute } = require('@base-cms/utils');
const template = require('../templates/index');

const getSite = (arr, site) => {
  if (arr.find(({ name }) => name === site)) {
    const sites = arr.filter(({ name }) => name !== site);
    const obj = arr.find(({ name }) => name === site);
    return { sites, site: obj };
  }
  return { sites: arr, site: { name: site, exports: [] } };
};

module.exports = (router, { exports }) => {
  router.get('/', asyncRoute(async (req, res) => {
    const reduced = exports.reduce((obj, file) => {
      const c = obj.core || [];
      const s = obj.sites || [];
      if (file.site) {
        const { sites, site } = getSite(s, file.site);
        return {
          core: c,
          sites: [
            ...sites,
            {
              name: site.name,
              exports: [...site.exports, file],
            },
          ],
        };
      }
      return {
        core: [...c, file],
        sites: s,
      };
    }, {});
    const { core, sites } = reduced;
    res.marko(template, { core, sites });
  }));
};
