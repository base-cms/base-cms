const { get } = require('@base-cms/object-path');
const { dasherize } = require('@base-cms/inflector');

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

module.exports = {
  buildForContent(block, obj) {
    const modifiers = ['id', 'type'].map(p => get(obj, p));
    return build(block, 'content', modifiers);
  },

  buildForDynamicPage(block, obj) {
    const id = get(obj, 'id');
    return build(block, 'dynamic-page', [id]);
  },

  buildForWebsiteSection(block, obj) {
    const id = get(obj, 'id');
    return build(block, 'website-section', [id]);
  },
};
