const { get } = require('@base-cms/object-path');
const { dasherize } = require('@base-cms/inflector');
const objectTypeName = require('./object-type-name');

const { isArray } = Array;

const build = (block, type, modifiers) => {
  if (!block || !type) return [];
  const t = dasherize(type);
  const element = `${block}__${t}-link`;
  const classes = [element];
  if (isArray(modifiers)) {
    modifiers.forEach((modifier) => {
      if (modifier) classes.push(`${element}--${dasherize(modifier)}`);
    });
  }
  return classes;
};

const joinModifiers = (...args) => args.reduce((arr, v) => {
  if (isArray(v)) return arr.concat(v);
  return arr;
}, []);

const buildForContent = (block, obj, modifiers) => {
  const mods = joinModifiers(['id', 'type'].map(p => get(obj, p)), modifiers);
  return build(block, 'content', mods);
};

const buildForDynamicPage = (block, obj, modifiers) => {
  const id = get(obj, 'id');
  const mods = joinModifiers([id], modifiers);
  return build(block, 'dynamic-page', mods);
};

const buildForWebsiteSection = (block, obj, modifiers) => {
  const id = get(obj, 'id');
  const mods = joinModifiers([id], modifiers);
  return build(block, 'website-section', mods);
};

module.exports = (block, obj, modifiers) => {
  const type = objectTypeName(obj);
  switch (type) {
    case 'content':
      return buildForContent(block, obj, modifiers);
    case 'website-section':
      return buildForWebsiteSection(block, obj, modifiers);
    case 'dynamic-page':
      return buildForDynamicPage(block, obj, modifiers);
    default:
      return [];
  }
};
