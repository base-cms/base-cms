const AbstractTag = require('./abstract-tag');

class OEmbedTag extends AbstractTag {
  // eslint-disable-next-line class-methods-use-this
  getType() {
    return 'oembed';
  }
}

module.exports = OEmbedTag;
