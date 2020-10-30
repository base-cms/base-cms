const {
  CDN_IMAGE_HOSTNAME,
  CDN_ASSET_HOSTNAME,
} = require('../env');

module.exports = {
  imageHost: CDN_IMAGE_HOSTNAME,
  assetHost: CDN_ASSET_HOSTNAME,
  date: {
    timezone: 'America/Chicago',
    format: 'MMM Do, YYYY',
    locale: 'en',
  },
  language: {
    primaryCode: 'en',
    subCode: 'us',
  },
};
