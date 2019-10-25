const { get } = require('@base-cms/object-path');
const client = require('../../google-data-api-client');

const retrievePlaylistId = async ({ _id, youtube }, basedb) => {
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
    const value = get(response, 'items.0.contentDetails.relatedPlaylists.uploads');
    if (value) basedb.updateOne('platform.Content', { _id }, { $set: { 'youtube.playlistId': value } });
    return value;
  }
  return undefined;
};


module.exports = async (content, { input }, { basedb }) => {
  const { limit } = input;
  try {
    const playlistId = await retrievePlaylistId(content, basedb);
    if (!playlistId) throw new Error('Unable to retrieve a playlist id');
    const response = await client.request('youtube.playlistItems', { playlistId, maxResults: limit });
    return response;
  } catch (error) {
    return { items: [], error: error.message };
  }
};
