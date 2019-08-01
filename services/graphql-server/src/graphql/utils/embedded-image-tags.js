const { extractEmbeddedTags } = require('@base-cms/embedded-media');
const { createAltFor, createSrcFor, createCaptionFor } = require('@base-cms/image');

module.exports = async (body, { imageHost, basedb }) => {
  if (!body) return [];
  const imageTags = extractEmbeddedTags(body).filter(tag => tag.type === 'image');
  return Promise.all(imageTags.map(async (tag) => {
    const image = await basedb.findById('platform.Asset', tag.id, {
      projection: {
        credit: 1,
        caption: 1,
        name: 1,
        fileName: 1,
        filePath: 1,
      },
    });
    if (!image) {
      tag.setValid(false);
      return tag;
    }
    const size = tag.get('size', '640').replace('w', '');

    tag.set('alt', createAltFor(image));
    tag.set('src', createSrcFor(imageHost, image, {
      w: size,
      h: size,
      auto: 'format',
    }));
    tag.set('caption', createCaptionFor(image.caption));
    tag.set('credit', image.credit);
    return tag;
  }));
};
