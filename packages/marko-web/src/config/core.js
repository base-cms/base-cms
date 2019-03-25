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

  assets() {
    if (!this.manifest) {
      const distDir = this.get('distDir');
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const manifest = require(`${distDir}/asset-manifest.json`);
      this.manifest = Object.values(manifest);
    }
    return this.manifest;
  }
}

module.exports = CoreConfig;
