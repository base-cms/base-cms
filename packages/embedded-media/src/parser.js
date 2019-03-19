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
  convertFromDbToHtml(text, { parse } = {}) {
    if (!parse) return text;
    if (!text) return text;
    return String(text).replace(this.getTagPatternDb(), this.getCallback('database', 'html'));
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
  getCallback(fromType, toType) {
    return (match) => {
      const instance = factoryManager.createTagInstance(fromType, match);
      switch (toType) {
        case 'database':
          return '';
        case 'html':
          return instance.buildHtmlTag();
        default:
          return '';
      }
    };
  },
};
