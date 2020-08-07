const deepAssign = require('deep-assign');

const schedule = require('./schedule');
const campaign = require('./campaign');

module.exports = deepAssign(
  schedule,
  campaign,
);
