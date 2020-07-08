const isFirst = require('./is-first');
const isLast = require('./is-last');
const isEven = require('./is-even');

module.exports = (nodes, index) => !isEven(index) && !isLast(nodes, index) && !isFirst(index);
