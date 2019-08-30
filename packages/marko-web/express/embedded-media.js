const { isFunction: isFn } = require('@base-cms/utils');
const { extractEmbeddedTags } = require('@base-cms/embedded-media');
const buildMarkoGlobal = require('../utils/build-marko-global');
const { imageHandler, oembedHandler, invalidHandler } = require('../utils/embedded-media');

module.exports = (app, { image, oembed, invalid } = {}) => {
  const handlers = {
    image: isFn(image) ? image : imageHandler,
    oembed: isFn(oembed) ? oembed : oembedHandler,
    invalid: isFn(invalid) ? invalid : invalidHandler,
  };

  // eslint-disable-next-line no-param-reassign
  app.locals.parseEmbeddedMedia = (body, res) => {
    const $global = buildMarkoGlobal(res);

    const replacements = extractEmbeddedTags(body).map((tag) => {
      const type = ['image', 'oembed'].includes(tag.type) && tag.isValid() ? tag.type : 'invalid';
      const pattern = tag.getRegExp();
      const replacement = handlers[type](tag, $global);
      return { pattern, replacement };
    });

    let parsed = body;
    replacements.forEach(({ pattern, replacement }) => {
      parsed = parsed.replace(pattern, replacement);
    });
    return parsed;
  };
};
