const gql = require('graphql-tag');

module.exports = gql`

type YoutubePlaylistItems {
  pageInfo: YoutubePageInfo
  items: [YoutubePlaylistItem!]!
}

type YoutubePageInfo {
  totalResults: Int
  resultsPerPage: Int
}

type YoutubePlaylistItem {
  id: String
  snippet: YoutubePlaylistItemSnippet
}

type YoutubePlaylistItemSnippet {
  publishedAt: Date
  channelId: String
  title: String
  description: String
  thumbnails: YoutubeVideoThumbnails
  channelTitle: String
  playlistId: String
  position: Int
  resourceId: YoutubePlaylistItemResourceId
}

type YoutubePlaylistItemResourceId {
  videoId: String
}

type YoutubeVideoThumbnails {
  default: YoutubeVideoThumbnail
  medium: YoutubeVideoThumbnail
  high: YoutubeVideoThumbnail
}

type YoutubeVideoThumbnail {
  url: String
  width: Int
  height: Int
}

`;
