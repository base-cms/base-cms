import React from 'react';
import Head from 'next/head';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import initApollo from './init';
import apolloConfig from './config';

const { log } = console;

const getDisplayName = Component => Component.displayName || Component.name || 'Unknown';

export default (ComposedComponent) => {
  class WithApollo extends React.Component {
    /**
     *
     * @param {*} props
     */
    constructor(props) {
      super(props);
      const { apolloState } = this.props;
      this.apollo = initApollo(apolloConfig, apolloState);
    }

    /**
     * The _app page's getInitialProps hook.
     * This provides slightly different args than a "regular" page.
     *
     * @param {object} args
     */
    static async getInitialProps(args) {
      const { Component, router, ctx } = args;
      const { req, res } = ctx;

      // Create the apollo client and expose it within the context.
      // This allows the "raw" client to be accessed within page `getInitialProps`
      const apollo = initApollo(apolloConfig, {}, req);
      ctx.apollo = apollo;

      // Await the App's initial props.
      let composedInitialProps = { Component, router };
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(args);
      }

      // Run all GraphQL queries in tree and extract the data.
      // Only run on the server and if headers have not been sent.
      if (!process.browser && !res.headersSent) {
        try {
          // Run queries in the tree.
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent {...composedInitialProps} />
            </ApolloProvider>,
          );
        } catch (e) {
          // Prevent errors from crashing SSR.
          // Handle the error in components via data.error prop.
          // @see http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          log('SERVER ERROR in getDataFromTree', e);
        }
        // Clear the head state so duplicate head data is prevented.
        Head.rewind();
      }

      // Extract the Apollo query data.
      const apolloState = apollo.cache.extract();

      return {
        ...composedInitialProps,
        apolloState,
      };
    }

    /**
     *
     */
    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }

  WithApollo.displayName = `withApollo(${getDisplayName(ComposedComponent)})`;
  return WithApollo;
};
