const { URLSearchParams } = require('url');

module.exports = (kvs = {}) => Object.keys(kvs).reduce((params, key) => {
  const value = kvs[key];
  if (value != null) params.set(key, value);
  return params;
}, new URLSearchParams()).toString();
