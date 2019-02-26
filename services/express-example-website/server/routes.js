const { withWebsiteSection, withDynamicPage } = require('@base-cms/express-web/middleware');

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.render('index');
  });

  router.get('/page/:alias', withDynamicPage());

  // All content
  router.get('/:prefix(*):id(\\d{8}):suffix(*)', (req, res) => {
    const { prefix, id, suffix } = req.params;
    res.render('content', { prefix, id, suffix });
  });

  router.get('/:alias(tactical)', withWebsiteSection({
    page: 'section/tactical',
  }));

  router.get('/:alias(*)', withWebsiteSection());
};
