const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const convertOps = require('../utils/convert-ops');

class RefOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input = {} }, { basedb }) => {
      const {
        model,
        localField,
        foreignField,
        criteria,
      } = this.args;

      const query = { ...convertOps(criteria), ...formatStatus(input.status) };

      console.log('@refOne', model, query);
      return basedb.referenceOne({
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
