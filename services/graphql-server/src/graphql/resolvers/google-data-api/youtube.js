const { get, getAsArray, getAsObject } = require('@base-cms/object-path');

module.exports = {
  YoutubePlaylistConnection: {
    totalCount: response => get(response, 'pageInfo.totalResults', 0),
    pageInfo: response => ({
      hasNextPage: Boolean(get(response, 'nextPageToken')),
      endCursor: get(response, 'nextPageToken'),
    }),
    edges: response => getAsArray(response, 'items'),
  },
  YoutubePlaylistEdge: {
    node: edge => getAsObject(edge, 'snippet'),
    cursor: edge => get(edge, 'id'),
  },
  YoutubeVideo: {
    id: snippet => get(snippet, 'resourceId.videoId'),
    url: snippet => `https://youtu.be/${get(snippet, 'resourceId.videoId')}`,
    published: snippet => new Date(get(snippet, 'publishedAt')),
    thumbnail: (snippet, { input = {} }) => get(snippet, `thumbnails.${input.size}.url`, get(snippet, 'thumbnails.default.url')),
  },
};
