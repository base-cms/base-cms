const gql = require('graphql-tag');

module.exports = gql`

fragment BlockContentFragment on Content {
  id
  type
}

`;
