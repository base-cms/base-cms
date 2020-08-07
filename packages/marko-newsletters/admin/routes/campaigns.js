const { asyncRoute } = require('@base-cms/utils');
const template = require('../templates/campaigns');
// const mapCampaigns = require('../../utils/map-campaigns');
const { campaignList } = require('../../temp-db');

module.exports = (router) => {
  router.get('/campaigns', (_, res) => { res.marko(template); });
  router.get('/campaigns/*', asyncRoute(async (_, res) => {
    // const { apollo } = res.locals;

    // const { campaignList } = await mapCampaigns(apollo);

    res.marko(template, { campaignList });
  }));
};
