const { getAsArray } = require('@base-cms/object-path');

module.exports = section => getAsArray(section, 'hierarchy').map(s => s.alias).reverse();
