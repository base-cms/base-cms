const { stringify } = require('querystring');
const { retrieve, write } = require('../../mongodb');
const fetch = require('../../fetch');
const sortObject = require('../../sort-object');

/**
 * The Youtube Channel List API
 * @see https://developers.google.com/youtube/v3/docs/channels/list
 */
module.exports = async (params) => {
  const uri = 'https://www.googleapis.com/youtube/v3/channels';
  const {
    maxResults = 1,
    part = 'snippet',
    forUsername,
    id,
    ttl = 365 * 24 * 60 * 60,
    force = false,
  } = params;
  if (!forUsername && !id) throw new Error('A channel id or username is required.');

  const payload = {
    maxResults,
    part,
    ...(id && { id }),
    ...(forUsername && { forUsername }),
  };
  const url = `${uri}?${stringify(sortObject(payload))}`;
  const record = await retrieve(url);
  if (record && !force) return record.response;

  const response = await fetch(uri, payload);
  write(url, response, ttl);
  return response;
};
