import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '@base-cms/base4-nextjs-apollo';
import withRouting from './withRouting';
import RoutingContext from '../routing/context';

class WebsiteApp extends App {
  render() {
    const {
      Component,
      pageProps,
      apollo,
      routeDefs,
    } = this.props;
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

export { withApollo, withRouting };
export default WebsiteApp;
