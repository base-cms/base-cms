const { asyncRoute } = require('@base-cms/utils');

module.exports = (router) => {
  router.get('/', asyncRoute(async (req, res) => {
    res.send('Admin Home');
  }));
};
