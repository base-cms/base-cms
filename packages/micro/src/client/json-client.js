const fetch = require('node-fetch');
const { createError } = require('micro');

module.exports = ({ url } = {}) => {
  if (!url) throw createError(500, 'No service URL was provided.');
  return Object.create({
    async request(action, {
      params = {},
      meta = {},
      fetchOptions = {},
    } = {}) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, params, meta }),
        ...fetchOptions,
      });
      const json = await res.json();
      if (!res.ok) throw createError(res.status, `Error from ${url}: ${json.message}`);
      return json;
    },
  });
};
