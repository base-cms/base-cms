const { dasherize } = require('@base-cms/inflector');

const { isArray } = Array;

module.exports = (block, parts = [], modifiers = []) => {
  if (!block || !isArray(parts) || !parts.length) return [];
  const element = `${dasherize(block)}__${parts.map(p => dasherize(p)).join('-')}`;
  const classes = [element];
  if (isArray(modifiers)) {
    modifiers.forEach((modifier) => {
      classes.push(`${element}--${modifier}`);
    });
  }
  return classes;
};
