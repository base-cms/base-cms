const {
  TAG_ID_ATTR_NAME,
} = require('../constants');

class AbstractFactory {
  // eslint-disable-next-line class-methods-use-this
  createFromAttributes() {
    throw new Error('The createFromAttributes() method must be implemented in the extending class.');
  }

  static createCommonInstance(attrs, Klass) {
    const identifier = attrs[TAG_ID_ATTR_NAME];
    const instance = new Klass(identifier);
    return instance;
  }
}

module.exports = AbstractFactory;
