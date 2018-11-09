import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { componentDisplayName } from '../utils';

export default (Page) => {
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
  WithRequestOrigin.displayName = `WithRequestOrigin(${componentDisplayName(Page)})`;
  WithRequestOrigin.propTypes = {
    ...Page.propTypes,
    requestOrigin: PropTypes.string.isRequired,
  };
  return WithRequestOrigin;
};
