const buildImgixQuery = require('./build-imgix-query');

module.exports = (host, image, options, defaultOptions) => {
  const { filePath, fileName } = image;
  return `https://${host}/${filePath}/${fileName}?${buildImgixQuery(options, defaultOptions)}`;
};
