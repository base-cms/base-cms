const { asArray } = require('@base-cms/utils');
const { set, getAsObject, get } = require('@base-cms/object-path');

const { isArray } = Array;

class GAMConfiguration {
  /**
   *
   * @param {string} accountId
   * @param {object} params
   * @param {string} [params.basePath]
   * @param {string} [params.defaultAlias=default]
   */
  constructor(accountId, { basePath, defaultAlias = 'default' } = {}) {
    if (!accountId) throw new Error('Unable to configure GAM: no account ID was provided.');
    this.accountId = accountId;
    this.basePath = basePath;
    this.defaultAlias = defaultAlias;

    this.templates = {};
    this.adUnits = {};
  }

  /**
   *
   * @param {object} params
   * @param {string} params.name The ad unit name, e.g. `lb1` or `rail`, etc.
   * @param {string} params.alias The ad unit alias, e.g. `default` or `some-section-name`.
   * @param {string} params.path The GAM ad unit path,
   *                             e.g. `default/lb1` or `some-section-name/rail`.
   * @param {string} [params.templateName] Ad template options to spread to the adunit.
   * @param {object} [params.options] Additional options to spread to the adunit.
   */
  setAdUnit({
    name,
    alias,
    path,
    templateName,
    options,
  } = {}) {
    if (!name || !alias || !path) throw new Error('Unable to create GAM ad unit: the name, alias, and path are required');
    const template = templateName ? this.templates[templateName] : {};
    const adUnit = { ...template, ...options, path: this.createAdUnitPath(path) };
    set(this.adUnits, `${alias}.${name}`, adUnit);
    return this;
  }

  setAliasAdUnits(alias, definitions) {
    asArray(definitions).forEach((definition) => {
      this.setAdUnit({ ...definition, alias });
    });
    return this;
  }

  getAdUnit({
    name,
    aliases,
    size,
    sizeMapping,
  } = {}) {
    // Retrieve the default and "alias-traversed" adunits.
    const defaultAdUnit = getAsObject(this.adUnits, `${this.defaultAlias}.${name}`);
    const foundAdUnit = asArray(aliases).map(alias => get(this.adUnits, `${alias}.${name}`)).filter(v => v)[0];

    // Ensure ad unit is duplicated so property re-assignment doesn't "stick."
    // This allows sizes and size mappings to be changed on request.
    const adunit = { ...getAsObject(foundAdUnit || defaultAdUnit) };
    if (isArray(size)) adunit.size = size;
    if (isArray(sizeMapping)) adunit.sizeMapping = sizeMapping;

    return adunit;
  }

  setTemplate(name, { size, sizeMapping } = {}) {
    if (!name) throw new Error('Unable to create GAM template: no template name was provided');
    this.templates[name] = { size, sizeMapping };
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
