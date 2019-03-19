const {
  DB_TAG_END,
  DEFAULT_HTML_ELEMENT,
  TAG_TYPE_ATTR_NAME,
  TAG_ID_ATTR_NAME,
  TAG_ELEMENT_ATTR_NAME,
  TAG_DISABLED_ATTR_NAME,
  TAG_INVALID_ATTR_NAME,
} = require('../constants');

class AbstractTag {
  constructor(identifier, attributes) {
    if (!identifier) throw new Error('Tag identifier cannont be empty.');
    this.identifier = String(identifier);
    this.attributes = attributes;
  }

  // eslint-disable-next-line class-methods-use-this
  async buildHtmlTag(options) {
    const contents = await this.buildHtmlTagContents(options);
    const tag = AbstractTag.getTagName();
    const attrs = this.buildAttributes('html');

    return `<${tag} ${attrs}>${contents}<!--${DB_TAG_END}--></${tag}>`;
  }

  // eslint-disable-next-line class-methods-use-this
  async buildHtmlTagContents() {
    throw new Error('The buildHtmlTagContents() method must be implemented in the extending class.');
  }

  buildAttributes() {
    const attrs = {
      [TAG_TYPE_ATTR_NAME]: this.getAttribute(TAG_TYPE_ATTR_NAME),
      [TAG_ID_ATTR_NAME]: this.identifier,
      [TAG_ELEMENT_ATTR_NAME]: AbstractTag.getTagName(),
    };

    const skip = {
      [TAG_ID_ATTR_NAME]: true,
      [TAG_ELEMENT_ATTR_NAME]: true,
      [TAG_TYPE_ATTR_NAME]: true,
      [TAG_DISABLED_ATTR_NAME]: true,
      [TAG_INVALID_ATTR_NAME]: true,
    };

    Object.keys(this.attributes).forEach((name) => {
      if (!attrs[name] && !skip[name]) {
        attrs[name] = this.attributes[name];
      }
    });

    return AbstractTag.stringifyAttributes(attrs);
  }

  static stringifyAttributes(attrs) {
    return Object.keys(attrs).map((name) => {
      const value = attrs[name];
      if (value == null) return '';
      return `${name}="${value}"`;
    }).filter(v => v).join(' ');
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  static getTagName() {
    return DEFAULT_HTML_ELEMENT;
  }
}

module.exports = AbstractTag;
