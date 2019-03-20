const { createAltFor, createSrcFor } = require('@base-cms/image');

module.exports = {
  /**
   *
   */
  AssetImage: {
    src: (image, _, { imageHost }) => createSrcFor(imageHost, image),
    alt: image => createAltFor(image),
  },
};
