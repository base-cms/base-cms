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
    async findOne({ params }) {
      const {
        tenant,
        modelName,
        query,
        options,
      } = params;
      return BaseDB(tenant).findOne(modelName, query, options);
    },

    /**
     *
     */
    referenceOne({ params }) {
      const {
        tenant,
        doc,
        relatedModel,
        localField,
        foreignField,
        query,
        options,
      } = params;
      return BaseDB(tenant).referenceOne({
        doc,
        relatedModel,
        localField,
        foreignField,
        query,
        options,
      });
    },
  },
};
