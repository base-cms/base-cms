/**
 *
 * @param {string[]} phrases
 */
module.exports = (phrases) => {
  const should = phrases.map(phrase => ({
    multi_match: {
      query: phrase,
      fields: ['taxonomy^1.8', 'name^1.5', 'teaser^1.2', 'body'],
      type: 'phrase',
      tie_breaker: 0.5,
      _name: phrase,
    },
  }));
  return { bool: { should } };
};
