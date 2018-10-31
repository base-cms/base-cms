import React from 'react';
import PropTypes from 'prop-types';
import { SiteConfigContext } from '@base-cms/base4-website-nextjs/config';
import { NavigationWrapper, LinkElement } from '@base-cms/base4-website-nextjs/components/core';
import NavItem from './NavItem';

const propTypes = {
  logoHeight: PropTypes.number,
};

const defaultProps = {
  logoHeight: 25,
};

const SiteNavbar = ({ logoHeight }) => (
  <NavigationWrapper className="navigation navigation--site navbar navbar-dark navbar-expand bg-dark">
    <SiteConfigContext.Consumer>
      {config => (
        <div className="d-flex flex-column">
          <div className="d-flex flex-row">
            <LinkElement to="/" className="navbar-brand ml-2" value={config.get('name')}>
              {(value) => {
                const siteLogo = config.get('logo');
                if (siteLogo) {
                  return (
                    <img src={siteLogo} title={value} alt={value} height={logoHeight} />
                  );
                }
                return value;
              }}
            </LinkElement>
            <div className="navbar-nav small align-self-center">
              {config.getAsArray('secondaryNavItems').map(item => <NavItem key={item.to} to={item.to} value={item.label} />)}
            </div>
          </div>
          <div className="navbar-nav">
            {config.getAsArray('primaryNavItems').map(item => <NavItem key={item.to} to={item.to} value={item.label} />)}
          </div>
        </div>
      )}
    </SiteConfigContext.Consumer>
  </NavigationWrapper>
);

SiteNavbar.propTypes = propTypes;
SiteNavbar.defaultProps = defaultProps;

export default SiteNavbar;
