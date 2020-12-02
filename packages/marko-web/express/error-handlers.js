const { STATUS_CODES } = require('http');
const createError = require('http-errors');
const errorTemplate = require('../components/document/components/error');
const getRedirect = require('./get-redirect');
const findContentAlias = require('./find-content-alias');
const applyQueryParams = require('../utils/apply-query-params');

const { isArray } = Array;
const { error } = console;

const renderError = (res, { statusCode, err, template }) => {
  res.status(statusCode);
  res.marko(template || errorTemplate, {
    statusCode,
    statusMessage: STATUS_CODES[statusCode],
    error: err,
  });
};

const handleNetworkErrorResult = (res, { statusCode, result, template }) => {
  const message = result.errors && isArray(result.errors) ? result.errors[0].message : 'Unknown fatal.';
  return renderError(res, { statusCode, err: new Error(message), template });
};

const render = (res, { statusCode, err, template }) => {
  const { networkError } = err;
  if (networkError) {
    if (networkError.result) {
      return handleNetworkErrorResult(res, { statusCode, result: networkError.result, template });
    }
    return renderError(res, { statusCode, err: networkError, template });
  }
  return renderError(res, { statusCode, err, template });
};

const redirectOrError = ({
  req,
  res,
  err,
  redirectHandler,
  statusCode,
  template,
  fatalErrorHandler,
}) => {
  getRedirect(req, redirectHandler).then((redirect) => {
    if (redirect) {
      const { code, to } = redirect;
      res.redirect(code, to);
    } else {
      render(res, { statusCode, err, template });
    }
  }).catch(() => {
    try {
      render(res, { statusCode, err, template });
    } catch (e) {
      fatalErrorHandler(err);
    }
  });
};

module.exports = (app, { template, redirectHandler, onFatalError }) => {
  // Force Express to throw an error on 404s.
  app.use((req, res, next) => { // eslint-disable-line no-unused-vars
    throw createError(404, `No page found for '${req.path}'`);
  });

  const fatalErrorHandler = (err) => {
    error('Unable to render error template!', err);
    if (typeof onFatalError === 'function') onFatalError(err);
  };

  // Error handler.
  // @todo handle logging
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const statusCode = err.status || err.statusCode || 500;
    const opts = {
      req,
      res,
      err,
      redirectHandler,
      statusCode,
      template,
      fatalErrorHandler,
    };

    // Attempt to load aliased content (when applicable).
    if (statusCode === 404) {
      findContentAlias({ req }).then((redirectTo) => {
        if (redirectTo) {
          const { query } = req;
          res.redirect(301, applyQueryParams({ path: redirectTo, query }));
        } else {
          redirectOrError(opts);
        }
      }).catch(() => redirectOrError(opts));
    } else {
      redirectOrError(opts);
    }
  });
};
