const { asyncRoute } = require('@base-cms/utils');
const { magazinePublication: loader } = require('@base-cms/web-common/page-loaders');
const { blockMagazinePublication: queryFactory } = require('@base-cms/web-common/query-factories');
const PageNode = require('./page-node');

module.exports = ({
  template,
  queryFragment,
} = {}) => asyncRoute(async (req, res) => {
  const { apollo } = req;
  const { id } = req.params;
  const publication = await loader(apollo, { id });
  const pageNode = new PageNode(apollo, {
    queryFactory,
    queryFragment,
    variables: { input: { id } },
    resultField: 'magazinePublication',
  });
  return res.marko(template, { ...publication, pageNode });
});
