const { underscore, camelize } = require('inflected');

module.exports = value => camelize(underscore(value), false);
