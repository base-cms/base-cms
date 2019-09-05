const buildImgixUrl = require('./build-imgix-url');

module.exports = (host, image, options, defaultOptions) => {
  const {
    filePath,
    fileName,
    cropDimensions,
  } = image;
  const path = cropDimensions && cropDimensions.aspectRatio ? `${filePath}/${cropDimensions.aspectRatio}` : filePath;
  const src = `https://${host}/${path}/${fileName}`;
  return buildImgixUrl(src, options, defaultOptions);
};
