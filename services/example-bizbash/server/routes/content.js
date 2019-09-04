const { withContent } = require('@base-cms/marko-web/middleware');
const content = require('../templates/content');

module.exports = (app) => {
  app.get('/*?:id(\\d{8})*', withContent({
    template: content,
  }));
};
