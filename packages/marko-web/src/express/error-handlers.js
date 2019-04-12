const { STATUS_CODES } = require('http');
const createError = require('http-errors');
const errorTemplate = require('../components/document/components/error');
const redirectsHandler = require('./redirects');

module.exports = (app, { template }) => {
  // Check for redirects before 404ing
  app.use(redirectsHandler);

  // Force Express to throw an error on 404s.
  app.use((req, res, next) => { // eslint-disable-line no-unused-vars
    throw createError(404, `No page found for '${req.path}'`);
  });

  // Error handler.
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode);
    res.marko(template || errorTemplate, {
      statusCode,
      statusMessage: STATUS_CODES[statusCode],
      error: err,
    });
  });
};
