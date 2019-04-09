const { parseDelimitedString } = require('@base-cms/utils');
const { camelize } = require('@base-cms/inflector');

const { isArray } = Array;

const buildParts = ({
  parts,
  allowed,
  def,
}) => {
  if (!isArray(parts) || !parts.length) return def;
  return parts.filter(v => allowed.includes(v));
};

const buildContentParts = (parts) => {
  const allowed = ['sectionAlias', 'type', 'id', 'slug'];
  const def = ['sectionAlias', 'type', 'id', 'slug'];

  const built = buildParts({ parts, allowed, def });
  if (!built.includes('id')) throw new Error('The `id` field be present in content canonical paths.');
  return built;
};

const buildWebsiteSectionParts = (parts) => {
  const allowed = ['alias'];
  const def = ['alias'];

  const built = buildParts({ parts, allowed, def });
  return built;
};

const buildDynamicPageParts = (parts) => {
  const allowed = ['alias'];
  const def = ['alias'];

  const built = buildParts({ parts, allowed, def });
  return built;
};

const parseContentHeader = (headerString) => {
  const parts = parseDelimitedString(headerString);
  return buildContentParts(parts);
};

const parseWebsiteSectionHeader = (headerString) => {
  const parts = parseDelimitedString(headerString);
  return buildWebsiteSectionParts(parts);
};

const parseDynamicPageHeader = (headerString) => {
  const parts = parseDelimitedString(headerString);
  return buildDynamicPageParts(parts);
};

const parseHeaderFor = (type, headerString) => {
  switch (type) {
    case 'content':
      return parseContentHeader(headerString);
    case 'dynamic-page':
      return parseDynamicPageHeader(headerString);
    case 'website-section':
      return parseWebsiteSectionHeader(headerString);
    default:
      return [];
  }
};

/**
 * Parses the HTTP request object for canonical path rules
 */
module.exports = (req) => {
  const headerPrefix = 'x-canonical';
  return ['content', 'website-section', 'dynamic-page'].reduce((o, type) => ({
    ...o,
    [camelize(type)]: {
      prefix: req.headers[`${headerPrefix}-${type}-prefix`] || '',
      parts: parseHeaderFor(type, req.headers[`${headerPrefix}-${type}-parts`]),
    },
  }), {});
};
