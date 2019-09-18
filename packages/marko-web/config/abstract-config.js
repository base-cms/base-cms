const {
  get,
  getAsArray,
  getAsObject,
} = require('@base-cms/object-path');

class AbstractConfig {
  /**
   *
   * @param {object} config
   */
  constructor(config) {
    this.config = config;
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

module.exports = AbstractConfig;
