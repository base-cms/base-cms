const { createAltFor, createSrcFor } = require('@base-cms/image');
const cheerio = require('cheerio');
const AbstractTag = require('./abstract-tag');

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
    const $ = cheerio.load('<img>');

    $('img').attr('alt', alt);
    if (lazyload) {
      $('img').addClass('lazyload');
      $('img').attr('data-src', src);
    } else {
      $('img').attr('src', src);
    }
    if (image.caption) $.root().append(`<span class="caption">${image.caption}</span>`);
    if (image.credit) $.root().append(`<span class="credit">${image.credit}</span>`);

    return $.html();
  }
}

module.exports = ImageAssetTag;
