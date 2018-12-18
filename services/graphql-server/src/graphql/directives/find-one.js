const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const getProjection = require('../utils/get-projection');

class FindOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input = {} }, { basedb }, { fieldNodes, returnType, schema }) => {
      const start = process.hrtime();
      const projection = getProjection(schema, returnType, fieldNodes[0].selectionSet);

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

      const result = await basedb.findOne(model, query, { projection });
      basedb.log('@findOne', start, { model });
      return result;
    };
  }
}

module.exports = FindOneDirective;
