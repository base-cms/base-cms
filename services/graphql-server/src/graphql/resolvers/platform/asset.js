const { createAltFor, createSrcFor } = require('@base-cms/image');
const { CDN_IMAGE_HOSTNAME } = require('../../../env');

module.exports = {
  /**
   *
   */
  AssetImage: {
    src: image => createSrcFor(CDN_IMAGE_HOSTNAME, image),
    alt: image => createAltFor(image),
  },
};
