const cheerio = require('cheerio');
const { dasherize } = require('@base-cms/inflector');
const {
  DB_TAG_END,
  DB_TAG_START,
  DEFAULT_HTML_ELEMENT,
  TAG_TYPE_ATTR_NAME,
  TAG_ID_ATTR_NAME,
} = require('../constants');

const ImageAssetTag = require('../tags/image-asset');
const OEmbedTag = require('../tags/oembed');

const tags = {
  image: ImageAssetTag,
  oembed: OEmbedTag,
};

const createTag = (type, attrs) => {
  const identifier = attrs[TAG_ID_ATTR_NAME];
  const Tag = tags[type];
  const instance = new Tag(identifier, attrs);
  return instance;
};

module.exports = {
  /**
   *
   * @param {string} fromType
   * @param {string} match
   */
  createTagInstance(fromType, match) {
    const attrs = this.getAttributesForMatch(fromType, match);
    const tagType = attrs[TAG_TYPE_ATTR_NAME];
    if (!tagType) throw new Error('No embed type attribute was found for tag');
    return createTag(tagType, attrs);
  },

  getAttributesForMatch(displayType, match) {
    const html = displayType === 'database' ? this.convertDbStringToHtml(match) : match;
    const $ = cheerio.load(html);
    const obj = $(`[${TAG_TYPE_ATTR_NAME}]`).data() || {};
    return Object.keys(obj).reduce((o, k) => ({ ...o, [`data-${dasherize(k)}`]: obj[k] }), {});
  },

  /**
   * Converts a database string match to an HTML string tag.
   *
   * @param {string}  match
   */
  convertDbStringToHtml(match) {
    const tag = DEFAULT_HTML_ELEMENT;
    return match
      .replace(DB_TAG_START, `<${tag}`)
      .replace(DB_TAG_END, `></${tag}>`);
  },
};
