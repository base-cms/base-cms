const brevityCollectionIssues = require('./brevity-collection-issues');
const websiteSiteSections = require('./website-site-sections');

/**
 * Each function will receive the following args:
 *
 * The object that contains the result returned from the resolver on the parent field
 * The current operation values object - includes query and sort.
 * The GraphQL variables object.
 * The GraphQL context object.
 * The GraphQL info object.
 *
 * Functions can be async, as they are awaited by the directives.
 * Each function must return an object containing the new query and sort.
 */
const builders = {
  brevityCollectionIssues,
  websiteSiteSections,
};

module.exports = async (key, {
  doc = {},
  currentValues = {},
  variables = {},
  ctx,
  info,
} = {}) => {
  if (!key) return currentValues;
  const fn = builders[key];
  if (fn) {
    const { query, sort } = await fn(doc, currentValues, variables, ctx, info);
    return {
      query: query || currentValues.query,
      sort: sort || currentValues.sort,
    };
  }
  throw new Error(`No ref query builder function was found for '${key}'`);
};
