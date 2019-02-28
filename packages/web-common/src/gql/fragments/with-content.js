const gql = require('graphql-tag');

module.exports = gql`

fragment WithContentFragment on Content {
  id
  name
  type
  teaser
  body
  published
  redirectTo
  canonicalPath
  metadata {
    title
    description
  }
  primarySection {
    id
    name
    alias
  }
}

`;
