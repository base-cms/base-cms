const { dasherize } = require('@base-cms/inflector');

module.exports = (modelName, path) => {
  const parts = String(path).split('.');
  const name = dasherize(modelName);
  const classes = [`${name}-field`].concat(parts.filter(p => p).map(p => `${name}-field--${dasherize(p)}`));
  return classes;
};
