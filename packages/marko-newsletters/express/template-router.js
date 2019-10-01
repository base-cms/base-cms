const { Router } = require('express');
const { asyncRoute } = require('@base-cms/utils');
const mapTemplates = require('../utils/map-templates');

/**
 * @todo Might want adjust how this is queried.
 */
module.exports = ({ templates }) => {
  const router = Router();

  router.use(asyncRoute(async (req, res, next) => {
    const { apollo } = res.locals;
    const { newsletters } = await mapTemplates(apollo, { templates });
    res.locals.newsletters = newsletters;
    next();
  }));

  templates.forEach(({ route, template, alias }) => {
    router.get(route, (req, res) => {
      const { newsletters } = res.locals;
      const newsletter = newsletters.find(n => n.alias === alias);
      res.marko(template, { newsletter: newsletter || {}, isStatic: !newsletter });
    });
  });
  return router;
};
