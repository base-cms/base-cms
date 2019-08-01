const { dasherize } = require('@base-cms/inflector');
const {
  TAG_ATTR_PREFIX,
} = require('../constants');

module.exports = (key, value) => {
  if (!key || value == null) return null; // ignore null and undefined
  return `${TAG_ATTR_PREFIX}-${dasherize(key)}="${value}"`;
};
