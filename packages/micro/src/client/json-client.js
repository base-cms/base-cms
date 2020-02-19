const fetch = require('node-fetch');
const { createError } = require('micro');
const isFn = require('../utils/is-function');

module.exports = ({ url, name, onCreateError } = {}) => {
  if (!url) throw createError(500, 'No service URL was provided.');
  return Object.create({
    async request(action, params = {}, {
      meta = {},
      fetchOptions = {},
    } = {}) {
      const body = { action, params, meta };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        ...fetchOptions,
      });
      const json = await res.json();
      if (!res.ok) {
        const error = isFn(onCreateError)
          ? await onCreateError({
            name,
            url,
            res,
            json,
            body,
            createError,
          }) : createError(res.status, `Error from ${name || url}: ${json.message}`);
        throw error;
      }
      return json.data;
    },
    async ping(endpoint = '/_health') {
      const res = await fetch(`${url}${endpoint}`);
      await res.json();
      if (!res.ok) throw createError(res.status, `Bad health check response from ${name || url}`);
      return `Service ${url} pinged successfully.`;
    },
  });
};
