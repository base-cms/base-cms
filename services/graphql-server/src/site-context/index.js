const { get, getAsArray, getAsObject } = require('@base-cms/object-path');
const { isObject } = require('@base-cms/utils');
const defaults = require('../graphql/defaults');

class SiteContext {
  /**
   *
   * @param {object} site
   */
  constructor(site) {
    if (isObject(site)) {
      this.site = {
        imageHost: defaults.imageHost,
        assetHost: defaults.assetHost,
        ...site,
        language: { ...defaults.language, ...site.language },
        date: { ...defaults.date, ...site.date },
      };
      this.site.origin = `https://${site.host}`;
    }
  }

  /**
   * Whether a site object has been set.
   */
  exists() {
    return Boolean(this.get('id'));
  }

  /**
   *
   * @param {string} path
   * @param {*} def
   */
  get(path, def) {
    return get(this.site, path, def);
  }

  /**
   *
   * @param {string} path
   */
  getAsArray(path) {
    return getAsArray(this.site, path);
  }

  /**
   *
   * @param {string} path
   */
  getAsObject(path) {
    return getAsObject(this.site, path);
  }
}

module.exports = SiteContext;
