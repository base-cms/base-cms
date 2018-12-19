import App, { Container } from 'next/app';
import React from 'react';
import WithApollo from '@base-cms/nextjs-apollo';

class WebsiteApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export {
  WebsiteApp,
  WithApollo,
};
