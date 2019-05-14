const { titleize } = require('@base-cms/inflector');

const altFrom = (value = '') => {
  if (!value) return value;
  const v = String(value);
  const pos = v.lastIndexOf('.');
  if (pos === -1) return v;
  const offset = v.length - pos;
  if (offset < 6) {
    const replaced = v.replace(v.substring(pos), '');
    const titleized = titleize(replaced);
    return titleized.replace(/\./g, ' ');
  }
  return v;
};

module.exports = ({ caption, name, fileName } = {}) => {
  if (caption) return caption;
  if (name) return altFrom(name);
  return altFrom(fileName);
};
