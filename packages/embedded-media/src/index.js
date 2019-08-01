const parser = require('./parser');
const extract = require('./extract');

module.exports = {
  parser,
  extractEmbeddedTags: extract,
};
