const { underscore, titleize } = require('inflection');

module.exports = value => titleize(underscore(value));
