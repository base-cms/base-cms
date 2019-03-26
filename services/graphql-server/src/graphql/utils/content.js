const { BaseDB } = require('@base-cms/db');
const { isObject } = require('@base-cms/utils');
const { stripTags } = require('@base-cms/html');
const defaultContentTypes = require('./content-types');

const { isArray } = Array;

const createSeoTitle = (doc) => {
  let title = BaseDB.extractMutationValue(doc, 'Website', 'seoTitle');
  if (!title) title = BaseDB.fillMutation(doc, 'Website', 'name');
  return stripTags(title || '').trim();
};

// const createTitleCompany = async (doc, load) => {
//   const id = BaseDB.extractRefId(doc.company);
//   if (!id) return null;
//   const company = await load('platformContent', id, {
//     name: 1,
//     'mutations.Website.seoTitle': 1,
//     'mutations.Website.name': 1,
//   }, { status: 1, ...criteriaFor('contentCompany') });
//   if (!company) return null;
//   return createSeoTitle(company);
// };

// const createTitlePrimarySection = async (doc, load) => {
//   const ref = BaseDB.extractMutationValue(doc, 'Website', 'primarySection');
//   const id = BaseDB.extractRefId(ref);
//   if (!id) return null;
//   const section = await
//     load('websiteSection', id, { seoTitle: 1, fullName: 1, name: 1 }, { status: 1 });
//   if (!section) return null;
//   if (section.seoTitle) return section.seoTitle;
//   if (section.fullName) return section.fullName;
//   return section.name;
// };

const createTitle = async (doc) => {
  if (!isObject(doc)) return null;
  return createSeoTitle(doc);
  // The below has been removed.
  // This should NOT be handled on read and, instead, should be done at write time.
  // @todo Add support for this on write in platform.

  // if (!title) return null;
  // if (type !== 'Product') return title;
  // const [sectionTitle, companyTitle] = await Promise.all([
  //   createTitlePrimarySection(doc, load),
  //   createTitleCompany(doc, load),
  // ]);
  // if (sectionTitle) title = `${title} in ${sectionTitle}`;
  // if (companyTitle) title = `${companyTitle} ${title}`;

  // return title;
};

const createDescription = (doc) => {
  if (!isObject(doc)) return null;
  const description = stripTags((BaseDB.fillMutation(doc, 'Website', 'teaser') || '').trim());
  return description;
  // This should not require the entire body, and rather should be handled at save time.
  // Otherwise, the entire body needs to be returned all the time.
  // No longer doing this here.
  // @todo Add support for this on write in platform.

  // const body = stripTags(BaseDB.fillMutation(doc, 'Website', 'body') || '');
  // return `${body.substring(0, 155)}...`;
};

const getDefaultContentTypes = () => defaultContentTypes.slice();

const getPublishedCriteria = ({
  excludeContentIds = [],
  contentTypes = [],
  since,
} = {}) => {
  const date = since || new Date();
  const types = isArray(contentTypes) && contentTypes.length
    ? contentTypes : getDefaultContentTypes();

  const query = {
    status: 1,
    type: { $in: types },
    published: { $lte: date },
    $and: [
      {
        $or: [
          { unpublished: { $gt: date } },
          { unpublished: { $exists: false } },
        ],
      },
    ],
  };
  if (isArray(excludeContentIds) && excludeContentIds.length) {
    query._id = { $nin: excludeContentIds };
  }
  return query;
};

module.exports = {
  createTitle,
  createDescription,
  getPublishedCriteria,
  getDefaultContentTypes,
};
