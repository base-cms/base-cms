const buildQuery = require('../gql/query-factories/block-magazine-publications');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazinePublications` query.
 */
module.exports = async (apolloClient, { queryFragment } = {}) => {
  const query = buildQuery({ queryFragment });
  const variables = { input: {} };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.magazinePublications) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.magazinePublications;
  const nodes = data.magazinePublications.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
