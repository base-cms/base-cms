const { get } = require('@base-cms/object-path');
const AbstractConfig = require('./abstract-config');

class CoreConfig extends AbstractConfig {
  setWebsiteContext(context) {
    this.websiteContext = context;
  }

  website(path, def) {
    return get(this.websiteContext, path, def);
  }

  /**
   * @deprecated Use this.website('language.code') instead
   */
  locale() {
    return this.website('language.code', 'en-us');
  }

  dateLocale() {
    const primaryLang = this.website('language.primaryCode', 'en');
    const locale = this.get('date.locale', primaryLang);
    if (!locale || locale === 'en') return null;
    return locale;
  }

  dateFormat() {
    return this.get('date.format', 'MMM Do, YYYY');
  }

  lazyloadImages() {
    return this.get('images.lazyload', true);
  }

  fallbackImage() {
    return this.get('images.fallback');
  }

  loadMoreMountPoint() {
    return this.get('loadMore.mountPoint', '/__load-more');
  }

  oembedMountPoint() {
    return this.get('oembed.mountPoint', '/__oembed');
  }

  rssMountPoint() {
    return this.get('rss.mountPoint', '/__rss');
  }

  /**
   * @deprecated Use this.website('name') instead
   */
  siteName() {
    return this.website('name', '');
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
