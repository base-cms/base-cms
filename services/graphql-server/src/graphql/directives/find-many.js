const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const shouldCollate = require('../utils/should-collate');
const connectionProjection = require('../utils/connection-projection');
const buildQuery = require('../query-builders');

class FindManyDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, variables, ctx, info) => {
      const start = process.hrtime();
      const { basedb, site } = ctx;
      const { input = {} } = variables;

      const {
        model,
        using,
        criteria,
        withSite,
        siteField,
        queryBuilder,
      } = this.args;

      const {
        status,
        pagination,
      } = input;

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

      const projection = connectionProjection(info);
      const result = await basedb.paginate(model, {
        query,
        sort,
        projection,
        collate: shouldCollate(sort.field),
        ...pagination,
      });
      basedb.log('@findMany', start, { model });
      return result;
    };
  }
}

module.exports = FindManyDirective;
