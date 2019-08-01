const pattern = require('./tag-match-pattern');

/**
 * @param {string} html The HTML to extract embedded tags from.
 * @returns {string[]} An array of matched embedded tag strings.
 */
module.exports = (html) => {
  const matches = [];
  let match;
  do {
    match = pattern.exec(html);
    if (match && match[0]) matches.push(match[0]);
  } while (match);
  return matches;
};
