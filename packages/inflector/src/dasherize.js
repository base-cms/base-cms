const { underscore, dasherize } = require('inflection');

module.exports = value => dasherize(underscore(value));
