const { join } = require('path');

class AssetManifest {
  constructor({ distDir } = {}) {
    this.distDir = distDir;
  }

  js() {
    if (!this.scripts) {
      const { js } = this.load();
      this.scripts = [js['main.js']];
    }
    return this.scripts;
  }

  css() {
    if (!this.stylesheets) {
      const { css } = this.load();
      this.stylesheets = [css['index.css']];
    }
    return this.stylesheets;
  }

  load() {
    if (!this.manifest) {
      this.manifest = {
        js: this.loadDataFor('js'),
        css: this.loadDataFor('css'),
      };
    }
    return this.manifest;
  }

  loadDataFor(type) {
    const { distDir } = this;
    const distFolder = distDir.split('/').pop();
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const json = require(join(distDir, type, 'manifest.json'));
    return Object.keys(json).reduce((o, k) => ({ ...o, [k]: join('/', distFolder, type, json[k]) }), {});
  }
}

module.exports = AssetManifest;
