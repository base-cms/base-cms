const { isObject } = require('@base-cms/utils');
const { stripTags } = require('@base-cms/html');

const createTitle = (doc) => {
  if (!isObject(doc)) return null;
  const { name } = doc;
  const title = stripTags(name || '');
  if (title) return `${title} Magazine Issue Archive`;
  return null;
};

const createDescription = (doc) => {
  const { description } = doc;
  return stripTags((description || '').trim()) || null;
};

module.exports = { createTitle, createDescription };
