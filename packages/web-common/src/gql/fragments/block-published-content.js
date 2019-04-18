const gql = require('graphql-tag');

module.exports = gql`

fragment BlockPublishedContentFragment on Content {
  id
  type
  canonicalPath
}

`;
