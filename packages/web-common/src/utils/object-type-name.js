const { get } = require('@base-cms/object-path');
const { dasherize } = require('@base-cms/inflector');

module.exports = (obj) => {
  const type = get(obj, '__typename');
  if (!type) return '';
  const inflected = dasherize(type);
  if (inflected === 'content-page') return 'dynamic-page';
  if (/^content-/.test(inflected)) return inflected.replace(/^content-.*/, 'content');
  return inflected;
};
