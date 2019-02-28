const { asyncRoute, isFunction: isFn } = require('@base-cms/utils');
const { dynamicPage: load } = require('@base-cms/web-common/page-loaders');

module.exports = ({
  template = 'dynamic-page',
  queryFragment,
  aliasResolver,
  redirectOnPathMismatch = true,
} = {}) => asyncRoute(async (req, res) => {
  const alias = isFn(aliasResolver) ? await aliasResolver(req, res) : req.params.alias;
  const { apollo } = req;

  const page = await load(apollo, { alias, queryFragment });
  const { redirectTo, canonicalPath } = page;
  if (redirectTo) {
    return res.redirect(301, redirectTo);
  }
  if (redirectOnPathMismatch && canonicalPath !== req.path) {
    return res.redirect(301, canonicalPath);
  }
  return res.render(template, { page });
});
