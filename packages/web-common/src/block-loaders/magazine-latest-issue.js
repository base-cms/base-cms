const buildQuery = require('../gql/query-factories/block-magazine-latest-issue');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineLatestIssue` query.
 */
module.exports = async (apolloClient, { publicationId, queryFragment, queryName } = {}) => {
  const query = buildQuery({ queryFragment, queryName });
  const variables = { input: { publicationId } };
  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.magazineLatestIssue) return { node: null };
  const { magazineLatestIssue: node } = data;
  return { node };
};
