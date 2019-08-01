const extractAttributes = require('./utils/extract-attributes');

class Tag {
  constructor(value) {
    const attrs = extractAttributes(value);
    this.id = attrs.id;
    this.type = attrs.type;
    this.attrs = attrs;
    this.value = value;
  }

  isValid() {
    if (this.id && this.type) return true;
    return false;
  }
}

module.exports = Tag;
