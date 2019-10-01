const { asyncRoute } = require('@base-cms/utils');
const mapTemplates = require('../../utils/map-templates');
const template = require('../templates/index');

module.exports = (router, { templates }) => {
  router.get('/', asyncRoute(async (req, res) => {
    const { apollo } = res.locals;

    const { newsletters, staticTemplates } = await mapTemplates(apollo, { templates });
    res.marko(template, { newsletters, staticTemplates });
  }));
};
