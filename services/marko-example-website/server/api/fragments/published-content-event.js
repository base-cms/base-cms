const gql = require('graphql-tag');

module.exports = gql`

fragment PublishedContentEventQueryFragment on ContentEvent {
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
  starts
  ends
}

`;
