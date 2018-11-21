const deepAssign = require('deep-assign');

const option = require('./option');
const site = require('./site');

module.exports = deepAssign(
  option,
  site,
);
