const { BaseDB } = require('@base-cms/db');

const getProjection = require('../../utils/get-projection');
const getGraphType = require('../../utils/get-graph-type');

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
    fullName: ({ fullName }, { input }) => {
      const { suppressType, suppressId } = input;
      if (!fullName) return fullName;
      let name = fullName;
      if (suppressType) name = name.replace(/^[a-z]+?:\s/i, '');
      if (suppressId) name = name.replace(/\s\([0-9]+?\)$/i, '');
      return name;
    },

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
};
