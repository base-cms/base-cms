import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '@base-cms/base4-nextjs-apollo';
import RoutingContext from '../routing/context';

class WebsiteApp extends App {
  render() {
    const {
      Component,
      pageProps,
      apollo,
      routeDefinitions,
    } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <RoutingContext.Provider value={routeDefinitions}>
            <Component {...pageProps} />
          </RoutingContext.Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(WebsiteApp);
