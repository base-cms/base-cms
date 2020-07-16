const allContent = require('./all-content');
const magazineActiveIssues = require('./magazine-active-issues');
const magazineLatestIssue = require('./magazine-latest-issue');
const magazineIssues = require('./magazine-issues');
const magazinePublications = require('./magazine-publications');
const publishedContent = require('./published-content');
const taxonomies = require('./taxonomies');
const websiteSections = require('./website-sections');

/**
 * Each function will receive the following args:
 *
 * The current operation values object - includes query and sort.
 * The GraphQL variables object.
 * The GraphQL context object.
 * The GraphQL info object.
 *
 * Functions can be async, as they are awaited by the directives.
 * Each function must return an object containing the new query and sort.
 */
const builders = {
  allContent,
  magazineActiveIssues,
  magazineLatestIssue,
  magazineIssues,
  magazinePublications,
  publishedContent,
  taxonomies,
  websiteSections,
};

module.exports = async (key, {
  currentValues = {},
  variables = {},
  ctx,
  info,
} = {}) => {
  if (!key) return currentValues;
  const fn = builders[key];
  if (fn) {
    const { query, sort } = await fn(currentValues, variables, ctx, info);
    return {
      query: query || currentValues.query,
      sort: sort || currentValues.sort,
    };
  }
  throw new Error(`No query builder function was found for '${key}'`);
};
