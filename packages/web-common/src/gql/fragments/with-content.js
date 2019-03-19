const gql = require('graphql-tag');

module.exports = gql`

fragment WithContentFragment on Content {
  id
  type
  redirectTo
  canonicalPath
  metadata {
    title
    description
    image {
      id
      src
    }
  }
}

`;
