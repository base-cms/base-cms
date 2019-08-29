const { getAsObject, get } = require('@base-cms/object-path');
const { dasherize } = require('@base-cms/inflector');

const { keys } = Object;

module.exports = (value) => {
  const v = getAsObject(value);
  const obj = keys(v).reduce((o, k) => ({ ...o, [dasherize(k)]: v[k] }), {});
  return { get: name => get(obj, dasherize(name)) };
};
