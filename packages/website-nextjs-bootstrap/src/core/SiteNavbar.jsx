import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SiteConfigContext } from '@base-cms/base4-website-nextjs/config';
import { NavigationWrapper, LinkElement } from '@base-cms/base4-website-nextjs/components/core';
import NavItem from './NavItem';

const propTypes = {
  className: PropTypes.string,
  logoHeight: PropTypes.number,
};

const defaultProps = {
  className: null,
  logoHeight: 25,
};

const SiteNavbar = ({ className, logoHeight }) => (
  <NavigationWrapper className={classNames('navigation navigation--site navbar navbar-expand', className)}>
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
            <ul className="navbar-nav small align-self-center">
              {config.getAsArray('secondaryNavItems').map(item => <NavItem key={item.to} to={item.to} value={item.label} />)}
            </ul>
          </div>
          <ul className="navbar-nav">
            {config.getAsArray('primaryNavItems').map(item => <NavItem key={item.to} to={item.to} value={item.label} />)}
          </ul>
        </div>
      )}
    </SiteConfigContext.Consumer>
  </NavigationWrapper>
);

SiteNavbar.propTypes = propTypes;
SiteNavbar.defaultProps = defaultProps;

export default SiteNavbar;
