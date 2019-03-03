const { dasherize } = require('@base-cms/inflector');

module.exports = (modelName, path) => {
  const types = String(path).split('.');
  const elementTypes = types.shift();
  const elementClass = `${modelName}__${dasherize(elementTypes)}`;
  const classes = [elementClass];
  types.forEach(type => classes.push(`${elementClass}--${dasherize(type)}`));
  return classes;
};
