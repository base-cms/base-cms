import React, { Component } from 'react';
import PropTypes from 'prop-types';

import displayName from '../utils/component-display-name';

export const withRequestOriginPropTypes = {
  requestOrigin: PropTypes.string.isRequired,
};

export const withRequestOrigin = (Page) => {
  class WithRequestOrigin extends Component {
    /**
     *
     */
    static async getInitialProps(ctx) {
      // Await the props of the Page
      let pageProps;
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }

      const { req } = ctx;
      const requestOrigin = req ? `${req.protocol}://${req.get('host')}` : `${window.location.protocol}//${window.location.host}`;

      return { ...pageProps, requestOrigin };
    }

    /**
     *
     */
    render() {
      return <Page {...this.props} />;
    }
  }
  WithRequestOrigin.displayName = `WithRequestOrigin(${displayName(Page)})`;
  return WithRequestOrigin;
};
