const { getDefaultContentTypes, getDefaultTaxonomyTypes } = require('@base-cms/utils');

const contentTypes = getDefaultContentTypes();
const taxonomyTypes = getDefaultTaxonomyTypes();

const criterion = {
  assetImage: () => ({ type: 'Image' }),
  content: () => ({ type: { $in: contentTypes } }),
  taxonomy: () => ({ type: { $in: taxonomyTypes } }),
  emailNewsletter: () => ({ type: 'Newsletter' }),
  entityOrganization: () => ({ type: 'Organization' }),
  entityVenue: () => ({ type: 'Venue' }),
  globalMagazineSection: () => ({ 'publication.$id': { $exists: true } }),
  issueMagazineSection: () => ({ 'issue.$id': { $exists: true } }),
  magazinePublication: () => ({ type: 'Publication' }),
  rootTaxonomies: () => ({ type: { $in: taxonomyTypes }, 'parent.$id': { $exists: false } }),
  rootTaxonomiesOfType: () => ({ 'parent.$id': { $exists: false } }),
  rootWebsiteSection: () => ({ 'parent.$id': { $exists: false } }),
  websiteSite: () => ({ type: 'Site' }),
};

contentTypes.forEach((type) => {
  const key = `content${type}`;
  criterion[key] = () => ({ type });
});

taxonomyTypes.forEach((type) => {
  const key = `taxonomy${type}`;
  criterion[key] = () => ({ type });
});

module.exports = (key) => {
  if (!key) return {};
  const fn = criterion[key];
  if (fn) return fn();
  throw new Error(`No criteria function was found for '${key}'`);
};
