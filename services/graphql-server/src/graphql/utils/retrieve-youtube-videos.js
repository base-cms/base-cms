const { get } = require('@base-cms/object-path');
const client = require('../../google-data-api-client');

const retrievePlaylistId = async ({ youtube }) => {
  const playlistId = get(youtube, 'playlistId');
  if (playlistId) return playlistId;

  const id = get(youtube, 'channelId');
  const forUsername = get(youtube, 'username');
  if (id || forUsername) {
    const payload = {
      part: 'contentDetails',
      ...(id && { id }),
      ...(forUsername && { forUsername }),
    };
    const response = await client.request('youtube.channelList', payload);
    return get(response, 'items.0.contentDetails.relatedPlaylists.uploads');
  }
  return undefined;
};


module.exports = async (content, { input }, { basedb }) => {
  const { limit } = input;
  const playlistId = await retrievePlaylistId(content, basedb);
  if (!playlistId) return { items: [] };
  const response = await client.request('youtube.playlistItems', { playlistId, maxResults: limit });
  return response;
};
