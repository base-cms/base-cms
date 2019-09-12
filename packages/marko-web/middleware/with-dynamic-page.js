const { asyncRoute, isFunction: isFn } = require('@base-cms/utils');
const { dynamicPage: loader } = require('@base-cms/web-common/page-loaders');
const { blockDynamicPage: queryFactory } = require('@base-cms/web-common/query-factories');
const PageNode = require('./page-node');

module.exports = ({
  template,
  queryFragment,
  aliasResolver,
  redirectOnPathMismatch = true,
} = {}) => asyncRoute(async (req, res) => {
  const alias = isFn(aliasResolver) ? await aliasResolver(req, res) : req.params.alias;
  const { apollo } = req;

  const page = await loader(apollo, { alias });
  const { redirectTo, canonicalPath } = page;
  if (redirectTo) {
    return res.redirect(301, redirectTo);
  }
  if (redirectOnPathMismatch && canonicalPath !== req.path) {
    return res.redirect(301, canonicalPath);
  }
  const pageNode = new PageNode(apollo, {
    queryFactory,
    queryFragment,
    variables: { input: { alias } },
    resultField: 'contentPage',
  });
  return res.marko(template, { ...page, pageNode });
});
