const home = require('./home');

module.exports = (router, { templates }) => {
  home(router, { templates });
};
