const { createAltFor, createSrcFor, createCaptionFor } = require('@base-cms/image');

module.exports = {
  /**
   *
   */
  AssetImage: {
    src: (image, { input = {} }, { site }) => createSrcFor(site.imageHost, image, input.options, { w: 320, auto: 'format' }),
    alt: image => createAltFor(image),
    caption: image => createCaptionFor(image.caption),
  },
};
