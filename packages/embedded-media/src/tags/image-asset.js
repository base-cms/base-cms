const { createAltFor, createSrcFor } = require('@base-cms/image');
const AbstractTag = require('./abstract-tag');

class ImageAssetTag extends AbstractTag {
  async buildHtmlTagContents({ imageHost, basedb }) {
    const image = await basedb.findById('platform.Asset', this.identifier, {
      projection: {
        credit: 1,
        caption: 1,
        name: 1,
        fileName: 1,
        filePath: 1,
      },
    });
    // @todo Should this log somewhere?
    if (!image) return '';

    const size = (this.getAttribute('data-embed-size') || '640').replace('w', '');
    const alt = createAltFor(image);
    const options = {
      w: size,
      h: size,
      auto: 'format',
    };
    const src = createSrcFor(imageHost, image, options);
    const caption = image.caption ? `<span class="caption">${image.caption}</span>` : '';
    const credit = image.credit ? `<span class="credit">${image.credit}</span>` : '';
    return `<img src="${src}" alt="${alt}">${caption}${credit}`;
  }
}

module.exports = ImageAssetTag;
