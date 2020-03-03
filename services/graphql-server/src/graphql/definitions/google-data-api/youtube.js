const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  validateYoutubePlaylistId(input: String!): Boolean!
  validateYoutubeChannelId(input: String!): Boolean!
  validateYoutubeUsername(input: String!): Boolean!
}

enum YoutubeThumbnailSizes {
  default
  medium
  high
  standard
  maxres
}

input YoutubeThumbnailInput {
  size: YoutubeThumbnailSizes = default
}

type YoutubePlaylistConnection {
  totalCount: Int!
  edges: [YoutubePlaylistEdge]!
  pageInfo: PageInfo!
}

type YoutubePlaylistEdge {
  node: YoutubeVideo!
  cursor: String!
}

type YoutubeVideo {
  id: String!
  url: String!
  published: Date!
  thumbnail(input: YoutubeThumbnailInput): String!
  title: String!
  description: String
}

`;
