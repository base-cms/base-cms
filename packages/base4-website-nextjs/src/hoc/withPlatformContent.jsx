import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Head from 'next/head';

// Routing
import { redirect } from '../routing';

// Utilities
import displayName from '../utils/component-display-name';
import extractFragmentData from '../utils/extract-fragment-data';
import httpErrors from '../utils/http-errors';

// GraphQL
import defaultFragment from '../gql/fragments/with-platform-content.graphql';

// HOCs
import withRequestOrigin from './withRequestOrigin';

// Components
import RelCanonical from '../components/RelCanonical';

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
export default (Page, options = {
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
      const { id } = query;
      if (!id) {
        // No content id was provided. Return a 404.
        throw httpErrors.notFound('No content ID was provided.');
      }

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
      const { requestOrigin, canonicalPath, content } = this.props;
      return (
        <>
          <Head>
            <title>{content.seoTitle}</title>
            <meta name="description" content={content.seoDescription} />
          </Head>
          <RelCanonical origin={requestOrigin} pathname={canonicalPath} />
          <Page {...this.props} />
        </>
      );
    }
  }
  WithPlatformContent.displayName = `WithPlatformContent(${displayName(Page)})`;
  WithPlatformContent.propTypes = {
    ...Page.propTypes,
    canonicalPath: PropTypes.string.isRequired,
    content: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      teaser: PropTypes.string,
      body: PropTypes.string,
      redirectTo: PropTypes.string,
      seoTitle: PropTypes.string,
      seoDescription: PropTypes.string,
      canonicalPath: PropTypes.string.isRequired,
    }).isRequired,
  };
  return withRequestOrigin(WithPlatformContent);
};
