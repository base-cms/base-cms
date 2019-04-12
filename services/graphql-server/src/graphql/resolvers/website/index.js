const deepAssign = require('deep-assign');

const section = require('./section');
const site = require('./site');

module.exports = deepAssign(
  section,
  site,
);
