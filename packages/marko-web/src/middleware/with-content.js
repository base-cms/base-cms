const { asyncRoute, isFunction: isFn } = require('@base-cms/utils');
const { content: loader } = require('@base-cms/web-common/page-loaders');

module.exports = ({
  template,
  queryFragment,
  idResolver,
  redirectOnPathMismatch = true,
} = {}) => asyncRoute(async (req, res, next) => {
  try {
    const id = isFn(idResolver) ? await idResolver(req, res) : req.params.id;
    const { apollo } = req;

    const content = await loader(apollo, { id, queryFragment });
    const { redirectTo, canonicalPath } = content;
    if (redirectTo) {
      return res.redirect(301, redirectTo);
    }
    if (redirectOnPathMismatch && canonicalPath !== req.path) {
      return res.redirect(301, canonicalPath);
    }
    return res.marko(template, { content });
  } catch (e) {
    return next(e);
  }
});
