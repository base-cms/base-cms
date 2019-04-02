const { BaseDB } = require('@base-cms/db');
const { isFunction: isFn, cleanPath } = require('@base-cms/utils');
const getProjection = require('../../utils/get-projection');
const getGraphType = require('../../utils/get-graph-type');
const { createTitle, createDescription } = require('../../utils/website-section');

const pathResolvers = {
  alias: section => section.alias,
};

const loadHierarchy = async (section, load, projection, sections = []) => {
  const ref = BaseDB.get(section, 'parent');
  const parentId = BaseDB.extractRefId(ref);
  if (!parentId) return sections;
  const parent = await load('websiteSection', parentId, projection, { status: 1 });
  sections.push(parent);
  return loadHierarchy(parent, load, projection, sections);
};

module.exports = {
  /**
   *
   */
  WebsiteSection: {
    canonicalPath: async (section, _, ctx) => {
      const { canonicalRules } = ctx;
      const { websiteSection: sectionRules } = canonicalRules;
      const { parts, prefix } = sectionRules;

      const values = await Promise.all(parts.map((key) => {
        const fn = pathResolvers[key];
        return isFn(fn) ? fn(section, ctx) : section[key];
      }));

      const path = cleanPath(values.filter(v => v).map(v => String(v).trim()).join('/'));
      if (!path || path === 'home') return '/';
      if (prefix) return `/${cleanPath(prefix)}/${path}`;
      return `/${path}`;
    },

    /**
     * Placeholder.
     * Used for consistency with content.
     */
    redirectTo: () => null,

    metadata: section => ({
      title: () => createTitle(section),
      description: () => createDescription(section),
    }),

    hierarchy: (section, _, { load }, info) => {
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
      return loadHierarchy(section, load, projection);
    },
  },
};
