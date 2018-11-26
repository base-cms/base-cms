const objectPath = require('object-path');
const cursor = require('./cursor');

const createCursorFor = (node, sort) => cursor.encode(sort.value.reduce((obj, [field]) => ({
  ...obj,
  [field]: objectPath.get(node, field),
}), {}));

module.exports = {
  /**
   *
   * @param {Collection} collection
   * @param {array} results
   * @param {object} params
   * @param {object} [params.query]
   */
  createResponse(collection, results, {
    query,
    limit,
    sort,
  } = {}) {
    const hasNextPage = results.length > limit.value;
    // Remove the extra model that was queried to peek for the page.
    if (hasNextPage) results.pop();

    const pageInfo = {
      hasNextPage,
      endCursor: hasNextPage ? createCursorFor(results[results.length - 1], sort) : null,
    };
    return {
      edges: results.map(node => ({ node, cursor: createCursorFor(node, sort) })),
      pageInfo,
      totalCount: () => collection.countDocuments(query),
    };
  },

  /**
   *
   * @param {object} params
   * @param {string} [params.after] The cursor value to start the next page.
   */
  createQuery({
    after,
  } = {}) {
    if (!after) return {};
    return {};
  },
};
