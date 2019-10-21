const deepAssign = require('deep-assign');

const asset = require('./asset');
const content = require('./content');
const taxonomy = require('./taxonomy');

module.exports = deepAssign(
  asset,
  content,
  taxonomy,
);
