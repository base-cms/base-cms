const { get } = require('@base-cms/object-path');
const AbstractConfig = require('./abstract-config');
const AssetManifest = require('./asset-manifest');

class CoreConfig extends AbstractConfig {
  /**
   *
   * @param {object} config
   */
  constructor(config) {
    super(config);
    this.assets = new AssetManifest({ distDir: this.get('distDir') });
  }

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

  sources() {
    return this.assets.js();
  }

  styles() {
    return this.assets.css();
  }
}

module.exports = CoreConfig;
