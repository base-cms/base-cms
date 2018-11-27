const criterion = {
  platformAssetImage: () => ({ type: 'Image' }),
  rootWebsiteSection: () => ({ 'parent.$id': { $exists: false } }),
  websiteSite: () => ({ type: 'Site' }),
};

module.exports = (key) => {
  if (!key) return {};
  const fn = criterion[key];
  if (fn) return fn();
  return {};
};
