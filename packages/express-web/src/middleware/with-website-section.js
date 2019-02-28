const { asyncRoute, isFunction: isFn } = require('@base-cms/utils');
const { websiteSection: load } = require('@base-cms/web-common/page-loaders');

module.exports = ({
  template = 'section',
  queryFragment,
  aliasResolver,
  redirectOnPathMismatch = true,
} = {}) => asyncRoute(async (req, res) => {
  const alias = isFn(aliasResolver) ? await aliasResolver(req, res) : req.params.alias;
  const { apollo } = req;

  const section = await load(apollo, { alias, queryFragment });
  const { redirectTo, canonicalPath } = section;
  if (redirectTo) {
    return res.redirect(301, redirectTo);
  }
  if (redirectOnPathMismatch && canonicalPath !== req.path) {
    return res.redirect(301, canonicalPath);
  }
  return res.render(template, { section });
});
