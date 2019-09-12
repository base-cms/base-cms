const gql = require('graphql-tag');

module.exports = gql`

fragment BlockDynamicPageFragment on DynamicPage {
  id
  type
}

`;
