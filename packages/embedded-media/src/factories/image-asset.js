const AbstractFactory = require('./abstract-factory');
const ImageAssetTag = require('../tags/image-asset');

class ImageAssetFactory extends AbstractFactory {
  // eslint-disable-next-line class-methods-use-this
  createFromAttributes(attrs) {
    return AbstractFactory.createCommonInstance(attrs, ImageAssetTag);
  }
}

module.exports = ImageAssetFactory;
