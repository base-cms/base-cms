const deepAssign = require('deep-assign');

const asset = require('./asset');
const content = require('./content');
const security = require('./security');
const taxonomy = require('./taxonomy');

module.exports = deepAssign(
  asset,
  content,
  security,
  taxonomy,
);
