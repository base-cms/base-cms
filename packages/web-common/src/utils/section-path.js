const { cleanPath } = require('@base-cms/utils');

/**
 * Determines if an alias should go to the index/home page.
 *
 * @param {string} alias
 */
const shouldGoToIndex = (alias) => {
  const path = cleanPath(alias);
  if (path === 'home' || path === '') return true;
  return false;
};

/**
 * Generates the website section route path.
 *
 * By default, if the section alias were `tactical/firearms`, this method
 * would generate `/tactical/firearms`.
 *
 * If the route `prefix` argument is specified, the alias will be appended with it.
 * For example, if the the `prefix` is `section`, the path will become `/section/tactical/firearms`.
 *
 * @param {string} alias The website section alias
 * @param {string} [prefix] An (optional) prefix to add to the path.
 */
module.exports = (alias, prefix) => {
  if (shouldGoToIndex(alias)) return '/';
  const path = cleanPath(alias);

  if (!prefix) return `/${path}`;
  return `/${cleanPath(prefix)}/${path}`;
};
