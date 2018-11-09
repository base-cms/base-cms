import React, { Component } from 'react';
import { componentDisplayName } from '@base-cms/base4-website-nextjs/utils';

export default LayoutComp => (ComposedComponent) => {
  class WithLayout extends Component {
    /**
     *
     */
    static async getInitialProps(ctx) {
      // Await the props of the Page
      let pageProps;
      if (ComposedComponent.getInitialProps) {
        pageProps = await ComposedComponent.getInitialProps(ctx);
      }
      return { ...pageProps };
    }

    /**
     *
     */
    render() {
      return (
        <LayoutComp>
          <ComposedComponent {...this.props} />
        </LayoutComp>
      );
    }
  }
  WithLayout.displayName = `WithLayout(${componentDisplayName(ComposedComponent)})`;
  return WithLayout;
};
