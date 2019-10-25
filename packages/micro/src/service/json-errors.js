const { send } = require('micro');

const dev = process.env.NODE_ENV === 'development';
const { error: log } = console;

module.exports = (fn, onError) => async (req, res) => {
  try {
    return await fn(req, res);
  } catch (e) {
    const { message, stack } = e;
    const status = e.statusCode || e.status || 500;
    const obj = { error: true, status, message };
    if (dev && stack) obj.stack = stack.split('\n');
    send(res, status, obj);
    if (e instanceof Error) {
      log(`${status} ${stack}`);
    } else {
      log('Unknown Error instance.', e);
    }
    if (typeof onError === 'function') await onError(e);
    return null;
  }
};
