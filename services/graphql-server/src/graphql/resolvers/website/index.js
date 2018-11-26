const deepAssign = require('deep-assign');

const option = require('./option');
const section = require('./section');
const site = require('./site');

module.exports = deepAssign(
  option,
  section,
  site,
);
