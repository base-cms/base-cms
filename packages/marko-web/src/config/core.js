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

  sources() {
    if (!this.scripts) {
      const distDir = this.get('distDir');
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const manifest = this.manifest || require(`${distDir}/rev-manifest.json`);
      this.scripts = Object.values(manifest).filter(f => /\.js$/.test(f)).map(f => `/dist/${f}`);
    }
    return this.scripts;
  }
}

module.exports = CoreConfig;
