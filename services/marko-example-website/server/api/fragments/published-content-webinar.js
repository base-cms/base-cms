const gql = require('graphql-tag');

module.exports = gql`

fragment PublishedContentWebinarQueryFragment on ContentWebinar {
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
  startDate
}

`;
