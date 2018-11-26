const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const convertOps = require('../utils/convert-ops');

class FindOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input = {} }, { basedb }) => {
      const {
        model,
        using,
        criteria,
      } = this.args;

      const { status } = input;
      const query = { ...convertOps(criteria), ...formatStatus(status) };
      Object.keys(using).filter(key => typeof input[key] !== 'undefined').forEach((key) => {
        query[using[key]] = input[key];
      });
      console.log('@findOne', model, query);
      return basedb.findOne(model, query);
    };
  }
}

module.exports = FindOneDirective;
