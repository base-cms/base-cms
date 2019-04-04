const { asyncRoute } = require('@base-cms/utils');
const { magazineIssue: loader } = require('@base-cms/web-common/page-loaders');

module.exports = ({
  template,
  queryFragment,
} = {}) => asyncRoute(async (req, res) => {
  const { apollo } = req;
  const id = parseInt(req.params.id, 10);

  const issue = await loader(apollo, { id, queryFragment });
  return res.marko(template, { issue });
});
