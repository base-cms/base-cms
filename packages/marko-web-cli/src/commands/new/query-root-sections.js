const gql = require('graphql-tag');

module.exports = async (client) => {
  const query = gql`
    query RootWebsiteSections($input: RootWebsiteSectionsQueryInput!) {
      rootWebsiteSections(input: $input) {
        edges {
          node {
            id
            name
            alias
          }
        }
      }
    }
  `;
  const input = { sort: { field: 'name', order: 'asc' } };
  const variables = { input };
  const { data } = await client.query({ query, variables });
  return data.rootWebsiteSections.edges
    .map(({ node }) => ({ name: node.name, value: node.alias }))
    .filter(({ name, alias }) => {
      if (name === 'Home') return false;
      if (alias === 'home') return false;
      return true;
    });
};
