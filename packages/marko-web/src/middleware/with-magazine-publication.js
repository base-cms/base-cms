const { asyncRoute } = require('@base-cms/utils');
const { magazinePublication: loader } = require('@base-cms/web-common/page-loaders');

module.exports = ({
  template,
  queryFragment,
} = {}) => asyncRoute(async (req, res) => {
  const { apollo } = req;
  const { id } = req.params;

  const publication = await loader(apollo, { id, queryFragment });
  return res.marko(template, { publication });
});
