const envalid = require('envalid');
const validators = require('./validators');

envalid.validators = validators;

module.exports = envalid;
