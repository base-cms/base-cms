const { extname } = require('path');
const { extractEmbeddedTags } = require('@base-cms/embedded-media');

module.exports = async (body, { imageHost, basedb }) => {
  if (!body) return [];
  const documentTags = extractEmbeddedTags(body).filter(tag => tag.type === 'document');
  return Promise.all(documentTags.map(async (tag) => {
    const document = await basedb.findById('platform.Asset', tag.id, {
      projection: {
        name: 1,
        fileName: 1,
        filePath: 1,
      },
    });
    if (!document) {
      tag.setValid(false);
      return tag;
    }
    const { fileName, filePath } = document;
    if (!fileName || !filePath) {
      tag.setValid(false);
      return tag;
    }
    tag.set('href', `https://${imageHost}/${filePath}/${fileName}`);

    const extension = extname(fileName);
    tag.set('extension', extension);
    if (extension === '.csv') tag.set('element', 'table');
    return tag;
  }));
};
