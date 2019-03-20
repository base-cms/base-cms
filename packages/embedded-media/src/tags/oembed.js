const oembed = require('oembed-parser');
const AbstractTag = require('./abstract-tag');

class OEmbedTag extends AbstractTag {
  async buildHtmlTagContents() {
    const maxwidth = this.getAttribute('maxwidth');
    const maxheight = this.getAttribute('maxheight');
    const data = await oembed.extract(this.identifier, { maxwidth, maxheight });

    if (data) {
      this.setAttribute('data-oembed-type', data.type);
      this.setAttribute('data-oembed-provider', data.provider_name);
      return data.html;
    }
    return '<!-- invalid oembed -->';
  }
}

module.exports = OEmbedTag;
