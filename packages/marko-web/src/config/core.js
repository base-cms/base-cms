const AbstractConfig = require('./abstract-config');

class CoreConfig extends AbstractConfig {
  locale() {
    return this.get('locale', 'en_US');
  }

  lazyloadImages() {
    return this.get('images.lazyload', true);
  }

  siteName() {
    return this.get('siteName', '');
  }
}

module.exports = CoreConfig;
