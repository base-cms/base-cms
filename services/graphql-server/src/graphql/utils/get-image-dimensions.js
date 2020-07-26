const fetch = require('node-fetch');

/**
 * Retrieves width/height information from Imgix and sets to
 * the Asset/Image model. Will only do this when the width or height
 * are missing from the model.
 */
module.exports = async ({
  image,
  host,
  basedb,
}) => {
  const { source, filePath, fileName } = image;
  if (source && source.width && source.height) {
    return { width: source.width, height: source.height };
  }

  const url = `https://${host}/${filePath}/${fileName}?fm=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  const { PixelWidth: width, PixelHeight: height } = await res.json();
  const $set = { 'source.width': width, 'source.height': height };
  await basedb.updateOne('platform.Asset', { _id: image._id }, { $set });
  return { width, height };
};
