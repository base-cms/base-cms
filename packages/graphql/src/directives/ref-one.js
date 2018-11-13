const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');

class RefOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }, { db }) => {
      const {
        model,
        localField,
        foreignField,
        criteria,
      } = this.args;

      let query = { ...criteria };
      if (input) {
        const { status } = input;
        if (status) query = { ...query, ...formatStatus(status) };
      }
      return db.call('referenceOne', {
        doc,
        relatedModel: model,
        localField: localField || field.name,
        foreignField,
        query,
      });
    };
  }
}

module.exports = RefOneDirective;
