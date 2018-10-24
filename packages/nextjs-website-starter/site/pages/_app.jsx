import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '@base-cms/base4-nextjs-apollo';
import { ApolloProvider } from 'react-apollo';
import { RoutingContext } from '@base-cms/base4-website-nextjs/routing';
import routeDefs from '../routes.json';

class Website extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <RoutingContext.Provider value={routeDefs}>
          <ApolloProvider client={apollo}>
            <Component {...pageProps} />
          </ApolloProvider>
        </RoutingContext.Provider>
      </Container>
    );
  }
}

export default withApollo(Website);
