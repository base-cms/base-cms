const { asArray } = require('@base-cms/utils');
const { set, getAsObject } = require('@base-cms/object-path');

class GAMConfiguration {
  /**
   *
   * @param {string} accountId
   * @param {object} params
   * @param {string} [params.basePath]
   */
  constructor(accountId, { basePath } = {}) {
    if (!accountId) throw new Error('Unable to configure GAM: no account ID was provided.');
    this.accountId = accountId;
    this.basePath = basePath;
    this.adUnits = {};
  }

  /**
   *
   * @param {object} params
   * @param {string} params.name  The ad unit name, e.g. `primary` or `header`, etc.
   * @param {string} params.alias The ad unit deployment alias, e.g. `some-deployment-alias`.
   * @param {object} params.targeting Targeting key/values to apply.
   */
  getAdUnit({ name, alias, targeting } = {}) {
    const foundAdUnit = getAsObject(this.adUnits, `${alias}.${name}`);
    // Ensure ad unit is duplicated so property re-assignment doesn't "stick."
    return {
      ...foundAdUnit,
      targeting,
    };
  }

  /**
   *
   * @param {object} params
   * @param {string} params.alias The ad unit deployment alias, e.g. `some-deployment-alias`.
   * @param {string} params.name The ad unit name, e.g. `primary` or `header`, etc.
   * @param {string} params.path The ad unit path, e.g. `foo/bar`.
   * @param {number} params.width The ad unit width.
   * @param {number} params.height The ad unit height.
   */
  setAdUnit({
    alias,
    name,
    path,
    width,
    height,
  } = {}) {
    if (!name || !alias || !path) throw new Error('Unable to create GAM ad unit: the name, alias, and path are required');
    if (!width || !height) throw new Error('Unable to create GAM ad unit: the height and width are required');
    const adUnit = {
      path: this.createAdUnitPath(path),
      width,
      height,
      name,
      alias,
    };
    set(this.adUnits, `${alias}.${name}`, adUnit);
    return this;
  }

  /**
   *
   * @param {string} alias
   * @param {object[]} definitions
   */
  setAdUnits(alias, definitions) {
    asArray(definitions).forEach((definition) => {
      this.setAdUnit({ ...definition, alias });
    });
    return this;
  }

  createAdUnitPath(path) {
    const parts = [this.accountId];
    if (this.basePath) parts.push(this.basePath);
    parts.push(path);
    return `/${parts.map(GAMConfiguration.cleanPath).join('/')}`;
  }

  static cleanPath(value) {
    return (value || '').replace(/^\/+/, '').replace(/\/+$/, '');
  }
}

module.exports = GAMConfiguration;
