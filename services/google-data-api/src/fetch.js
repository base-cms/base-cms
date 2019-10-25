const fetch = require('node-fetch');
const { stringify } = require('querystring');

const { GOOGLE_API_KEY: key } = require('./env');

module.exports = async (uri, payload) => {
  const url = `${uri}?${stringify({ ...payload, key })}`;
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(`google-data-api says: ${response.statusText}`);
    error.statusCode = response.status;
    throw error;
  }
  return response.json();
};
