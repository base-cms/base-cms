const loadWebsite = require('@base-cms/web-common/website-context');
const { asyncRoute } = require('@base-cms/utils');

module.exports = coreConfig => asyncRoute(async (req, res, next) => {
  const { apollo } = res.locals;
  const websiteContext = await loadWebsite(apollo);
  coreConfig.setWebsiteContext(websiteContext);

  // Set marko core date config.
  req.app.locals.markoCoreDate = {
    timezone: coreConfig.website('date.timezone'),
    locale: coreConfig.website('date.locale'),
    format: coreConfig.website('date.format'),
  };
  next();
});
