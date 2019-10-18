const gql = require('graphql-tag');

module.exports = gql`

fragment WithDynamicPageFragment on ContentPage {
  id
  alias
  redirectTo
  siteContext {
    path
  }
}

`;
