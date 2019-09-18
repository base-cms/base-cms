const { withContent } = require('@base-cms/marko-web/middleware');
const content = require('../templates/content');
const whitepaper = require('../templates/content/whitepaper');
const queryFragment = require('../api/fragments/content-page');

module.exports = (app) => {
  app.get('/*?whitepaper/:id(\\d{8})*', withContent({
    template: whitepaper,
    queryFragment,
  }));
  app.get('/*?:id(\\d{8})*', withContent({
    template: content,
    queryFragment,
  }));
};
