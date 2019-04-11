const { BaseDB } = require('@base-cms/db');
const { websiteSection: canonicalPathFor } = require('@base-cms/canonical-path');
const getProjection = require('../../utils/get-projection');
const getGraphType = require('../../utils/get-graph-type');
const { createTitle, createDescription } = require('../../utils/website-section');

const loadHierarchy = async (section, load, projection, sections = []) => {
  const ref = BaseDB.get(section, 'parent');
  const parentId = BaseDB.extractRefId(ref);
  if (!parentId) return sections;
  const parent = await load('websiteSection', parentId, projection, { status: 1 });
  if (!parent) return sections;
  sections.push(parent);
  return loadHierarchy(parent, load, projection, sections);
};

module.exports = {
  /**
   *
   */
  WebsiteSection: {
    canonicalPath: (section, _, ctx) => canonicalPathFor(section, ctx),

    /**
     * Placeholder.
     * Used for consistency with content.
     */
    redirectTo: () => null,

    metadata: section => ({
      title: () => createTitle(section),
      description: () => createDescription(section),
    }),

    hierarchy: async (section, _, { load }, info) => {
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
      const thisSection = await load('websiteSection', section._id, projection, { status: 1 });
      const sections = await loadHierarchy(section, load, projection, [thisSection]);
      return sections.reverse();
    },
  },
};
