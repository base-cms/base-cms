const striptags = require('striptags');
const { isObject } = require('@base-cms/common');
const { BaseDB } = require('@base-cms/db');

const createSeoTitle = (doc) => {
  let title = BaseDB.extractMutationValue(doc, 'Website', 'seoTitle');
  if (!title) title = BaseDB.fillMutation(doc, 'Website', 'name');
  return striptags(title || '').trim();
};

const createTitleCompany = async (doc, basedb) => {
  const id = BaseDB.extractRefId(doc.company);
  const company = await basedb.findById('website.Content', id);
  if (!company) return null;
  return createSeoTitle(company);
};

const createTitlePrimarySection = async (doc, basedb) => {
  const ref = BaseDB.extractMutationValue(doc, 'Website', 'primarySection');
  const id = BaseDB.extractRefId(ref);
  const section = await basedb.findById('website.Section', id);
  if (!section) return null;
  if (section.seoTitle) return section.seoTitle;
  if (section.fullName) return section.fullName;
  return section.name;
};

const createTitle = async (doc, basedb) => {
  if (!isObject(doc)) return null;
  const { type } = doc;
  let title = createSeoTitle(doc);
  if (!title) return null;
  if (type !== 'Product') return title;

  const [sectionTitle, companyTitle] = await Promise.all([
    createTitlePrimarySection(doc, basedb),
    createTitleCompany(doc, basedb),
  ]);
  if (sectionTitle) title = `${title} in ${sectionTitle}`;
  if (companyTitle) title = `${companyTitle} ${title}`;

  return title;
};

const createDescription = (doc) => {
  if (!isObject(doc)) return null;
  const description = striptags((BaseDB.fillMutation(doc, 'Website', 'teaser') || '').trim());
  if (description) return description;
  const body = striptags(BaseDB.fillMutation(doc, 'Website', 'body') || '');
  return `${body.substring(0, 155)}...`;
};

module.exports = { createTitle, createDescription };
