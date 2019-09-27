const { isObject } = require('@base-cms/utils');
const { stripTags } = require('@base-cms/html');

const createTitle = (doc) => {
  if (!isObject(doc)) return null;
  const { seoTitle, fullName } = doc;
  const title = seoTitle || fullName;
  return stripTags(title || '') || doc.name;
};

const createDescription = (doc, site) => {
  const { alias, description } = doc;
  const defaultDesc = alias !== 'home'
    ? `Articles, news, products, blogs and videos covering the ${doc.fullName || doc.name} market.`
    : site.description || `Articles, news, products, blogs and videos from ${site.name}.`;
  return stripTags((description || defaultDesc).trim()) || null;
};

module.exports = { createTitle, createDescription };
