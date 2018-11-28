const criterion = {
  assetImage: () => ({ type: 'Image' }),
  content: () => ({ type: { $in: ['Article', 'Blog', 'Contact', 'Company', 'PressRelease'] } }),
  contentArticle: () => ({ type: 'Article' }),
  contentBlog: () => ({ type: 'Blog' }),
  contentCompany: () => ({ type: 'Company' }),
  contentContact: () => ({ type: 'Contact' }),
  contentPressRelease: () => ({ type: 'PressRelease' }),
  emailNewsletter: () => ({ type: 'Newsletter' }),
  globalMagazineSection: () => ({ 'publication.$id': { $exists: true } }),
  issueMagazineSection: () => ({ 'issue.$id': { $exists: true } }),
  magazinePublication: () => ({ type: 'Publication' }),
  rootTaxonomy: () => ({ 'parent.$id': { $exists: false } }),
  rootWebsiteSection: () => ({ 'parent.$id': { $exists: false } }),
  websiteSite: () => ({ type: 'Site' }),
};

module.exports = (key) => {
  if (!key) return {};
  const fn = criterion[key];
  if (fn) return fn();
  return {};
};
