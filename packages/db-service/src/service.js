const BaseDB = require('./basedb');

module.exports = {
  name: 'db',
  actions: {
    findById({ params }) {
      const {
        tenant,
        modelName,
        id,
        options,
      } = params;
      return BaseDB(tenant).findById(modelName, id, options);
    },
  },
};
