const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');

class FindManyDirective extends SchemaDirectiveVisitor {
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

      const {
        status,
        sort,
        pagination,
      } = input;

      const query = applyInput({
        query: { ...criteriaFor(criteria), ...formatStatus(status) },
        using,
        input,
      });
      console.log('@findMany', model, query);
      return basedb.paginate(model, { query, sort, ...pagination });
    };
  }
}

module.exports = FindManyDirective;
