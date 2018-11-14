const envalid = require('envalid');
const validators = require('./validators');

envalid.custom = validators;

module.exports = envalid;
