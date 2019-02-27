const { withWebsiteSection, withDynamicPage } = require('@base-cms/marko-web/middleware');
const index = require('../app/templates/index');
const section = require('../app/templates/section');
const page = require('../app/templates/dynamic-page');
const content = require('../app/templates/content');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.marko(index, {
      name: 'Test',
    });
  });

  app.get('/page/:alias', withDynamicPage({
    template: page,
  }));

  // All content
  app.get('/:prefix(*):id(\\d{8}):suffix(*)', (req, res) => {
    res.marko(content, {
      name: 'Test',
    });
  });

  app.get('/:alias(tactical)', withWebsiteSection({
    template: section,
  }));

  app.get('/:alias(*)', withWebsiteSection({
    template: section,
  }));
};
