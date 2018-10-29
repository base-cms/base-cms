import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

// Routing
import { redirect } from '../routing';

// Utilities
import { componentDisplayName, extractFragmentData, httpErrors } from '../utils';

// Config
import { SiteConfigContext } from '../config';

// GraphQL
import defaultFragment from '../gql/fragments/with-platform-content.graphql';
import canonicalPathFrag from '../gql/fragments/content-canonical-path.graphql';

// HOCs
import withRequestOrigin from './withRequestOrigin';

// Components
import { RelCanonical, PageTitle, MetaDescription } from '../components-head';

/**
 *
 * @param {object} params
 * @param {string|object} params.fragment The query fragment, either as
 *                                        a string or a gql AST object.
 */
export const buildQuery = ({ fragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ fragment });
  return gql`
    query WithPlatformContent($input: RootPlatformContentQueryOne!, $canonicalFields: [PlatfromContentPathField]!) {
      platformContent(input: $input) {
        ...WithPlatformContentFragment
        ...ContentCanonicalPath
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${canonicalPathFrag}
    ${processedFragment}
  `;
};

/**
 *
 * @param {object} content
 * @param {object} ctx
 * @param {object} ctx.Router
 * @param {?object} ctx.res
 * @param {string} ctx.asPath
 */
export const checkContent = (content, { Router, res, asPath }) => {
  const { redirectTo, canonicalPath } = content;
  if (redirectTo) {
    redirect({ Router, res, route: redirectTo });
  } else if (canonicalPath !== asPath) {
    redirect({ Router, res, route: canonicalPath });
  }
};

/**
 *
 * @param {object} Page
 * @param {object} options
 * @param {?string|object} options.fragment
 */
export default ({
  fragment = null,
  canonicalFields = ['sectionAlias', 'type', 'id', 'slug'],
} = {}) => (Page) => {
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
      return { content: platformContent, canonicalPath, ...pageProps };
    }

    /**
     *
     */
    render() {
      const { requestOrigin, canonicalPath, content } = this.props;
      const { metadata } = content;
      return (
        <>
          <SiteConfigContext.Consumer>
            {config => <PageTitle value={metadata.title} siteName={(config || {}).name} />}
          </SiteConfigContext.Consumer>
          <MetaDescription value={metadata.description} />
          <RelCanonical origin={requestOrigin} pathname={canonicalPath} />
          <Page {...this.props} />
        </>
      );
    }
  }
  WithPlatformContent.displayName = `WithPlatformContent(${componentDisplayName(Page)})`;
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
      metadata: PropTypes.object,
      canonicalPath: PropTypes.string.isRequired,
    }).isRequired,
  };
  return withRequestOrigin(WithPlatformContent);
};
