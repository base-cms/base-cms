const gql = require('graphql-tag');

const query = gql`
query {
  magazinePublications {
    edges {
      node {
        id
        name
      }
    }
  }
}
`;

module.exports = ({ apollo }) => apollo.query({ query });
