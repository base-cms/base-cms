import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '@base-cms/base4-nextjs-apollo';
import RoutingContext from '../routing/context';

const app = (routes) => {
  class WebsiteApp extends App {
    render() {
      const {
        Component,
        pageProps,
        apollo,
      } = this.props;
      return (
        <Container>
          <RoutingContext.Provider value={routes}>
            <ApolloProvider client={apollo}>
              <Component {...pageProps} />
            </ApolloProvider>
          </RoutingContext.Provider>
        </Container>
      );
    }
  }
  return withApollo(WebsiteApp);
};

export default app;
