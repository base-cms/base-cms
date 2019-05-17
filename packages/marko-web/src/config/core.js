const AbstractConfig = require('./abstract-config');

class CoreConfig extends AbstractConfig {
  locale() {
    return this.get('locale', 'en_US');
  }

  lazyloadImages() {
    return this.get('images.lazyload', true);
  }

  siteName() {
    return this.get('siteName', '');
  }

  loadManifest() {
    const distDir = this.get('distDir');
    // eslint-disable-next-line global-require, import/no-dynamic-require
    if (!this.manifest) this.manifest = require(`${distDir}/rev-manifest.json`);
    return this.manifest;
  }

  sources() {
    if (!this.scripts) {
      this.scripts = Object.values(this.loadManifest()).filter(f => /\.js$/.test(f)).map(f => `/dist/${f}`);
    }
    return this.scripts;
  }

  styles() {
    if (!this.stylesheets) {
      this.stylesheets = Object.values(this.loadManifest()).filter(f => /\.css$/.test(f)).map(f => `/dist/${f}`);
    }
    return this.stylesheets;
  }
}

module.exports = CoreConfig;
