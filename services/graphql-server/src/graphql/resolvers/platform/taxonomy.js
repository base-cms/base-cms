const { BaseDB } = require('@base-cms/db');

const getProjection = require('../../utils/get-projection');
const getGraphType = require('../../utils/get-graph-type');
const criteriaFor = require('../../utils/criteria-for');
const applyInput = require('../../utils/apply-input');
const formatStatus = require('../../utils/format-status');
const connectionProjection = require('../../utils/connection-projection');
const shouldCollate = require('../../utils/should-collate');

const loadHierarchy = async (taxonomy, load, projection, taxonomies = []) => {
  const ref = BaseDB.get(taxonomy, 'parent');
  const parentId = BaseDB.extractRefId(ref);
  if (!parentId) return taxonomies;
  const parent = await load('platformTaxonomy', parentId, projection, { status: 1 });
  if (!parent) return taxonomies;
  taxonomies.push(parent);
  return loadHierarchy(parent, load, projection, taxonomies);
};

module.exports = {
  /**
   *
   */
  Taxonomy: {
    hierarchy: async (taxonomy, _, { load }, info) => {
      const {
        returnType,
        fieldNodes,
        schema,
        fragments,
      } = info;
      const projection = getProjection(
        schema,
        getGraphType(returnType),
        fieldNodes[0].selectionSet,
        fragments,
      );
      projection.parent = 1;
      const thisTaxonomy = await load('platformTaxonomy', taxonomy._id, projection, { status: 1 });
      const taxonomies = await loadHierarchy(taxonomy, load, projection, [thisTaxonomy]);
      return taxonomies.reverse();
    },
  },

  /**
   *
   */
  Query: {
    taxonomies: async (_, { input }, { basedb }, info) => {
      const {
        includeIds,
        excludeIds,
        includeTypes,
        excludeTypes,
        rootOnly,
        status,
        sort,
        pagination,
      } = input;

      const query = applyInput({
        query: { ...criteriaFor('taxonomy'), ...formatStatus(status) },
        input,
      });

      if (includeTypes.length) query.type.$in = includeTypes;
      if (excludeTypes.length) query.type.$nin = excludeTypes;
      if (rootOnly) query['parent.$id'] = { $exists: false };
      if (includeIds.length || excludeIds.length) {
        query._id = {};
        if (includeIds.length) query._id.$in = includeIds;
        if (excludeIds.length) query._id.$nin = excludeIds;
      }

      const projection = connectionProjection(info);
      const result = await basedb.paginate('platform.Taxonomy', {
        query,
        sort,
        projection,
        collate: shouldCollate(sort.field),
        ...pagination,
      });
      return result;
    },
  },
};
