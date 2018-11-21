const deepAssign = require('deep-assign');

const option = require('./option');
const product = require('./product');

module.exports = deepAssign(
  option,
  product,
);
