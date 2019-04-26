const { STATUS_CODES } = require('http');
const createError = require('http-errors');
const errorTemplate = require('../components/document/components/error');
const getRedirect = require('./get-redirect');

const { isArray } = Array;

const renderError = (res, { statusCode, err, template }) => {
  res.status(statusCode);
  res.marko(template || errorTemplate, {
    statusCode,
    statusMessage: STATUS_CODES[statusCode],
    error: err,
  });
};

const handleNetworkError = (res, { statusCode, err, template }) => {
  const { result } = err;
  const message = result.errors && isArray(result.errors) ? result.errors[0].message : 'Unknown fatal.';
  return renderError(res, { statusCode, err: new Error(message), template });
};

const render = (res, { statusCode, err, template }) => {
  if (err.errors && err.errors[0]) {
    const error = err.errors[0];
    return error.result
      ? handleNetworkError(res, { statusCode, err: error, template })
      : renderError(res, { statusCode, err, template });
  }
  return err.networkError
    ? handleNetworkError(res, { statusCode, err: err.networkError, template })
    : renderError(res, { statusCode, err, template });
};

module.exports = (app, { template }) => {
  // Force Express to throw an error on 404s.
  app.use((req, res, next) => { // eslint-disable-line no-unused-vars
    throw createError(404, `No page found for '${req.path}'`);
  });

  // Error handler.
  // @todo handle logging
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const statusCode = err.status || err.statusCode || 500;

    getRedirect(req).then((redirect) => {
      if (redirect) {
        const { code, to } = redirect;
        res.redirect(code, to);
      } else {
        render(res, { statusCode, err, template });
      }
    }).catch(() => render(res, { statusCode, err, template }));
  });
};
