const deepAssign = require('deep-assign');

const campaign = require('./campaign');
const schedule = require('./schedule');

module.exports = deepAssign(
  campaign,
  schedule,
);
