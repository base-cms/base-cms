const { join } = require('path');

const { BASE_URL, YOUTUBE_ENDPOINT } = require('../constants');

module.exports = endpoint => `${BASE_URL.replace(/\/+$/g, '')}${join('/', YOUTUBE_ENDPOINT, endpoint)}`;
