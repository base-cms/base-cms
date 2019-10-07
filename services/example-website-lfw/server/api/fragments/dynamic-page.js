const gql = require('graphql-tag');

module.exports = gql`
fragment DynamicPageFragment on ContentPage {
  id
  name
  body
}
`;
