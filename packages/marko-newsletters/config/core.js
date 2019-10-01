const { get } = require('@base-cms/object-path');
const AbstractConfig = require('./abstract-config');

class CoreConfig extends AbstractConfig {
  setWebsiteContext(context) {
    this.websiteContext = context;
  }

  website(path, def) {
    return get(this.websiteContext, path, def);
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
}

module.exports = CoreConfig;
