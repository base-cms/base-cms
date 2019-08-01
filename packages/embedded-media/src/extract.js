const getTagMatches = require('./utils/get-tag-matches');
const Tag = require('./tag');

/**
 * @param {string} html The HTML/text to extraxt embedded items from.
 * @returns {Tag[]} An array of Tag instances.
 */
module.exports = (html) => {
  if (!html) return [];
  return getTagMatches(html).map(match => new Tag(match));
};
