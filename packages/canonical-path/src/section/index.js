const { isFunction: isFn, cleanPath } = require('@base-cms/utils');

const pathResolvers = {
  alias: section => section.alias,
};

module.exports = async (section, ctx) => {
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
};
