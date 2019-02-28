const { underscore, camelize } = require('inflection');

module.exports = value => camelize(underscore(value), true);
