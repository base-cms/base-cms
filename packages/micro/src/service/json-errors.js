const { send } = require('micro');
const isFn = require('../utils/is-function');

const dev = process.env.NODE_ENV === 'development';
const { error: log } = console;

const defaultResponse = ({ error: e, status }) => {
  const { message, stack } = e;
  const obj = { error: true, status, message };
  if (dev && stack) obj.stack = stack.split('\n');
  return obj;
};

module.exports = (fn, onError, createResponse) => async (req, res) => {
  try {
    return await fn(req, res);
  } catch (e) {
    const { stack } = e;
    const status = e.statusCode || e.status || 500;
    const buildResponse = isFn(createResponse) ? createResponse : defaultResponse;
    const obj = buildResponse({ error: e, status });
    send(res, status, obj);
    if (e instanceof Error) {
      log(`${status} ${stack}`);
    } else {
      log('Unknown Error instance.', e);
    }
    if (isFn(onError)) {
      try {
        await onError(e);
      } catch (ex) {
        log('ON ERROR CALLBACK FAILED!', ex);
      }
    }
  }
  // return `undefined` instead of `null` to prevent micro.run from sending
  // an additional 204 response.
  return undefined;
};
