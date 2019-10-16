const objectPath = require('object-path');
const cursor = require('./cursor');

module.exports = {
  /**
   *
   * @param {object} basedb
   * @param {string} modelName
   * @param {array} results
   * @param {object} params
   * @param {object} [params.query]
   */
  createResponse(basedb, modelName, results, {
    query,
    limit,
  } = {}, additionalData = {}) {
    const hasNextPage = results.length > limit.value;
    // Remove the extra model that was queried to peek for the page.
    if (hasNextPage && limit.value !== 0) results.pop();

    // Cursor generation is actually pretty slow... 5 - 20ms on large datasets.
    // As such, only return the values if requested (by making the property a function).
    const pageInfo = {
      hasNextPage,
      endCursor: () => (hasNextPage ? cursor.encode(results[results.length - 1]._id) : null),
    };
    return {
      ...additionalData,
      edges: () => results.map(node => ({ node, cursor: () => cursor.encode(node._id) })),
      pageInfo,
      totalCount: () => basedb.count(modelName, query),
    };
  },

  /**
   *
   */
  createEmptyResponse(additionalData = {}) {
    const pageInfo = {
      hasNextPage: false,
      endCursor: null,
    };
    return {
      ...additionalData,
      edges: [],
      pageInfo,
      totalCount: () => 0,
    };
  },

  /**
   *
   * @param {object} params
   * @param {string} [params.after] The cursor value to start the next page.
   */
  async createQuery(basedb, modelName, {
    after,
    sort,
    ignoreCompoundAfterSort,
  } = {}) {
    if (!after) return {};
    const id = cursor.decode(after);
    const { field, order } = sort;
    const op = order === 1 ? '$gt' : '$lt';

    if (field === '_id' || ignoreCompoundAfterSort) {
      // Simple sort by id (or compound sorting was ignored)
      return { _id: { [op]: id } };
    }

    // Compound sort.
    // Need to get the document so we can extract the field.
    // If the field contains an array position using dot notation, must use slice.
    // @see https://jira.mongodb.org/browse/SERVER-1831
    const pattern = /(^.+)(\.)(\d)/;
    const matches = pattern.exec(field);
    const projection = {};
    if (matches && matches[1] && matches[3]) {
      projection._id = 1;
      projection[matches[1]] = { $slice: [Number(matches[3]), 1] };
    } else {
      projection[field] = 1;
    }

    const doc = await basedb.findById(modelName, id, { projection });
    const value = objectPath.get(doc, field);
    const $or = [
      { [field]: { [op]: value } },
      { [field]: { $eq: value }, _id: { [op]: id } },
    ];
    return { $or };
  },
};
