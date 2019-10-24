const taxonomies = require('./taxonomies');
const websiteSections = require('./website-sections');

/**
 * Each function will receive the following args:
 *
 * The current query.
 * The GraphQL variables object.
 * The GraphQL context object.
 * The GraphQL info object.
 *
 * Functions can be async, as they are awaited by the directives.
 * Each function should return the modified query object.
 */
const builders = {
  taxonomies,
  websiteSections,
};

module.exports = async (key, {
  query,
  variables,
  ctx,
  info,
} = {}) => {
  if (!key) return query;
  const fn = builders[key];
  if (fn) return fn(query, variables, ctx, info);
  return query;
};
