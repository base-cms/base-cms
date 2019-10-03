const { asArray } = require('@base-cms/utils');
const { set, getAsObject } = require('@base-cms/object-path');

class EmailXConfiguration {
  /**
   *
   * @param {string} uri
   * @param {object} params
   */
  constructor(uri) {
    if (!uri) throw new Error('Unable to configure EmailX: no URI was provided.');
    this.uri = uri;

    this.adUnits = {};
  }

  /**
   *
   * @param {object} params
   * @param {string} params.name  The ad unit name, e.g. `primary` or `header`, etc.
   * @param {string} params.alias The ad unit deployment alias, e.g. `some-deployment-alias`.
   */
  getAdUnit({ name, alias } = {}) {
    const foundAdUnit = getAsObject(this.adUnits, `${alias}.${name}`);

    // Ensure ad unit is duplicated so property re-assignment doesn't "stick."
    return {
      ...foundAdUnit,
      uri: this.uri,
    };
  }

  /**
   *
   * @param {object} params
   * @param {string} params.alias The ad unit deployment alias, e.g. `some-deployment-alias`.
   * @param {string} params.name The ad unit name, e.g. `primary` or `header`, etc.
   * @param {string} params.id The ad unit id, e.g. `5d4b04769f69b200013ab109`.
   * @param {number} params.width The ad unit width.
   * @param {number} params.height The ad unit height.
   */
  setAdUnit({
    alias,
    name,
    id,
    width,
    height,
  } = {}) {
    if (!name || !alias || !id) throw new Error('Unable to create EmailX ad unit: the name, alias, and ID are required');
    if (!width || !height) throw new Error('Unable to create EmailX ad unit: the height and width are required');
    const adUnit = {
      id,
      width,
      height,

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

  getUri() {
    return this.uri;
  }
}

module.exports = EmailXConfiguration;
