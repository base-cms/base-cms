const { Router } = require('express');

/**
 * @todo Needs to determine static vs newsletter template.
 * @todo Needs to load newsletter product if non-static.
 */
module.exports = ({ templates }) => {
  const router = Router();
  templates.forEach(({ route, template }) => {
    router.get(route, (req, res) => {
      res.marko(template);
    });
  });
  return router;
};
