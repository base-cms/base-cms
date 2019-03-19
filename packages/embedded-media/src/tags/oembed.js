const AbstractTag = require('./abstract-tag');

class OEmbedTag extends AbstractTag {
  async buildHtmlTagContents() {
    console.log('buildHtmlTag', this.identifier, this.attributes);
    return '<!-- Embedded HTML tag here -->';
  }
}

module.exports = OEmbedTag;
