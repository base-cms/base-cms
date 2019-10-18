const gql = require('graphql-tag');

module.exports = gql`

fragment BlockAllCompanyContentFragment on Content {
  id
  type
  siteContext {
    path
  }
}

`;
