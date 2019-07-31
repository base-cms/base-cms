const fetch = require('node-fetch');
const querystring = require('querystring');
const { BASE_URL } = require('./constants');

class EmbedlyApiClient {
  /**
   *
   * @param {string} [key] The Embed.ly API key. Will use env var if not set.
   */
  constructor(key) {
    this.key = key || process.env.EMBEDLY_API_KEY;
    if (!this.key) throw new Error('No Embed.ly API key was provided.');
  }

  /**
   *
   * @param {string} url
   * @param {object} params
   * @param {object} fetchOptions
   * @returns {Promise}
   */
  async oembed(url, params, fetchOptions) {
    if (!EmbedlyApiClient.isValidURL(url)) throw new Error(`The URL '${url}' is not a valid oembed URL.`);
    return this.request('oembed', {
      ...params,
      url,
    }, fetchOptions);
  }

  /**
   *
   * @private
   * @param {string} endpoint The API endpoint to query.
   * @param {object} params The query params to apply.
   * @param {object} [fetchOptions] Fetch options to apply.
   * @returns {Promise}
   */
  async request(endpoint, params, fetchOptions) {
    const query = Object.entries({ ...params, key: this.key }).reduce((o, [key, value]) => {
      if (!value) return o;
      return { ...o, [key]: value };
    }, {});
    const uri = `${BASE_URL}/${endpoint}?${querystring.stringify(query)}`;
    const res = await fetch(uri, fetchOptions);
    const data = await res.json();
    if (!res.ok) throw new Error((data || {}).error_message || `${res.statusCode}: ${res.statusText}`);
    return data;
  }

  /**
   *
   * @static
   * @param {string} value The URL value
   * @returns {boolean}
   */
  static isValidURL(value) {
    if (!value) return false;
    return /^http/i.test(`${value}`);
  }
}

module.exports = EmbedlyApiClient;
