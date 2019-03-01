const { isObject } = require('@base-cms/utils');
const { stripTags } = require('@base-cms/html');

const createTitle = (doc) => {
  if (!isObject(doc)) return null;
  const { seoTitle, fullName } = doc;
  const title = seoTitle || fullName;
  return stripTags(title || '') || null;
};

const createDescription = (doc) => {
  const { description } = doc;
  return stripTags((description || '').trim()) || null;
};

module.exports = { createTitle, createDescription };
