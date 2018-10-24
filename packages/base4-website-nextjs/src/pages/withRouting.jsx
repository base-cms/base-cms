import React, { Component } from 'react';

export default routes => App => class extends Component {
  static async getInitialProps(...args) {
    let appProps = {};
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(...args);
    }
    return { ...appProps };
  }

  render() {
    return <App {...this.props} routeDefs={routes} />;
  }
};
