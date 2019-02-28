const { parseDelimitedString } = require('@base-cms/utils');

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

module.exports = {
  buildContentParts,
  buildDynamicPageParts,
  buildWebsiteSectionParts,
  parseContentHeader,
  parseHeaderFor,
  parseDynamicPageHeader,
  parseWebsiteSectionHeader,
};
