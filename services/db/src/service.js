const BaseDB = require('./basedb');

module.exports = {
  name: 'db',
  actions: {
    /**
     *
     */
    findById({ params }) {
      const {
        tenant,
        modelName,
        id,
        options,
      } = params;
      return BaseDB(tenant).findById(modelName, id, options);
    },

    /**
     *
     */
    findOne({ params }) {
      const {
        tenant,
        ...rest
      } = params;
      return BaseDB(tenant).findOne(...rest);
    },

    /**
     *
     */
    referenceOne({ params }) {
      const {
        tenant,
        ...rest
      } = params;
      return BaseDB(tenant).referenceOne({ ...rest });
    },
  },
};
