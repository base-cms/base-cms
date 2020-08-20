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
  const {
    width,
    height,
    filePath,
    fileName,
  } = image;
  if (width && height) return { width, height };
  const url = `https://${host}/${filePath}/${fileName}?fm=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  const { PixelWidth, PixelHeight } = await res.json();
  const $set = { width: PixelWidth, height: PixelHeight };
  await basedb.updateOne('platform.Asset', { _id: image._id }, { $set });
  return { width: PixelWidth, height: PixelHeight };
};
