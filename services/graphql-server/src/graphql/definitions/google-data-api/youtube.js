const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  validateYoutubePlaylistId(input: ValidateYoutubePlaylistIdQueryInput!): Boolean!
  validateYoutubeChannelId(input: ValidateYoutubeChannelIdQueryInput!): Boolean!
  validateYoutubeUsername(input: ValidateYoutubeUsernameQueryInput!): Boolean!
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

input ValidateYoutubePlaylistIdQueryInput {
  playlistId: String!
}

input ValidateYoutubeChannelIdQueryInput {
  channelId: String!
}

input ValidateYoutubeUsernameQueryInput {
  username: String!
}

`;
