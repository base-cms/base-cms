const isEven = require('./is-even');

module.exports = index => (isEven(index) ? 'left' : 'right');
