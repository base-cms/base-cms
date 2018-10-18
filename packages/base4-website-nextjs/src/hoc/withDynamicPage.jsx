import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

// Utilities
import { componentDisplayName, extractFragmentData, httpErrors } from '../utils';

// GraphQL
import defaultFragment from '../gql/fragments/with-dynamic-page.graphql';

// HOCs
import withRequestOrigin from './withRequestOrigin';

// Components
import { RelCanonical, PageTitle, MetaDescription } from '../components';

/**
 *
 * @param {object} params
 * @param {string|object} params.fragment The query fragment, either as
 *                                        a string or a gql AST object.
 */
export const buildQuery = ({ fragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ fragment });
  return gql`
    query WithDynamicPage($input: PlatformContentPageQueryOne!) {
      platformContentPage(input: $input) {
        ...WithDynamicPageFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};

/**
 *
 * @param {object} Page
 * @param {object} options
 * @param {?string|object} options.fragment
 */
export default (Page, options = {
  fragment: null,
}) => {
  class WithDynamicPage extends Component {
    /**
     *
     */
    static async getInitialProps(ctx) {
      // Await the props of the Page
      let pageProps;
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }

      const { fragment } = options;
      const { query, apollo } = ctx;
      // Get the content alias from the page query
      const { alias } = query;
      if (!alias) {
        // No content alias was provided. Return a 404.
        throw httpErrors.notFound('No content page alias was provided.');
      }

      // Query for the content page object using the alias, via the inject apollo client.
      const input = { alias };
      const variables = { input };
      const { data } = await apollo.query({ query: buildQuery({ fragment }), variables });
      const { platformContentPage } = data;
      if (!platformContentPage) {
        // No content page was found for this alias. Return a 404.
        throw httpErrors.notFound(`No content page was found for alias '${alias}'`);
      }
      return { page: platformContentPage, ...pageProps };
    }

    /**
     *
     */
    render() {
      const { requestOrigin, page } = this.props;
      const { metadata, alias } = page;
      return (
        <>
          <PageTitle value={metadata.title} />
          <MetaDescription value={metadata.description} />
          <RelCanonical origin={requestOrigin} pathname={alias} />
          <Page {...this.props} />
        </>
      );
    }
  }
  WithDynamicPage.displayName = `WithDynamicPage(${componentDisplayName(Page)})`;
  WithDynamicPage.propTypes = {
    ...Page.propTypes,
    page: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      teaser: PropTypes.string,
      body: PropTypes.string,
      alias: PropTypes.string.isRequired,
      metadata: PropTypes.object,
    }).isRequired,
  };
  return withRequestOrigin(WithDynamicPage);
};
