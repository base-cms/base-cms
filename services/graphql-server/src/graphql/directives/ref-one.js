const { BaseDB } = require('@base-cms/db');
const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const getProjection = require('../utils/get-projection');

class RefOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input = {} }, { load }, info) => {
      const {
        returnType,
        fieldNodes,
        schema,
        fragments,
      } = info;
      const projection = getProjection(schema, returnType, fieldNodes[0].selectionSet, fragments);

      const {
        loader,
        localField,
        criteria,
      } = this.args;

      const fieldName = localField || field.name;
      const ref = BaseDB.get(doc, fieldName);
      const id = BaseDB.extractRefId(ref);
      if (!id) return null;

      const query = { ...criteriaFor(criteria), ...formatStatus(input.status) };
      return load(loader, id, projection, query);
    };
  }
}

module.exports = RefOneDirective;
