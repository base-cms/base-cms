const { get, getAsArray } = require('@base-cms/object-path');

const dev = process.env.NODE_ENV === 'development';
const { isArray } = Array;

const render = (res, { status, err }) => {
  const { message, stack } = err;
  const obj = { error: true, status, message };
  if (dev && stack) obj.stack = stack.split('\n');
  res.status(status).json(obj);
};

const renderNetworkErrorResult = (res, { status, result }) => {
  const message = result.errors && isArray(result.errors) ? result.errors[0].message : 'Unknown fatal.';
  render(res, { status, err: new Error(message) });
};

const renderGraphqlError = (res, graphQLError) => {
  const { message } = graphQLError;
  const err = new Error(message);
  err.stack = getAsArray(graphQLError, 'extensions.exception.stacktrace').join('\n');
  const status = get(graphQLError, 'extensions.exception.statusCode', 500);
  render(res, { status, err });
};

// eslint-disable-next-line no-unused-vars
module.exports = () => (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const { networkError, graphQLErrors } = err;
  if (networkError) {
    if (networkError.result) {
      renderNetworkErrorResult(res, { status, result: networkError.result });
    } else {
      render(res, { status, err: networkError });
    }
  } else if (graphQLErrors && graphQLErrors.length) {
    renderGraphqlError(res, graphQLErrors[0]);
  } else {
    render(res, { status, err });
  }
};
