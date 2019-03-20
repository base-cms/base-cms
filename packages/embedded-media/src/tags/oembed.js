const oembed = require('oembed-parser');
const AbstractTag = require('./abstract-tag');

class OEmbedTag extends AbstractTag {
  async buildHtmlTagContents() {
    const maxwidth = this.getAttribute('maxwidth');
    const maxheight = this.getAttribute('maxheight');

    const data = await oembed.extract(this.identifier, { maxwidth, maxheight });
    console.info(data);
    return data && data.html ? data.html : '<!-- invalid oembed -->';
  }
}

module.exports = OEmbedTag;
