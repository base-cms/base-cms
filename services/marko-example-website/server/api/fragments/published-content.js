const gql = require('graphql-tag');

module.exports = gql`

fragment PublishedContentQueryFragment on Content {
  id
  type
  name
  shortName
  teaser
  canonicalPath
  published
  primarySection {
    id
    name
    fullName
    canonicalPath
  }
  primaryImage {
    id
    src
  }
}

`;
