const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const getProjection = require('../utils/get-projection');
const buildQuery = require('../query-builders');

class FindOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, variables, ctx, info) => {
      const { basedb, site } = ctx;
      const { input = {} } = variables;

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
        queryBuilder,
      } = this.args;

      const { status } = input;

      const siteId = input.siteId || site.id();

      const applied = applyInput({
        query: { ...criteriaFor(criteria), ...formatStatus(status) },
        using,
        input,
        ...(withSite && siteId && { siteId, siteField }),
      });

      const query = await buildQuery(queryBuilder, {
        query: applied,
        variables,
        ctx,
        info,
      });

      const result = await basedb.findOne(model, query, { projection });
      return result;
    };
  }
}

module.exports = FindOneDirective;
