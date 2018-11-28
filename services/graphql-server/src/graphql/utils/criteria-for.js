const contentTypes = require('./content-types');

const criterion = {
  assetImage: () => ({ type: 'Image' }),
  content: () => ({ type: { $in: contentTypes } }),
  emailNewsletter: () => ({ type: 'Newsletter' }),
  globalMagazineSection: () => ({ 'publication.$id': { $exists: true } }),
  issueMagazineSection: () => ({ 'issue.$id': { $exists: true } }),
  magazinePublication: () => ({ type: 'Publication' }),
  rootTaxonomy: () => ({ 'parent.$id': { $exists: false } }),
  rootWebsiteSection: () => ({ 'parent.$id': { $exists: false } }),
  websiteSite: () => ({ type: 'Site' }),
};

contentTypes.forEach((type) => {
  const key = `content${type}`;
  criterion[key] = () => ({ type });
});

module.exports = (key) => {
  if (!key) return {};
  const fn = criterion[key];
  if (fn) return fn();
  return {};
};
