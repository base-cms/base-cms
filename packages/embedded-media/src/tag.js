const escapeRegex = require('escape-string-regexp');
const extractAttributes = require('./utils/extract-attributes');
const createAttribute = require('./utils/create-attribute');
const {
  DB_TAG_END,
  DB_TAG_START,
} = require('./constants');

class Tag {
  constructor(value) {
    const attrs = extractAttributes(value);
    this.attrs = attrs;
    this.value = value;
  }

  get id() {
    return this.attrs.id;
  }

  get type() {
    return this.attrs.type;
  }

  isValid() {
    if (this.valid === false) return false;
    if (this.id && this.type) return true;
    return false;
  }

  setValid(bit = true) {
    this.valid = Boolean(bit);
  }

  build() {
    const contents = Object.entries(this.attrs).reduce((arr, [key, value]) => {
      const attr = createAttribute(key, value);
      if (!attr) return arr;
      arr.push(attr);
      return arr;
    }, []).join(' ');
    return `${DB_TAG_START} ${contents} ${DB_TAG_END}`;
  }

  getRegExp(flags = 'g') {
    return new RegExp(escapeRegex(this.value), flags);
  }

  toString() {
    return this.build();
  }
}

module.exports = Tag;
