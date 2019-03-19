class AbstractTag {
  constructor(identifier) {
    if (!identifier) throw new Error('Tag identifier cannont be empty.');
    this.identifier = String(identifier);
  }

  // eslint-disable-next-line class-methods-use-this
  getType() {
    throw new Error('The getType() method must be implemented in the extending class');
  }

  // eslint-disable-next-line class-methods-use-this
  buildHtmlTag() {
    return '<!-- Embedded HTML tag here -->';
  }
}

module.exports = AbstractTag;
