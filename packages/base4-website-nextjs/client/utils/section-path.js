import cleanPath from './clean-path';

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
 * Generates the website section route name (as used by `next-routes`).
 *
 * By default, if the section alias were `tactical/firearms`, this method
 * would generate `/section/tactical/firearms`.
 *
 * The `routePrefix` (the default is 'section') can also be overriden by passing a different value.
 * Keep in mind, if this is done, the root routes.js file will need modification.
 *
 * @param {string} alias The website section alias
 * @param {string} [routePrefix=section] The section base path.
 */
export default (alias, routePrefix = 'section') => {
  if (shouldGoToIndex(alias)) return '/';

  const path = cleanPath(alias);
  if (!routePrefix) return `/${path}`;
  return `/${cleanPath(routePrefix)}/${path}`;
};
