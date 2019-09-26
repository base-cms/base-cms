const { isArray } = Array;

class URLSet {
  constructor() {
    this.attrs = [];
    this.urls = [];
  }

  addUrl(value) {
    this.urls.push(`<url>${value}</url>`);
    return this;
  }

  setUrls(values) {
    if (isArray(values)) values.forEach(v => this.addUrl(v));
    return this;
  }

  setAttr(key, value) {
    this.attrs.push({ key, value });
    return this;
  }

  openingTag() {
    const attrs = this.attrs.map(({ key, value }) => `${key}="${value}"`);
    if (!attrs.length) return '<urlset>';
    return `<urlset ${attrs.join(' ')}>`;
  }

  build() {
    return `<?xml version="1.0" encoding="utf-8"?>${this.openingTag()}${this.urls.join('')}${this.closingTag()}`;
  }

  // eslint-disable-next-line class-methods-use-this
  closingTag() {
    return '</urlet>';
  }
}

module.exports = URLSet;
