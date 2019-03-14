const { dasherize } = require('@base-cms/inflector');

module.exports = (modelName, path) => {
  const parts = String(path).split('.');
  const name = dasherize(modelName);
  const classes = [`${name}-field`, `${name}-field--${parts.map(p => dasherize(p)).join('-')}`];
  return classes;
};
