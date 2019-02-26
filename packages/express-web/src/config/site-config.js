const {
  get,
  getAsArray,
  getAsObject,
} = require('@base-cms/object-path');
const { isObject } = require('@base-cms/utils');

class SiteConfig {
  /**
   *
   * @param {object} config
   */
  constructor(config) {
    this.config = isObject(config) ? config : {};
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

module.exports = SiteConfig;
