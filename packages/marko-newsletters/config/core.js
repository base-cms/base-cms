const { get } = require('@base-cms/object-path');
const AbstractConfig = require('./abstract-config');

class CoreConfig extends AbstractConfig {
  setWebsiteContext(context) {
    this.websiteContext = context;
  }

  website(path, def) {
    return get(this.websiteContext, path, def);
  }
}

module.exports = CoreConfig;
