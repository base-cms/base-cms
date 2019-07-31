const AbstractTag = require('./abstract-tag');

const { log } = console;

class OEmbedTag extends AbstractTag {
  async buildHtmlTagContents() {
    try {
      const maxwidth = this.getAttribute('maxwidth');
      const maxheight = this.getAttribute('maxheight');
      const data = await oembed.extract(this.identifier, { maxwidth, maxheight });

      if (data) {
        this.setAttribute('data-oembed-type', data.type);
        this.setAttribute('data-oembed-provider', data.provider_name);
        return data.html;
      }
    } catch (e) {
      log(e);
    }
    return '<!-- invalid oembed -->';
  }
}

module.exports = OEmbedTag;
