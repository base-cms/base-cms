const { stringify } = require('querystring');
const { retrieve, write } = require('../../mongodb');
const fetch = require('../../fetch');
const { sortObject, onError, buildYoutubeUrl } = require('../../utils');

/**
 * The Youtube playlist List API
 * @see https://developers.google.com/youtube/v3/docs/playlists/list
 */
module.exports = async ({
  maxResults = 1,
  part = 'snippet',
  channelId,
  id,
  ttl = 30 * 24 * 60 * 60,
  force = false,
} = {}) => {
  const uri = buildYoutubeUrl('playlists');
  if (!channelId && !id) throw new Error('A playlist or channel id is required.');

  const payload = {
    maxResults,
    part,
    ...(id && { id }),
    ...(channelId && { channelId }),
  };
  const url = `${uri}?${stringify(sortObject(payload))}`;
  const record = await retrieve(url);
  if (record && !force) return record.response;

  const response = await fetch(uri, payload);
  write(url, response, ttl).catch(onError);
  return response;
};
