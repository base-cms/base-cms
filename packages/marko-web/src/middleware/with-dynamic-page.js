const createError = require('http-errors');
const gql = require('graphql-tag');
const { asyncRoute, isFunction: isFn } = require('@base-cms/utils');
const defaultFragment = require('../gql/fragments/with-dynamic-page');
const extractFragmentData = require('../utils/extract-fragment-data');

const buildQuery = ({ fragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ fragment });
  return gql`
    query WithDynamicPage($input: ContentPageQueryInput!) {
      contentPage(input: $input) {
        ...WithDynamicPageFragment
        ${spreadFragmentName}
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
    // No content alias was provided. Return a 400.
    throw createError(400, 'No content page alias was provided.');
  }

  // Query for the content page object using the alias.
  const input = { alias };
  const variables = { input };
  const { data } = await apollo.query({ query: buildQuery({ fragment }), variables });
  const { contentPage } = data;
  if (!contentPage) {
    // No content page was found for this alias. Return a 404.
    throw createError(404, `No content page was found for alias '${alias}'`);
  }
  return res.marko(template, {
    page: contentPage,
  });
});
