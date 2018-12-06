const { BaseDB } = require('@base-cms/db');
const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const getProjection = require('../utils/get-projection');
const getSelected = require('../utils/get-selected-fields');

class RefOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input = {} }, { basedb }, { returnType, fieldNodes }) => {
      const projection = getProjection(returnType, getSelected(fieldNodes[0].selectionSet));

      const {
        model,
        localField,
        foreignField,
        criteria,
      } = this.args;

      const fieldName = localField || field.name;
      const ref = BaseDB.get(doc, fieldName);
      const id = BaseDB.extractRefId(ref);
      if (!id) return null;

      const query = { [foreignField]: id, ...criteriaFor(criteria), ...formatStatus(input.status) };

      return basedb.findOne(model, query, { projection });
    };
  }
}

module.exports = RefOneDirective;
