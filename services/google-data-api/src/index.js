const { service } = require('@base-cms/micro');
const { stringify } = require('querystring');

const { name, version } = require('../package.json');
const fetch = require('./fetch');
const {
  connect,
  ping,
  retrieve,
  write,
} = require('./mongodb');

const { log } = console;

const sortObject = (object = {}) => {
  const keys = Object.keys(object).sort();
  return keys.reduce((obj, key) => ({ ...obj, [key]: object[key] }), {});
};

module.exports = service.json({
  init: async () => {
    log(`> Booting ${name} ${version}...`);
    log('> Connecting to MongoDB...');
    await connect();
  },
  ping,
  actions: {
    /**
     * The Youtube Channel List API
     * @see https://developers.google.com/youtube/v3/docs/channels/list
     */
    'youtube.channelList': async (params) => {
      const uri = 'https://www.googleapis.com/youtube/v3/channels';
      const {
        maxResults = 1,
        part = 'snippet',
        forUsername,
        id,
        ttl = 365 * 24 * 60 * 60,
      } = params;
      if (!forUsername && !id) throw new Error('A channel id or username is required.');

      const payload = {
        maxResults,
        part,
        ...(id && { id }),
        ...(forUsername && { forUsername }),
      };
      const url = `${uri}?${stringify(sortObject(payload))}`;
      log({ url }); // DEBUG
      const record = await retrieve(url);
      log({ record }); // DEBUG
      if (record) return record;

      const response = await fetch(uri, payload);
      log({ response }); // DEBUG

      const inserted = await write(url, response, ttl);
      log({ inserted }); // DEBUG

      return response;
    },
  },
});
