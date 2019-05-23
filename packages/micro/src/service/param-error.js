const { createError } = require('micro');

module.exports = (path, value, supported, statusCode = 400) => {
  const s = Array.isArray(supported) ? supported : [];
  return createError(statusCode, `The value '${value}' for path '${path}' is invalid. Supported values are '${s.join("', '")}'`);
};
