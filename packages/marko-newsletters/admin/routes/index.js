const home = require('./home');
const campaignsPage = require('./campaigns');

module.exports = (router, { templates }) => {
  home(router, { templates });

  campaignsPage(router);
};
