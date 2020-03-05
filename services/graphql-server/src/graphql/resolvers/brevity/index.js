const deepAssign = require('deep-assign');

const asset = require('./asset');
const issue = require('./issue');

module.exports = deepAssign(
  asset,
  issue,
);
