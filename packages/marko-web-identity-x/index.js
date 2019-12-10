const routes = require('./routes');
const middleware = require('./middleware');

module.exports = (app, config) => {
  app.use(middleware(config));
  app.use('/__idx', routes);
};
