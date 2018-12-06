const { isObject } = require('@base-cms/common');
const { createResponse, createQuery } = require('./utils');
const Limit = require('./limit');
const Sort = require('./sort');

/**
 * @param {object} basedb
 * @param {string} modelName
 * @param {object} params
 * @param {object} [params.query]
 * @param {number} [params.limit=10]
 * @param {object} params.sort
 * @param {string} [params.sort.field=_id]
 * @param {number|string} [params.sort.order=1]
 * @param {object} [params.sort.options]
 */
module.exports = async (basedb, modelName, {
  query,
  limit = 10,
  after,
  sort = { field: '_id', order: 1 },
  projection,
  collate = false,
}) => {
  const $limit = new Limit({ value: limit });
  const $sort = new Sort(sort);
  const $projection = isObject(projection) ? {
    ...projection,
    _id: 1,
    [$sort.field]: 1,
  } : undefined;

  const params = {
    query,
    sort: $sort,
    limit: $limit,
    after,
  };

  const paginatedQuery = await createQuery(basedb, modelName, params);
  const $query = { $and: [paginatedQuery, query] };

  const options = {
    sort: $sort.value,
    limit: $limit.value + 1, // peek to see if there is another page.
    projection: $projection,
  };
  if (collate) options.collation = $sort.collation;

  const results = await basedb.find(modelName, $query, options);

  return createResponse(basedb, modelName, results, params);
};
