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
        ...rest
      } = params;
      return BaseDB(tenant).findById(...rest);
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
