const { underscore, titleize } = require('inflected');

module.exports = value => titleize(underscore(value));
