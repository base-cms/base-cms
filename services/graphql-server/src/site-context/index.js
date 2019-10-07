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

  id() {
    return this.site && this.site._id ? this.site._id : undefined;
  }

  /**
   * Whether a site object has been set.
   */
  exists() {
    return Boolean(this.id());
  }

  /**
   *
   * @param {string} path
   * @param {*} def
   */
  get(path, def) {
    if (!this.exists()) return def;
    return get(this.site, path, def);
  }

  /**
   *
   * @param {string} path
   */
  getAsArray(path) {
    if (!this.exists()) return [];
    return getAsArray(this.site, path);
  }

  /**
   *
   * @param {string} path
   */
  getAsObject(path) {
    if (!this.exists()) return {};
    return getAsObject(this.site, path);
  }
}

module.exports = SiteContext;
