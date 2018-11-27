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
  PlatformAssetImage: {
    src: (image, { input }) => {
      const { host, size, aspectRatio } = input;
      const { filePath, fileName } = image;
      const file = fileName.replace(/\.png$/, '.jpg');
      const ar = aspectRatio ? `/${aspectRatio}` : '';
      const sz = size !== 'original' ? `/${size}` : '';
      return `https://${host}/${filePath}${ar}${sz}/${file}`;
    },
    alt: (image) => {
      const { caption, name, fileName } = image;
      if (name) return altFrom(name);
      if (caption) return caption;
      return altFrom(fileName);
    },
  },
};
