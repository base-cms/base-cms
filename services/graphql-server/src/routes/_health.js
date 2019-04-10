const { asyncRoute } = require('@base-cms/utils');
const { ping } = require('../services');

module.exports = (app) => {
  const path = '([a-z0-9-/]*)?/_health';
  const handle = asyncRoute(async (req, res) => {
    try {
      const info = await ping();
      res.status(200).json({
        status: 'ok',
        info,
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        info: e.message,
      });
    }
  });

  app.get(path, handle);
  app.head(path, handle);
};
