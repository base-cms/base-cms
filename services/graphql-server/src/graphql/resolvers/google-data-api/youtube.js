const { get, getAsArray, getAsObject } = require('@base-cms/object-path');
const googleDataApiClient = require('../../../google-data-api-client');

module.exports = {
  /**
   *
   */
  YoutubePlaylistConnection: {
    totalCount: response => get(response, 'pageInfo.totalResults', 0),
    pageInfo: response => ({
      hasNextPage: Boolean(get(response, 'nextPageToken')),
      endCursor: get(response, 'nextPageToken'),
    }),
    edges: response => getAsArray(response, 'items'),
  },
  /**
   *
   */
  YoutubePlaylistEdge: {
    node: edge => getAsObject(edge, 'snippet'),
    cursor: edge => get(edge, 'id'),
  },
  /**
   *
   */
  YoutubeVideo: {
    id: snippet => get(snippet, 'resourceId.videoId'),
    url: snippet => `https://youtu.be/${get(snippet, 'resourceId.videoId')}`,
    published: snippet => new Date(get(snippet, 'publishedAt')),
    thumbnail: (snippet, { input = {} }) => get(snippet, `thumbnails.${input.size}.url`, get(snippet, 'thumbnails.default.url')),
  },
  /**
   *
   */
  Query: {
    /**
     *
     */
    validateYoutubePlaylistId: async (_, { input }) => {
      const response = await googleDataApiClient.request('youtube.playlistList', { part: 'id', id: input });
      return getAsArray(response, 'items').length > 0;
    },
    validateYoutubeChannelId: async (_, { input }) => {
      const response = await googleDataApiClient.request('youtube.channelList', { part: 'id', id: input });
      return getAsArray(response, 'items').length > 0;
    },
    validateYoutubeUsername: async (_, { input }) => {
      const response = await googleDataApiClient.request('youtube.channelList', { part: 'id', forUsername: input });
      return getAsArray(response, 'items').length > 0;
    },
  },
};
