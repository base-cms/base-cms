const striptags = require('striptags');
const { isObject } = require('@base-cms/common');

const createTitle = (doc) => {
  if (!isObject(doc)) return null;
  const { seoTitle, fullName } = doc;
  const title = seoTitle || fullName;
  return striptags(title || '') || null;
};

const createDescription = (doc) => {
  const { description } = doc;
  return striptags((description || '').trim()) || null;
};

module.exports = { createTitle, createDescription };
