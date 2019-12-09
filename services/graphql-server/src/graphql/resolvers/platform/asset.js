const { createAltFor, createSrcFor, createCaptionFor } = require('@base-cms/image');
const { Base4RestPayload } = require('@base-cms/base4-rest-api');
const validateRest = require('../../utils/validate-rest');
const getProjection = require('../../utils/get-projection');
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

  /**
   *
   */
  Mutation: {
    updateAssetImage: async (_, { input }, { base4rest, basedb }, info) => {
      validateRest(base4rest);
      const type = 'platform/asset/image';
      const { id, ...payload } = input;
      const keys = Object.keys(payload);
      const body = new Base4RestPayload({ type });
      keys.forEach(k => body.set(k, payload[k]));
      body.set('id', id);
      await base4rest.updateOne({ model: type, id, body });
      const { fieldNodes, schema, fragments } = info;
      const projection = getProjection(schema, schema.getType('AssetImage'), fieldNodes[0].selectionSet, fragments);
      return basedb.findOne('platform.Asset', { _id: id }, { projection });
    },
  },
};
