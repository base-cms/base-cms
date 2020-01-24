const home = require('./home');

module.exports = (router, { exports }) => {
  home(router, { exports });
};
