const gql = require('graphql-tag');
const { getAsArray } = require('@base-cms/object-path');

const query = gql`
query AllSites {
  websiteSites {
    edges {
      node {
        id
        name
        host
        status
      }
    }
  }
}
`;

module.exports = async ({ apollo }) => {
  const { data } = await apollo.query({ query });
  const nodes = getAsArray(data, 'websiteSites.edges').map(({ node }) => node);
  return [
    ['ID', 'Name', 'Host', 'Status'],
    ...nodes.map(c => ([c.id, c.name, c.host, c.status])),
  ];
};
