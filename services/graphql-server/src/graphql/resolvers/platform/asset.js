const { createAltFor, createSrcFor, createCaptionFor } = require('@base-cms/image');
const defaults = require('../../defaults');

module.exports = {
  /**
   *
   */
  AssetImage: {
    src: (image, { input = {} }, { site }) => {
      // Use site image host otherwise fallback to global default.
      const imageHost = site.get('imageHost', defaults.imageHost);
      return createSrcFor(imageHost, image, input.options, { w: 320, auto: 'format' });
    },
    alt: image => createAltFor(image),
    caption: image => createCaptionFor(image.caption),
  },
};
