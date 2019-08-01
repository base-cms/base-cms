const extractAttributes = require('./utils/extract-attributes');

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
    if (this.id && this.type) return true;
    return false;
  }
}

module.exports = Tag;
