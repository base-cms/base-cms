const inflection = require('inflection');

const altFrom = (value) => {
  const pos = value.lastIndexOf('.');
  if (pos === -1) return value;
  const offset = value.length - pos;
  if (offset < 6) {
    const replaced = value.replace(value.substring(pos), '');
    const titleized = inflection.titleize(replaced);
    return titleized.replace(/\./g, ' ');
  }
  return value;
};

module.exports = {
  /**
   *
   */
  AssetImage: {
    src: (image, { input }) => {
      const { host } = input;
      const { filePath, fileName } = image;
      return `https://${host}/${filePath}/${fileName}`;
    },
    alt: (image) => {
      const { caption, name, fileName } = image;
      if (name) return altFrom(name);
      if (caption) return caption;
      return altFrom(fileName);
    },
  },
};
