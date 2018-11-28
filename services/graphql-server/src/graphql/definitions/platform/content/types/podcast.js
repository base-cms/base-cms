const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentPodcast(input: ContentPodcastQueryInput!): ContentPodcast @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentPodcast")
}

type ContentPodcast implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentPodcastQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
