const { isObject } = require('@base-cms/utils');
const { stripTags } = require('@base-cms/html');

const createTitle = (doc) => {
  if (!isObject(doc)) return null;
  const { name, fullName } = doc;
  const title = name || fullName;
  return stripTags(title || '') || null;
};

const createDescription = (doc) => {
  const { description } = doc;
  return stripTags((description || '').trim()) || null;
};

module.exports = { createTitle, createDescription };
