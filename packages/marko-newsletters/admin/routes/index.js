const home = require('./home');
const deployments = require('./deployments');

module.exports = (router, { templates }) => {
  home(router, { templates });

  deployments(router);
};
