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
  const sites = getAsArray(data, 'websiteSites.edges').map(({ node }) => node);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sites>
    ${sites.reduce((str, site) => `${str}\n<site id="${site.id}">
      <name>${site.name}</name>
      <host>${site.host}</host>
      <status>${site.status}</status>
    </site>`, '')}
  </sites>
  `;
};
