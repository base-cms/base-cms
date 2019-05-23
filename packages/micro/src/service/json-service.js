const { json, createError } = require('micro');
const createParamError = require('./param-error');
const jsonErrors = require('./json-errors');

module.exports = ({
  init,
  actions = {},
  ctx = {},
  healthPath = '/_health',
  ping,
} = {}) => jsonErrors(async (req, res) => {
  if (typeof init === 'function') await init(req, res);
  const { url } = req;
  if (url === healthPath) {
    if (typeof ping === 'function') await ping(req);
    return { ok: true };
  }

  const input = await json(req);
  const { action, params, meta } = input;
  if (!action) throw createError(400, 'No action provided.');

  const fn = actions[action];
  if (typeof fn !== 'function') throw createParamError('action', action, Object.keys(actions));

  const output = await fn(params || {}, {
    req,
    res,
    meta: meta || {},
    ...ctx,
  });
  return output || {};
});
