const { underscore, dasherize } = require('inflected');

module.exports = value => dasherize(underscore(value));
