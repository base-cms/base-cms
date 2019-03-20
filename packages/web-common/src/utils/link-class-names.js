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
      classes.push(`${element}--${dasherize(modifier)}`);
    });
  }
  return classes;
};

const buildForContent = (block, obj) => {
  const modifiers = ['id', 'type'].map(p => get(obj, p));
  return build(block, 'content', modifiers);
};

const buildForDynamicPage = (block, obj) => {
  const id = get(obj, 'id');
  return build(block, 'dynamic-page', [id]);
};

const buildForWebsiteSection = (block, obj) => {
  const id = get(obj, 'id');
  return build(block, 'website-section', [id]);
};

module.exports = (block, obj) => {
  const type = objectTypeName(obj);
  switch (type) {
    case 'content':
      return buildForContent(block, obj);
    case 'website-section':
      return buildForWebsiteSection(block, obj);
    case 'dynamic-page':
      return buildForDynamicPage(block, obj);
    default:
      return [];
  }
};
