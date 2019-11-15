const routes = require('@base-cms/identity-x/routes');
const IdentityX = require('@base-cms/identity-x');

module.exports = (app, config) => {
  app.use(IdentityX(config));
  app.use('/__idx', routes);
};
