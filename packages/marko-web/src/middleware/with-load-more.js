const { asyncRoute } = require('@base-cms/utils');
const createError = require('http-errors');
const loadMore = require('../components/document/components/load-more-result');

module.exports = ({
  blocks = {},
} = {}) => asyncRoute(async (req, res) => {
  const { query, params } = req;
  const { blockName } = params;
  if (!blockName) throw createError(400, 'No block name was provided with the load more request.');
  const block = blocks[blockName];
  if (!block) throw createError(404, `A load more block template for '${blockName}' was not found.`);

  const input = JSON.parse(query.input || null) || {};

  res.marko(loadMore, {
    block,
    input,
  });
});
