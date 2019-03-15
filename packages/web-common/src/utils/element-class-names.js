const { dasherize } = require('@base-cms/inflector');
const objectTypeName = require('./object-type-name');

const { isArray } = Array;

module.exports = (block, obj, path, modifiers = []) => {
  const type = objectTypeName(obj);
  if (!block || !type) return [];
  const parts = (path ? String(path).split('.') : []).map(p => dasherize(p));
  parts.unshift(type);

  const element = `${dasherize(block)}__${parts.join('-')}`;
  const classes = [element];
  if (isArray(modifiers)) {
    modifiers.forEach((modifier) => {
      classes.push(`${element}--${modifier}`);
    });
  }
  return classes;
};
