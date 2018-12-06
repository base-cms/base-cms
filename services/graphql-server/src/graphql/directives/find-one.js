const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const getProjection = require('../utils/get-projection');
const getSelected = require('../utils/get-selected-fields');

class FindOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input = {} }, { basedb }, { fieldNodes, returnType }) => {
      const projection = getProjection(returnType, getSelected(fieldNodes[0].selectionSet));

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

      return basedb.findOne(model, query, { projection });
    };
  }
}

module.exports = FindOneDirective;
