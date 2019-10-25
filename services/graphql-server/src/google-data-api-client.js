const { client } = require('@base-cms/micro');

const { GOOGLE_DATA_API_URI } = require('./env');

module.exports = client.json({ url: GOOGLE_DATA_API_URI });
