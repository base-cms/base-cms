const { createAltFor, createSrcFor } = require('@base-cms/image');
const { CDN_IMAGE_HOSTNAME } = require('../../../env');

module.exports = {
  /**
   *
   */
  AssetImage: {
    src: image => createSrcFor(CDN_IMAGE_HOSTNAME, image, undefined, { w: 320, auto: 'format' }),
    alt: image => createAltFor(image),
  },
};
