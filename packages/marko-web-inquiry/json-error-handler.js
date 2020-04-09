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

// eslint-disable-next-line no-unused-vars
module.exports = () => (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const { networkError } = err;
  if (networkError) {
    if (networkError.result) {
      renderNetworkErrorResult(res, { status, result: networkError.result });
    } else {
      render(res, { status, err: networkError });
    }
  } else {
    render(res, { status, err });
  }
};
