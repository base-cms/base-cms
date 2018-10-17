import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import displayName from '../utils/component-display-name';
import extractFragmentData from '../utils/extract-fragment-data';
import httpErrors from '../utils/http-errors';
import redirect from '../utils/redirect';

import defaultFragment from '../gql/fragments/with-platform-content.graphql';

import { withRequestOrigin, withRequestOriginPropTypes } from './withRequestOrigin';

import RelCanonical from '../components/RelCanonical';

export const withPlatformContentPropTypes = {
  canonicalPath: PropTypes.string.isRequired,
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    teaser: PropTypes.string,
    body: PropTypes.string,
    redirectTo: PropTypes.string,
    canonicalPath: PropTypes.string.isRequired,
  }),
  ...withRequestOriginPropTypes,
};

/**
 *
 * @param {object} params
 * @param {string|object} params.fragment The query fragment, either as
 *                                        a string or a gql AST object.
 */
export const buildQuery = ({ fragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ fragment });
  return gql`
    query ContentPage($input: RootPlatformContentQueryOne!, $canonicalFields: [PlatfromContentPathField]!) {
      platformContent(input: $input) {
        ...WithPlatformContentFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};

/**
 *
 * @param {object} content
 * @param {object} ctx
 * @param {?object} ctx.res
 * @param {string} ctx.asPath
 */
export const checkContent = (content, { res, asPath }) => {
  const { redirectTo, canonicalPath } = content;
  if (redirectTo) {
    redirect(res, redirectTo);
  } else if (canonicalPath !== asPath) {
    redirect(res, canonicalPath);
  }
};

/**
 *
 * @param {object} Page
 * @param {object} options
 * @param {?string|object} options.fragment
 */
export const withPlatformContent = (Page, options = {
  fragment: null,
  canonicalFields: ['sectionAlias', 'type', 'id', 'slug'],
}) => {
  class WithPlatformContent extends Component {
    /**
     *
     */
    static async getInitialProps(ctx) {
      // Await the props of the Page
      let pageProps;
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }

      const { fragment, canonicalFields } = options;
      const { query, apollo } = ctx;
      // Get the content id from the page query
      // Note: the content id is required for this HOC to function properly.
      const { id } = query;

      // Query for the content object using the id, via the inject apollo client.
      const input = { id: Number(id) };
      // Pass the canonical args to generate the content's canonical (route) path.
      const variables = { input, canonicalFields };
      const { data } = await apollo.query({ query: buildQuery({ fragment }), variables });
      const { platformContent } = data;
      if (!platformContent) {
        // No content was found for this id. Return a 404.
        throw httpErrors.notFound(`No content was found for id '${id}'`);
      }
      // Check content for internal/external redirects, etc.
      checkContent(platformContent, ctx);
      const { canonicalPath } = platformContent;
      // @todo TextAds and Promotions can use an external URL. We _must_ account for this
      // when using the `next-routes::Link` component, as external URLs do not inherently
      // work.
      return { content: platformContent, canonicalPath, ...pageProps };
    }

    /**
     *
     */
    render() {
      const { requestOrigin, canonicalPath } = this.props;
      return (
        <>
          <RelCanonical origin={requestOrigin} pathname={canonicalPath} />
          <Page {...this.props} />
        </>
      );
    }
  }
  WithPlatformContent.displayName = `WithPlatformContent(${displayName(Page)})`;
  return withRequestOrigin(WithPlatformContent);
};
