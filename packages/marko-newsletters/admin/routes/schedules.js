const { asyncRoute } = require('@base-cms/utils');
const template = require('../templates/schedules');
// const mapSchedules = require('../../utils/map-schedules');
const scheduleList = []; // TBD
module.exports = (router) => {
  router.get('/schedules', (_, res) => { res.marko(template); });
  router.get('/schedules/*', asyncRoute(async (_, res) => {
    // const { apollo } = res.locals;

    // const { scheduleList } = await mapSchedules(apollo);

    res.marko(template, { scheduleList });
  }));
};
