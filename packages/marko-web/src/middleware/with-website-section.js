const createError = require('http-errors');
const gql = require('graphql-tag');
const { asyncRoute, isFunction: isFn } = require('@base-cms/utils');
const defaultFragment = require('../gql/fragments/with-website-section');
const extractFragmentData = require('../utils/extract-fragment-data');
const sectionPath = require('../utils/section-path');

const buildQuery = ({ fragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ fragment });
  return gql`
    query WithWebsiteSection($input: WebsiteSectionAliasQueryInput!, $redirect: WebsiteSectionRedirectQueryInput!) {
      websiteSectionAlias(input: $input) {
        ...WithWebsiteSectionFragment
        ${spreadFragmentName}
      }
      websiteSectionRedirect(input: $redirect) {
        id
        alias
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};

module.exports = ({
  template,
  fragment,
  aliasResolver,
} = {}) => asyncRoute(async (req, res) => {
  const alias = isFn(aliasResolver) ? await aliasResolver(req, res) : req.params.alias;
  const { apollo } = req;

  if (!alias) {
    // No website alias was provided. Return a 404.
    throw createError(400, 'No website section alias was provided.');
  }

  // Query for the website section using the alias, via the injected apollo client.
  const input = { alias };
  const variables = { input, redirect: input };
  const { data } = await apollo.query({ query: buildQuery({ fragment }), variables });

  const { websiteSectionAlias, websiteSectionRedirect } = data;

  if (websiteSectionAlias) {
    // The website section was found. Return it along with the canonical path.
    const canonicalPath = sectionPath(alias);
    // Redirect to the home page if the canonical path resolves to the root.
    if (canonicalPath === '/') return res.redirect(301, '/');
    // Otherwise, render the page.
    return res.marko(template, {
      section: websiteSectionAlias,
      canonicalPath,
    });
  }

  if (websiteSectionRedirect && websiteSectionRedirect.alias) {
    // A redirect was found for this section alias. Force a redirect.
    const { alias: redirectAlias } = websiteSectionRedirect;
    const path = sectionPath(redirectAlias);
    return res.redirect(301, path);
  }

  // No website section or redirect was found for this alias. Return a 404.
  throw createError(404, `No website section was found for alias '${alias}'`);
});
