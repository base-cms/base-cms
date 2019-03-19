const AbstractFactory = require('./abstract-factory');
const OEmbedTag = require('../tags/oembed');

class OEmbedFactory extends AbstractFactory {
  // eslint-disable-next-line class-methods-use-this
  createFromAttributes(attrs) {
    return AbstractFactory.createCommonInstance(attrs, OEmbedTag);
  }
}

module.exports = OEmbedFactory;
