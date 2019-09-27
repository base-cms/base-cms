const { BaseDB } = require('@base-cms/db');
const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const getProjection = require('../utils/get-projection');

class RefOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input = {} }, { load, site }, info) => {
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
        withSite,
      } = this.args;

      const fieldName = localField || field.name;
      const ref = BaseDB.get(doc, fieldName);
      const id = BaseDB.extractRefId(ref);
      if (!id) return null;

      const query = applyInput({
        query: { ...criteriaFor(criteria), ...formatStatus(input.status) },
        ...(withSite && { siteId: site._id }),
      });
      return load(loader, id, projection, query);
    };
  }
}

module.exports = RefOneDirective;
