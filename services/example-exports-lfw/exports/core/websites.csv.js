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

const escapeRow = arr => `"${arr.map(v => `${v}`.replace('"', '\\"')).join('", "')}"`;

module.exports = async ({ apollo }) => {
  const { data } = await apollo.query({ query });
  const nodes = getAsArray(data, 'websiteSites.edges').map(({ node }) => node);
  const headers = ['ID', 'Name', 'Host', 'Status'];
  const rows = nodes.map(site => ([site.id, site.name, site.host, site.status]));
  return `${escapeRow(headers)}${rows.reduce((str, row) => `${str}\n${escapeRow(row)}`, '')}`;
};
