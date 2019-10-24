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

      const { query, sort } = await buildQuery(queryBuilder, {
        currentValues: { query: applied, sort: input.sort },
        variables,
        ctx,
        info,
      });

      const result = await basedb.findOne(model, query, {
        projection,
        ...(sort && { sort: { [sort.field]: sort.order === 'desc' ? -1 : 1 } }),
      });
      return result;
    };
  }
}

module.exports = FindOneDirective;
