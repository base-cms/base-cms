const { SchemaDirectiveVisitor } = require('graphql-tools');
const { BaseDB } = require('@base-cms/db');
const { UserInputError } = require('apollo-server-express');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const shouldCollate = require('../utils/should-collate');
const connectionProjection = require('../utils/connection-projection');
const queryComment = require('../utils/query-comment');

const { isArray } = Array;

class RefManyDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input = {} }, { basedb, site, apolloClient }, info) => {
      const {
        model,
        localField,
        foreignField,
        criteria,
        using,
        withSite,
        siteField,
      } = this.args;

      const fieldName = localField || field.name;
      const refs = BaseDB.get(doc, fieldName);
      if (!refs) return BaseDB.paginateEmpty();

      const ids = BaseDB.extractRefIds(isArray(refs) ? refs : [refs]);
      if (!ids.length) return BaseDB.paginateEmpty();

      const start = process.hrtime();
      const {
        status,
        sort,
        pagination,
      } = input;

      const siteId = input.siteId || site.id();

      const isInverse = foreignField !== '_id';
      if (sort.order === 'values' && isInverse) throw new UserInputError('Cannot use `values` sort on an inverse reference.');
      const query = applyInput({
        query: {
          ...criteriaFor(criteria),
          ...formatStatus(status),
          [foreignField]: ids.length === 1 ? ids[0] : { $in: ids },
        },
        using,
        input,
        ...(withSite && siteId && { siteId, siteField }),
      });

      const comment = queryComment(info, apolloClient);
      const projection = connectionProjection(info);
      const result = await basedb.paginate(model, {
        query,
        sort: { ...sort, values: ids },
        ...pagination,
        collate: shouldCollate(sort.field),
        comment,
        projection,
      });
      basedb.log('@refMany', start, { model });
      return result;
    };
  }
}

module.exports = RefManyDirective;
