const { get } = require('@base-cms/object-path');
const { dasherize } = require('@base-cms/inflector');

const build = (type, values) => {
  const t = dasherize(type);
  return [`${t}-link`].concat(values.filter(v => v).map(v => `${t}-link--${dasherize(v)}`));
};

module.exports = {
  buildForContent(obj) {
    const values = ['id', 'type'].map(p => get(obj, p));
    return build('content', values);
  },

  buildForDynamicPage(obj) {
    const id = get(obj, 'id');
    return build('dynamic-page', [id]);
  },

  buildForWebsiteSection(obj) {
    const id = get(obj, 'id');
    return build('website-section', [id]);
  },
};
