const { asArray, asObject } = require('@base-cms/utils');

module.exports = ({
  uri,
  action,
  id,
  query,
  decodedParams,
} = {}) => {
  const q = asObject(query);
  const noEncode = asArray(decodedParams);
  const search = Object.keys(q).reduce((pairs, key) => {
    const v = q[key];
    if (!v) return pairs;
    const value = noEncode.includes(key) ? v : encodeURIComponent(v);
    pairs.push(`${encodeURIComponent(key)}=${value}`);
    return pairs;
  }, []).join('&');
  return `${uri}/${action}/${id}?${search}`;
};
