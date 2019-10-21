const buildQuery = require('../gql/query-factories/block-website-sections');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} [params.status] The section status to query.
 * @param {number[]} [params.taxonomyIds] The section 'relatedTaxonomy.$id' values to query.
 * @param {object} sort The sort clause to apply ({ sortField, sortValue })
 * @param {string} [params.queryName] An optional name to append to the query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `websiteSections` query.
 */
module.exports = async (apolloClient, {
  status,
  taxonomyIds,
  queryName,
  queryFragment,
  sort,
} = {}) => {
  const query = buildQuery({ queryFragment, queryName });
  const input = { status, sort, taxonomyIds };
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.websiteSections) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.websiteSections;
  const nodes = data.websiteSections.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
