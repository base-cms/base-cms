import React from 'react';
import SiteConfigContext from './context';
import { componentDisplayName, isObject } from '../utils';

export default siteConfig => (ComposedComponent) => {
  const config = isObject(siteConfig) ? siteConfig : {};
  class WithSiteConfig extends React.Component {
    /**
     *
     * @param {object} args
     */
    static async getInitialProps(args) {
      const { ctx } = args;
      // Add the config to the page context.
      ctx.siteConfig = config;

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
        <SiteConfigContext.Provider value={config}>
          <ComposedComponent {...this.props} />
        </SiteConfigContext.Provider>
      );
    }
  }
  WithSiteConfig.displayName = `WithSiteConfig(${componentDisplayName(ComposedComponent)})`;
  return WithSiteConfig;
};
