import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '@base-cms/base4-nextjs-apollo';

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
  withApollo,
};
