const criterion = {
  issueMagazineSection: () => ({ 'issue.$id': { $exists: true } }),
  globalMagazineSection: () => ({ 'publication.$id': { $exists: true } }),
  magazinePublication: () => ({ type: 'Publication' }),
  platformAssetImage: () => ({ type: 'Image' }),
  rootPlatformTaxonomy: () => ({ 'parent.$id': { $exists: false } }),
  rootWebsiteSection: () => ({ 'parent.$id': { $exists: false } }),
  websiteSite: () => ({ type: 'Site' }),
};

module.exports = (key) => {
  if (!key) return {};
  const fn = criterion[key];
  if (fn) return fn();
  return {};
};
