const gql = require('graphql-tag');

module.exports = gql`

# @todo Need to add auth to this someday
type Mutation {
  generateSitemaps(input: GenerateSitemapInput!): Boolean!
}

enum SitemapType {
  all
  index
  sections
  content
}

input GenerateSitemapInput {
  type: SitemapType!
  baseUri: String!
}
`;
