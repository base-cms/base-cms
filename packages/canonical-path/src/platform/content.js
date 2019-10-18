const { isFunction: isFn, cleanPath } = require('@base-cms/utils');
const { get } = require('@base-cms/object-path');
const { BaseDB } = require('@base-cms/db');
const { dasherize } = require('@base-cms/inflector');

const pathResolvers = {
  id: content => content._id,
  slug: content => get(content, 'mutations.Website.slug'),
  type: content => dasherize(content.type),
  sectionAlias: async (content, { load, site }) => {
    const ref = BaseDB.get(content, 'mutations.Website.primarySection');
    const id = BaseDB.extractRefId(ref);
    if (!id) return 'home'; // No primary section. Load home.

    // Attempt to load section for the current site.
    const query = {
      status: 1,
      'site.$id': site.id(),
    };
    const section = await load('websiteSection', id, { alias: 1 }, query);
    // @todo This should eventually account for secondary sites/sections.
    // For now load home when not found.
    return section ? section.alias : 'home';
  },
  primaryCategoryPath: async (content, { load }) => {
    const ref = BaseDB.get(content, 'mutations.Website.primaryCategory');
    const id = BaseDB.extractRefId(ref);
    if (!id) return '';

    // Load category and extract path.
    const query = { status: 1, type: 'Category' };
    const category = await load('platformTaxonomy', id, { 'mutations.Website.urlPath': 1 }, query);
    return cleanPath(BaseDB.get(category, 'mutations.Website.urlPath'));
  },
};

const dynamicPageResolvers = {
  alias: content => get(content, 'mutations.Website.alias'),
};

const handleDynamicPage = async (content, context) => {
  const { canonicalRules } = context;
  const { dynamicPage: pageRules } = canonicalRules;
  const { parts, prefix } = pageRules;

  const values = await Promise.all(parts.map((key) => {
    const fn = dynamicPageResolvers[key];
    return isFn(fn) ? fn(content, context) : content[key];
  }));

  const path = cleanPath(values.filter(v => v).map(v => String(v).trim()).join('/'));

  if (!path) return '';
  if (prefix) return `/${cleanPath(prefix)}/page/${path}`;
  return `/page/${path}`;
};


module.exports = async (content, context) => {
  const { canonicalRules } = context;
  const { content: contentRules } = canonicalRules;
  const { parts, prefix } = contentRules;
  const { type, linkUrl } = content;

  if (type === 'Page') return handleDynamicPage(content, context);

  const types = ['Promotion', 'TextAd'];
  if (types.includes(type) && linkUrl) return linkUrl;

  const values = await Promise.all(parts.map((key) => {
    const fn = pathResolvers[key];
    return isFn(fn) ? fn(content, context) : content[key];
  }));

  const path = cleanPath(values.filter(v => v).map(v => String(v).trim()).join('/'));

  if (!path) return '';
  if (prefix) return `/${cleanPath(prefix)}/${path}`;
  return `/${path}`;
};
