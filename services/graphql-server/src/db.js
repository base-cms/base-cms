const { DB } = require('@base-cms/service-clients');

module.exports = new DB({
  skipProcessEventRegistration: true,
});
