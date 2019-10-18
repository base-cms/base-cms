const { get } = require('@base-cms/object-path');
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
  const { redirectTo } = page;
  const path = get(page, 'siteContext.path');
  if (redirectTo) {
    return res.redirect(301, redirectTo);
  }
  // @todo change me
  if (redirectOnPathMismatch && path !== req.path) {
    return res.redirect(301, path);
  }
  const pageNode = new PageNode(apollo, {
    queryFactory,
    queryFragment,
    variables: { input: { alias } },
    resultField: 'contentPage',
  });
  return res.marko(template, { ...page, pageNode });
});
