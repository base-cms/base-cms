const deepAssign = require('deep-assign');

const asset = require('./asset');
const content = require('./content');

module.exports = deepAssign(
  asset,
  content,
);
