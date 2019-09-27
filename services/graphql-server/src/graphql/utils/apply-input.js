const { isObject } = require('@base-cms/utils');

const { isArray } = Array;

module.exports = ({
  query,
  using,
  input,
  siteId,
}) => {
  const q = siteId ? { ...query, 'site.$id': siteId } : query;
  if (!isObject(using) || !isObject(input)) return q;
  return Object.keys(using).filter(key => typeof input[key] !== 'undefined').reduce((obj, key) => {
    const field = using[key];
    const value = input[key];
    return { ...obj, [field]: isArray(value) ? { $in: value } : value };
  }, q);
};
