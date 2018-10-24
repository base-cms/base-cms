import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '@base-cms/base4-nextjs-apollo';
import RoutingContext from '../routing/context';

const routes = [
  {
    name: 'home',
    pattern: '/',
    page: 'index',
  },
  {
    name: 'section',
    pattern: '/section/:alias(.*)',
    page: 'section',
  },
  {
    name: 'page',
    pattern: '/page/:alias',
    page: 'page',
  },
  {
    name: 'content',
    pattern: '/:prefix(.*):id(\\d{8}):suffix(.*)',
    page: 'content',
  },
];

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

export default withApollo(WebsiteApp);
