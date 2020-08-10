const home = require('./home');
const schedulesPage = require('./schedules');

module.exports = (router, { templates }) => {
  home(router, { templates });

  schedulesPage(router);
};
