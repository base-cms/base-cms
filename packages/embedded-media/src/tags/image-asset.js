const AbstractTag = require('./abstract-tag');

class ImageAssetTag extends AbstractTag {
  // eslint-disable-next-line class-methods-use-this
  getType() {
    return 'image';
  }
}

module.exports = ImageAssetTag;
