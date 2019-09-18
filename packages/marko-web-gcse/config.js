class GCSEConfiguration {
  /**
   *
   * @param {string} apiKey
   */
  constructor(apiKey) {
    if (!apiKey) throw new Error('Unable to configure GCSE: no API key was provided.');
    this.apiKey = apiKey;
  }

  getApiKey() {
    return this.apiKey;
  }
}

module.exports = GCSEConfiguration;
