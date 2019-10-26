const { stringify } = require('querystring');
const { retrieve, write } = require('../../mongodb');
const fetch = require('../../fetch');
const { sortObject, onError, buildYoutubeUrl } = require('../../utils');

/**
 * The Youtube Playlist Items API
 * @see https://developers.google.com/youtube/v3/docs/playlistItems/list
 */
module.exports = async ({
  maxResults = 10,
  part = 'snippet',
  playlistId,
  pageToken,
  ttl = 24 * 60 * 60,
  force = false,
} = {}) => {
  const uri = buildYoutubeUrl('playlistItems');
  if (!playlistId) throw new Error('A playlist id is required.');

  const payload = {
    maxResults,
    part,
    playlistId,
    ...(pageToken && { pageToken }),
  };
  const url = `${uri}?${stringify(sortObject(payload))}`;
  const record = await retrieve(url);
  if (record && !force) return record.response;

  const response = await fetch(uri, payload);
  write(url, response, ttl).catch(onError);
  return response;
};
