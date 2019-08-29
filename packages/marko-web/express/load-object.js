const { getAsObject } = require('@base-cms/object-path');
const { dasherize } = require('@base-cms/inflector');

const { keys } = Object;

module.exports = (value) => {
  const v = getAsObject(value);
  return keys(v).reduce((o, k) => ({ ...o, [dasherize(k)]: v[k] }), {});
};
