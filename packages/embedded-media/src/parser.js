const escapeRegex = require('escape-string-regexp');
const factoryManager = require('./factories/manager');
const {
  DB_TAG_END,
  DB_TAG_START,
  TAG_TYPE_ATTR_NAME,
} = require('./constants');

module.exports = {
  /**
   * Converts database tags to HTML tags within a block of text.
   *
   * @param {string} text
   * @param {object} options
   * @param {boolean} options.parse
   */
  async convertFromDbToHtml(text, { parse, imageHost, basedb } = {}) {
    if (!parse) return text;
    if (!text) return text;

    const pattern = this.getTagPatternDb();
    const matches = [];
    let match;
    do {
      match = pattern.exec(text);
      if (match && match[0]) matches.push(match[0]);
    } while (match);

    if (!matches.length) return text;
    const replacements = await Promise.all(matches.map(async (str) => {
      const fn = this.getCallback('database', 'html', { imageHost, basedb });
      const replacement = await fn(str);
      return { substr: str, replacement };
    }));
    return replacements
      .reduce((str, { substr, replacement }) => str.replace(substr, replacement), text);
  },

  /**
   * Gets the regex match pattern for finding database string tags.
   */
  getTagPatternDb() {
    const start = escapeRegex(DB_TAG_START);
    const end = escapeRegex(DB_TAG_END);
    const type = escapeRegex(TAG_TYPE_ATTR_NAME);
    return new RegExp(`${start}(?=\\s${type}=).+?(?<=\\s)${end}`, 'gi');
  },

  /**
   * Gets the string.replace callback for converting tags.
   *
   * @param {string} fromType
   * @param {string} toType
   */
  getCallback(fromType, toType, options) {
    return async (match) => {
      const instance = factoryManager.createTagInstance(fromType, match);
      switch (toType) {
        case 'database':
          return '';
        case 'html':
          return instance.buildHtmlTag(options);
        default:
          return '';
      }
    };
  },
};
