const { createError } = require('micro');

module.exports = (path, statusCode = 400) => createError(statusCode, `The path 'params.${path}' is required.`);
