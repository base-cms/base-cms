const gql = require('graphql-tag');

module.exports = gql`

fragment StandardWebsiteScheduleQueryFragment on Content {
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
