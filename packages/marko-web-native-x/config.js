const { asArray } = require('@base-cms/utils');
const { set, get, getAsObject } = require('@base-cms/object-path');

class NativeXConfiguration {
  /**
   *
   * @param {string} uri
   * @param {object} params
   * @param {boolean} [params.enabled=true]
   * @param {string} [params.defaultAlias=default]
   */
  constructor(uri, { enabled = true, defaultAlias = 'default' } = {}) {
    if (!uri) throw new Error('Unable to configure NativeX: no URI was provided.');
    this.uri = uri;
    this.enabled = enabled;
    this.defaultAlias = defaultAlias;

    this.placements = {};
  }

  /**
   *
   * @param {object} params
   * @param {string} params.alias The placement alias, e.g. `default` or `some-section-name`.
   * @param {string} params.name The placement name, e.g. `primary` or `list1`, etc.
   * @param {string} params.id The placement id, e.g. `5d4b04769f69b200013ab109`.
   */
  setPlacement({ alias, name, id } = {}) {
    if (!name || !alias || !id) throw new Error('Unable to create NativeX placement: the name, alias, and ID are required');
    const placement = { id };
    set(this.placements, `${alias}.${name}`, placement);
    return this;
  }

  /**
   *
   * @param {object} params
   * @param {string} params.name  The placement name, e.g. `primary` or `list1`, etc.
   * @param {string[]} params.aliases The placement aliases to traverse when loading the placement.
   */
  getPlacement({ name, aliases } = {}) {
    // Retrieve the default and "alias-traversed" placements.
    const defaultPlacement = getAsObject(this.placements, `${this.defaultAlias}.${name}`);
    const foundPlacement = asArray(aliases).map(alias => get(this.placements, `${alias}.${name}`)).filter(v => v)[0];

    // Ensure placement is duplicated so property re-assignment doesn't "stick."
    return {
      ...getAsObject(foundPlacement || defaultPlacement),
      enabled: this.enabled,
      uri: this.uri,
    };
  }

  /**
   *
   * @param {string} alias
   * @param {object[]} definitions
   */
  setAliasPlacements(alias, definitions) {
    asArray(definitions).forEach((definition) => {
      this.setPlacement({ ...definition, alias });
    });
    return this;
  }

  getUri() {
    return this.uri;
  }

  isEnabled() {
    return this.enabled;
  }
}

module.exports = NativeXConfiguration;
