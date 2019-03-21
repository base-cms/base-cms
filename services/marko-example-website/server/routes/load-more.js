const loadMore = require('../templates/load-more');
const contentBlockSubPageA = require('../components/blocks/content/sub-page-a');

const tags = {
  'content-block-sub-page-a': contentBlockSubPageA,
};

module.exports = (app) => {
  app.get('/load-more/:tag', (req, res) => {
    const { query, params } = req;
    const input = JSON.parse(query.q || null) || {};
    res.marko(loadMore, {
      tag: tags[params.tag],
      input,
    });
  });
};
