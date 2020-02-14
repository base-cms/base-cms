const json = require('./json-service');
const jsonServer = require('./json-server');
const createParamError = require('./param-error');
const createRequiredParamError = require('./required-param-error');

module.exports = {
  json,
  jsonServer,
  createParamError,
  createRequiredParamError,
};
