const {
  get,
  getAsArray,
  getAsObject,
} = require('@base-cms/object-path');

class CoreConfig {
  constructor(config = {}) {
    this.config = config;
  }

  locale() {
    return this.get('locale', 'en_US');
  }

  lazyloadImages() {
    return this.get('images.lazyload', true);
  }

  siteName() {
    return this.get('siteName', '');
  }

  /**
   *
   * @param {string} path
   * @param {*} def
   */
  get(path, def) {
    return get(this.config, path, def);
  }

  /**
   *
   * @param {string} path
   */
  getAsArray(path) {
    return getAsArray(this.config, path);
  }

  /**
   *
   * @param {string} path
   */
  getAsObject(path) {
    return getAsObject(this.config, path);
  }
}

module.exports = CoreConfig;
