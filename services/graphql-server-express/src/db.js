const { DBClient } = require('@base-cms/service-clients');

const brokerOpts = {
  skipProcessEventRegistration: true,
};

module.exports = new DBClient({ brokerOpts });
