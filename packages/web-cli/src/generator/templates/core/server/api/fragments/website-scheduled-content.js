const gql = require('graphql-tag');

module.exports = gql`

fragment StandardWebsiteScheduleQueryFragment on Content {
  shortName
  teaser
  canonicalPath
  primarySection {
    id
    name
    canonicalPath
  }
  primaryImage {
    id
    src
  }
}

`;
