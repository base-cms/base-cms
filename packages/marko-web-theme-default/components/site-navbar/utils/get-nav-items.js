const { asArray } = require('@base-cms/utils');

module.exports = ({
  regEnabled,
  hasUser,
  items,
}) => asArray(items.filter((item) => {
  const { when } = item;
  if (!when) return true;
  if (!regEnabled) return false;
  if (hasUser) {
    if (when === 'logged-in') return true;
    if (when === 'logged-out') return false;
  }
  if (!hasUser) {
    if (when === 'logged-in') return false;
    if (when === 'logged-out') return true;
  }
  return false;
}));
