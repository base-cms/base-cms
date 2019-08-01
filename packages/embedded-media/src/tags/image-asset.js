const { createAltFor, createSrcFor, createCaptionFor } = require('@base-cms/image');
const AbstractTag = require('./abstract-tag');

/**
 * @deprecated
 */
class ImageAssetTag extends AbstractTag {
  async buildHtmlTagContents({ imageHost, basedb, lazyload }) {
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

    const attrs = {
      class: lazyload ? 'lazyload' : null,
      src: lazyload ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : src,
      'data-src': lazyload ? src : null,
      alt,
    };
    const stringifiedAttrs = Object.keys(attrs).reduce((arr, key) => {
      const value = attrs[key];
      if (value) arr.push(`${key}="${value}"`);
      return arr;
    }, []).join(' ');

    const caption = createCaptionFor(image.caption);

    const captionElement = caption ? `<span class="caption">${caption}</span>` : '';
    const creditElement = image.credit ? `<span class="credit">${image.credit}</span>` : '';
    return `<img ${stringifiedAttrs}>${captionElement}${creditElement}`;
  }
}

module.exports = ImageAssetTag;
