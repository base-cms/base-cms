const { asyncRoute, isFunction: isFn } = require('@base-cms/utils');
const { websiteSection: loader } = require('@base-cms/web-common/page-loaders');
const { blockWebsiteSection: queryFactory } = require('@base-cms/web-common/query-factories');
const PageNode = require('./page-node');
const applyQueryParams = require('../utils/apply-query-params');

module.exports = ({
  template,
  queryFragment,
  aliasResolver,
  redirectOnPathMismatch = true,
  context: contextFn,
} = {}) => asyncRoute(async (req, res) => {
  const alias = isFn(aliasResolver) ? await aliasResolver(req, res) : req.params.alias;
  const { apollo, query } = req;
  const cleanedAlias = alias.replace(/\/+$/, '').replace(/^\/+/, '');

  const section = await loader(apollo, { alias: cleanedAlias });
  const { redirectTo, canonicalPath } = section;
  if (redirectTo) {
    return res.redirect(301, applyQueryParams({ path: redirectTo, query }));
  }
  if (redirectOnPathMismatch && canonicalPath !== req.path) {
    return res.redirect(301, applyQueryParams({ path: canonicalPath, query }));
  }
  const pageNode = new PageNode(apollo, {
    queryFactory,
    queryFragment,
    variables: { input: { alias: cleanedAlias } },
    resultField: 'websiteSectionAlias',
  });

  let context = {};
  if (typeof contextFn === 'function') {
    context = await contextFn({
      req,
      res,
      section,
      pageNode,
    });
  }
  return res.marko(template, { ...section, pageNode, context });
});
