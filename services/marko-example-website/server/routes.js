const { withWebsiteSection, withDynamicPage, withContent } = require('@base-cms/marko-web/middleware');
const index = require('../app/templates/index');
const section = require('../app/templates/section');
const tactical = require('../app/templates/section/tactical');
const page = require('../app/templates/dynamic-page');
const content = require('../app/templates/content');

module.exports = (app) => {
  // route('content', {
  //   type: '*',
  //   template: content,
  // });

  // route('content', {
  //   type: 'article',
  //   template: contentArticle,
  // });

  // route('content', {
  //   type: 'company',
  //   template: contentCompany,
  // });

  // route('content', {
  //   id: 12345678,
  //   template: contentCompany,
  // });

  app.get('/', (req, res) => {
    res.marko(index, {
      name: 'Test',
    });
  });

  app.get('/page/:alias', withDynamicPage({
    template: page,
  }));

  // All content
  app.get('/:prefix(*):id(\\d{8}):suffix(*)', withContent({
    template: content,
  }));

  app.get('/:alias(tactical)', withWebsiteSection({
    template: tactical,
  }));

  app.get('/:alias(*)', withWebsiteSection({
    template: section,
  }));
};
