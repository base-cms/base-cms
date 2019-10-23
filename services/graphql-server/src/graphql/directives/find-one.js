const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const getProjection = require('../utils/get-projection');
const queryComment = require('../utils/query-comment');

class FindOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input = {} }, { basedb, site, apolloClient }, info) => {
      const {
        fieldNodes,
        returnType,
        schema,
        fragments,
      } = info;
      const projection = getProjection(schema, returnType, fieldNodes[0].selectionSet, fragments);

      const {
        model,
        using,
        criteria,
        withSite,
        siteField,
      } = this.args;

      const { status } = input;

      const siteId = input.siteId || site.id();

      const query = applyInput({
        query: { ...criteriaFor(criteria), ...formatStatus(status) },
        using,
        input,
        ...(withSite && siteId && { siteId, siteField }),
      });

      const comment = queryComment(info, apolloClient);
      const result = await basedb.findOne(model, query, { projection, comment });
      return result;
    };
  }
}

module.exports = FindOneDirective;
