const { getAsArray } = require('@base-cms/object-path');
const gql = require('graphql-tag');

const query = gql`

query MarkoNewslettersList {
  emailNewsletters(input: { sort: { field: name, order: asc }, pagination: { limit: 200 } }) {
    edges {
      node {
        id
        name
        description
        alias
      }
    }
  }
}

`;

module.exports = async (apollo, { templates }) => {
  const { data } = await apollo.query({ query });
  const newsletters = getAsArray(data, 'emailNewsletters.edges').map((edge) => {
    const node = { ...edge.node };
    node.templates = templates.filter(t => t.alias === node.alias).map(t => t.key);
    return node;
  });

  const aliases = newsletters.map(n => n.alias);
  const staticTemplates = templates.filter(t => !aliases.includes(t.alias)).map(t => t.key);
  return { newsletters, staticTemplates };
};
