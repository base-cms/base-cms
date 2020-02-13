const { URLSearchParams } = require('url');
const { asObject } = require('@base-cms/utils');

module.exports = ({ path, query } = {}) => {
  const params = new URLSearchParams(asObject(query));
  if (!`${params}`) return path;
  const cleaned = path.replace(/^\/+/, '');
  const isExternal = /^http/.test(cleaned);

  // Must put a "fake" host in front of the path to properly parse.
  const to = isExternal ? cleaned : `http://localhost/${cleaned}`;
  const toUrl = new URL(to);
  toUrl.searchParams.forEach((value, key) => params.set(key, value));
  const origin = isExternal ? toUrl.origin : '';
  return `${origin}${toUrl.pathname}?${params}`;
};
