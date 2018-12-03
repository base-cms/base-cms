const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');

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

      const query = applyInput({
        query: { ...criteriaFor(criteria), ...formatStatus(status) },
        using,
        input,
      });

      return basedb.findOne(model, query);
    };
  }
}

module.exports = FindOneDirective;
