const { asyncRoute } = require('@base-cms/utils');
const template = require('../templates/index');

module.exports = (router) => {
  router.get('/', asyncRoute(async (req, res) => {
    res.marko(template);
  }));
};
