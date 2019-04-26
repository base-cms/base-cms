const { createAltFor, createSrcFor } = require('@base-cms/image');

module.exports = {
  /**
   *
   */
  AssetImage: {
    src: (image, _, { imageHost }) => createSrcFor(imageHost, image, undefined, { w: 320, auto: 'format' }),
    alt: image => createAltFor(image),
  },
};
