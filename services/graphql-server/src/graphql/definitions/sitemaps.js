const gql = require('graphql-tag');

module.exports = gql`

type Mutation {
  generateSitemaps(input: GenerateSitemapInput!): String!
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
