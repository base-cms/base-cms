import React from 'react';
import ConfigContext from './context';
import { componentDisplayName } from '../utils';

export default siteConfig => (ComposedComponent) => {
  class WithSiteConfig extends React.Component {
    /**
     *
     * @param {object} args
     */
    static async getInitialProps(args) {
      const { ctx } = args;
      // Add the config to the page context.
      ctx.siteConfig = siteConfig;

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(args);
      }
      return { ...composedInitialProps };
    }

    /**
     *
     */
    render() {
      return (
        <ConfigContext.Provider value={siteConfig}>
          <ComposedComponent {...this.props} />
        </ConfigContext.Provider>
      );
    }
  }
  WithSiteConfig.displayName = `WithSiteConfig(${componentDisplayName(ComposedComponent)})`;
  return WithSiteConfig;
};
