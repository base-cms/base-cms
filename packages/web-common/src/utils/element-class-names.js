const { dasherize } = require('@base-cms/inflector');

const { isArray } = Array;

module.exports = (block, path, modifiers) => {
  if (!block || !path) return [];
  const parts = String(path).split('.');
  const element = `${dasherize(block)}__${parts.map(p => dasherize(p)).join('-')}`;
  const classes = [element];
  if (isArray(modifiers)) {
    modifiers.forEach((modifier) => {
      classes.push(`${element}--${modifier}`);
    });
  }
  return classes;
};
