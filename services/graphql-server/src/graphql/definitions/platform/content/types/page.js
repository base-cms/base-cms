const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentPage(input: ContentPageQueryInput!): ContentPage
    @findOne(
      model: "platform.Content",
      using: { alias: "mutations.Website.alias" },
      criteria: "contentPage",
      withSite: true,
      siteField: "mutations.Website.primarySite"
    )
}

type ContentPage implements Content @applyInterfaceFields {
  id: Int! @projection @value(localField: "_id")
}

type ContentPageConnection {
  totalCount: Int!
  edges: [ContentPageEdge]!
  pageInfo: PageInfo!
}

type ContentPageEdge {
  node: ContentPage!
  cursor: String!
}

input ContentPageQueryInput {
  alias: String!
}

input ContentPageSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
