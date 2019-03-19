const { titleize } = require('@base-cms/inflector');

const altFrom = (value) => {
  const pos = value.lastIndexOf('.');
  if (pos === -1) return value;
  const offset = value.length - pos;
  if (offset < 6) {
    const replaced = value.replace(value.substring(pos), '');
    const titleized = titleize(replaced);
    return titleized.replace(/\./g, ' ');
  }
  return value;
};

module.exports = ({ caption, name, fileName } = {}) => {
  if (caption) return caption;
  if (name) return altFrom(name);
  return altFrom(fileName);
};
