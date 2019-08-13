const { asyncRoute } = require('@base-cms/utils');
const { magazineSubscribeUrl: loader } = require('@base-cms/web-common/page-loaders');

module.exports = ({
  template,
  queryFragment,
} = {}) => asyncRoute(async (req, res) => {
  const { apollo } = req;
  const { subscribeUrl } = req.params;
  const publication = await loader(apollo, { subscribeUrl, queryFragment });
  return res.marko(template, { publication });
});
