import {
  get,
  getAsArray,
  getAsObject,
  isObject,
} from '../utils';

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

export default SiteConfig;
