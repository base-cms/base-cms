const { DB } = require('@base-cms/service-clients');

const brokerOpts = {
  skipProcessEventRegistration: true,
};

module.exports = new DB({ brokerOpts });
