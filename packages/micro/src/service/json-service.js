const { json, createError } = require('micro');
const { get } = require('@base-cms/object-path');

const createParamError = require('./param-error');
const jsonErrors = require('./json-errors');

module.exports = async ({
  init,
  actions = {},
  ctx = {},
  healthPath = '/_health',
  ping,
  onError,
} = {}) => {
  if (typeof init === 'function') await init();
  return jsonErrors(async (req, res) => {
    const { url } = req;
    if (url === healthPath) {
      if (typeof ping === 'function') await ping(req);
      return { ok: true };
    }

    const input = await json(req);
    const { action: path, params, meta } = input;
    if (!path) throw createError(400, 'No action provided.');

    const fn = get(actions, path);
    if (typeof fn !== 'function') throw createParamError('action', path, Object.keys(actions));

    const data = await fn(params || {}, {
      ...ctx,
      req,
      res,
      meta: meta || {},
    });
    return { data };
  }, onError);
};
