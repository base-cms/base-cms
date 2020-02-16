const fetch = require('node-fetch');
const { createError } = require('micro');

module.exports = ({ url, name } = {}) => {
  if (!url) throw createError(500, 'No service URL was provided.');
  return Object.create({
    async request(action, params = {}, {
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
      if (!res.ok) throw createError(res.status, `Error from ${name || url}: ${json.message}`);
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
