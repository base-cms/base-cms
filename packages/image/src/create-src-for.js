const buildImgixUrl = require('./build-imgix-url');

module.exports = (host, image, options, defaultOptions) => {
  const { filePath, fileName } = image;
  const src = `https://${host}/${filePath}/${fileName}`;
  return buildImgixUrl(src, options, defaultOptions);
};
