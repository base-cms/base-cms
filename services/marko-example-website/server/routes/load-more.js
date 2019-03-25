const loadMore = require('../templates/load-more');
const contentBlockSubPageA = require('../components/blocks/content/sub-page-a');

const blocks = {
  'content-block-sub-page-a': contentBlockSubPageA,
};

module.exports = (app) => {
  app.get('/load-more/:blockName', (req, res) => {
    const { query, params } = req;
    const input = JSON.parse(query.q || null) || {};
    res.marko(loadMore, {
      block: blocks[params.blockName],
      input,
    });
  });
};
