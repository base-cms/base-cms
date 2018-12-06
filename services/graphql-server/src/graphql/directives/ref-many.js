const { SchemaDirectiveVisitor } = require('graphql-tools');
const { BaseDB } = require('@base-cms/db');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const shouldCollate = require('../utils/should-collate');
const connectionProjection = require('../utils/connection-projection');

const { isArray } = Array;

class RefManyDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input = {} }, { basedb }, info) => {
      const {
        model,
        localField,
        foreignField,
        criteria,
        using,
      } = this.args;

      const fieldName = localField || field.name;
      const refs = BaseDB.get(doc, fieldName);
      if (!refs) return BaseDB.paginateEmpty();

      const ids = BaseDB.extractRefIds(isArray(refs) ? refs : [refs]);
      if (!ids.length) return BaseDB.paginateEmpty();
      const {
        status,
        sort,
        pagination,
      } = input;
      const query = applyInput({
        query: {
          ...criteriaFor(criteria),
          ...formatStatus(status),
          [foreignField]: ids.length === 1 ? ids[0] : { $in: ids },
        },
        using,
        input,
      });

      const projection = connectionProjection(info);

      console.time('refMany');
      const result = await basedb.paginate(model, {
        query,
        sort,
        ...pagination,
        collate: shouldCollate(sort.field),
        projection,
      });
      console.timeEnd('refMany');
      return result;
    };
  }
}

module.exports = RefManyDirective;
