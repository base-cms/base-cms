const gql = require('graphql-tag');

module.exports = gql`

fragment WithDynamicPageFragment on ContentPage {
  id
  name
  type
  teaser
  alias
  body
  metadata {
    title
    description
  }
}

`;
