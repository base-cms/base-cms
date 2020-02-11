const { get, getAsArray, getAsObject } = require('@base-cms/object-path');

class IdentityXConfiguration {
  /**
   *
   * @param {object|string} options When a string, assumes an `appId`, else options object.
   * @param {array} [options.requiredServerFields] Required fields, server enforced.
   * @param {array} [options.requiredClientFields] Required fields, client-side only.
   */
  constructor(options) {
    // BC check for when the constructor only had a single `appId` argument.
    const appId = typeof options === 'string' ? options : get(options, 'appId');
    if (!appId) throw new Error('Unable to configure IdentityX: no Application ID was provided.');
    this.appId = appId;
    this.options = options && typeof options === 'object' ? options : {};
  }

  getAppId() {
    return this.appId;
  }

  getRequiredServerFields() {
    return this.getAsArray('requiredServerFields');
  }

  getRequiredClientFields() {
    return this.getAsArray('requiredClientFields');
  }

  get(path, def) {
    return get(this.options, path, def);
  }

  getAsArray(path) {
    return getAsArray(this.options, path);
  }

  getAsObject(path) {
    return getAsObject(this.options, path);
  }
}

module.exports = IdentityXConfiguration;
