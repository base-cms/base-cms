const imageHandler = require('./image');
const oembedHandler = require('./oembed');

module.exports = {
  imageHandler,
  oembedHandler,
  invalidHandler: () => '',
};
