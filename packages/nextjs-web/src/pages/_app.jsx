import App, { Container } from 'next/app';
import React from 'react';

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

export default WebsiteApp;
