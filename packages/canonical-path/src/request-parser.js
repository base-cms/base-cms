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
  const allowed = ['sectionAlias', 'primaryCategoryPath', 'type', 'id', 'slug'];
  const def = ['sectionAlias', 'primaryCategoryPath', 'type', 'id', 'slug'];

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

const buildMagazineIssueParts = (parts) => {
  const allowed = ['id'];
  const def = ['id'];

  const built = buildParts({ parts, allowed, def });
  return built;
};

const buildMagazinePublicationParts = (parts) => {
  const allowed = ['id'];
  const def = ['id'];

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

const parseMagazineIssueHeader = (headerString) => {
  const parts = parseDelimitedString(headerString);
  return buildMagazineIssueParts(parts);
};

const parseMagazinePublicationHeader = (headerString) => {
  const parts = parseDelimitedString(headerString);
  return buildMagazinePublicationParts(parts);
};

const parseDynamicPageHeader = (headerString) => {
  const parts = parseDelimitedString(headerString);
  return buildDynamicPageParts(parts);
};

const parseHeaderPartsFor = (type, headerString) => {
  switch (type) {
    case 'content':
      return parseContentHeader(headerString);
    case 'dynamic-page':
      return parseDynamicPageHeader(headerString);
    case 'website-section':
      return parseWebsiteSectionHeader(headerString);
    case 'magazine-issue':
      return parseMagazineIssueHeader(headerString);
    case 'magazine-publication':
      return parseMagazinePublicationHeader(headerString);
    default:
      return [];
  }
};

const parseHeaderPrefixFor = (type, headerString) => {
  switch (type) {
    case 'magazine-issue':
    case 'magazine-publication':
      return typeof headerString === 'undefined' ? 'magazine' : headerString;
    default:
      return headerString || '';
  }
};

/**
 * Parses the HTTP request object for canonical path rules
 */
module.exports = (req) => {
  const headerPrefix = 'x-canonical';
  return [
    'content',
    'website-section',
    'dynamic-page',
    'magazine-issue',
    'magazine-publication',
  ].reduce((o, type) => ({
    ...o,
    [camelize(type)]: {
      prefix: parseHeaderPrefixFor(type, req.headers[`${headerPrefix}-${type}-prefix`]),
      parts: parseHeaderPartsFor(type, req.headers[`${headerPrefix}-${type}-parts`]),
    },
  }), {});
};
